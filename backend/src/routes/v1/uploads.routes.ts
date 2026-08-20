import { Readable } from "node:stream";
import type { UploadApiResponse } from "cloudinary";
import { Router } from "express";
import { CLOUDINARY_ROOT_FOLDER, cloudinary } from "../../config/cloudinary";
import { uploadSingleImage } from "../../middleware/upload";
import { requireAuth } from "../../middleware/requireAuth";
import { AppError, BadRequestError, NotFoundError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import { deleteCloudinaryImage, isWithinCloudinaryNamespace } from "../../utils/cloudinaryImages";
import { matchesDeclaredImageType } from "../../utils/imageSignature";
import { deleteImageSchema, uploadImageFieldsSchema } from "../../validators/upload.validators";

/**
 * Mounted at /api/v1/uploads. Handles admin image uploads (project
 * galleries, service hero images, etc.) to Cloudinary — every route here is
 * admin-only (requireAuth). MongoDB stays out of this entirely: the client
 * gets back the Cloudinary URL/publicId and is responsible for saving it
 * onto a Project/Service in a later phase (see project.types.ts).
 */
const router = Router();

function firstIssueMessage(error: { issues: { message: string }[] }, fallback: string): string {
  return error.issues[0]?.message ?? fallback;
}

// Public shape returned to the admin client — deliberately narrow. Never
// forward the raw Cloudinary API response: it can carry account-identifying
// fields (e.g. signature) that have no reason to leave the server.
function toPublicImage(result: UploadApiResponse) {
  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
  };
}

function uploadBufferToCloudinary(buffer: Buffer, folder: string): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload returned no result."));
          return;
        }
        resolve(result);
      }
    );
    Readable.from(buffer).pipe(uploadStream);
  });
}

// POST /api/v1/uploads — multipart/form-data with a single "image" field and
// an optional "folder" field (see UPLOAD_FOLDERS). Streams straight to
// Cloudinary from memory; the file is never written to disk.
router.post(
  "/",
  requireAuth,
  uploadSingleImage,
  asyncHandler(async (req, res) => {
    if (!req.file) throw new BadRequestError('No image provided. Send it under the "image" field.');

    const parsedFields = uploadImageFieldsSchema.safeParse(req.body);
    if (!parsedFields.success) {
      throw new BadRequestError(firstIssueMessage(parsedFields.error, "Invalid upload fields."));
    }

    // Second, content-based check — fileFilter in middleware/upload.ts only
    // trusted the client-supplied Content-Type, which is easy to spoof.
    if (!matchesDeclaredImageType(req.file.buffer, req.file.mimetype)) {
      throw new BadRequestError("File content does not match a supported image type.");
    }

    const folder = `${CLOUDINARY_ROOT_FOLDER}/${parsedFields.data.folder}`;
    const result = await uploadBufferToCloudinary(req.file.buffer, folder);

    res.status(201).json({ success: true, image: toPublicImage(result) });
  })
);

// DELETE /api/v1/uploads — body: { publicId }. Restricted to publicIds under
// the onto-digital/ root so this can never be used to delete an unrelated
// asset elsewhere in the Cloudinary account.
router.delete(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const parsed = deleteImageSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new BadRequestError(firstIssueMessage(parsed.error, "publicId is required."));
    }

    const { publicId } = parsed.data;
    if (!isWithinCloudinaryNamespace(publicId)) {
      throw new BadRequestError("publicId is outside the ONTO DIGITAL media folder.");
    }

    const outcome = await deleteCloudinaryImage(publicId);

    if (outcome === "not_found") throw new NotFoundError("Image not found.");
    if (outcome === "failed") throw new AppError("Failed to delete image.", 502);

    res.status(200).json({ success: true, message: "Image deleted." });
  })
);

export default router;

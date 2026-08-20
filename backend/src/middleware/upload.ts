import type { NextFunction, Request, Response } from "express";
import multer from "multer";
import { AppError, BadRequestError } from "../utils/AppError";

/** MIME types Cloudinary is allowed to receive from an admin upload. */
export const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_IMAGE_SIZE_MB = MAX_IMAGE_SIZE_BYTES / (1024 * 1024);

/**
 * Parses a single `multipart/form-data` image field named "image" straight
 * into memory (`memoryStorage`) — the buffer is forwarded to Cloudinary and
 * never touches the server's filesystem, so there's nothing left to clean up
 * or accidentally serve. `fileFilter` rejects anything outside the allowed
 * MIME types before it's even fully read; middleware/imageSignature.ts adds
 * a second, content-based check once the buffer is available in the route.
 */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_IMAGE_SIZE_BYTES, files: 1 },
  fileFilter(_req, file, callback) {
    if (!ALLOWED_IMAGE_MIME_TYPES.has(file.mimetype)) {
      callback(new BadRequestError("Only JPEG, PNG, WEBP, and GIF images are allowed."));
      return;
    }
    callback(null, true);
  },
}).single("image");

/**
 * Wraps multer's callback-style middleware so its errors (oversized file,
 * unexpected field name, malformed multipart body) come out as `AppError`s
 * instead of multer's raw error — keeping every failure on this route in the
 * same shape the centralized error handler already expects, and never
 * leaking multer/Node internals to the client.
 */
export function uploadSingleImage(req: Request, res: Response, next: NextFunction): void {
  upload(req, res, (error: unknown) => {
    if (!error) {
      next();
      return;
    }

    if (error instanceof AppError) {
      next(error);
      return;
    }

    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        next(new BadRequestError(`Image must be smaller than ${MAX_IMAGE_SIZE_MB}MB.`));
        return;
      }
      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        next(new BadRequestError('Send exactly one file under the "image" field.'));
        return;
      }
      next(new BadRequestError("Invalid image upload."));
      return;
    }

    next(new BadRequestError("Invalid image upload."));
  });
}

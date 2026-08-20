import { z } from "zod";

/**
 * Sub-folders an upload may land in under the `onto-digital/` Cloudinary
 * root (see config/cloudinary.ts). A fixed allow-list — not a free-text
 * field — so a caller can never write into an arbitrary Cloudinary folder.
 */
export const UPLOAD_FOLDERS = ["projects", "services", "general"] as const;

/**
 * POST /api/v1/uploads form fields (multer parses non-file multipart fields
 * into `req.body` as strings). `folder` is optional and defaults to
 * "general". `.strict()` rejects any other field, so nothing besides the
 * image and its folder can be smuggled into the request.
 */
export const uploadImageFieldsSchema = z
  .object({
    folder: z.enum(UPLOAD_FOLDERS).default("general"),
  })
  .strict();

/**
 * DELETE /api/v1/uploads body. Cloudinary public IDs include folder
 * segments (e.g. "onto-digital/projects/abc123"), which is why deletion
 * takes the ID in the JSON body rather than a URL param.
 */
export const deleteImageSchema = z
  .object({
    publicId: z
      .string()
      .trim()
      .min(1, "publicId is required.")
      .max(500, "publicId is too long."),
  })
  .strict();

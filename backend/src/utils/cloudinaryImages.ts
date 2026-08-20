import { CLOUDINARY_ROOT_FOLDER, cloudinary } from "../config/cloudinary";

/**
 * Shared Cloudinary-deletion helper — the one place that actually calls
 * `cloudinary.uploader.destroy`. Used by DELETE /api/v1/uploads (an admin
 * deleting an image directly) and by projects.routes.ts (best-effort
 * cleanup after a project, or its image, is replaced/removed), so there's a
 * single deletion path rather than two.
 */

export type CloudinaryDeleteOutcome = "deleted" | "not_found" | "outside_namespace" | "failed";

/**
 * True when `publicId` lives under the ONTO DIGITAL Cloudinary root
 * ("onto-digital/..."). The same restriction DELETE /api/v1/uploads has
 * always enforced — centralized here so deleteCloudinaryImage can never be
 * used to reach outside it, including from a caller that skips the
 * pre-check (e.g. a `imagePublicId` that predates this restriction, or was
 * edited directly in the database).
 */
export function isWithinCloudinaryNamespace(publicId: string): boolean {
  return publicId.startsWith(`${CLOUDINARY_ROOT_FOLDER}/`);
}

/**
 * Deletes a single Cloudinary image by public ID. Never throws — every
 * failure mode (outside the ONTO DIGITAL namespace, already gone, or a real
 * Cloudinary/network error) resolves to an outcome string instead, so a
 * best-effort caller (e.g. project deletion, which must still complete even
 * if this fails) never needs a try/catch of its own.
 */
export async function deleteCloudinaryImage(publicId: string): Promise<CloudinaryDeleteOutcome> {
  if (!isWithinCloudinaryNamespace(publicId)) return "outside_namespace";

  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    if (result.result === "ok") return "deleted";
    if (result.result === "not found") return "not_found";
    return "failed";
  } catch {
    return "failed";
  }
}

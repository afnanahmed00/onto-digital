import { apiUrl } from "@/config/api";
import { adminApiFetch, type ApiResult } from "./adminApi";

export type UploadedImage = {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
};

type UploadResult =
  | { success: true; image: UploadedImage }
  | { success: false; message: string; status: number };

/**
 * POST /api/v1/uploads — multipart/form-data with the file under "image"
 * and the target Cloudinary sub-folder under "folder" (see backend's
 * UPLOAD_FOLDERS). Not routed through services/adminApi.ts's JSON helper:
 * this is the one admin request that sends FormData, so it must NOT set a
 * "Content-Type: application/json" header (the browser needs to set its
 * own multipart boundary) and its success payload is `{ image }`, not the
 * `{ project }` shape every projects.ts call returns.
 */
export async function uploadProjectImage(file: File): Promise<UploadResult> {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("folder", "projects");

  try {
    const res = await fetch(apiUrl("/api/v1/uploads"), {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    let body: unknown = null;
    try {
      body = await res.json();
    } catch {
      body = null;
    }

    if (res.ok && body && typeof body === "object" && "image" in body) {
      return { success: true, image: (body as { image: UploadedImage }).image };
    }

    const message =
      body && typeof body === "object" && "message" in body && typeof (body as { message?: unknown }).message === "string"
        ? (body as { message: string }).message
        : "Image upload failed. Please try again.";

    return { success: false, message, status: res.status };
  } catch {
    return { success: false, message: "Unable to reach the server. Please try again.", status: 0 };
  }
}

/**
 * DELETE /api/v1/uploads — removes a Cloudinary image by public ID. Used
 * for best-effort cleanup after a project's image has been replaced (the
 * *old* asset, once the *new* one is confirmed saved — see
 * ProjectsPageClient.tsx) — never called before that save succeeds, so a
 * still-referenced image is never at risk. Goes through the same JSON
 * helper every other admin call uses, unlike uploadProjectImage's
 * hand-rolled fetch (that one needs FormData; this one doesn't).
 */
export function deleteUploadedImage(publicId: string): Promise<ApiResult<{ message: string }>> {
  return adminApiFetch<{ message: string }>("/api/v1/uploads", {
    method: "DELETE",
    body: JSON.stringify({ publicId }),
  });
}

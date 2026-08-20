import { apiUrl } from "@/config/api";

export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; message: string; status: number };

function extractMessage(body: unknown, fallback: string): string {
  if (body && typeof body === "object" && "message" in body) {
    const message = (body as { message?: unknown }).message;
    if (typeof message === "string" && message.length > 0) return message;
  }
  return fallback;
}

/**
 * Shared fetch wrapper for JSON admin API calls (projects/services/leads —
 * anything that isn't the multipart upload endpoint, see
 * services/adminUploads.ts). Always `credentials: "include"` so the
 * browser sends the backend's httpOnly session cookie (see
 * services/adminAuth.ts for why); never reads or stores the token itself.
 *
 * `status` is included on failure so callers can special-case a 401 —
 * expired/invalid session — by calling AdminAuthContext's `refresh()`,
 * which flips it to "unauthenticated" and lets the existing
 * app/admin/(dashboard)/layout.tsx guard redirect to /admin/login. Callers
 * should never need to parse `message` text to detect that case.
 */
export async function adminApiFetch<T>(path: string, init: RequestInit = {}): Promise<ApiResult<T>> {
  try {
    const res = await fetch(apiUrl(path), {
      ...init,
      credentials: "include",
      headers: {
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        ...init.headers,
      },
    });

    let body: unknown = null;
    try {
      body = await res.json();
    } catch {
      body = null;
    }

    if (!res.ok) {
      return { success: false, message: extractMessage(body, "Something went wrong. Please try again."), status: res.status };
    }

    return { success: true, data: body as T };
  } catch {
    return { success: false, message: "Unable to reach the server. Please try again.", status: 0 };
  }
}

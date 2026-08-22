import type { AdminAuthResponse } from "@/types/admin";

/**
 * Admin auth API client — every call carries `credentials: "include"` so the
 * browser sends/receives the backend's httpOnly session cookie
 * (onto_admin_token). The token itself is never read, stored, or touched
 * here: no localStorage, no sessionStorage, no request header.
 *
 * Calls hit same-origin relative paths (`/api/v1/...`), not the backend
 * directly — next.config.ts rewrites these to the real API server-side, so
 * the cookie the backend sets lands on the browser as first-party rather
 * than a cross-site cookie mobile browsers silently drop. See
 * next.config.ts and backend/src/config/auth.ts.
 */

async function parseAuthResponse(res: Response): Promise<AdminAuthResponse> {
  try {
    return (await res.json()) as AdminAuthResponse;
  } catch {
    return { success: false, message: "Unexpected response from the server." };
  }
}

const UNREACHABLE_MESSAGE = "Unable to reach the server. Please try again.";

/** POST /api/v1/auth/login */
export async function loginAdmin(email: string, password: string): Promise<AdminAuthResponse> {
  try {
    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await parseAuthResponse(res);
  } catch {
    return { success: false, message: UNREACHABLE_MESSAGE };
  }
}

/**
 * GET /api/v1/auth/me — resolves the current session, if any. A 401
 * (no/expired cookie) is the expected "signed out" case, not an error, so it
 * resolves to `{ success: false }` rather than throwing.
 */
export async function getCurrentAdmin(): Promise<AdminAuthResponse> {
  try {
    const res = await fetch("/api/v1/auth/me", {
      method: "GET",
      credentials: "include",
    });
    if (res.status === 401) return { success: false };
    return await parseAuthResponse(res);
  } catch {
    return { success: false, message: UNREACHABLE_MESSAGE };
  }
}

/**
 * POST /api/v1/auth/logout. Best-effort: the caller (AdminAuthContext)
 * clears local session state regardless of whether this request succeeds,
 * so a network hiccup never leaves the UI stuck showing a signed-in admin.
 */
export async function logoutAdmin(): Promise<void> {
  try {
    await fetch("/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // Ignored — see doc comment above.
  }
}

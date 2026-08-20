/**
 * Base URL of the ONTO DIGITAL backend API (Express, deployed separately —
 * see backend/README.md: frontend → Vercel, backend → Render). Never
 * hardcode a production URL here: set NEXT_PUBLIC_API_URL in each
 * environment's config (Vercel project settings in production, .env.local
 * locally) and this picks it up automatically. Falls back to the local dev
 * API so `npm run dev` works out of the box against `cd backend && npm run
 * dev` without any setup.
 *
 * Must be NEXT_PUBLIC_* (not a server-only var) — every call site is a
 * browser fetch (services/adminAuth.ts), since the httpOnly admin cookie
 * has to be set directly by the backend's own origin.
 */
export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(
  /\/+$/,
  ""
);

/** Builds a full backend URL for a `/api/v1/...` path. */
export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

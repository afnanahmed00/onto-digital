/**
 * Base URL of the ONTO DIGITAL backend API (Express, deployed separately:
 * frontend → Vercel, backend → Render). Never
 * hardcode a production URL here: set NEXT_PUBLIC_API_URL in each
 * environment's config (Vercel project settings in production, .env.local
 * locally) and this picks it up automatically. Falls back to the local dev
 * API so `npm run dev` works out of the box against `cd backend && npm run
 * dev` without any setup.
 *
 * Only for server-side callers (services/projects.ts, services/services.ts,
 * app/api/contact/route.ts) that talk to the backend directly. Browser-side
 * admin calls (services/adminAuth.ts, adminApi.ts, adminUploads.ts)
 * deliberately do NOT use this — they call same-origin relative paths that
 * next.config.ts rewrites to this same URL server-side, so the session
 * cookie is set as first-party rather than cross-site. See next.config.ts
 * for why: a cross-site cookie here gets silently dropped by mobile
 * browsers' third-party cookie blocking.
 */
export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(
  /\/+$/,
  ""
);

/** Builds a full backend URL for a `/api/v1/...` path. */
export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

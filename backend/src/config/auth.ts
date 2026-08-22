import type { CookieOptions } from "express";
import { isProduction } from "./env";

/** Name of the httpOnly cookie the admin session token is stored in. */
export const ADMIN_TOKEN_COOKIE = "onto_admin_token";

/**
 * httpOnly keeps the token out of reach of client-side JS (and therefore
 * XSS) entirely — it's never stored in localStorage.
 *
 * The frontend (Vercel) and this API (Render) are different origins, but
 * the browser never actually talks to this API cross-site: every
 * browser-side admin call goes through a same-origin path on the frontend
 * that Next.js rewrites to this API server-side (see frontend/next.config.ts).
 * From the browser's point of view this cookie is always first-party, so
 * `sameSite: "lax"` is correct in every environment — it does NOT need
 * `"none"` in production. (`"none"` was tried first and silently broke
 * mobile Safari, which blocks third-party cookies outright regardless of
 * SameSite/Secure — that's what the rewrite proxy now avoids entirely.)
 * `secure` still needs to track environment: dev runs on plain http, where
 * a Secure cookie would be silently dropped.
 *
 * `maxAge` bounds how long the browser retains the cookie — it's a
 * convenience ceiling, not the source of truth for session length. The JWT
 * itself (env.JWT_EXPIRES_IN) is what's actually checked on every request,
 * so an admin's access is never valid for longer than that regardless of
 * this value.
 */
export const ADMIN_TOKEN_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/",
};

// clearCookie must be called with matching attributes (minus maxAge/expires)
// for the browser to actually remove the cookie set with the options above.
export const CLEAR_ADMIN_TOKEN_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
  path: "/",
};

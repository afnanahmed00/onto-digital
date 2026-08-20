import type { CookieOptions } from "express";
import { isProduction } from "./env";

/** Name of the httpOnly cookie the admin session token is stored in. */
export const ADMIN_TOKEN_COOKIE = "onto_admin_token";

/**
 * httpOnly keeps the token out of reach of client-side JS (and therefore
 * XSS) entirely — it's never stored in localStorage. `secure` + `sameSite:
 * "none"` are required in production since the frontend (Vercel) and this
 * API (Render) are different origins; browsers only send a cross-site
 * cookie when both are set. Locally everything runs on plain http, where
 * `secure` would silently block the cookie, so dev uses `sameSite: "lax"`
 * instead.
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
  sameSite: isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/",
};

// clearCookie must be called with matching attributes (minus maxAge/expires)
// for the browser to actually remove the cookie set with the options above.
export const CLEAR_ADMIN_TOKEN_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
};

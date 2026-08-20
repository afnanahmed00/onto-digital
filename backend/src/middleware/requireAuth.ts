import type { Request } from "express";
import { ADMIN_TOKEN_COOKIE } from "../config/auth";
import { Admin, type AdminDocument } from "../models/Admin.model";
import { asyncHandler } from "../utils/asyncHandler";
import { UnauthorizedError } from "../utils/AppError";
import { parseCookies } from "../utils/cookies";
import { verifyAdminToken } from "../utils/jwt";

const GENERIC_AUTH_ERROR = "Authentication required.";

/**
 * Resolves the admin session cookie on a request without throwing — returns
 * the admin document if the cookie is present and valid, `null` otherwise
 * (missing cookie, malformed/expired token, deleted account). Used by public
 * read routes that behave differently for an authenticated admin (e.g.
 * including unpublished projects) but must still work for anonymous callers.
 * `requireAuth` below is the strict version of this same check.
 */
export async function getOptionalAdmin(req: Request): Promise<AdminDocument | null> {
  const token = parseCookies(req.headers.cookie)[ADMIN_TOKEN_COOKIE];
  if (!token) return null;

  let payload;
  try {
    payload = verifyAdminToken(token);
  } catch {
    return null;
  }

  const admin = await Admin.findById(payload.sub);
  return admin ?? null;
}

/**
 * Protects a route so only a request carrying a valid admin session cookie
 * can proceed. On success, attaches the admin document to `req.admin` for
 * downstream handlers. Every failure path — missing cookie, malformed
 * token, expired token, deleted account — returns the same generic 401 so
 * nothing about *why* it failed leaks to the caller.
 *
 * Usage (future protected routes): `router.get("/", requireAuth, handler)`.
 */
export const requireAuth = asyncHandler(async (req, _res, next) => {
  const admin = await getOptionalAdmin(req);
  if (!admin) throw new UnauthorizedError(GENERIC_AUTH_ERROR);

  req.admin = admin;
  next();
});

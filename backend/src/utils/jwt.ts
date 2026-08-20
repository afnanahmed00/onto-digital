import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AdminTokenPayload {
  /** Admin document's _id, as a string. */
  sub: string;
  email: string;
}

/** Signs a short-lived admin session token. Never include the password hash or other sensitive fields here — this payload is not encrypted, only signed. */
export function signAdminToken(payload: AdminTokenPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions);
}

/** Verifies and decodes an admin session token. Throws (JsonWebTokenError/TokenExpiredError) on an invalid or expired token — callers should catch and translate to a generic 401. */
export function verifyAdminToken(token: string): AdminTokenPayload {
  return jwt.verify(token, env.JWT_SECRET) as AdminTokenPayload;
}

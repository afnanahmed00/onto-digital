/**
 * Single fixed role for now — ONTO DIGITAL only needs one administrator
 * account (see docs/projectinfo.md's "single-site admin" scope). Kept as an
 * enum rather than a hardcoded string so a second role can be added later
 * without touching every place that references it.
 */
export enum AdminRole {
  ADMIN = "ADMIN",
}

/**
 * Shape of an administrator account, independent of Mongoose. Used by the
 * Admin model and the auth routes/middleware that read `req.admin`.
 */
export interface IAdmin {
  name: string;
  email: string;
  /** bcrypt hash — never the plaintext password. */
  password: string;
  /** Profile image URL — MongoDB only stores the URL; Cloudinary uploads are a later phase. */
  profileImage?: string;
  role: AdminRole;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mirrors the backend's toPublicAdmin() shape (backend/src/routes/v1/auth.routes.ts)
 * — never includes the password hash, since the API itself never sends one.
 */
export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN";
  lastLoginAt: string | null;
};

/** Common response shape of every /api/v1/auth/* endpoint. */
export type AdminAuthResponse = {
  success: boolean;
  message?: string;
  admin?: AdminUser;
};

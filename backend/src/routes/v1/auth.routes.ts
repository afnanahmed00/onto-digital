import { Router } from "express";
import {
  ADMIN_TOKEN_COOKIE,
  ADMIN_TOKEN_COOKIE_OPTIONS,
  CLEAR_ADMIN_TOKEN_COOKIE_OPTIONS,
} from "../../config/auth";
import { loginRateLimit } from "../../middleware/loginRateLimit";
import { requireAuth } from "../../middleware/requireAuth";
import { Admin, type AdminDocument } from "../../models/Admin.model";
import { asyncHandler } from "../../utils/asyncHandler";
import { BadRequestError, UnauthorizedError } from "../../utils/AppError";
import { loginSchema } from "../../validators/auth.validators";
import { signAdminToken } from "../../utils/jwt";

/**
 * Mounted at /api/v1/auth. Administrator login/session endpoints only —
 * there is no registration endpoint here by design (see
 * scripts/createAdmin.ts for how the single admin account is created).
 */
const router = Router();

// Same public shape returned by /login and /me — never includes the
// password hash (Admin's schema already excludes it by default, but this
// also keeps the response body intentionally minimal).
function toPublicAdmin(admin: AdminDocument) {
  return {
    id: admin.id as string,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    lastLoginAt: admin.lastLoginAt ?? null,
  };
}

const GENERIC_LOGIN_ERROR = "Invalid email or password.";

router.post(
  "/login",
  loginRateLimit,
  asyncHandler(async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new BadRequestError(
        parsed.error.issues[0]?.message ?? "Please fill in all required fields."
      );
    }

    const { email, password } = parsed.data;

    // password is select:false by default — opt in explicitly here since
    // this is the one place that legitimately needs the hash.
    const admin = await Admin.findOne({ email }).select("+password");

    // Identical error and status whether the email doesn't exist or the
    // password is wrong — never reveal which, so a caller can't use this
    // endpoint to enumerate whether an email has an account.
    if (!admin || !(await admin.comparePassword(password))) {
      throw new UnauthorizedError(GENERIC_LOGIN_ERROR);
    }

    admin.lastLoginAt = new Date();
    await admin.save();

    const token = signAdminToken({ sub: admin.id as string, email: admin.email });
    res.cookie(ADMIN_TOKEN_COOKIE, token, ADMIN_TOKEN_COOKIE_OPTIONS);

    res.status(200).json({ success: true, admin: toPublicAdmin(admin) });
  })
);

router.post("/logout", (_req, res) => {
  res.clearCookie(ADMIN_TOKEN_COOKIE, CLEAR_ADMIN_TOKEN_COOKIE_OPTIONS);
  res.status(200).json({ success: true, message: "Logged out." });
});

router.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    // requireAuth guarantees req.admin is set before this handler runs.
    res.status(200).json({ success: true, admin: toPublicAdmin(req.admin as AdminDocument) });
  })
);

export default router;

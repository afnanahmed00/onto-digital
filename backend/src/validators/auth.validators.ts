import { z } from "zod";

/**
 * Validates POST /api/v1/auth/login's body. Deliberately lenient on
 * `password` (no minlength/complexity check here) — that belongs to the
 * account-creation flow (see scripts/createAdmin.ts); a login attempt
 * should fail with the same generic error whether the password is short,
 * wrong, or well-formed, so this only checks it's present.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(254, "Email address is too long.")
    .email("Please enter a valid email address."),
  password: z
    .string()
    .min(1, "Please enter your password.")
    .max(200, "Password is too long."),
});

export type LoginInput = z.infer<typeof loginSchema>;

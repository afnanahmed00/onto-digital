import "dotenv/config";
import { z } from "zod";

/**
 * Validates and types every environment variable the backend reads. Fails
 * fast on startup with a clear message if a required variable is missing or
 * malformed, instead of surfacing a confusing error later at request time.
 *
 * Variables commented "later phase" aren't read by any code yet — they're
 * declared here so the modules that will need them (database, auth,
 * uploads, email) get a typed `env.X` without this file changing again.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5000),

  // Comma-separated list of allowed frontend origins — see config/cors.ts.
  CORS_ORIGIN: z.string().min(1).default("http://localhost:3000"),

  // --- Database — MongoDB Atlas (later phase) -------------------------------
  MONGODB_URI: z.string().optional(),

  // --- Authentication — admin login (Phase 5) --------------------------------
  // Required: admin auth (routes/v1/auth.routes.ts) signs/verifies sessions
  // with this. Generate one with `openssl rand -hex 32` and never commit it.
  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET must be at least 32 characters — generate one with `openssl rand -hex 32`."),
  JWT_EXPIRES_IN: z.string().default("7d"),

  // --- Image storage — Cloudinary (Phase 9) -----------------------------------
  // Required: routes/v1/uploads.routes.ts uploads/deletes admin media through
  // these. Create a free Cloudinary account and copy them from its dashboard.
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME is required."),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required."),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is required."),

  // --- Email — Resend (later phase) ------------------------------------------
  RESEND_API_KEY: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;

export const isProduction = env.NODE_ENV === "production";

/** Allowed CORS origins, parsed from the comma-separated CORS_ORIGIN var. */
export const corsOrigins = env.CORS_ORIGIN.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

import "dotenv/config";
import { z } from "zod";
import { connectDatabase, disconnectDatabase } from "../database/connection";
import { Admin } from "../models/Admin.model";

/**
 * One-time setup script that creates ONTO DIGITAL's single admin account.
 * Run manually from the CLI — it is never exposed as an API route, so there
 * is no public registration surface for this collection. Reads credentials
 * from environment variables (see .env.example) rather than source code,
 * and refuses to run again once an admin already exists, so it can't be
 * used to reset or overwrite the account by accident.
 *
 * Usage:
 *   1. Set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD in .env
 *   2. npm run create-admin
 *   3. Clear those three variables from .env — the account now lives in
 *      MongoDB; nothing further reads them.
 */
const setupSchema = z.object({
  ADMIN_NAME: z.string().trim().min(1, "ADMIN_NAME is required.").max(120).default("Admin"),
  ADMIN_EMAIL: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "ADMIN_EMAIL is required.")
    .max(254)
    .email("ADMIN_EMAIL must be a valid email address."),
  ADMIN_PASSWORD: z
    .string()
    .min(12, "ADMIN_PASSWORD must be at least 12 characters.")
    .max(200, "ADMIN_PASSWORD is too long."),
});

async function run(): Promise<void> {
  const parsed = setupSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Missing or invalid admin setup variables:");
    console.error(parsed.error.flatten().fieldErrors);
    console.error(
      "\nSet ADMIN_EMAIL and ADMIN_PASSWORD (min. 12 characters) in backend/.env, then re-run: npm run create-admin"
    );
    process.exitCode = 1;
    return;
  }

  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = parsed.data;

  await connectDatabase();

  try {
    const existingCount = await Admin.countDocuments();
    if (existingCount > 0) {
      console.error(
        "❌ An admin account already exists. This script only creates the first admin — " +
          "refusing to run again to avoid accidentally resetting an existing account."
      );
      process.exitCode = 1;
      return;
    }

    const admin = await Admin.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD, // hashed by Admin's pre-save hook — never stored or logged in plaintext
    });

    console.log(`✅ Admin account created: ${admin.email}`);
    console.log("   Now remove ADMIN_NAME/ADMIN_EMAIL/ADMIN_PASSWORD from .env.");
  } finally {
    await disconnectDatabase();
  }
}

run().catch((error) => {
  console.error("❌ Admin setup failed:", error instanceof Error ? error.message : "Unknown error");
  process.exitCode = 1;
});

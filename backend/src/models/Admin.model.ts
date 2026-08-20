import bcrypt from "bcryptjs";
import { Schema, model, type Document, type Model } from "mongoose";
import { AdminRole, type IAdmin } from "../types/admin.types";

export interface AdminDocument extends IAdmin, Document {
  /** Compares a plaintext candidate against this document's stored hash. */
  comparePassword(candidate: string): Promise<boolean>;
}

// Cost factor for bcrypt's hashing rounds — 12 is the widely-recommended
// floor for production password hashing as of 2026 hardware.
const SALT_ROUNDS = 12;

/**
 * Mongoose schema for the single ONTO DIGITAL admin account. There is no
 * public registration endpoint for this collection — accounts are only
 * ever created via `npm run create-admin` (see scripts/createAdmin.ts).
 */
const adminSchema = new Schema<AdminDocument>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
      unique: true, // also builds the lookup index login needs
    },
    password: {
      type: String,
      required: true,
      // Excluded from every query by default so a route can never
      // accidentally return it — login explicitly opts in with
      // `.select("+password")` when it needs to compare hashes.
      select: false,
    },
    profileImage: { type: String, trim: true },
    role: {
      type: String,
      enum: Object.values(AdminRole),
      default: AdminRole.ADMIN,
    },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) {
    next();
    return;
  }

  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  next();
});

adminSchema.methods.comparePassword = function comparePassword(
  this: AdminDocument,
  candidate: string
): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

// Defense in depth: even if some future query forgets `select: false`'s
// default exclusion (e.g. via `.select("+password")` for an unrelated
// reason), the hash still never survives a res.json(admin) response.
adminSchema.set("toJSON", {
  transform(_doc, ret) {
    const { password: _password, ...rest } = ret;
    return rest;
  },
});

export const Admin: Model<AdminDocument> = model<AdminDocument>("Admin", adminSchema);

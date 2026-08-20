import { z } from "zod";

/**
 * Lowercase-kebab-case only (e.g. "brand-identity-2026") — matches how the
 * Project model stores it (trim + lowercase) and how it appears in a public
 * project URL, so nothing here should need spaces, casing, or punctuation
 * other than hyphens.
 */
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// Raw per-field rules, shared between create (required, defaulted) and
// update (optional, no default — see below for why that split matters).
const titleField = z
  .string()
  .trim()
  .min(1, "Title is required.")
  .max(120, "Title is too long.");

const slugField = z
  .string()
  .trim()
  .min(1, "Slug is required.")
  .max(160, "Slug is too long.")
  .regex(
    SLUG_PATTERN,
    "Slug must be lowercase letters, numbers, and hyphens only (e.g. \"brand-identity-2026\")."
  );

const descriptionField = z
  .string()
  .trim()
  .min(1, "Description is required.")
  .max(2000, "Description is too long.");

const categoryField = z
  .string()
  .trim()
  .min(1, "Category is required.")
  .max(80, "Category is too long.");

// Accepts a full URL (Cloudinary uploads, the normal case — see
// config/cloudinary.ts) or a root-relative path (e.g. "/images/projects/p1.png"),
// so the locally-hosted images seeded from frontend/data/projects.ts (Phase 11's
// one-time import, before any admin has uploaded a replacement) remain a valid
// value to save when an admin edits an otherwise-unrelated field on one of
// those rows.
const ROOT_RELATIVE_PATH_PATTERN = /^\/[^\s]*$/;

const imageUrlField = z
  .string()
  .trim()
  .min(1, "Image URL is required.")
  .max(2048, "Image URL is too long.")
  .refine(
    (value) => ROOT_RELATIVE_PATH_PATTERN.test(value) || z.string().url().safeParse(value).success,
    "Please enter a valid image URL."
  );

// Cloudinary public ID of the image at `imageUrl`, when it came from
// POST /api/v1/uploads (see IProject.imagePublicId). Optional and
// unrestricted in format here — the namespace check that matters
// (`onto-digital/...`) happens where it's actually used to delete an asset,
// not on every save (see utils/cloudinaryImages.ts).
const imagePublicIdField = z
  .string()
  .trim()
  .max(500, "Image public ID is too long.");

const technologiesField = z
  .array(z.string().trim().min(1).max(60))
  .max(50, "Too many technologies listed.");

const websiteUrlField = z
  .string()
  .trim()
  .max(2048, "URL is too long.")
  .url("Please enter a valid URL.");

const featuredField = z.boolean({ message: "featured must be true or false." });
const publishedField = z.boolean({ message: "published must be true or false." });
const displayOrderField = z.number().finite("Display order must be a valid number.");

/**
 * POST /api/v1/projects body. `.strict()` rejects any unlisted key (e.g.
 * `_id`, `createdAt`) instead of silently ignoring it, so a caller can never
 * smuggle in a Mongo-internal field.
 */
export const createProjectSchema = z
  .object({
    title: titleField,
    slug: slugField,
    description: descriptionField,
    category: categoryField,
    imageUrl: imageUrlField,
    imagePublicId: imagePublicIdField.optional(),
    technologies: technologiesField.default([]),
    websiteUrl: websiteUrlField.optional(),
    featured: featuredField.default(false),
    published: publishedField.default(true),
    displayOrder: displayOrderField.default(0),
  })
  .strict();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

/**
 * PATCH /api/v1/projects/:id body. Every field is optional, since this is a
 * partial update — but built from the raw (non-defaulted) field schemas
 * rather than `createProjectSchema.partial()`: partial() alone still fills
 * in `.default(...)` values for keys the caller omitted, which would
 * silently reset e.g. `technologies` to `[]` on any update that didn't
 * mention it. The route additionally requires at least one key present.
 */
export const updateProjectSchema = z
  .object({
    title: titleField.optional(),
    slug: slugField.optional(),
    description: descriptionField.optional(),
    category: categoryField.optional(),
    imageUrl: imageUrlField.optional(),
    imagePublicId: imagePublicIdField.optional(),
    technologies: technologiesField.optional(),
    websiteUrl: websiteUrlField.optional(),
    featured: featuredField.optional(),
    published: publishedField.optional(),
    displayOrder: displayOrderField.optional(),
  })
  .strict();

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

/** PATCH /api/v1/projects/:id/publish body. */
export const publishProjectSchema = z
  .object({
    published: publishedField,
  })
  .strict();

/** PATCH /api/v1/projects/:id/display-order body. */
export const displayOrderSchema = z
  .object({
    displayOrder: displayOrderField,
  })
  .strict();

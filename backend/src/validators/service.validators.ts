import { z } from "zod";

/**
 * Lowercase-kebab-case only (e.g. "web-development") — matches how the
 * Service model stores it (trim + lowercase) and how it appears in a public
 * service URL, so nothing here should need spaces, casing, or punctuation
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
    "Slug must be lowercase letters, numbers, and hyphens only (e.g. \"web-development\")."
  );

const shortDescriptionField = z
  .string()
  .trim()
  .min(1, "Short description is required.")
  .max(300, "Short description is too long.");

const descriptionField = z
  .string()
  .trim()
  .min(1, "Description is required.")
  .max(3000, "Description is too long.");

const iconField = z
  .string()
  .trim()
  .min(1, "Icon is required.");

// One "highlight" item on a service — icon + short label, matches
// IServiceFeature / the serviceFeatureSchema subdocument.
const featureField = z
  .object({
    icon: z.string().trim().min(1, "Feature icon is required."),
    label: z.string().trim().min(1, "Feature label is required.").max(80, "Feature label is too long."),
  })
  .strict();

const featuresField = z
  .array(featureField)
  .max(50, "Too many features listed.");

const whatYouGetField = z
  .array(z.string().trim().min(1).max(300))
  .max(50, "Too many \"what you get\" items listed.");

const technologiesField = z
  .array(z.string().trim().min(1).max(60))
  .max(50, "Too many technologies listed.");

const publishedField = z.boolean({ message: "published must be true or false." });
const displayOrderField = z.number().finite("Display order must be a valid number.");

/**
 * POST /api/v1/services body. `.strict()` rejects any unlisted key (e.g.
 * `_id`, `createdAt`) instead of silently ignoring it, so a caller can never
 * smuggle in a Mongo-internal field.
 */
export const createServiceSchema = z
  .object({
    title: titleField,
    slug: slugField,
    shortDescription: shortDescriptionField,
    description: descriptionField,
    icon: iconField,
    features: featuresField.default([]),
    whatYouGet: whatYouGetField.default([]),
    technologies: technologiesField.default([]),
    published: publishedField.default(true),
    displayOrder: displayOrderField.default(0),
  })
  .strict();

export type CreateServiceInput = z.infer<typeof createServiceSchema>;

/**
 * PATCH /api/v1/services/:id body. Every field is optional, since this is a
 * partial update — but built from the raw (non-defaulted) field schemas
 * rather than `createServiceSchema.partial()`: partial() alone still fills
 * in `.default(...)` values for keys the caller omitted, which would
 * silently reset e.g. `technologies` to `[]` on any update that didn't
 * mention it. The route additionally requires at least one key present.
 */
export const updateServiceSchema = z
  .object({
    title: titleField.optional(),
    slug: slugField.optional(),
    shortDescription: shortDescriptionField.optional(),
    description: descriptionField.optional(),
    icon: iconField.optional(),
    features: featuresField.optional(),
    whatYouGet: whatYouGetField.optional(),
    technologies: technologiesField.optional(),
    published: publishedField.optional(),
    displayOrder: displayOrderField.optional(),
  })
  .strict();

export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;

/** PATCH /api/v1/services/:id/publish body. */
export const publishServiceSchema = z
  .object({
    published: publishedField,
  })
  .strict();

/** PATCH /api/v1/services/:id/display-order body. */
export const displayOrderSchema = z
  .object({
    displayOrder: displayOrderField,
  })
  .strict();

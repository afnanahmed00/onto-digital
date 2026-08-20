import { z } from "zod";
import { LeadStatus } from "../types/lead.types";

// Pagination caps — keeps a single request from forcing an unbounded scan
// (e.g. ?limit=999999) while still letting the future admin dashboard page
// through the full lead list.
const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 20;

const LEAD_STATUS_VALUES = Object.values(LeadStatus) as [LeadStatus, ...LeadStatus[]];

const statusField = z.enum(LEAD_STATUS_VALUES, { message: "Invalid lead status." });

/**
 * GET /api/v1/leads query params. Query values arrive as strings, so
 * page/limit use `z.coerce.number()`. `.strict()` isn't used here since
 * Express query parsing can surprise with array-shaped values for repeated
 * keys — unknown keys are simply ignored rather than erroring.
 */
export const listLeadsQuerySchema = z.object({
  status: statusField.optional(),
  page: z.coerce.number("Page must be a number.").int("Page must be a whole number.").min(1).default(1),
  limit: z.coerce
    .number("Limit must be a number.")
    .int("Limit must be a whole number.")
    .min(1)
    .max(MAX_PAGE_SIZE, `Limit cannot exceed ${MAX_PAGE_SIZE}.`)
    .default(DEFAULT_PAGE_SIZE),
  sort: z.enum(["newest", "oldest"], { message: 'sort must be "newest" or "oldest".' }).default("newest"),
});

export type ListLeadsQuery = z.infer<typeof listLeadsQuerySchema>;

// Raw per-field rules for correcting lead-submitted details. All optional
// on update since this is always a partial edit (see updateLeadSchema).
const fullNameField = z
  .string()
  .trim()
  .min(1, "Full name is required.")
  .max(120, "Full name is too long.");

const emailField = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .max(254, "Email is too long.")
  .email("Please enter a valid email address.");

const phoneField = z
  .string()
  .trim()
  // E.164: leading "+" then 8–15 digits — matches the Lead model's own
  // validation and PhoneField's output.
  .regex(/^\+[1-9]\d{7,14}$/, "Phone must be a valid international number (e.g. +917036431874).");

const companyField = z.string().trim().max(120, "Company name is too long.");
const serviceField = z.string().trim().min(1, "Service is required.").max(80, "Service is too long.");
const budgetField = z.string().trim().max(30, "Budget is too long.");
const projectDetailsField = z.string().trim().max(5000, "Project details are too long.");

/**
 * PATCH /api/v1/leads/:id body. Every field optional (partial update); the
 * route additionally requires at least one key present. `.strict()` rejects
 * any unlisted key (e.g. `_id`, `createdAt`) instead of silently ignoring it.
 */
export const updateLeadSchema = z
  .object({
    fullName: fullNameField.optional(),
    email: emailField.optional(),
    phone: phoneField.optional(),
    company: companyField.optional(),
    service: serviceField.optional(),
    budget: budgetField.optional(),
    projectDetails: projectDetailsField.optional(),
    status: statusField.optional(),
  })
  .strict();

export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;

/** PATCH /api/v1/leads/:id/status body — dedicated status-only transition. */
export const updateLeadStatusSchema = z
  .object({
    status: statusField,
  })
  .strict();

/**
 * POST /api/v1/contact body — the public, unauthenticated lead-creation
 * endpoint the frontend's /api/contact route (Resend) calls server-to-server
 * after a visitor submits ContactForm. Deliberately has no `status` field:
 * a new lead always starts at LeadStatus.NEW (set by the route handler, not
 * the caller) and `.strict()` rejects any unlisted key outright — including
 * a spoofed `status` — instead of silently ignoring it, so this endpoint can
 * never be used to set a lead's pipeline stage.
 */
export const createLeadSchema = z
  .object({
    fullName: fullNameField,
    email: emailField,
    phone: phoneField,
    company: companyField.optional(),
    service: serviceField,
    budget: budgetField.optional(),
    projectDetails: projectDetailsField.optional(),
  })
  .strict();

export type CreateLeadInput = z.infer<typeof createLeadSchema>;

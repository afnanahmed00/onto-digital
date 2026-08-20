import { Router } from "express";
import { contactRateLimit } from "../../middleware/contactRateLimit";
import { Lead } from "../../models/Lead.model";
import { LeadStatus } from "../../types/lead.types";
import { asyncHandler } from "../../utils/asyncHandler";
import { BadRequestError } from "../../utils/AppError";
import { createLeadSchema } from "../../validators/lead.validators";

/**
 * Mounted at /api/v1/contact. The one intentionally public, unauthenticated
 * route in the API — everything under /api/v1/leads (routes/v1/leads.routes.ts)
 * stays admin-only via requireAuth. This router exists solely so the
 * frontend's own /api/contact route handler (Resend email, run server-side
 * only — never in the browser) can also persist the submission as a Lead;
 * the browser itself never calls this endpoint or touches MongoDB directly.
 *
 * Deliberately minimal: POST-only (create), nothing here can read, update,
 * or delete an existing lead, and every field is validated against the same
 * createLeadSchema/Lead model the admin routes use. Abuse protection is
 * layered: the frontend rate-limits per real visitor IP before it ever
 * calls this, and contactRateLimit below adds a coarser IP-based backstop
 * here too.
 */
const router = Router();

// A visitor double-clicking submit, or the frontend retrying a slow/failed
// request, would otherwise create two identical leads a few seconds apart.
// Treating a matching (email, phone) submission within this window as the
// same inquiry avoids that without needing an idempotency-key header or any
// new infrastructure — a plain query against the existing collection.
const DUPLICATE_WINDOW_MS = 60 * 1000; // 1 minute

router.post(
  "/",
  contactRateLimit,
  asyncHandler(async (req, res) => {
    const parsed = createLeadSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new BadRequestError(
        parsed.error.issues[0]?.message ?? "Invalid lead data."
      );
    }

    const { fullName, email, phone, company, service, budget, projectDetails } = parsed.data;

    const duplicate = await Lead.findOne({
      email,
      phone,
      createdAt: { $gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
    }).sort({ createdAt: -1 });

    if (duplicate) {
      res.status(200).json({ success: true, id: duplicate.id as string });
      return;
    }

    // Optional fields are only included when non-empty so an unset field
    // persists as `undefined` (omitted from the document) rather than an
    // empty string — matching what the admin dashboard already expects
    // (LeadsTable.tsx/LeadDetailModal.tsx render `lead.company ?? "—"`,
    // which only falls back to the placeholder for a genuinely absent
    // value, not an empty string).
    const lead = await Lead.create({
      fullName,
      email,
      phone,
      ...(company ? { company } : {}),
      service,
      ...(budget ? { budget } : {}),
      ...(projectDetails ? { projectDetails } : {}),
      status: LeadStatus.NEW,
    });

    res.status(201).json({ success: true, id: lead.id as string });
  })
);

export default router;

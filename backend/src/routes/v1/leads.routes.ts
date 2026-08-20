import { Router } from "express";
import { isValidObjectId } from "mongoose";
import { requireAuth } from "../../middleware/requireAuth";
import { Lead, type LeadDocument } from "../../models/Lead.model";
import { BadRequestError, NotFoundError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  listLeadsQuerySchema,
  updateLeadSchema,
  updateLeadStatusSchema,
} from "../../validators/lead.validators";

/**
 * Mounted at /api/v1/leads. Admin-only management of contact/quote inquiries
 * — the frontend's own /api/contact route (Resend) still handles submission
 * and delivery unchanged; this router only reads/updates what's already
 * persisted to the `leads` collection. Every route here requires an admin
 * session, so `requireAuth` is applied once for the whole router rather than
 * per-route as in projects/services.routes.ts.
 */
const router = Router();
router.use(requireAuth);

const NOT_FOUND_MESSAGE = "Lead not found.";

// Admin-facing shape of a lead — omits Mongoose's `__v`, same convention as
// projects/services.routes.ts's toPublic* helpers. Nothing here is hidden
// from the admin (unlike Admin.model.ts's password), since every route in
// this file already requires an authenticated admin session.
function toLeadResponse(lead: LeadDocument) {
  return {
    id: lead.id as string,
    fullName: lead.fullName,
    email: lead.email,
    phone: lead.phone,
    company: lead.company ?? null,
    service: lead.service,
    budget: lead.budget ?? null,
    projectDetails: lead.projectDetails ?? null,
    status: lead.status,
    createdAt: lead.createdAt,
    updatedAt: lead.updatedAt,
  };
}

function firstIssueMessage(error: { issues: { message: string }[] }, fallback: string): string {
  return error.issues[0]?.message ?? fallback;
}

// GET /api/v1/leads — paginated list, newest-first by default. Supports
// ?status=NEW to filter by pipeline stage and ?sort=oldest to flip order.
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const parsed = listLeadsQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      throw new BadRequestError(firstIssueMessage(parsed.error, "Invalid query parameters."));
    }
    const { status, page, limit, sort } = parsed.data;

    const filter = status ? { status } : {};
    const sortOrder: 1 | -1 = sort === "oldest" ? 1 : -1;
    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      Lead.find(filter).sort({ createdAt: sortOrder }).skip(skip).limit(limit),
      Lead.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      leads: leads.map(toLeadResponse),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    });
  })
);

// GET /api/v1/leads/:id — single lead by Mongo _id.
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw new NotFoundError(NOT_FOUND_MESSAGE);

    const lead = await Lead.findById(id);
    if (!lead) throw new NotFoundError(NOT_FOUND_MESSAGE);

    res.status(200).json({ success: true, lead: toLeadResponse(lead) });
  })
);

// PATCH /api/v1/leads/:id — partial update of lead details (correcting a
// typo'd email, filling in project details from a follow-up call, etc.),
// status included since editing it here is equally valid to the dedicated
// endpoint below.
router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw new NotFoundError(NOT_FOUND_MESSAGE);

    const parsed = updateLeadSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new BadRequestError(firstIssueMessage(parsed.error, "Invalid lead data."));
    }
    if (Object.keys(parsed.data).length === 0) {
      throw new BadRequestError("Provide at least one field to update.");
    }

    const lead = await Lead.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    });
    if (!lead) throw new NotFoundError(NOT_FOUND_MESSAGE);

    res.status(200).json({ success: true, lead: toLeadResponse(lead) });
  })
);

// PATCH /api/v1/leads/:id/status — dedicated status transition, so the
// future admin dashboard's pipeline view (drag between columns, quick-action
// buttons) can send just `{ status }` instead of a full lead payload.
router.patch(
  "/:id/status",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw new NotFoundError(NOT_FOUND_MESSAGE);

    const parsed = updateLeadStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new BadRequestError(firstIssueMessage(parsed.error, "Invalid lead status."));
    }

    const lead = await Lead.findByIdAndUpdate(
      id,
      { status: parsed.data.status },
      { new: true, runValidators: true }
    );
    if (!lead) throw new NotFoundError(NOT_FOUND_MESSAGE);

    res.status(200).json({ success: true, lead: toLeadResponse(lead) });
  })
);

// DELETE /api/v1/leads/:id — permanent delete.
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw new NotFoundError(NOT_FOUND_MESSAGE);

    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) throw new NotFoundError(NOT_FOUND_MESSAGE);

    res.status(200).json({ success: true, message: "Lead deleted." });
  })
);

export default router;

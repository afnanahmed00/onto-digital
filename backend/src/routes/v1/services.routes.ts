import { Router } from "express";
import { isValidObjectId } from "mongoose";
import { getOptionalAdmin, requireAuth } from "../../middleware/requireAuth";
import { Service, type ServiceDocument } from "../../models/Service.model";
import { AppError, BadRequestError, ConflictError, NotFoundError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  createServiceSchema,
  displayOrderSchema,
  publishServiceSchema,
  updateServiceSchema,
} from "../../validators/service.validators";

/**
 * Mounted at /api/v1/services. Public reads (list/detail) live alongside
 * admin-only writes (create/update/delete/publish/reorder) in this one
 * router — `requireAuth` on individual routes is what draws the line
 * between them, matching how projects.routes.ts mixes public and protected
 * routes in a single file.
 */
const router = Router();

const NOT_FOUND_MESSAGE = "Service not found.";

// Public shape of a service — omits Mongoose's `__v` and exposes `_id` as a
// plain string `id`, same convention as projects.routes.ts's toPublicProject.
function toPublicService(service: ServiceDocument) {
  return {
    id: service.id as string,
    title: service.title,
    slug: service.slug,
    shortDescription: service.shortDescription,
    description: service.description,
    icon: service.icon,
    features: service.features,
    whatYouGet: service.whatYouGet,
    technologies: service.technologies,
    published: service.published,
    displayOrder: service.displayOrder,
    createdAt: service.createdAt,
    updatedAt: service.updatedAt,
  };
}

function firstIssueMessage(error: { issues: { message: string }[] }, fallback: string): string {
  return error.issues[0]?.message ?? fallback;
}

// True for a MongoDB duplicate-key error (E11000) — the race-condition case
// where two requests slip past the pre-write findOne slug check at once.
function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: number }).code === 11000
  );
}

function duplicateSlugError(slug: string): ConflictError {
  return new ConflictError(`A service with slug "${slug}" already exists.`);
}

// --- Public reads -----------------------------------------------------------

// GET /api/v1/services — published services only for anonymous callers;
// an authenticated admin also sees unpublished drafts (still admin-only
// data, just not gated behind requireAuth since nothing here is a write).
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const admin = await getOptionalAdmin(req);
    const filter = admin ? {} : { published: true };

    const services = await Service.find(filter).sort({ displayOrder: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      count: services.length,
      services: services.map(toPublicService),
    });
  })
);

// GET /api/v1/services/:identifier — lookup by slug, or by Mongo _id for
// convenience (e.g. an admin dashboard linking straight from a list row).
// An unpublished service 404s for anonymous callers exactly as if it didn't
// exist, so this endpoint never confirms a draft's existence to the public.
router.get(
  "/:identifier",
  asyncHandler(async (req, res) => {
    const { identifier } = req.params ?? {};
    const query = isValidObjectId(identifier)
      ? { _id: identifier }
      : { slug: identifier?.toLowerCase() };

    const service = await Service.findOne(query);
    if (!service) throw new NotFoundError(NOT_FOUND_MESSAGE);

    if (!service.published) {
      const admin = await getOptionalAdmin(req);
      if (!admin) throw new NotFoundError(NOT_FOUND_MESSAGE);
    }

    res.status(200).json({ success: true, service: toPublicService(service) });
  })
);

// --- Admin writes (requireAuth) ---------------------------------------------

// POST /api/v1/services — create.
router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const parsed = createServiceSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new BadRequestError(
        firstIssueMessage(parsed.error, "Please fill in all required fields.")
      );
    }

    const existing = await Service.findOne({ slug: parsed.data.slug });
    if (existing) throw duplicateSlugError(parsed.data.slug);

    try {
      const service = await Service.create(parsed.data);
      res.status(201).json({ success: true, service: toPublicService(service) });
    } catch (error) {
      if (isDuplicateKeyError(error)) throw duplicateSlugError(parsed.data.slug);
      throw error;
    }
  })
);

// PATCH /api/v1/services/:id — partial update. Keyed by Mongo _id (not
// slug) so editing the slug itself is unambiguous and doesn't change which
// URL the client must call next.
router.patch(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw new NotFoundError(NOT_FOUND_MESSAGE);

    const parsed = updateServiceSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new BadRequestError(firstIssueMessage(parsed.error, "Invalid service data."));
    }
    if (Object.keys(parsed.data).length === 0) {
      throw new BadRequestError("Provide at least one field to update.");
    }

    if (parsed.data.slug) {
      const conflict = await Service.findOne({ slug: parsed.data.slug, _id: { $ne: id } });
      if (conflict) throw duplicateSlugError(parsed.data.slug);
    }

    try {
      const service = await Service.findByIdAndUpdate(id, parsed.data, {
        new: true,
        runValidators: true,
      });
      if (!service) throw new NotFoundError(NOT_FOUND_MESSAGE);
      res.status(200).json({ success: true, service: toPublicService(service) });
    } catch (error) {
      if (error instanceof AppError) throw error;
      if (isDuplicateKeyError(error) && parsed.data.slug) throw duplicateSlugError(parsed.data.slug);
      throw error;
    }
  })
);

// DELETE /api/v1/services/:id — permanent delete.
router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw new NotFoundError(NOT_FOUND_MESSAGE);

    const service = await Service.findByIdAndDelete(id);
    if (!service) throw new NotFoundError(NOT_FOUND_MESSAGE);

    res.status(200).json({ success: true, message: "Service deleted." });
  })
);

// PATCH /api/v1/services/:id/publish — dedicated publish/unpublish toggle,
// separate from the general update so flipping visibility never has to go
// through full service validation.
router.patch(
  "/:id/publish",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw new NotFoundError(NOT_FOUND_MESSAGE);

    const parsed = publishServiceSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new BadRequestError(firstIssueMessage(parsed.error, "published must be true or false."));
    }

    const service = await Service.findByIdAndUpdate(
      id,
      { published: parsed.data.published },
      { new: true, runValidators: true }
    );
    if (!service) throw new NotFoundError(NOT_FOUND_MESSAGE);

    res.status(200).json({ success: true, service: toPublicService(service) });
  })
);

// PATCH /api/v1/services/:id/display-order — dedicated reorder endpoint, so
// the future admin dashboard's drag-and-drop reorder can send one small
// request per row instead of a full service payload.
router.patch(
  "/:id/display-order",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw new NotFoundError(NOT_FOUND_MESSAGE);

    const parsed = displayOrderSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new BadRequestError(firstIssueMessage(parsed.error, "displayOrder must be a valid number."));
    }

    const service = await Service.findByIdAndUpdate(
      id,
      { displayOrder: parsed.data.displayOrder },
      { new: true, runValidators: true }
    );
    if (!service) throw new NotFoundError(NOT_FOUND_MESSAGE);

    res.status(200).json({ success: true, service: toPublicService(service) });
  })
);

export default router;

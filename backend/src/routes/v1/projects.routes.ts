import { Router } from "express";
import { isValidObjectId } from "mongoose";
import { getOptionalAdmin, requireAuth } from "../../middleware/requireAuth";
import { Project, type ProjectDocument } from "../../models/Project.model";
import { AppError, BadRequestError, ConflictError, NotFoundError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import { deleteCloudinaryImage } from "../../utils/cloudinaryImages";
import {
  createProjectSchema,
  displayOrderSchema,
  publishProjectSchema,
  updateProjectSchema,
} from "../../validators/project.validators";

/**
 * Mounted at /api/v1/projects. Public reads (list/detail) live alongside
 * admin-only writes (create/update/delete/publish/reorder) in this one
 * router — `requireAuth` on individual routes is what draws the line
 * between them, matching how auth.routes.ts mixes public and protected
 * routes in a single file.
 */
const router = Router();

const NOT_FOUND_MESSAGE = "Project not found.";

// Public shape of a project — omits Mongoose's `__v` and exposes `_id` as a
// plain string `id`, same convention as auth.routes.ts's toPublicAdmin.
function toPublicProject(project: ProjectDocument) {
  return {
    id: project.id as string,
    title: project.title,
    slug: project.slug,
    description: project.description,
    category: project.category,
    imageUrl: project.imageUrl,
    imagePublicId: project.imagePublicId ?? null,
    technologies: project.technologies,
    websiteUrl: project.websiteUrl ?? null,
    featured: project.featured,
    published: project.published,
    displayOrder: project.displayOrder,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
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
  return new ConflictError(`A project with slug "${slug}" already exists.`);
}

// --- Public reads -----------------------------------------------------------

// GET /api/v1/projects — published projects only for anonymous callers;
// an authenticated admin also sees unpublished drafts (still admin-only
// data, just not gated behind requireAuth since nothing here is a write).
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const admin = await getOptionalAdmin(req);
    const filter = admin ? {} : { published: true };

    const projects = await Project.find(filter).sort({ displayOrder: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects: projects.map(toPublicProject),
    });
  })
);

// GET /api/v1/projects/:identifier — lookup by slug, or by Mongo _id for
// convenience (e.g. an admin dashboard linking straight from a list row).
// An unpublished project 404s for anonymous callers exactly as if it didn't
// exist, so this endpoint never confirms a draft's existence to the public.
router.get(
  "/:identifier",
  asyncHandler(async (req, res) => {
    const { identifier } = req.params ?? {};
    const query = isValidObjectId(identifier)
      ? { _id: identifier }
      : { slug: identifier?.toLowerCase() };

    const project = await Project.findOne(query);
    if (!project) throw new NotFoundError(NOT_FOUND_MESSAGE);

    if (!project.published) {
      const admin = await getOptionalAdmin(req);
      if (!admin) throw new NotFoundError(NOT_FOUND_MESSAGE);
    }

    res.status(200).json({ success: true, project: toPublicProject(project) });
  })
);

// --- Admin writes (requireAuth) ---------------------------------------------

// POST /api/v1/projects — create.
router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const parsed = createProjectSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new BadRequestError(
        firstIssueMessage(parsed.error, "Please fill in all required fields.")
      );
    }

    const existing = await Project.findOne({ slug: parsed.data.slug });
    if (existing) throw duplicateSlugError(parsed.data.slug);

    try {
      const project = await Project.create(parsed.data);
      res.status(201).json({ success: true, project: toPublicProject(project) });
    } catch (error) {
      if (isDuplicateKeyError(error)) throw duplicateSlugError(parsed.data.slug);
      throw error;
    }
  })
);

// PATCH /api/v1/projects/:id — partial update. Keyed by Mongo _id (not
// slug) so editing the slug itself is unambiguous and doesn't change which
// URL the client must call next.
router.patch(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw new NotFoundError(NOT_FOUND_MESSAGE);

    const parsed = updateProjectSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new BadRequestError(firstIssueMessage(parsed.error, "Invalid project data."));
    }
    if (Object.keys(parsed.data).length === 0) {
      throw new BadRequestError("Provide at least one field to update.");
    }

    if (parsed.data.slug) {
      const conflict = await Project.findOne({ slug: parsed.data.slug, _id: { $ne: id } });
      if (conflict) throw duplicateSlugError(parsed.data.slug);
    }

    try {
      const project = await Project.findByIdAndUpdate(id, parsed.data, {
        new: true,
        runValidators: true,
      });
      if (!project) throw new NotFoundError(NOT_FOUND_MESSAGE);
      res.status(200).json({ success: true, project: toPublicProject(project) });
    } catch (error) {
      if (error instanceof AppError) throw error;
      if (isDuplicateKeyError(error) && parsed.data.slug) throw duplicateSlugError(parsed.data.slug);
      throw error;
    }
  })
);

// DELETE /api/v1/projects/:id — permanent delete. Also removes the
// project's Cloudinary image, if it has one, once the MongoDB document is
// gone — see utils/cloudinaryImages.ts. That cleanup is strictly
// best-effort: a project with no image, an image that's already missing
// from Cloudinary, or any other Cloudinary-side failure must never stop the
// deletion from completing or leak an internal error back to the admin —
// the document is already gone by the time it's attempted.
router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw new NotFoundError(NOT_FOUND_MESSAGE);

    const project = await Project.findByIdAndDelete(id);
    if (!project) throw new NotFoundError(NOT_FOUND_MESSAGE);

    if (project.imagePublicId) {
      const outcome = await deleteCloudinaryImage(project.imagePublicId);
      if (outcome === "failed" || outcome === "outside_namespace") {
        // Logged for operator visibility only — the project is already
        // deleted, so this never becomes a client-facing error.
        console.warn(
          `⚠️  Project ${project.id} deleted, but its Cloudinary image (${project.imagePublicId}) was not: ${outcome}.`
        );
      }
    }

    res.status(200).json({ success: true, message: "Project deleted." });
  })
);

// PATCH /api/v1/projects/:id/publish — dedicated publish/unpublish toggle,
// separate from the general update so flipping visibility never has to go
// through full project validation.
router.patch(
  "/:id/publish",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw new NotFoundError(NOT_FOUND_MESSAGE);

    const parsed = publishProjectSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new BadRequestError(firstIssueMessage(parsed.error, "published must be true or false."));
    }

    const project = await Project.findByIdAndUpdate(
      id,
      { published: parsed.data.published },
      { new: true, runValidators: true }
    );
    if (!project) throw new NotFoundError(NOT_FOUND_MESSAGE);

    res.status(200).json({ success: true, project: toPublicProject(project) });
  })
);

// PATCH /api/v1/projects/:id/display-order — dedicated reorder endpoint, so
// the future admin dashboard's drag-and-drop reorder can send one small
// request per row instead of a full project payload.
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

    const project = await Project.findByIdAndUpdate(
      id,
      { displayOrder: parsed.data.displayOrder },
      { new: true, runValidators: true }
    );
    if (!project) throw new NotFoundError(NOT_FOUND_MESSAGE);

    res.status(200).json({ success: true, project: toPublicProject(project) });
  })
);

export default router;

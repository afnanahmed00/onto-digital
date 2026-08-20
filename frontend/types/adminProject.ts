/**
 * Mirrors the backend's toPublicProject() shape (backend/src/routes/v1/projects.routes.ts).
 * Deliberately separate from types/project.ts (the public gallery's `Project`
 * type — name/image/isPublished/size) which Phase 10.2 does not touch: this
 * is the admin dashboard's own view of the same underlying data.
 */
export type AdminProject = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  imageUrl: string;
  /** Cloudinary public ID behind `imageUrl`, when it came from the uploader — null for a legacy/manually-entered image URL. */
  imagePublicId: string | null;
  technologies: string[];
  websiteUrl: string | null;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

/**
 * Body sent to POST /api/v1/projects and PATCH /api/v1/projects/:id.
 * `websiteUrl` is omitted (not sent as "") when blank — the backend's Zod
 * schema treats an empty string as an invalid URL, not "no value" (see
 * backend/src/validators/project.validators.ts).
 */
export type ProjectFormValues = {
  title: string;
  slug: string;
  description: string;
  category: string;
  imageUrl: string;
  imagePublicId?: string;
  technologies: string[];
  websiteUrl?: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
};

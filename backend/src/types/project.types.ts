/**
 * Shape of a portfolio project, independent of Mongoose. Used by the
 * Project model and, later, by the projects API and admin dashboard.
 */
export interface IProject {
  title: string;
  slug: string;
  description: string;
  category: string;
  /**
   * URL of the project's cover image/media. MongoDB only ever stores this
   * URL — the actual file lives in Cloudinary once uploads are wired up
   * (see uploads.routes.ts, a later phase).
   */
  imageUrl: string;
  /**
   * Cloudinary public ID of `imageUrl`'s asset (e.g.
   * "onto-digital/projects/abc123"), when it was uploaded through
   * POST /api/v1/uploads — absent for the legacy/seeded projects whose
   * `imageUrl` is a local path (see backend/src/scripts/seedProjects.ts).
   * Stored explicitly (never derived from the URL) so a project or image
   * replacement can reliably delete the matching Cloudinary asset — see
   * projects.routes.ts's DELETE handler and utils/cloudinaryImages.ts.
   */
  imagePublicId?: string;
  technologies: string[];
  websiteUrl?: string;
  featured: boolean;
  /** Controls public visibility — unpublished projects are admin-only drafts. */
  published: boolean;
  /** Manual sort order for the public gallery; lower shows first. */
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

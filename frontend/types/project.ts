/**
 * Layout footprint a card occupies in the masonry gallery. Controls grid
 * row-span (and, for "large", column-span on wide screens) — see the
 * SIZE_SPAN_CLASSES map in ProjectCard.tsx. Independent of `featured`,
 * which is a visual emphasis flag rather than a layout size.
 */
export type ProjectSize = "small" | "medium" | "large";

/**
 * A single portfolio project.
 *
 * This is the shape the future admin panel/API is expected to produce.
 * `category` is intentionally a plain string (not a fixed union) so new
 * categories created in an admin panel don't require a frontend code
 * change — the gallery derives its filter list from whatever categories
 * are actually present in the data (see getProjectCategories in
 * services/projects.ts).
 */
export interface Project {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  websiteUrl: string;
  technologies: string[];
  /** Visual emphasis only (e.g. accent ring) — does not affect grid span. */
  featured: boolean;
  size: ProjectSize;
  /** Lower sorts first. Missing values fall back to the array's original order. */
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
  /** Defaults to true when omitted — lets an admin unpublish without deleting. */
  isPublished?: boolean;
}

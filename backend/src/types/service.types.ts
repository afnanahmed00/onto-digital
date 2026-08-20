/**
 * One "highlight" item on a service (icon + short label) — mirrors
 * frontend/data/services.ts' ServiceFeature, but the icon is stored as a
 * string name here since Mongoose documents can't hold component references.
 */
export interface IServiceFeature {
  /** Lucide icon name, e.g. "Smartphone" — resolved to a component on the frontend. */
  icon: string;
  label: string;
}

/**
 * Shape of a service-catalog entry, independent of Mongoose. Used by the
 * Service model and, later, by the services API and admin dashboard.
 */
export interface IService {
  title: string;
  slug: string;
  /** Lead paragraph shown on the service card / collection view. */
  shortDescription: string;
  /** Full supporting copy shown on the service detail page. */
  description: string;
  /** Lucide icon name shown on the service card. */
  icon: string;
  /** Highlight items rendered as icon + label. */
  features: IServiceFeature[];
  /** "What You Get" checklist. */
  whatYouGet: string[];
  technologies: string[];
  /** Controls public visibility — unpublished services are admin-only drafts. */
  published: boolean;
  /** Manual sort order for the public services list; lower shows first. */
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

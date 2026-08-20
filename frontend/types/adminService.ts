/**
 * Mirrors the backend's toPublicService() shape (backend/src/routes/v1/services.routes.ts).
 * Deliberately separate from frontend/data/services.ts's static `Service` type (the public
 * site's current stand-in, untouched by Phase 10.3) — this is the admin dashboard's own view
 * of the same underlying data, same convention as types/adminProject.ts.
 */
export type AdminServiceFeature = {
  /** Lucide icon name, e.g. "Smartphone" — stored as a string, not a component reference. */
  icon: string;
  label: string;
};

export type AdminService = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: AdminServiceFeature[];
  whatYouGet: string[];
  technologies: string[];
  published: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

/** Body sent to POST /api/v1/services and PATCH /api/v1/services/:id. */
export type ServiceFormValues = {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: AdminServiceFeature[];
  whatYouGet: string[];
  technologies: string[];
  published: boolean;
  displayOrder: number;
};

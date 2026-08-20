/**
 * Mirrors the backend's toLeadResponse() shape (backend/src/routes/v1/leads.routes.ts)
 * and LeadStatus enum (backend/src/types/lead.types.ts). Same convention as
 * types/adminProject.ts / types/adminService.ts — the admin dashboard's own view of
 * data the public /api/contact route persists via the Lead model.
 */
export type LeadStatus = "NEW" | "CONTACTED" | "IN_PROGRESS" | "CONVERTED" | "CLOSED";

export const LEAD_STATUSES: LeadStatus[] = [
  "NEW",
  "CONTACTED",
  "IN_PROGRESS",
  "CONVERTED",
  "CLOSED",
];

export type AdminLead = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string | null;
  service: string;
  budget: string | null;
  projectDetails: string | null;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
};

/** Body sent to PATCH /api/v1/leads/:id — the admin-editable subset (status changes go through the dedicated /status endpoint instead). */
export type LeadFormValues = {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  budget?: string;
  projectDetails?: string;
};

export type LeadSort = "newest" | "oldest";

/** Mirrors listLeadsQuerySchema's response `pagination` object (backend/src/validators/lead.validators.ts). */
export type LeadPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

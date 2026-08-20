import type { LeadStatus } from "./adminLead";

/** Mirrors the backend's `stats` shape (backend/src/routes/v1/dashboard.routes.ts). */
export type DashboardStats = {
  totalProjects: number;
  publishedProjects: number;
  totalServices: number;
  publishedServices: number;
  newLeads: number;
};

/**
 * Trimmed lead shape for the dashboard's Recent Leads section only — a
 * subset of AdminLead (types/adminLead.ts), which the full /admin/leads
 * screen uses instead.
 */
export type DashboardRecentLead = {
  id: string;
  fullName: string;
  email: string;
  service: string;
  status: LeadStatus;
  createdAt: string;
};

/** Body of GET /api/v1/dashboard/stats. */
export type DashboardStatsData = {
  stats: DashboardStats;
  recentLeads: DashboardRecentLead[];
};

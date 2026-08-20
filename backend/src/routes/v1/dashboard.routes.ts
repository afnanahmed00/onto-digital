import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth";
import { Lead, type LeadDocument } from "../../models/Lead.model";
import { Project } from "../../models/Project.model";
import { Service } from "../../models/Service.model";
import { LeadStatus } from "../../types/lead.types";
import { asyncHandler } from "../../utils/asyncHandler";

/**
 * Mounted at /api/v1/dashboard. Read-only summary for the admin dashboard's
 * overview screen — every route here requires an admin session (same
 * `router.use(requireAuth)` convention as leads.routes.ts), and nothing here
 * accepts a body or mutates anything; it only aggregates what
 * projects.routes.ts/services.routes.ts/leads.routes.ts already own.
 */
const router = Router();
router.use(requireAuth);

// "A small number of newest leads" for the dashboard's Recent Leads section
// — the full lead list with filtering/sorting/pagination lives at
// /admin/leads (leads.routes.ts) already.
const RECENT_LEADS_LIMIT = 5;

// Deliberately smaller than leads.routes.ts's toLeadResponse: this summary
// endpoint is dashboard-focused, so it only returns what a "Recent Leads"
// list actually renders (name, service, status, when) — not phone, company,
// budget, or projectDetails.
function toRecentLead(lead: LeadDocument) {
  return {
    id: lead.id as string,
    fullName: lead.fullName,
    email: lead.email,
    service: lead.service,
    status: lead.status,
    createdAt: lead.createdAt,
  };
}

router.get(
  "/stats",
  asyncHandler(async (_req, res) => {
    const [
      totalProjects,
      publishedProjects,
      totalServices,
      publishedServices,
      newLeads,
      recentLeads,
    ] = await Promise.all([
      Project.countDocuments({}),
      Project.countDocuments({ published: true }),
      Service.countDocuments({}),
      Service.countDocuments({ published: true }),
      Lead.countDocuments({ status: LeadStatus.NEW }),
      Lead.find().sort({ createdAt: -1 }).limit(RECENT_LEADS_LIMIT),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalProjects,
        publishedProjects,
        totalServices,
        publishedServices,
        newLeads,
      },
      recentLeads: recentLeads.map(toRecentLead),
    });
  })
);

export default router;

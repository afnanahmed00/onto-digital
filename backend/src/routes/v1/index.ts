import { Router } from "express";
import authRoutes from "./auth.routes";
import contactRoutes from "./contact.routes";
import dashboardRoutes from "./dashboard.routes";
import leadsRoutes from "./leads.routes";
import projectsRoutes from "./projects.routes";
import servicesRoutes from "./services.routes";
import uploadsRoutes from "./uploads.routes";

/**
 * Aggregates every v1 feature router under a single mount point. Adding a
 * new feature (e.g. "testimonials") means creating testimonials.routes.ts
 * next to these and adding one line here — nothing else in the app changes.
 */
const router = Router();

router.use("/auth", authRoutes);
router.use("/projects", projectsRoutes);
router.use("/services", servicesRoutes);
router.use("/leads", leadsRoutes);
router.use("/uploads", uploadsRoutes);
router.use("/dashboard", dashboardRoutes);
// Public lead-creation only — see contact.routes.ts. Kept as its own router
// (rather than a route inside leads.routes.ts) so it never inherits that
// router's `router.use(requireAuth)`.
router.use("/contact", contactRoutes);

export default router;

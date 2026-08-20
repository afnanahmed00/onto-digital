import { Router } from "express";
import healthRoutes from "./health.routes";
import v1Routes from "./v1";

const router = Router();

router.use("/health", healthRoutes);
router.use("/api/v1", v1Routes);

export default router;

import { Router } from "express";
import { isDatabaseConnected } from "../database/connection";

const router = Router();

/**
 * GET /health — confirms the API process is up. Deliberately independent of
 * the database so it stays green (used by Render's health check and uptime
 * monitors) even before MongoDB is wired up, or if the database ever goes
 * down separately from the API itself.
 */
router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: isDatabaseConnected() ? "connected" : "not connected",
  });
});

export default router;

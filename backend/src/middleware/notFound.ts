import type { Request, Response } from "express";

/** Catches any request that didn't match a route — mounted after all routes. */
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

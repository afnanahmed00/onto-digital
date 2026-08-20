import type { NextFunction, Request, Response } from "express";
import { TooManyRequestsError } from "../utils/AppError";

/**
 * Fixed-window limiter for POST /api/v1/contact (the public lead-creation
 * endpoint — see routes/v1/contact.routes.ts), keyed by client IP. Mirrors
 * the same in-memory pattern as middleware/loginRateLimit.ts and the
 * frontend's own /api/contact route.
 *
 * This is a coarser safety net than the frontend's limiter, not a
 * replacement for it: every call here originates from the Next.js server
 * (server-to-server), not the visitor's browser, so `req.ip` reflects the
 * frontend deployment's egress address rather than each individual
 * visitor — the frontend's /api/contact route is what actually rate-limits
 * per real visitor IP before ever reaching here. The threshold below is
 * intentionally generous so it never throttles legitimate aggregated
 * traffic; it exists only to blunt direct abuse of this endpoint's URL.
 */
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 30;

const requestLog = new Map<string, { count: number; windowStart: number }>();

export function contactRateLimit(req: Request, _res: Response, next: NextFunction): void {
  const key = req.ip ?? "unknown";
  const now = Date.now();

  // Opportunistic cleanup so the map can't grow unbounded over time.
  if (requestLog.size > 5000) {
    for (const [ip, entry] of requestLog) {
      if (now - entry.windowStart > WINDOW_MS) requestLog.delete(ip);
    }
  }

  const entry = requestLog.get(key);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    requestLog.set(key, { count: 1, windowStart: now });
    next();
    return;
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    next(new TooManyRequestsError("Too many requests. Please try again later."));
    return;
  }

  next();
}

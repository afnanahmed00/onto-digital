import type { NextFunction, Request, Response } from "express";
import { TooManyRequestsError } from "../utils/AppError";

/**
 * Minimal fixed-window limiter keyed by client IP, scoped to the login
 * route only — mirrors the same in-memory pattern the frontend's
 * /api/contact route already uses (see frontend/app/api/contact/route.ts),
 * rather than pulling in a rate-limiting package for one low-traffic,
 * single-admin endpoint. State resets on process restart, which is an
 * acceptable trade-off here.
 */
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 10;

const attempts = new Map<string, { count: number; windowStart: number }>();

export function loginRateLimit(req: Request, _res: Response, next: NextFunction): void {
  const key = req.ip ?? "unknown";
  const now = Date.now();

  // Opportunistic cleanup so the map can't grow unbounded over time.
  if (attempts.size > 5000) {
    for (const [ip, entry] of attempts) {
      if (now - entry.windowStart > WINDOW_MS) attempts.delete(ip);
    }
  }

  const entry = attempts.get(key);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    attempts.set(key, { count: 1, windowStart: now });
    next();
    return;
  }

  entry.count += 1;
  if (entry.count > MAX_ATTEMPTS) {
    next(new TooManyRequestsError("Too many login attempts. Please try again later."));
    return;
  }

  next();
}

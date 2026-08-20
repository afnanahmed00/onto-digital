import type { NextFunction, Request, Response } from "express";
import { isProduction } from "../config/env";
import { AppError } from "../utils/AppError";

/** JSON shape every error response uses across the API. */
type ErrorResponseBody = {
  success: false;
  message: string;
  stack?: string;
};

/**
 * Centralized error handler — mounted last, after every route (see app.ts).
 * Known/operational errors (AppError and its subclasses) surface their own
 * message and status code. Anything else is unexpected: it's logged in full
 * server-side, but the client only ever receives a generic 500 message —
 * never the internal error detail or stack trace — once NODE_ENV is
 * production, so implementation details never leak to callers.
 */
export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  // Express only recognizes a 4-arg function as an error handler — the
  // unused `next` parameter must stay for that to work.
  _next: NextFunction
): void {
  const isKnownError = error instanceof AppError;
  const statusCode = isKnownError ? error.statusCode : 500;
  const message = isKnownError ? error.message : "Internal server error.";

  if (!isKnownError) {
    console.error("Unexpected error:", error);
  }

  const body: ErrorResponseBody = { success: false, message };

  if (!isProduction && error instanceof Error) {
    body.stack = error.stack;
  }

  res.status(statusCode).json(body);
}

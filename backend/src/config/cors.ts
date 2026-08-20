import type { CorsOptions } from "cors";
import { corsOrigins } from "./env";

/**
 * Allows only the configured frontend origin(s) — the Next.js app on Vercel
 * in production, localhost in development (see CORS_ORIGIN in .env). A
 * request with no Origin header (server-to-server calls, curl, uptime
 * checks) is let through since there's no browser same-origin policy to
 * enforce for it; browser requests always send Origin, so this doesn't
 * weaken the allowlist for the case that actually matters.
 */
export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || corsOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

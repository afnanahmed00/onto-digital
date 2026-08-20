import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { corsOptions } from "./config/cors";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFound";
import routes from "./routes";

/**
 * Builds and configures the Express app. Kept separate from server.ts (which
 * only starts listening) so the app itself is import-and-testable later
 * without binding a port.
 */
export function createApp(): Express {
  const app = express();

  app.disable("x-powered-by");
  app.set("trust proxy", 1); // Render/most PaaS hosts sit behind a reverse proxy

  // --- Security & parsing -----------------------------------------------
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  // --- Routes --------------------------------------------------------------
  app.use(routes);

  // --- Fallbacks (must stay last, in this order) ----------------------------
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

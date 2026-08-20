import mongoose from "mongoose";
import { env, isProduction } from "../config/env";

// Registering the models here (rather than in each route file) guarantees
// their schemas/indexes are attached the moment the database connects,
// regardless of which routes happen to be implemented yet.
import "../models";

mongoose.set("strictQuery", true);

let isConnecting = false;

/**
 * Connects to MongoDB via Mongoose. Safe to call even before a database
 * exists: while MONGODB_URI is unset (no Atlas cluster provisioned yet),
 * this logs a warning and returns without throwing, so the API keeps
 * serving routes that don't need a database — like /health.
 *
 * Once MONGODB_URI is set (locally or in the Render dashboard), this
 * connects automatically on the next startup — no code changes needed.
 */
export async function connectDatabase(): Promise<void> {
  if (!env.MONGODB_URI) {
    console.warn(
      "⚠️  MONGODB_URI is not set — starting without a database connection."
    );
    return;
  }

  // mongoose.connection.readyState is the source of truth (1 = connected,
  // 2 = connecting) rather than a locally tracked boolean, so status stays
  // accurate even if the connection later drops on its own (see the
  // "disconnected" listener below) — a stale flag here would otherwise
  // block every future reconnect attempt.
  if (mongoose.connection.readyState === 1 || isConnecting) return;

  isConnecting = true;

  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    // Log only a short message, never the raw error object — connection
    // errors can otherwise echo back internal details (hostnames, driver
    // internals, occasionally the connection string) that shouldn't end up
    // in logs or bubble into a client-facing response.
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`❌ MongoDB connection failed: ${message}`);

    // Once a URI is configured, a failed connection means the API can't do
    // its job — fail fast in production rather than serve a half-broken app.
    if (isProduction) {
      process.exit(1);
    }
  } finally {
    isConnecting = false;
  }
}

export async function disconnectDatabase(): Promise<void> {
  if (mongoose.connection.readyState === 0) return;
  await mongoose.disconnect();
}

export function isDatabaseConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️  MongoDB disconnected.");
});

mongoose.connection.on("reconnected", () => {
  console.log("✅ MongoDB reconnected.");
});

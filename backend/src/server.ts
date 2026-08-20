import { createApp } from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./database/connection";

async function start(): Promise<void> {
  await connectDatabase();

  const app = createApp();

  app.listen(env.PORT, () => {
    console.log(`🚀 ONTO DIGITAL API running on port ${env.PORT} [${env.NODE_ENV}]`);
  });
}

start().catch((error) => {
  console.error("Fatal startup error:", error);
  process.exit(1);
});

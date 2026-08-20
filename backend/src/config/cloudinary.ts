import { v2 as cloudinary } from "cloudinary";
import { env } from "./env";

/**
 * Configures the official Cloudinary SDK from environment variables only —
 * never hardcoded (see CLOUDINARY_* in env.ts, required there so the server
 * refuses to start without them). Every route in uploads.routes.ts imports
 * this configured instance instead of calling `cloudinary.config()` itself.
 */
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

/** Root folder every ONTO DIGITAL upload lives under, namespaced by category. */
export const CLOUDINARY_ROOT_FOLDER = "onto-digital";

export { cloudinary };

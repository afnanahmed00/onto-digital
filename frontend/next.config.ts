import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Project images uploaded through the admin dashboard (Phase 10.2)
      // are served from Cloudinary — see backend/src/config/cloudinary.ts.
      // Anticipated in services/projects.ts's original comment on
      // externally-hosted images.
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;

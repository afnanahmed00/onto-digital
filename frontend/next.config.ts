import type { NextConfig } from "next";

// Same value services/api.ts falls back to for server-side calls — kept as
// a separate constant here since next.config.ts can't import app code.
const BACKEND_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(
  /\/+$/,
  ""
);

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

  /**
   * Proxies every browser-side admin API call through this app's own
   * origin instead of letting the browser hit the Render backend directly.
   * The frontend (Vercel) and backend (Render) are different registrable
   * domains, so a directly cross-site session cookie — even with
   * `SameSite=None; Secure` — is a *third-party* cookie from the browser's
   * point of view. Mobile Safari (and any other WebKit-based iOS browser)
   * blocks third-party cookies entirely by default, so the admin login
   * cookie was never actually being stored on mobile: the login response
   * still reported success and populated in-memory React state, which is
   * why the form appeared to work — but the moment the page reloaded (or
   * the tab was backgrounded/reloaded by iOS) there was no cookie left to
   * re-authenticate with, and the user landed back on /admin/login.
   *
   * With this rewrite, the browser only ever talks to its own origin; this
   * server proxies the request to the real backend and passes its
   * `Set-Cookie` header straight through, so the browser stores it as an
   * ordinary first-party cookie. See backend/src/config/auth.ts, which sets
   * `sameSite: "lax"` on the assumption every request arrives this way.
   */
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${BACKEND_URL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;

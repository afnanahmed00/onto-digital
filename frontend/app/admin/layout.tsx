import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminAuthProvider } from "@/context/AdminAuthContext";

// noindex/nofollow — the admin area has no reason to appear in search
// results (see app/robots.ts's explicit /admin disallow, and app/sitemap.ts,
// which never lists it).
export const metadata: Metadata = {
  title: {
    // `absolute` opts out of the root layout's "%s | ONTO DIGITAL" template
    // for this segment's own title — without it, a page here with no title
    // of its own would render as "Admin | ONTO DIGITAL" (root's template
    // applied first, then this one, since a plain `default` still inherits
    // the parent chain). `template` below still applies to any descendant
    // page that sets its own plain-string title (e.g. "Dashboard").
    absolute: "ONTO DIGITAL Admin",
    template: "%s — ONTO DIGITAL Admin",
  },
  robots: { index: false, follow: false },
};

/**
 * Root of the /admin area. Mounts AdminAuthProvider once so both
 * /admin/login and the protected dashboard (app/admin/(dashboard)/layout.tsx)
 * share a single session check instead of each running its own. Renders no
 * chrome itself — components/layout/Layout.tsx already skips the public
 * Header/Footer/FloatingNav for every /admin route.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}

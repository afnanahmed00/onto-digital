import { NextResponse, type NextRequest } from "next/server";
import { apiUrl } from "@/config/api";

/**
 * /services/[slug] is a dynamic route rendered under the app-wide
 * app/loading.tsx, which wraps it in a Suspense boundary and forces
 * streaming. Next.js always ships streamed responses with a 200 status —
 * headers flush before notFound() can flip it to 404 — so an unknown slug
 * renders the branded not-found UI but reports HTTP 200 (a known upstream
 * limitation: vercel/next.js#76474, #93239; not fixable from app code
 * without removing loading.tsx site-wide).
 *
 * Checking existence here, before Next's render/streaming pipeline starts,
 * and rewriting unknown slugs to a path with no matching route lets Next's
 * already-correct unmatched-route handling (the statically prerendered
 * /_not-found page) produce a real 404 status with the same branded UI.
 */
export async function proxy(request: NextRequest) {
  const match = request.nextUrl.pathname.match(/^\/services\/([^/]+)$/);
  if (!match) return NextResponse.next();

  const slug = decodeURIComponent(match[1]);

  try {
    const res = await fetch(apiUrl(`/api/v1/services/${encodeURIComponent(slug)}`));
    if (res.status === 404) {
      return NextResponse.rewrite(new URL("/service-not-found", request.url));
    }
  } catch {
    // Backend unreachable — let the request through; the page's own fetch
    // will fail the same way it always has (getServiceBySlug throws).
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/services/:slug",
};

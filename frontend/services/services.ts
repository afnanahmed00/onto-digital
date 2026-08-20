import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { apiUrl } from "@/config/api";
import type { Service, ServiceFeature } from "@/data/services";

/**
 * Service data access layer — the public-site counterpart to
 * services/adminServices.ts. ServiceCollection, the home page's Services
 * section and the service detail page all call getServices()/
 * getServiceBySlug() instead of importing frontend/data/services.ts
 * directly: MongoDB (via the backend's public /api/v1/services routes) is
 * the source of truth as of Phase 11 — data/services.ts's static array is
 * kept only as a reference for its `Service`/`ServiceFeature` types and is
 * no longer read at render time.
 *
 * Every request here is anonymous (no `credentials: "include"`), so the
 * backend only ever returns published services — see
 * backend/src/routes/v1/services.routes.ts.
 */

type RawServiceFeature = {
  icon: string;
  label: string;
};

type RawService = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: RawServiceFeature[];
  whatYouGet: string[];
  technologies: string[];
  published: boolean;
  displayOrder: number;
};

// Kicker above the heading — identical for every service in the current
// design (see the old data/services.ts), so it's a constant here rather
// than a per-service MongoDB field.
const BADGE = "OUR SERVICES";

// Falls back to this icon if a service's `icon` (or a feature's `icon`)
// doesn't match a real Lucide export — e.g. an admin typo — so a bad icon
// name degrades gracefully instead of crashing the page.
const FALLBACK_ICON: LucideIcon = LucideIcons.Sparkles;

function resolveIcon(name: string): LucideIcon {
  const icon = (LucideIcons as unknown as Record<string, LucideIcon | undefined>)[name];
  return icon ?? FALLBACK_ICON;
}

/**
 * Two-line hero heading, e.g. "Custom Web Applications" -> ["CUSTOM WEB",
 * "APPLICATIONS"] — last word on line two, everything else on line one.
 * Reproduces every one of the 8 existing services' hand-written
 * `titleLines` exactly (verified against the original data/services.ts), so
 * the detail page heading doesn't need its own MongoDB field.
 */
function splitTitleLines(title: string): [string, string] {
  const words = title.toUpperCase().trim().split(/\s+/).filter(Boolean);
  if (words.length <= 1) return [words[0] ?? "", ""];
  return [words.slice(0, -1).join(" "), words[words.length - 1]];
}

function toService(raw: RawService): Service {
  const features: ServiceFeature[] = raw.features.map((feature) => ({
    icon: resolveIcon(feature.icon),
    label: feature.label,
  }));

  return {
    slug: raw.slug,
    breadcrumbLabel: raw.title,
    badge: BADGE,
    titleLines: splitTitleLines(raw.title),
    shortDescription: raw.shortDescription,
    description: raw.description,
    icon: resolveIcon(raw.icon),
    features,
    whatYouGet: raw.whatYouGet,
    technologies: raw.technologies,
    // Matches every existing service's slug 1:1 (see the old
    // data/services.ts), and stays in sync with ContactForm's
    // SERVICE_OPTIONS / the contact API's SERVICE_VALUES enum, both of
    // which are keyed by these same 8 slugs.
    contactServiceValue: raw.slug,
  };
}

/** GET /api/v1/services — published services only, already sorted by displayOrder. */
export async function getServices(): Promise<Service[]> {
  const res = await fetch(apiUrl("/api/v1/services"), { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to load services");

  const body = (await res.json()) as { services: RawService[] };
  return body.services.map(toService);
}

/**
 * GET /api/v1/services/:slug — a single published service, or `null` for an
 * unknown or unpublished slug (the backend 404s both cases identically for
 * anonymous callers, so a draft's existence is never confirmed publicly).
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const res = await fetch(apiUrl(`/api/v1/services/${encodeURIComponent(slug)}`), {
    next: { revalidate: 60 },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load service");

  const body = (await res.json()) as { service: RawService };
  return toService(body.service);
}

import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { getServices } from "@/services/services";

const routes = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE.website}${route}`,
  }));

  const services = await getServices();
  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE.website}/services/${service.slug}`,
  }));

  return [...staticEntries, ...serviceEntries];
}

import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

const routes = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SITE.website}${route}`,
    lastModified,
  }));
}

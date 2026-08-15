import { projects as localProjects } from "@/data/projects";
import type { Project } from "@/types/project";

/**
 * Project data access layer.
 *
 * ProjectGallery (and anything else that needs project data) calls
 * getProjects() — it never imports data/projects.ts directly. That's the
 * seam: today this reads the local seed array, but once an admin panel and
 * API exist, this function becomes
 *
 *   export async function getProjects(): Promise<Project[]> {
 *     const res = await fetch("/api/projects", { cache: "no-store" });
 *     if (!res.ok) throw new Error("Failed to load projects");
 *     const data: Project[] = await res.json();
 *     return sortByDisplayOrder(data.filter((p) => p.isPublished !== false));
 *   }
 *
 * and every consumer keeps working unchanged. (If the API ever serves
 * externally-hosted images — e.g. from a CMS or object storage — remember
 * to add the host to `images.remotePatterns` in next.config.ts; local
 * /images/... paths need no config.)
 */
export async function getProjects(): Promise<Project[]> {
  const published = localProjects.filter((project) => project.isPublished !== false);
  return sortByDisplayOrder(published);
}

/** Stable sort by displayOrder; items without one keep their original relative order, trailing after any that do. */
function sortByDisplayOrder(list: Project[]): Project[] {
  return [...list].sort((a, b) => {
    const orderA = a.displayOrder ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.displayOrder ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  });
}

/**
 * Unique categories in first-appearance order — derived from the data
 * itself so the filter bar never needs a hardcoded category list. When an
 * admin panel adds a project in a brand-new category, it just appears here.
 */
export function getProjectCategories(projects: Project[]): string[] {
  const seen = new Set<string>();
  const categories: string[] = [];

  for (const project of projects) {
    if (!seen.has(project.category)) {
      seen.add(project.category);
      categories.push(project.category);
    }
  }

  return categories;
}

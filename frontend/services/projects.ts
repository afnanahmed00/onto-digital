import { apiUrl } from "@/config/api";
import type { Project, ProjectSize } from "@/types/project";

/**
 * Project data access layer.
 *
 * ProjectGallery (and anything else that needs project data) calls
 * getProjects() — it never imports data/projects.ts directly. As of Phase
 * 11, MongoDB (via the backend's public /api/v1/projects route) is the
 * source of truth: data/projects.ts's static array is no longer read at
 * render time and is kept only until the migration has been verified.
 *
 * The request is anonymous (no `credentials: "include"`), so the backend
 * only ever returns published projects — see
 * backend/src/routes/v1/projects.routes.ts — and `cache: "no-store"` keeps
 * every page load fresh so an admin's edit shows up immediately.
 */

type RawProject = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  imageUrl: string;
  technologies: string[];
  websiteUrl: string | null;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

/**
 * Bento-grid card width. The backend Project model has no `size` field —
 * it's a presentation detail, not project content — so it's derived here
 * instead: a featured project renders wide ("large"), everything else
 * alternates medium/small for the same visual rhythm the original static
 * data had.
 */
function deriveSize(project: RawProject, index: number): ProjectSize {
  if (project.featured) return "large";
  return index % 2 === 0 ? "medium" : "small";
}

function toProject(raw: RawProject, index: number): Project {
  return {
    id: raw.id,
    name: raw.title,
    slug: raw.slug,
    category: raw.category,
    description: raw.description,
    image: raw.imageUrl,
    websiteUrl: raw.websiteUrl ?? "#",
    technologies: raw.technologies,
    featured: raw.featured,
    size: deriveSize(raw, index),
    displayOrder: raw.displayOrder,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    isPublished: raw.published,
  };
}

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(apiUrl("/api/v1/projects"), { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load projects");

  const body = (await res.json()) as { projects: RawProject[] };
  // Already published-only and sorted by displayOrder server-side.
  return body.projects.map(toProject);
}

/**
 * Unique categories in first-appearance order — derived from the data
 * itself so the filter bar never needs a hardcoded category list. When an
 * admin adds a project in a brand-new category, it just appears here.
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

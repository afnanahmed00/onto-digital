import { adminApiFetch, type ApiResult } from "./adminApi";
import type { AdminProject, ProjectFormValues } from "@/types/adminProject";

type ProjectsListData = { count: number; projects: AdminProject[] };
type ProjectData = { project: AdminProject };
type MessageData = { message: string };

/** GET /api/v1/projects — every project, published and draft (admin session included). */
export function fetchProjects(): Promise<ApiResult<ProjectsListData>> {
  return adminApiFetch<ProjectsListData>("/api/v1/projects");
}

/** GET /api/v1/projects/:identifier — by slug or Mongo _id. */
export function fetchProject(identifier: string): Promise<ApiResult<ProjectData>> {
  return adminApiFetch<ProjectData>(`/api/v1/projects/${encodeURIComponent(identifier)}`);
}

/** POST /api/v1/projects */
export function createProject(values: ProjectFormValues): Promise<ApiResult<ProjectData>> {
  return adminApiFetch<ProjectData>("/api/v1/projects", {
    method: "POST",
    body: JSON.stringify(values),
  });
}

/** PATCH /api/v1/projects/:id — partial update; only changed fields need to be present. */
export function updateProject(
  id: string,
  values: Partial<ProjectFormValues>
): Promise<ApiResult<ProjectData>> {
  return adminApiFetch<ProjectData>(`/api/v1/projects/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
  });
}

/** DELETE /api/v1/projects/:id */
export function deleteProject(id: string): Promise<ApiResult<MessageData>> {
  return adminApiFetch<MessageData>(`/api/v1/projects/${id}`, { method: "DELETE" });
}

/** PATCH /api/v1/projects/:id/publish */
export function setProjectPublished(id: string, published: boolean): Promise<ApiResult<ProjectData>> {
  return adminApiFetch<ProjectData>(`/api/v1/projects/${id}/publish`, {
    method: "PATCH",
    body: JSON.stringify({ published }),
  });
}

/** PATCH /api/v1/projects/:id/display-order */
export function setProjectDisplayOrder(
  id: string,
  displayOrder: number
): Promise<ApiResult<ProjectData>> {
  return adminApiFetch<ProjectData>(`/api/v1/projects/${id}/display-order`, {
    method: "PATCH",
    body: JSON.stringify({ displayOrder }),
  });
}

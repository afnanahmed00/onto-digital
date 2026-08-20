import { adminApiFetch, type ApiResult } from "./adminApi";
import type { AdminService, ServiceFormValues } from "@/types/adminService";

type ServicesListData = { count: number; services: AdminService[] };
type ServiceData = { service: AdminService };
type MessageData = { message: string };

/** GET /api/v1/services — every service, published and draft (admin session included). */
export function fetchServices(): Promise<ApiResult<ServicesListData>> {
  return adminApiFetch<ServicesListData>("/api/v1/services");
}

/** GET /api/v1/services/:identifier — by slug or Mongo _id. */
export function fetchService(identifier: string): Promise<ApiResult<ServiceData>> {
  return adminApiFetch<ServiceData>(`/api/v1/services/${encodeURIComponent(identifier)}`);
}

/** POST /api/v1/services */
export function createService(values: ServiceFormValues): Promise<ApiResult<ServiceData>> {
  return adminApiFetch<ServiceData>("/api/v1/services", {
    method: "POST",
    body: JSON.stringify(values),
  });
}

/** PATCH /api/v1/services/:id — partial update; only changed fields need to be present. */
export function updateService(
  id: string,
  values: Partial<ServiceFormValues>
): Promise<ApiResult<ServiceData>> {
  return adminApiFetch<ServiceData>(`/api/v1/services/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
  });
}

/** DELETE /api/v1/services/:id */
export function deleteService(id: string): Promise<ApiResult<MessageData>> {
  return adminApiFetch<MessageData>(`/api/v1/services/${id}`, { method: "DELETE" });
}

/** PATCH /api/v1/services/:id/publish */
export function setServicePublished(id: string, published: boolean): Promise<ApiResult<ServiceData>> {
  return adminApiFetch<ServiceData>(`/api/v1/services/${id}/publish`, {
    method: "PATCH",
    body: JSON.stringify({ published }),
  });
}

/** PATCH /api/v1/services/:id/display-order */
export function setServiceDisplayOrder(
  id: string,
  displayOrder: number
): Promise<ApiResult<ServiceData>> {
  return adminApiFetch<ServiceData>(`/api/v1/services/${id}/display-order`, {
    method: "PATCH",
    body: JSON.stringify({ displayOrder }),
  });
}

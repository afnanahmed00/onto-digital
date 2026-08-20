import { adminApiFetch, type ApiResult } from "./adminApi";
import type { AdminLead, LeadFormValues, LeadPagination, LeadSort, LeadStatus } from "@/types/adminLead";

type LeadsListData = { leads: AdminLead[]; pagination: LeadPagination };
type LeadData = { lead: AdminLead };
type MessageData = { message: string };

export type FetchLeadsParams = {
  status?: LeadStatus;
  page?: number;
  limit?: number;
  sort?: LeadSort;
};

/** GET /api/v1/leads — paginated, newest-first by default; optional ?status filter and ?sort. */
export function fetchLeads(params: FetchLeadsParams = {}): Promise<ApiResult<LeadsListData>> {
  const query = new URLSearchParams();
  if (params.status) query.set("status", params.status);
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.sort) query.set("sort", params.sort);

  const queryString = query.toString();
  return adminApiFetch<LeadsListData>(`/api/v1/leads${queryString ? `?${queryString}` : ""}`);
}

/** GET /api/v1/leads/:id */
export function fetchLead(id: string): Promise<ApiResult<LeadData>> {
  return adminApiFetch<LeadData>(`/api/v1/leads/${id}`);
}

/** PATCH /api/v1/leads/:id — partial update; only changed fields need to be present. */
export function updateLead(
  id: string,
  values: Partial<LeadFormValues>
): Promise<ApiResult<LeadData>> {
  return adminApiFetch<LeadData>(`/api/v1/leads/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
  });
}

/** PATCH /api/v1/leads/:id/status */
export function setLeadStatus(id: string, status: LeadStatus): Promise<ApiResult<LeadData>> {
  return adminApiFetch<LeadData>(`/api/v1/leads/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

/** DELETE /api/v1/leads/:id */
export function deleteLead(id: string): Promise<ApiResult<MessageData>> {
  return adminApiFetch<MessageData>(`/api/v1/leads/${id}`, { method: "DELETE" });
}

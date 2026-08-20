import { adminApiFetch, type ApiResult } from "./adminApi";
import type { DashboardStatsData } from "@/types/adminDashboard";

/** GET /api/v1/dashboard/stats — project/service/lead counts + recent leads. */
export function fetchDashboardStats(): Promise<ApiResult<DashboardStatsData>> {
  return adminApiFetch<DashboardStatsData>("/api/v1/dashboard/stats");
}

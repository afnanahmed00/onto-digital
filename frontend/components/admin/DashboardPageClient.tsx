"use client";

import { useCallback, useEffect, useState } from "react";
import { Briefcase, CheckCircle2, FolderKanban, UserPlus } from "lucide-react";
import DashboardRecentLeads from "./DashboardRecentLeads";
import StatCard from "./StatCard";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { fetchDashboardStats } from "@/services/adminDashboard";
import type { DashboardRecentLead, DashboardStats } from "@/types/adminDashboard";

type PageStatus = "loading" | "loaded" | "error";

const EMPTY_STATS: DashboardStats = {
  totalProjects: 0,
  publishedProjects: 0,
  totalServices: 0,
  publishedServices: 0,
  newLeads: 0,
};

/**
 * /admin (dashboard root) — real counts from GET /api/v1/dashboard/stats
 * (Phase 10.6), replacing the static placeholder tiles from Phase 10.1.
 * Same session-handling convention as LeadsPageClient/ProjectsPageClient: a
 * 401 mid-session just calls AdminAuthContext's `refresh()`, which flips it
 * to "unauthenticated" and lets app/admin/(dashboard)/layout.tsx's guard
 * redirect to /admin/login — no separate auth handling here.
 */
export default function DashboardPageClient() {
  const { refresh: refreshSession } = useAdminAuth();

  const [stats, setStats] = useState<DashboardStats>(EMPTY_STATS);
  const [recentLeads, setRecentLeads] = useState<DashboardRecentLead[]>([]);
  const [status, setStatus] = useState<PageStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleUnauthorized = useCallback(() => {
    void refreshSession();
  }, [refreshSession]);

  const loadStats = useCallback(async () => {
    setStatus("loading");
    const result = await fetchDashboardStats();

    if (!result.success) {
      if (result.status === 401) return handleUnauthorized();
      setStatus("error");
      setErrorMessage(result.message);
      return;
    }

    setStats(result.data.stats);
    setRecentLeads(result.data.recentLeads);
    setStatus("loaded");
  }, [handleUnauthorized]);

  useEffect(() => {
    queueMicrotask(() => {
      loadStats();
    });
  }, [loadStats]);

  const STAT_TILES = [
    { label: "Total Projects", icon: FolderKanban, value: stats.totalProjects },
    { label: "Published Projects", icon: CheckCircle2, value: stats.publishedProjects },
    { label: "Total Services", icon: Briefcase, value: stats.totalServices },
    { label: "Published Services", icon: CheckCircle2, value: stats.publishedServices },
    { label: "New Leads", icon: UserPlus, value: stats.newLeads },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-[var(--font-heading)] text-2xl font-semibold uppercase tracking-[0.04em] text-white sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Overview of your portfolio, services, and incoming leads.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {STAT_TILES.map((tile) => (
          <StatCard key={tile.label} label={tile.label} icon={tile.icon} value={tile.value} status={status} />
        ))}
      </div>

      <DashboardRecentLeads
        leads={recentLeads}
        status={status}
        errorMessage={errorMessage}
        onRetry={loadStats}
      />
    </div>
  );
}

import Link from "next/link";
import clsx from "clsx";
import Button from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { formatLeadStatusLabel, leadStatusBadgeClassName } from "@/lib/leadStatus";
import type { DashboardRecentLead } from "@/types/adminDashboard";

type DashboardRecentLeadsProps = {
  leads: DashboardRecentLead[];
  status: "loading" | "loaded" | "error";
  errorMessage?: string | null;
  onRetry: () => void;
};

/**
 * Dashboard's "Recent Leads" card — a small read-only preview (name,
 * service, status, date) of the newest submissions, sourced from the same
 * GET /api/v1/dashboard/stats call as the stat tiles above it. The full
 * list with filtering/sorting/pagination/actions lives at /admin/leads
 * (LeadsTable.tsx), which this links out to rather than duplicating.
 */
export default function DashboardRecentLeads({
  leads,
  status,
  errorMessage,
  onRetry,
}: DashboardRecentLeadsProps) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold uppercase tracking-[0.04em] text-white">
          Recent Leads
        </h2>
        <Link
          href="/admin/leads"
          className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--primary)]"
        >
          View all →
        </Link>
      </div>

      <div className="mt-5">
        {status === "loading" && (
          <div className="flex flex-col gap-3" aria-busy="true" aria-live="polite">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-14 w-full animate-pulse rounded-[var(--radius-md)] bg-white/5" />
            ))}
            <span className="sr-only">Loading recent leads…</span>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-3 rounded-[var(--radius-md)] border border-dashed border-[var(--border)] px-6 py-10 text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              {errorMessage ?? "Failed to load recent leads."}
            </p>
            <Button type="button" variant="outline" onClick={onRetry}>
              Retry
            </Button>
          </div>
        )}

        {status === "loaded" && leads.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-[var(--radius-md)] border border-dashed border-[var(--border)] px-6 py-10 text-center">
            <p className="text-sm text-[var(--text-secondary)]">No leads yet.</p>
          </div>
        )}

        {status === "loaded" && leads.length > 0 && (
          <ul className="flex flex-col divide-y divide-[var(--border)]">
            {leads.map((lead) => (
              <li key={lead.id} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{lead.fullName}</p>
                  <p className="mt-0.5 truncate text-xs text-[var(--text-muted)]">{lead.service}</p>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span
                    className={clsx(
                      "inline-block rounded-full border px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-[0.06em]",
                      leadStatusBadgeClassName(lead.status)
                    )}
                  >
                    {formatLeadStatusLabel(lead.status)}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">{formatDate(lead.createdAt)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

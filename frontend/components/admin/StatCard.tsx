import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  icon: LucideIcon;
  /** The count to display. Ignored (and a placeholder shown instead) while `status` isn't "loaded". */
  value: number;
  status: "loading" | "loaded" | "error";
};

/**
 * Dashboard overview tile — backed by GET /api/v1/dashboard/stats
 * (DashboardPageClient). Shows a pulse skeleton while loading, an em dash on
 * failure (never a stale or fabricated number), and the real count once
 * loaded.
 */
export default function StatCard({ label, icon: Icon, value, status }: StatCardProps) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
          {label}
        </span>
        <Icon size={18} className="shrink-0 text-[var(--primary)]" aria-hidden="true" />
      </div>

      {status === "loading" && (
        <div
          className="mt-4 h-8 w-16 animate-pulse rounded-md bg-white/10"
          role="status"
          aria-label={`${label}: loading`}
        />
      )}

      {status === "error" && (
        <p
          className="mt-4 font-heading text-3xl font-semibold text-[var(--text-muted)]"
          aria-label={`${label}: unavailable`}
        >
          —
        </p>
      )}

      {status === "loaded" && (
        <p className="mt-4 font-heading text-3xl font-semibold text-white">
          {value.toLocaleString("en-US")}
        </p>
      )}
    </div>
  );
}

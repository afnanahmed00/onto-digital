"use client";

import { Eye, Trash2 } from "lucide-react";
import clsx from "clsx";
import Button from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { formatLeadStatusLabel, leadStatusBadgeClassName } from "@/lib/leadStatus";
import type { AdminLead } from "@/types/adminLead";

type LeadsTableProps = {
  leads: AdminLead[];
  status: "loading" | "loaded" | "error";
  errorMessage?: string | null;
  onView: (lead: AdminLead) => void;
  onDelete: (lead: AdminLead) => void;
  onRetry: () => void;
};

function StatusBadge({ status }: { status: AdminLead["status"] }) {
  return (
    <span
      className={clsx(
        "inline-block rounded-full border px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-[0.06em]",
        leadStatusBadgeClassName(status)
      )}
    >
      {formatLeadStatusLabel(status)}
    </span>
  );
}

/**
 * Leads list — same responsive pattern as ProjectsTable/ServicesTable: a
 * real `<table>` on tablet/desktop (md+), stacked cards on mobile. Both
 * render the same data/actions, so there's one source of truth for the
 * lead list. Unlike Projects/Services there's no inline publish toggle or
 * reorder here — status changes and editing happen in LeadDetailModal,
 * opened via the "View" action.
 */
export default function LeadsTable({ leads, status, errorMessage, onView, onDelete, onRetry }: LeadsTableProps) {
  if (status === "loading") {
    return (
      <div className="flex flex-col gap-3" aria-busy="true" aria-live="polite">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-20 w-full animate-pulse rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]"
          />
        ))}
        <span className="sr-only">Loading leads…</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] px-6 py-16 text-center">
        <p className="text-sm text-[var(--text-secondary)]">{errorMessage ?? "Failed to load leads."}</p>
        <Button type="button" variant="outline" onClick={onRetry}>
          Retry
        </Button>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] px-6 py-16 text-center">
        <p className="text-sm text-[var(--text-secondary)]">No leads match the current filters.</p>
      </div>
    );
  }

  return (
    <>
      {/* Tablet/desktop table */}
      <div className="hidden overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--border)] md:block">
        <table className="w-full min-w-[1080px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Budget</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-[var(--border)] last:border-b-0 hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <p className="max-w-[160px] truncate font-medium text-white">{lead.fullName}</p>
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">
                  <p className="max-w-[200px] truncate">{lead.email}</p>
                  <p className="text-xs text-[var(--text-muted)]">{lead.phone}</p>
                </td>
                <td className="max-w-[140px] truncate px-4 py-3 text-[var(--text-secondary)]">
                  {lead.company ?? "—"}
                </td>
                <td className="max-w-[160px] truncate px-4 py-3 text-[var(--text-secondary)]">{lead.service}</td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{lead.budget ?? "—"}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{formatDate(lead.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      aria-label={`View ${lead.fullName}`}
                      onClick={() => onView(lead)}
                      className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-secondary)] transition-colors duration-300 hover:bg-white/[0.06] hover:text-white"
                    >
                      <Eye size={15} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${lead.fullName}`}
                      onClick={() => onDelete(lead)}
                      className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-secondary)] transition-colors duration-300 hover:bg-[#FF5C5C]/10 hover:text-[#FF5C5C]"
                    >
                      <Trash2 size={15} aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {leads.map((lead) => (
          <div key={lead.id} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">{lead.fullName}</p>
                <p className="truncate text-xs text-[var(--text-muted)]">{lead.email}</p>
              </div>
              <StatusBadge status={lead.status} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-[var(--text-secondary)]">
              <div>
                <p className="text-[var(--text-muted)]">Phone</p>
                <p className="mt-1">{lead.phone}</p>
              </div>
              <div>
                <p className="text-[var(--text-muted)]">Company</p>
                <p className="mt-1 truncate">{lead.company ?? "—"}</p>
              </div>
              <div>
                <p className="text-[var(--text-muted)]">Service</p>
                <p className="mt-1 truncate">{lead.service}</p>
              </div>
              <div>
                <p className="text-[var(--text-muted)]">Budget</p>
                <p className="mt-1">{lead.budget ?? "—"}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[var(--text-muted)]">Created</p>
                <p className="mt-1">{formatDate(lead.createdAt)}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-[var(--border)] pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onView(lead)}
                className="flex-1 justify-center py-2.5 text-xs"
              >
                <Eye size={14} aria-hidden="true" />
                View
              </Button>
              <button
                type="button"
                aria-label={`Delete ${lead.fullName}`}
                onClick={() => onDelete(lead)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] text-[var(--text-secondary)] transition-colors duration-300 hover:border-[#FF5C5C]/40 hover:text-[#FF5C5C]"
              >
                <Trash2 size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

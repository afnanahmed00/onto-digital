"use client";

import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import clsx from "clsx";
import Button from "@/components/ui/Button";
import type { AdminService } from "@/types/adminService";

type ServicesTableProps = {
  services: AdminService[];
  status: "loading" | "loaded" | "error";
  errorMessage?: string | null;
  onEdit: (service: AdminService) => void;
  onDelete: (service: AdminService) => void;
  onTogglePublished: (service: AdminService) => void;
  onReorder: (service: AdminService, direction: "up" | "down") => void;
  onRetry: () => void;
};

// Same StatusPill/ReorderButtons shapes as ProjectsTable (frontend/components/admin/ProjectsTable.tsx)
// — kept local rather than shared since Projects UI must stay untouched and neither was exported.
function StatusPill({ published, onClick }: { published: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-full border px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-[0.06em] transition-colors duration-300",
        published
          ? "border-[var(--primary)]/40 bg-[var(--primary)]/10 text-[var(--primary)]"
          : "border-[var(--border)] text-[var(--text-muted)] hover:text-white"
      )}
    >
      {published ? "Published" : "Draft"}
    </button>
  );
}

function ReorderButtons({
  disabledUp,
  disabledDown,
  onUp,
  onDown,
}: {
  disabledUp: boolean;
  disabledDown: boolean;
  onUp: () => void;
  onDown: () => void;
}) {
  return (
    <div className="flex flex-col">
      <button
        type="button"
        aria-label="Move earlier"
        disabled={disabledUp}
        onClick={onUp}
        className="text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronUp size={14} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Move later"
        disabled={disabledDown}
        onClick={onDown}
        className="text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronDown size={14} aria-hidden="true" />
      </button>
    </div>
  );
}

/**
 * Services list — same responsive pattern as ProjectsTable: a real `<table>`
 * on tablet/desktop (md+), stacked cards on mobile. Both render the same
 * data/actions; which one shows is pure CSS, so there's one source of truth
 * for the service list.
 */
export default function ServicesTable({
  services,
  status,
  errorMessage,
  onEdit,
  onDelete,
  onTogglePublished,
  onReorder,
  onRetry,
}: ServicesTableProps) {
  if (status === "loading") {
    return (
      <div className="flex flex-col gap-3" aria-busy="true" aria-live="polite">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-20 w-full animate-pulse rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]"
          />
        ))}
        <span className="sr-only">Loading services…</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] px-6 py-16 text-center">
        <p className="text-sm text-[var(--text-secondary)]">{errorMessage ?? "Failed to load services."}</p>
        <Button type="button" variant="outline" onClick={onRetry}>
          Retry
        </Button>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] px-6 py-16 text-center">
        <p className="text-sm text-[var(--text-secondary)]">
          No services yet. Create your first one to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Tablet/desktop table */}
      <div className="hidden overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--border)] md:block">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Short Description</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service.id} className="border-b border-[var(--border)] last:border-b-0 hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">{service.title}</p>
                    <p className="truncate text-xs text-[var(--text-muted)]">/{service.slug}</p>
                  </div>
                </td>
                <td className="max-w-xs px-4 py-3 text-[var(--text-secondary)]">
                  <p className="line-clamp-2">{service.shortDescription}</p>
                </td>
                <td className="px-4 py-3">
                  <StatusPill published={service.published} onClick={() => onTogglePublished(service)} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className="w-6 text-center text-[var(--text-secondary)]">{service.displayOrder}</span>
                    <ReorderButtons
                      disabledUp={index === 0}
                      disabledDown={index === services.length - 1}
                      onUp={() => onReorder(service, "up")}
                      onDown={() => onReorder(service, "down")}
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      aria-label={`Edit ${service.title}`}
                      onClick={() => onEdit(service)}
                      className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-secondary)] transition-colors duration-300 hover:bg-white/[0.06] hover:text-white"
                    >
                      <Pencil size={15} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${service.title}`}
                      onClick={() => onDelete(service)}
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
        {services.map((service, index) => (
          <div key={service.id} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">{service.title}</p>
                <p className="truncate text-xs text-[var(--text-muted)]">/{service.slug}</p>
              </div>
              <StatusPill published={service.published} onClick={() => onTogglePublished(service)} />
            </div>

            <p className="mt-3 line-clamp-2 text-xs text-[var(--text-secondary)]">{service.shortDescription}</p>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-[var(--text-secondary)]">
              <div>
                <p className="text-[var(--text-muted)]">Order</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span>{service.displayOrder}</span>
                  <ReorderButtons
                    disabledUp={index === 0}
                    disabledDown={index === services.length - 1}
                    onUp={() => onReorder(service, "up")}
                    onDown={() => onReorder(service, "down")}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-[var(--border)] pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onEdit(service)}
                className="flex-1 justify-center py-2.5 text-xs"
              >
                <Pencil size={14} aria-hidden="true" />
                Edit
              </Button>
              <button
                type="button"
                aria-label={`Delete ${service.title}`}
                onClick={() => onDelete(service)}
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

"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp, ImageOff, Pencil, Trash2 } from "lucide-react";
import clsx from "clsx";
import Button from "@/components/ui/Button";
import ToggleSwitch from "./ToggleSwitch";
import { formatDate } from "@/lib/utils";
import type { AdminProject } from "@/types/adminProject";

type ProjectsTableProps = {
  projects: AdminProject[];
  status: "loading" | "loaded" | "error";
  errorMessage?: string | null;
  onEdit: (project: AdminProject) => void;
  onDelete: (project: AdminProject) => void;
  onTogglePublished: (project: AdminProject) => void;
  onToggleFeatured: (project: AdminProject) => void;
  onReorder: (project: AdminProject, direction: "up" | "down") => void;
  onRetry: () => void;
};

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

function Thumbnail({ imageUrl, size }: { imageUrl: string; size: number }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-[var(--radius-sm)] border border-[var(--border)] bg-[#0A0A0A]"
      style={{ height: size, width: size }}
    >
      {imageUrl ? (
        <Image src={imageUrl} alt="" fill sizes={`${size}px`} className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[var(--text-muted)]">
          <ImageOff size={size / 2.5} aria-hidden="true" />
        </div>
      )}
    </div>
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
 * Projects list — a real `<table>` on tablet/desktop (md+), stacked cards on
 * mobile (native table markup doesn't reflow well below ~640px). Both
 * render the same data/actions; which one shows is pure CSS (`hidden
 * md:block` / `md:hidden`), so there's exactly one source of truth for the
 * project list — no separate mobile data fetch or state.
 */
export default function ProjectsTable({
  projects,
  status,
  errorMessage,
  onEdit,
  onDelete,
  onTogglePublished,
  onToggleFeatured,
  onReorder,
  onRetry,
}: ProjectsTableProps) {
  if (status === "loading") {
    return (
      <div className="flex flex-col gap-3" aria-busy="true" aria-live="polite">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-20 w-full animate-pulse rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]"
          />
        ))}
        <span className="sr-only">Loading projects…</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] px-6 py-16 text-center">
        <p className="text-sm text-[var(--text-secondary)]">{errorMessage ?? "Failed to load projects."}</p>
        <Button type="button" variant="outline" onClick={onRetry}>
          Retry
        </Button>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] px-6 py-16 text-center">
        <p className="text-sm text-[var(--text-secondary)]">
          No projects yet. Create your first one to get started.
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
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id} className="border-b border-[var(--border)] last:border-b-0 hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Thumbnail imageUrl={project.imageUrl} size={44} />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">{project.title}</p>
                      <p className="truncate text-xs text-[var(--text-muted)]">/{project.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{project.category}</td>
                <td className="px-4 py-3">
                  <StatusPill published={project.published} onClick={() => onTogglePublished(project)} />
                </td>
                <td className="px-4 py-3">
                  <ToggleSwitch
                    checked={project.featured}
                    onChange={() => onToggleFeatured(project)}
                    label={`${project.featured ? "Unmark" : "Mark"} ${project.title} as featured`}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className="w-6 text-center text-[var(--text-secondary)]">{project.displayOrder}</span>
                    <ReorderButtons
                      disabledUp={index === 0}
                      disabledDown={index === projects.length - 1}
                      onUp={() => onReorder(project, "up")}
                      onDown={() => onReorder(project, "down")}
                    />
                  </div>
                </td>
                <td className="px-4 py-3 text-[var(--text-secondary)]">{formatDate(project.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      aria-label={`Edit ${project.title}`}
                      onClick={() => onEdit(project)}
                      className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-secondary)] transition-colors duration-300 hover:bg-white/[0.06] hover:text-white"
                    >
                      <Pencil size={15} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${project.title}`}
                      onClick={() => onDelete(project)}
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
        {projects.map((project, index) => (
          <div key={project.id} className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="flex items-start gap-3">
              <Thumbnail imageUrl={project.imageUrl} size={56} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">{project.title}</p>
                <p className="truncate text-xs text-[var(--text-muted)]">{project.category}</p>
              </div>
              <StatusPill published={project.published} onClick={() => onTogglePublished(project)} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-[var(--text-secondary)]">
              <div>
                <p className="text-[var(--text-muted)]">Featured</p>
                <div className="mt-1.5">
                  <ToggleSwitch
                    checked={project.featured}
                    onChange={() => onToggleFeatured(project)}
                    label={`${project.featured ? "Unmark" : "Mark"} ${project.title} as featured`}
                  />
                </div>
              </div>
              <div>
                <p className="text-[var(--text-muted)]">Order</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span>{project.displayOrder}</span>
                  <ReorderButtons
                    disabledUp={index === 0}
                    disabledDown={index === projects.length - 1}
                    onUp={() => onReorder(project, "up")}
                    onDown={() => onReorder(project, "down")}
                  />
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-[var(--text-muted)]">Created</p>
                <p className="mt-1 text-[var(--text-secondary)]">{formatDate(project.createdAt)}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-[var(--border)] pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onEdit(project)}
                className="flex-1 justify-center py-2.5 text-xs"
              >
                <Pencil size={14} aria-hidden="true" />
                Edit
              </Button>
              <button
                type="button"
                aria-label={`Delete ${project.title}`}
                onClick={() => onDelete(project)}
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

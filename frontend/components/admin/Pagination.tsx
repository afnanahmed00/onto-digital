"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  disabled?: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

/**
 * Prev/Next pager against the backend's page/limit pagination (GET
 * /api/v1/leads' `pagination` object) — Projects and Services list
 * everything in one request and have no equivalent of this, so it's new
 * rather than reused.
 */
export default function Pagination({ page, totalPages, total, disabled, onPrevious, onNext }: PaginationProps) {
  if (total === 0) return null;

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-[var(--border)] pt-4 text-sm sm:flex-row">
      <p className="text-[var(--text-secondary)]">
        Page {page} of {totalPages} &middot; {total} lead{total === 1 ? "" : "s"} total
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={disabled || page <= 1}
          className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border)] text-[var(--text-secondary)] transition-colors duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[var(--border)] disabled:hover:text-[var(--text-secondary)]"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={disabled || page >= totalPages}
          className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border)] text-[var(--text-secondary)] transition-colors duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[var(--border)] disabled:hover:text-[var(--text-secondary)]"
          aria-label="Next page"
        >
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

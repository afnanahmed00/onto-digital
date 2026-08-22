"use client";

import clsx from "clsx";

const ALL_CATEGORY = "ALL";

interface ProjectFiltersProps {
  /** Categories as they exist in the data — ALL is prepended automatically. */
  categories: string[];
  selected: string;
  onChange: (category: string) => void;
}

/**
 * Category filter pills. Scrolls horizontally on mobile instead of wrapping
 * or overflowing the page (negative-margin bleed matches Container's
 * px-5 gutter so the scroll track still starts flush with the page edge).
 */
export default function ProjectFilters({ categories, selected, onChange }: ProjectFiltersProps) {
  const options = [ALL_CATEGORY, ...categories];

  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
    >
      {options.map((option) => {
        const isActive = option === selected;

        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            className={clsx(
              "shrink-0 whitespace-nowrap rounded-full border px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.08em] transition-all duration-300 active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
              isActive
                ? "border-[var(--primary)] bg-[var(--primary)] text-black"
                : "border-[var(--border-card)] text-white hover:border-[var(--primary)] hover:text-[var(--primary)] active:border-[var(--primary)] active:text-[var(--primary)]"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

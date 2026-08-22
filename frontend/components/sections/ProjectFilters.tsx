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
              "shrink-0 whitespace-nowrap rounded-full border px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.08em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51FF73] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              isActive
                ? "border-[#51FF73] bg-[#51FF73] text-black"
                : "border-[#262626] text-white hover:border-[#51FF73] hover:text-[#51FF73]"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

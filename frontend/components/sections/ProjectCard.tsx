import Image from "next/image";
import { ArrowUpRight, ExternalLink, Plus } from "lucide-react";
import clsx from "clsx";
import type { Project } from "@/types/project";

/**
 * Grid footprint per size tier. Every card is exactly one row tall (the
 * gallery's grid-auto-rows is fixed — see GRID_CLASSES in ProjectGallery),
 * so the only variation left is width: "large" claims two column tracks
 * (the "2fr" card) from `sm:` up, everything else stays one (the "1fr"
 * card). Adjusting the bento rhythm later is a one-line change here, not a
 * per-card layout edit.
 */
const SIZE_SPAN_CLASSES: Record<Project["size"], string> = {
  small: "",
  medium: "",
  large: "sm:col-span-2",
};

interface ProjectCardProps {
  project: Project;
  /**
   * Bumps up text/icon/padding sizes a step — for contexts that render this
   * same card larger than the /projects gallery's default 3-up grid (e.g.
   * the homepage's 2-up preview strip in Work.tsx), so the type doesn't
   * look undersized relative to the bigger card. Gallery usage is
   * unaffected — this defaults to false/original sizing.
   */
  large?: boolean;
}

export default function ProjectCard({ project, large = false }: ProjectCardProps) {
  return (
    <a
      href={project.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${project.name} — opens in a new tab`}
      className={clsx(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-[20px] border border-[var(--border-card)] bg-[var(--card)] transition-all duration-500 hover:border-[var(--primary)] hover:shadow-[0_0_30px_rgba(81,255,115,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
        SIZE_SPAN_CLASSES[project.size],
        project.featured && "ring-1 ring-[var(--primary)]/35"
      )}
    >
      <Image
        src={project.image}
        alt={`${project.name} project preview`}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:blur-sm group-focus-visible:scale-110 group-focus-visible:blur-sm"
      />

      {/* Always-on gradient so default-state text stays legible over any image, at any card height */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />

      {/* Hover-only darken, on top of the blur, so the info panel reads clearly */}
      <div className="pointer-events-none absolute inset-0 bg-[var(--background)]/0 transition-colors duration-300 group-hover:bg-[var(--background)]/55 group-focus-visible:bg-[var(--background)]/55" />

      {/* Decorative "+" badge — only ever shown alongside the hover overlay, never a separate control (the whole card is the one link) */}
      <span
        aria-hidden="true"
        className="absolute right-4 top-4 z-10 flex h-8 w-8 -translate-y-1 items-center justify-center rounded-full bg-[var(--primary)] text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      >
        <Plus size={16} strokeWidth={2.5} />
      </span>

      {/* Default state — image, name, category, arrow. Stays visible on mobile since hover doesn't exist there.
          Padding/text sizes step up with the card: mobile rows are only 150px tall, so they stay compact. */}
      <div
        className={clsx(
          "relative z-10 mt-auto flex items-end justify-between gap-2 p-3 opacity-100 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0 sm:gap-3 sm:p-4 lg:p-5",
          large && "sm:p-5 lg:p-6"
        )}
      >
        <div className="min-w-0">
          <span
            className={clsx(
              "block truncate font-heading font-medium uppercase tracking-[0.12em] text-[var(--primary)]",
              large
                ? "text-[0.7rem] sm:text-[0.78rem] sm:tracking-[0.14em] lg:text-[0.85rem]"
                : "text-[0.6rem] sm:text-[0.65rem] sm:tracking-[0.14em] lg:text-[0.68rem]"
            )}
          >
            {project.category}
          </span>
          <span
            className={clsx(
              "mt-1 block truncate font-heading font-medium uppercase text-white",
              large
                ? "text-[1rem] sm:text-[1.15rem] lg:text-[1.3rem]"
                : "text-[0.85rem] sm:text-[0.95rem] lg:text-[1.05rem]"
            )}
          >
            {project.name}
          </span>
        </div>

        <ArrowUpRight
          size={large ? 20 : 16}
          className={clsx("shrink-0 text-[var(--primary)]", large ? "sm:h-[24px] sm:w-[24px]" : "sm:h-[18px] sm:w-[18px]")}
          aria-hidden="true"
        />
      </div>

      {/* Hover state (desktop) / keyboard-focus state — category, name, description, CTA */}
      <div
        className={clsx(
          "absolute inset-0 z-10 flex flex-col justify-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100",
          large && "p-6 lg:p-7"
        )}
      >
        <span
          className={clsx(
            "inline-flex w-fit items-center rounded-md bg-[var(--primary)]/15 font-medium uppercase tracking-[0.1em] text-[var(--primary)]",
            large ? "px-3 py-1.5 text-[0.75rem]" : "px-2.5 py-1 text-[0.65rem]"
          )}
        >
          {project.category}
        </span>

        <span
          className={clsx(
            "mt-3 font-heading font-semibold uppercase text-white",
            large ? "text-[1.4rem] lg:text-[1.6rem]" : "text-[1.15rem]"
          )}
        >
          {project.name}
        </span>

        <p
          className={clsx(
            "mt-2 line-clamp-2 leading-[1.6] text-[var(--text-body)]",
            large ? "text-[0.95rem] lg:text-[1rem]" : "text-[0.82rem]"
          )}
        >
          {project.description}
        </p>

        <span
          className={clsx(
            "mt-4 inline-flex items-center gap-2 font-heading font-medium uppercase tracking-[0.1em] text-[var(--primary)]",
            large ? "text-[0.85rem]" : "text-[0.72rem]"
          )}
        >
          VIEW PROJECT
          <ExternalLink
            size={large ? 16 : 14}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </a>
  );
}

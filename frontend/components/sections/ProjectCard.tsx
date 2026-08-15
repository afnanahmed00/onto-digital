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
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${project.name} — opens in a new tab`}
      className={clsx(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-[20px] border border-[#262626] bg-[#050505] transition-all duration-500 hover:border-[#51FF73] hover:shadow-[0_0_30px_rgba(81,255,115,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51FF73] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        SIZE_SPAN_CLASSES[project.size],
        project.featured && "ring-1 ring-[#51FF73]/35"
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
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/55 group-focus-visible:bg-black/55" />

      {/* Decorative "+" badge — only ever shown alongside the hover overlay, never a separate control (the whole card is the one link) */}
      <span
        aria-hidden="true"
        className="absolute right-4 top-4 z-10 flex h-8 w-8 -translate-y-1 items-center justify-center rounded-full bg-[#51FF73] text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      >
        <Plus size={16} strokeWidth={2.5} />
      </span>

      {/* Default state — image, name, category, arrow. Stays visible on mobile since hover doesn't exist there.
          Padding/text sizes step up with the card: mobile rows are only 150px tall, so they stay compact. */}
      <div className="relative z-10 mt-auto flex items-end justify-between gap-2 p-3 opacity-100 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0 sm:gap-3 sm:p-4 lg:p-5">
        <div className="min-w-0">
          <span className="block truncate font-[var(--font-heading)] text-[0.6rem] font-medium uppercase tracking-[0.12em] text-[#51FF73] sm:text-[0.65rem] sm:tracking-[0.14em] lg:text-[0.68rem]">
            {project.category}
          </span>
          <span className="mt-1 block truncate font-[var(--font-heading)] text-[0.85rem] font-medium uppercase text-white sm:text-[0.95rem] lg:text-[1.05rem]">
            {project.name}
          </span>
        </div>

        <ArrowUpRight size={16} className="shrink-0 text-[#51FF73] sm:h-[18px] sm:w-[18px]" aria-hidden="true" />
      </div>

      {/* Hover state (desktop) / keyboard-focus state — category, name, description, CTA */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="inline-flex w-fit items-center rounded-md bg-[#51FF73]/15 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.1em] text-[#51FF73]">
          {project.category}
        </span>

        <span className="mt-3 font-[var(--font-heading)] text-[1.15rem] font-semibold uppercase text-white">
          {project.name}
        </span>

        <p className="mt-2 line-clamp-2 text-[0.82rem] leading-[1.6] text-[#A7A7A7]">
          {project.description}
        </p>

        <span className="mt-4 inline-flex items-center gap-2 font-[var(--font-heading)] text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[#51FF73]">
          VIEW PROJECT
          <ExternalLink
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </a>
  );
}

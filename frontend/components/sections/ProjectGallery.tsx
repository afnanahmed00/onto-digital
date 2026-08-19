"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import ProjectFilters from "@/components/sections/ProjectFilters";
import ProjectCard from "@/components/sections/ProjectCard";
import { getProjects, getProjectCategories } from "@/services/projects";
import type { Project } from "@/types/project";

const ALL_CATEGORY = "ALL";

// Shared with GallerySkeleton so the loading placeholder mirrors the real
// bento rhythm instead of a flat, unrelated grid.
//
// Every card is exactly one row tall at each breakpoint (grid-auto-rows is
// fixed, not content-driven) — width is the only thing that varies, via
// each card's size-derived col-span (see SIZE_SPAN_CLASSES in
// ProjectCard.tsx). grid-flow-dense packs cards into any gap a col-span-2
// item leaves behind, so nothing needs manual positioning as the project
// count or size mix changes. Mobile stays a strict single column ("one
// project per row") with a shorter row height, since a full-width card
// doesn't need the same visual weight as a desktop tile.
const GRID_CLASSES =
  "grid grid-cols-1 auto-rows-[180px] gap-3 sm:grid-cols-2 sm:auto-rows-[220px] sm:gap-3.5 sm:grid-flow-dense lg:grid-cols-3 lg:auto-rows-[280px]";

export default function ProjectGallery() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [hasError, setHasError] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);

  useEffect(() => {
    let cancelled = false;

    getProjects()
      .then((data) => {
        if (!cancelled) setProjects(data);
      })
      .catch(() => {
        if (!cancelled) setHasError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(
    () => (projects ? getProjectCategories(projects) : []),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (activeCategory === ALL_CATEGORY) return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [projects, activeCategory]);

  const isLoading = !hasError && projects === null;

  return (
    <section className="border-t border-[#1f1f1f] bg-black">
      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14 xl:px-10">
        {!isLoading && !hasError && projects && projects.length > 0 && (
          <ProjectFilters
            categories={categories}
            selected={activeCategory}
            onChange={setActiveCategory}
          />
        )}

        <div className="mt-8 sm:mt-10">
          {hasError ? (
            <StatusMessage
              title="Unable to load projects."
              description="Please refresh the page or try again shortly."
            />
          ) : isLoading ? (
            <GallerySkeleton />
          ) : projects && projects.length === 0 ? (
            <StatusMessage title="No projects yet" description="New work is coming soon." />
          ) : filteredProjects.length === 0 ? (
            <StatusMessage
              title="No projects in this category"
              description="Try a different category or view all projects."
            />
          ) : (
            <div className={GRID_CLASSES}>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function StatusMessage({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-[20px] border border-[#262626] bg-[#050505] px-6 py-20 text-center">
      <p className="font-[var(--font-heading)] text-[1rem] font-medium uppercase tracking-[0.08em] text-white">
        {title}
      </p>
      <p className="text-[0.85rem] text-[#A7A7A7]">{description}</p>
    </div>
  );
}

// Mirrors SIZE_SPAN_CLASSES in ProjectCard.tsx: true = "large" (sm:col-span-2).
const SKELETON_WIDE = [true, false, false, false, true, false];

function GallerySkeleton() {
  return (
    <div className={GRID_CLASSES} aria-hidden="true">
      {SKELETON_WIDE.map((isWide, index) => (
        <div
          key={index}
          className={clsx(
            "h-full w-full animate-pulse rounded-[20px] border border-[#262626] bg-[#0A0A0A]",
            isWide && "sm:col-span-2"
          )}
        />
      ))}
    </div>
  );
}

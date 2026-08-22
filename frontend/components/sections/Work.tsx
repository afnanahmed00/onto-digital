import Link from "next/link";
import ProjectCard from "@/components/sections/ProjectCard";
import { getProjects } from "@/services/projects";

// How many projects this homepage preview shows — always the first N from
// the admin-managed project list (already sorted by displayOrder), so
// reordering/adding/removing a project in Admin → Projects is reflected
// here automatically, same as the full gallery at /projects. Laid out 2
// per row (see the grid below), so this is also always an even number.
const PREVIEW_COUNT = 4;

export default async function Work() {
  let projects: Awaited<ReturnType<typeof getProjects>> = [];

  try {
    projects = (await getProjects()).slice(0, PREVIEW_COUNT);
  } catch {
    // Home page keeps rendering without this section on a backend outage —
    // ProjectGallery on /projects carries the fuller error state for this
    // same data (see Services.tsx for the same convention).
  }

  if (projects.length === 0) return null;

  return (
    <section className="border-t border-[#1f1f1f] bg-black">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-10 sm:px-8 sm:py-11 lg:gap-12 lg:px-10 lg:py-12 xl:px-10">

        <div className="flex flex-col gap-12 lg:flex-row lg:items-start">

          {/* Left Content */}
         <div className="flex w-full max-w-[20rem] flex-col justify-center text-left shrink-0">

            <span className="font-heading text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[#51FF73]">
              OUR WORK
            </span>

            <h2 className="mt-2 text-[2rem] font-medium uppercase leading-[1.08] sm:text-[2.75rem] lg:text-[2.75rem]">
              DIGITAL PRODUCTS
              <br />
              THAT MAKE AN
              <br />
              IMPACT
            </h2>

            <p className="mt-6 max-w-[20rem] text-[1rem] leading-[1.8] text-[#A7A7A7] lg:text-[1rem]">
              Explore a selection of our recent projects that helped brands
              grow, engage and lead.
            </p>

          </div>

          {/* Project Cards — same ProjectCard used on /projects, always 2 per
              row here (the bento "large" span is deliberately not used;
              that's for the fuller gallery, not this fixed strip). Cards
              are bigger than the gallery's 3-up grid, so `large` bumps the
              card's text/icon sizes up to match. */}
          <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2">

            {projects.map((project) => (
              <div key={project.id} className="relative aspect-[16/11]">
                <ProjectCard project={{ ...project, size: "medium" }} large />
              </div>
            ))}

          </div>

        </div>

        {/* View All CTA — after all projects */}
        <div className="flex justify-center lg:justify-end">

          <Link
            href="/projects"
            className="group flex items-center gap-4 font-heading text-[0.75rem] font-medium uppercase tracking-[0.08em] text-[#51FF73]"
          >
            VIEW ALL CASE STUDIES

            <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </Link>

        </div>

      </div>
    </section>
  );
}
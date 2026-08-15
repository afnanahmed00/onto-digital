import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";

export default function ServicesHero() {
  return (
    <section className="bg-black">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center px-5 pt-28 pb-12 text-center sm:px-8 sm:pt-28 sm:pb-14 lg:px-10 lg:pt-40 lg:pb-16 xl:px-10">

        <span className="font-[var(--font-heading)] text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[#51FF73]">
          OUR SERVICES
        </span>

        <h1 className="mt-3 max-w-[46rem] font-[var(--font-heading)] text-[2.1rem] font-medium uppercase leading-[1.1] sm:text-[2.75rem] lg:text-[3.4rem]">
          DIGITAL SOLUTIONS
          <br />
          THAT <span className="text-[#51FF73]">DRIVE RESULTS</span>
        </h1>

        <p className="mt-5 max-w-[38rem] text-[0.85rem] leading-[1.9] text-[#A7A7A7] sm:text-[0.95rem]">
          From strategy and design to development and growth, we deliver
          end-to-end digital solutions that help your brand stand out,
          scale faster and achieve remarkable results.
        </p>

        <div className="mt-8 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-8">
          <Link
            href="/contact"
            className="group flex h-[45px] w-full items-center justify-center gap-3 rounded-xl border border-[#51FF73] px-7 font-[var(--font-heading)] text-[0.8rem] font-medium uppercase tracking-[0.08em] transition-all duration-300 hover:bg-[#51FF73] hover:text-black sm:w-auto"
          >
            <ArrowUpRight
              size={16}
              className="text-[#51FF73] transition-colors group-hover:text-black"
            />
            LET'S BUILD TOGETHER
          </Link>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 font-[var(--font-heading)] text-[0.8rem] font-medium uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:text-[#51FF73]"
          >
            VIEW OUR WORK

            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#51FF73] text-[#51FF73] transition-transform duration-300 group-hover:translate-x-1">
              <ChevronRight size={14} />
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}

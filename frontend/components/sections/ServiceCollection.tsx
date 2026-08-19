import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

export default function ServiceCollection() {
  return (
    <section className="border-t border-[#1f1f1f] bg-black">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16 xl:px-10">

        <span className="font-[var(--font-heading)] text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[#51FF73]">
          WHAT WE DO
        </span>

        <h2 className="mt-2 max-w-[38rem] font-[var(--font-heading)] text-[2rem] font-medium uppercase leading-[1.08] sm:text-[2.5rem]">
          SERVICES BUILT TO
          <br />
          ELEVATE YOUR BUSINESS
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.slug}
                className="group relative flex flex-col overflow-hidden rounded-[1.25rem] border border-[#262626] bg-[#050505] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#51FF73] hover:shadow-[0_0_30px_rgba(81,255,115,.15)] sm:p-7 lg:p-8"
              >
                {/* Top shine */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-16 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#51FF73]/25 opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:h-20 sm:w-32" />

                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#51FF73] bg-[#0A0A0A] text-[#51FF73]">
                  <Icon size={20} />
                </div>

                <h3 className="relative mt-5 font-[var(--font-heading)] text-[1rem] font-medium uppercase leading-[1.2] text-white sm:text-[1.1rem]">
                  {service.breadcrumbLabel.toUpperCase()}
                </h3>

                <p className="relative mt-3 flex-1 text-[0.82rem] leading-[1.7] text-[#A7A7A7]">
                  {service.shortDescription}
                </p>

                <Link
                  href={`/services/${service.slug}`}
                  className="group/link relative mt-6 flex items-center gap-2 self-start font-[var(--font-heading)] text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[#51FF73]"
                >
                  LEARN MORE
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                  />
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

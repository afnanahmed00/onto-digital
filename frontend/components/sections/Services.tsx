import Link from "next/link";
import { services } from "@/data/services";

export default function Services() {
    return (
        <section className="border-t border-[#1f1f1f] bg-black">
            <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-12 sm:px-8 sm:py-14 lg:flex-row lg:gap-12 lg:px-10 lg:py-14 xl:px-10">

                {/* Left Content */}
                <div className="flex w-full max-w-[22rem] flex-col justify-center  text-left">
                    <span className="font-[var(--font-heading)] text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[#51FF73]">
                        WHAT WE DO
                    </span>

                    <h2 className="mt-2 font-[var(--font-heading)] text-[2rem] sm:text-[2.75rem] font-medium uppercase leading-[1.08]">
                        DIGITAL SOLUTIONS
                        <br />
                        BUILT TO PERFORM
                    </h2>

                    <p className="mt-6 max-w-[20rem] text-[1rem] leading-[1.7] text-[#9A9A9A]">
                        From strategy to deployment, we build digital products that are
                        fast, scalable and designed to deliver real results.
                    </p>

                    <Link
                        href="/services"
                        className="group mt-5 flex items-center gap-4 font-[var(--font-heading)] text-[0.75rem] font-medium uppercase tracking-[0.08em] text-[#51FF73]"
                    >
                        Explore All Services
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                            ↗
                        </span>
                    </Link>
                </div>

                {/* Right Grid */}
                <div className="grid flex-1 grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:gap-5">
                    {services.map((service) => {
                        const Icon = service.icon;

                        return (
                            <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="group relative flex min-h-[11rem] flex-col overflow-hidden rounded-[1rem] border border-[#262626] bg-[#050505] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#51FF73] hover:shadow-[0_0_30px_rgba(81,255,115,.15)] sm:min-h-[18rem] sm:rounded-[1.25rem] sm:p-5 lg:min-h-[21rem] lg:p-7"
                            >
                                {/* Top shine */}
                                <div className="pointer-events-none absolute left-1/2 top-0 h-16 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#51FF73]/25 opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:h-20 sm:w-32" />

                                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#51FF73] bg-[#0A0A0A] text-[#51FF73] sm:h-12 sm:w-12">
                                    <Icon size={18} className="sm:hidden" />
                                    <Icon size={22} className="hidden sm:block" />
                                </div>

                                <h3 className="relative mt-4 text-[0.85rem] leading-[1.2] font-[var(--font-heading)] font-medium uppercase text-white sm:mt-6 sm:text-[1.25rem] lg:text-[1.35rem]">
                                    {service.breadcrumbLabel.toUpperCase()}
                                </h3>

                                <p className="relative mt-2 flex-1 break-words text-[0.72rem] leading-[1.6] text-[#A7A7A7] sm:mt-5 sm:text-[0.875rem] sm:leading-[1.8] lg:text-[0.8rem]">
                                    {service.shortDescription}
                                </p>

                                <div className="relative mt-3 flex justify-end sm:mt-5">
                                    <span className="text-[18px] text-[#51FF73] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:text-[26px]">
                                        ↗
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

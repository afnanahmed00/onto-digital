import { Code2, Box, PenTool, ShoppingBag, Target, ShieldCheck, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "WEB DEVELOPMENT",
    description:
      "High-performance websites built with modern technologies for speed, scalability and seamless experiences.",
  },
  {
    icon: Box,
    title: "WEB APPLICATIONS",
    description:
      "Powerful custom web applications to streamline processes and accelerate your business growth.",
  },
  {
    icon: PenTool,
    title: "UI/UX DESIGN",
    description:
      "Beautiful, intuitive designs that engage users and turn complex ideas into simple experiences.",
  },
  {
    icon: ShoppingBag,
    title: "E-COMMERCE SOLUTIONS",
    description:
      "Conversion-focused eCommerce solutions that drive sales and deliver exceptional customer experiences.",
  },
  {
    icon: Target,
    title: "BRANDING & IDENTITY",
    description:
      "Strong brand identities that communicate value and create lasting impressions.",
  },
  {
    icon: ShieldCheck,
    title: "MAINTENANCE & SUPPORT",
    description:
      "Ongoing support and maintenance to keep your digital products secure, fast and up-to-date.",
  },
];

export default function ServiceCollection() {
  return (
    <section className="border-t border-[#1f1f1f] bg-black">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-16 xl:px-16">

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
                key={service.title}
                className="group relative flex flex-col overflow-hidden rounded-[1.25rem] border border-[#262626] bg-[#050505] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#51FF73] hover:shadow-[0_0_30px_rgba(81,255,115,.15)] sm:p-7"
              >
                {/* Top shine */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-16 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#51FF73]/25 opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:h-20 sm:w-32" />

                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#51FF73] bg-[#0A0A0A] text-[#51FF73]">
                  <Icon size={20} />
                </div>

                <h3 className="relative mt-5 font-[var(--font-heading)] text-[1rem] font-medium uppercase leading-[1.2] text-white sm:text-[1.1rem]">
                  {service.title}
                </h3>

                <p className="relative mt-3 flex-1 text-[0.82rem] leading-[1.7] text-[#A7A7A7]">
                  {service.description}
                </p>

                <button className="group/link relative mt-6 flex items-center gap-2 self-start font-[var(--font-heading)] text-[0.72rem] font-medium uppercase tracking-[0.1em] text-[#51FF73]">
                  LEARN MORE
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                  />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

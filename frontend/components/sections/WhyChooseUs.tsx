import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type WhyChooseUsProps = {
  badge: string;
  title: ReactNode;
  description: string;
  buttonText: string;
  buttonHref?: string;
  cards: Feature[];
};

export default function WhyChooseUs({
  badge,
  title,
  description,
  buttonText,
  buttonHref = "/contact",
  cards,
}: WhyChooseUsProps) {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-[1440px] px-5 pt-[50px] pb-[50px] sm:px-8 sm:pt-16 sm:pb-16 lg:px-10 lg:pt-20 lg:pb-20 xl:px-10">

        <div className="grid items-center gap-8 lg:grid-cols-[35%_65%]">

          {/* Left */}

          <div>

            <span className="font-heading text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[var(--primary)]">
              {badge}
            </span>

            <h2 className="mt-2 text-[2.2rem] font-medium uppercase leading-[1.08] sm:text-[2.75rem] lg:text-[2.75rem]">
              {title}
            </h2>

            <p className="mt-4 text-[1rem] leading-[1.9] text-[var(--text-body)]">
              {description}
            </p>

            <Link
              href={buttonHref}
              className="group mt-9 inline-flex h-[36px] items-center gap-2 whitespace-nowrap rounded-xl border border-[var(--primary)] px-4 font-heading text-[0.62rem] font-medium uppercase tracking-[0.08em] transition-all duration-300 hover:bg-[var(--primary)] hover:text-black sm:h-[45px] sm:gap-4 sm:px-7 sm:text-[0.85rem]"
            >
              {buttonText}
              <span className="text-[var(--primary)] text-[0.85rem] transition-all group-hover:text-black sm:text-[1rem]">
                ↗
              </span>
            </Link>

          </div>

          {/* Right */}

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">

            {cards.map(({ icon: Icon, title, description }) => (

              <div
                key={title}
                className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-[var(--border-card)] bg-[var(--card)] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-[0_0_30px_rgba(81,255,115,.15)] sm:rounded-[20px] sm:p-5 lg:p-6"
              >

                {/* Top shine */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-16 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/25 opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:h-20 sm:w-32" />

                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-card)] text-[var(--primary)] sm:h-12 sm:w-12">
                  <Icon size={18} strokeWidth={1.75} className="sm:hidden" />
                  <Icon size={22} strokeWidth={1.75} className="hidden sm:block" />
                </div>

                <h3 className="relative mt-4 text-[0.8rem] font-medium uppercase leading-tight text-white sm:mt-5 sm:text-[1rem]">
                  {title}
                </h3>

                <p className="relative mt-2 text-[0.72rem] leading-[1.6] text-[var(--text-body)] sm:mt-3 sm:text-[0.875rem] sm:leading-[1.8] lg:text-[0.8rem]">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}

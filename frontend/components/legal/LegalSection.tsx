import type { ReactNode } from "react";

type LegalSectionProps = {
  number: string;
  title: string;
  children: ReactNode;
};

/** A single numbered clause used on the legal pages (e.g. "01. INTRODUCTION"). */
export default function LegalSection({ number, title, children }: LegalSectionProps) {
  return (
    <section className="py-6 sm:py-8">
      <h2 className="text-[1.05rem] font-semibold leading-snug text-white sm:text-[1.15rem]">
        <span className="text-[var(--primary)]">{number}.</span> {title}
      </h2>

      <div className="mt-3 space-y-4 text-[0.95rem] leading-[1.8] text-[var(--text-body)] [&_a]:text-[var(--primary)] [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors [&_a]:duration-300 [&_a:hover]:text-white [&_a:focus-visible]:outline [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-[var(--primary)] [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

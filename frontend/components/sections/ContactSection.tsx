import type { ReactNode } from "react";
import ContactForm from "@/components/forms/ContactForm";
import { contactInfo } from "@/data/contactInfo";

const infoRowStyles =
  "group/item -mx-3 flex items-start gap-4 rounded-xl px-3 py-5 transition-all duration-300 first:pt-0 last:pb-0 hover:-translate-y-1 hover:bg-white/[0.03]";

/** Renders as a link when a real destination exists, otherwise a plain row. */
function ContactInfoRow({ href, children }: { href?: string; children: ReactNode }) {
  if (!href) {
    return <div className={infoRowStyles}>{children}</div>;
  }

  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      className={infoRowStyles}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export default function ContactSection() {
  return (
    <section id="contact-form" className="border-t border-[#1f1f1f] bg-black">
      <div className="mx-auto max-w-[1440px] px-5 pt-[50px] pb-[50px] sm:px-8 sm:pt-16 sm:pb-16 lg:px-10 lg:pt-20 lg:pb-20 xl:px-10">
        <div className="grid gap-6 lg:grid-cols-[60%_40%] lg:gap-8">

          {/* Send us a message */}
          <div className="relative overflow-hidden rounded-[20px] border border-[#262626] bg-[#050505] p-6 sm:rounded-[24px] sm:p-8 lg:p-10">

            {/* Top glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-20 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#51FF73]/25 opacity-70 blur-2xl sm:h-24 sm:w-52" />

            <h2 className="relative font-[var(--font-heading)] text-[1.3rem] font-medium uppercase leading-tight text-white sm:text-[1.5rem]">
              SEND US A MESSAGE
            </h2>

            <p className="relative mt-2 max-w-md text-[0.9rem] leading-[1.8] text-[#A7A7A7]">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>

            <div className="relative">
              <ContactForm />
            </div>
          </div>

          {/* Contact information */}
          <div className="relative overflow-hidden rounded-[20px] border border-[#262626] bg-[#050505] p-6 sm:rounded-[24px] sm:p-8 lg:p-10">

            {/* Top glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-20 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#51FF73]/25 opacity-70 blur-2xl sm:h-24 sm:w-52" />

            <h2 className="relative font-[var(--font-heading)] text-[1.3rem] font-medium uppercase leading-tight text-white sm:text-[1.5rem]">
              CONTACT INFORMATION
            </h2>

            <div className="relative mt-6 flex flex-col divide-y divide-[#1f1f1f] sm:mt-8">
              {contactInfo.map(({ icon: Icon, title, value, description, href }) => (
                <ContactInfoRow key={title} href={href}>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#262626] text-[#51FF73] transition-colors duration-300 group-hover/item:border-[#51FF73] group-hover/item:shadow-[0_0_20px_rgba(81,255,115,.2)]">
                    <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                  </span>

                  <span className="flex flex-col">
                    <span className="font-[var(--font-heading)] text-[0.78rem] font-medium uppercase tracking-[0.12em] text-white">
                      {title}
                    </span>

                    <span className="mt-1.5 font-sans text-[0.9rem] leading-[1.5] text-white">
                      {value}
                    </span>

                    <span className="mt-1 text-[0.78rem] leading-[1.6] text-[#A7A7A7]">
                      {description}
                    </span>
                  </span>
                </ContactInfoRow>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

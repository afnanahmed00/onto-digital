import Link from "next/link";
import { CheckCircle2, ChevronRight, Clock, Mail, MessageCircle } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import { SITE } from "@/config/site";
import type { Service } from "@/data/services";

/**
 * Renders the Service Detail hero + quote form for a single service. Driven
 * entirely by the `service` prop (see data/services.ts) so it works for
 * every slug under /services/[slug] without per-service markup.
 */
export default function ServiceDetail({ service }: { service: Service }) {
  const whatsappHref = `https://wa.me/${SITE.phone.replace(/\D/g, "")}`;
  const emailHref = `mailto:${SITE.email}`;

  return (
    <section className="bg-black">
      <div className="mx-auto max-w-[1440px] px-5 pt-24 pb-12 sm:px-8 sm:pt-28 sm:pb-14 lg:px-10 lg:pt-32 lg:pb-16 xl:px-10">

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[0.78rem] text-[#A7A7A7]"
        >
          <Link href="/" className="transition-colors duration-300 hover:text-white">
            Home
          </Link>
          <ChevronRight size={13} className="text-[#4A4A4A]" />
          <Link href="/services" className="transition-colors duration-300 hover:text-white">
            Services
          </Link>
          <ChevronRight size={13} className="text-[#4A4A4A]" />
          <span className="text-[#51FF73]">{service.breadcrumbLabel}</span>
        </nav>

        <div className="mt-8 grid items-start gap-10 sm:mt-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">

          {/* Left — service info */}
          <div>
            <span className="font-heading text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[#51FF73]">
              {service.badge}
            </span>

            <h1 className="mt-2 text-[2rem] font-medium uppercase leading-[1.05] sm:text-[3rem] lg:text-[3rem]">
              {service.titleLines[0]}
              <br />
              <span className="text-[#51FF73]">{service.titleLines[1]}</span>
            </h1>

            <p className="mt-5 max-w-[38rem] text-[0.9rem] leading-[1.9] text-white/90 sm:text-[0.95rem]">
              {service.shortDescription}
            </p>

            <p className="mt-3 max-w-[38rem] text-[0.85rem] leading-[1.9] text-[#A7A7A7]">
              {service.description}
            </p>

            {/* Feature grid */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {service.features.map(({ icon: FeatureIcon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#262626] bg-[#0A0A0A] text-[#51FF73]">
                    <FeatureIcon size={20} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="font-heading text-[0.85rem] font-medium uppercase leading-tight text-white">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* What You Get */}
            {service.whatYouGet.length > 0 && (
              <div className="relative mt-10 overflow-hidden rounded-[20px] border border-[#262626] bg-[#050505] p-6 sm:p-7">
                <div className="pointer-events-none absolute left-1/2 top-0 h-16 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#51FF73]/25 opacity-70 blur-2xl" />

                <h2 className="relative text-[1rem] font-medium uppercase leading-tight text-white sm:text-[1.1rem]">
                  What You Get
                </h2>

                <ul className="relative mt-4 flex flex-col gap-3">
                  {service.whatYouGet.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[0.85rem] leading-[1.7] text-[#A7A7A7]"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-[#51FF73]"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            {service.technologies && service.technologies.length > 0 && (
              <div className="mt-8">
                <h2 className="text-[0.78rem] font-medium uppercase tracking-[0.12em] text-white">
                  Technologies We Use
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[#262626] bg-[#0A0A0A] px-4 py-2 text-[0.75rem] text-[#A7A7A7]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — quote form */}
          <div className="relative overflow-hidden rounded-[20px] border border-[#262626] bg-[#050505] p-6 sm:rounded-[24px] sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute left-1/2 top-0 h-20 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#51FF73]/25 opacity-70 blur-2xl sm:h-24 sm:w-52" />

            <h2 className="relative text-[1.3rem] font-medium uppercase leading-tight text-white sm:text-[1.5rem]">
              <span className="text-[#51FF73]">GET QUOTE</span> FOR YOUR PROJECT
            </h2>

            <p className="relative mt-2 max-w-md text-[0.9rem] leading-[1.8] text-[#A7A7A7]">
              Tell us about your project and we&apos;ll get back to you with next steps.
            </p>

            <div className="relative">
              {/* key forces a remount on slug change so the Service field
                  re-initializes to the newly selected service. */}
              <ContactForm key={service.slug} defaultService={service.contactServiceValue} />
            </div>

            {/* Direct contact */}
            <div className="relative mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="group flex h-[48px] items-center justify-center gap-2 rounded-xl border border-[#262626] bg-[#0A0A0A] font-heading text-[0.8rem] font-medium uppercase tracking-[0.06em] text-white transition-all duration-300 hover:border-[#51FF73] hover:text-[#51FF73]"
              >
                <MessageCircle size={17} strokeWidth={1.75} aria-hidden="true" />
                WhatsApp
              </a>

              <a
                href={emailHref}
                className="group flex h-[48px] items-center justify-center gap-2 rounded-xl border border-[#262626] bg-[#0A0A0A] font-heading text-[0.8rem] font-medium uppercase tracking-[0.06em] text-white transition-all duration-300 hover:border-[#51FF73] hover:text-[#51FF73]"
              >
                <Mail size={17} strokeWidth={1.75} aria-hidden="true" />
                Email
              </a>
            </div>

            {/* Response note */}
            <p className="relative mt-6 flex items-start gap-2 text-[0.78rem] leading-[1.7] text-[#A7A7A7]">
              <Clock size={14} className="mt-0.5 shrink-0 text-[#51FF73]" aria-hidden="true" />
              ONTO DIGITAL typically requires a minimum of 24 hours to respond
              to project inquiries.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

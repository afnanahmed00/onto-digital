import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { SITE } from "@/config/site";

// Legal content is explicitly kept off the site's display/heading font
// (Orbitron, applied to <body> by default) in favour of a common system
// font stack — long-form legal text needs to read as plainly as possible.
const LEGAL_FONT_STACK =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

type LegalPageLayoutProps = {
  heading: string;
  lastUpdated: string;
  children: ReactNode;
};

/**
 * Shared shell for the legal pages (Privacy Policy, Terms & Conditions).
 * Header/Footer/FloatingNav are already mounted globally by
 * components/layout/Layout.tsx, so this only renders the page content —
 * an editorial, document-style layout rather than a marketing section.
 */
export default function LegalPageLayout({
  heading,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <div style={{ fontFamily: LEGAL_FONT_STACK }} className="bg-[var(--background)]">
      <section className="mx-auto max-w-[960px] px-5 pt-20 pb-16 sm:px-8 sm:pt-20 lg:px-10 lg:pt-24 lg:pb-20">
        <span className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
          LEGAL
        </span>

        <h1 className="mt-3 text-[1.5rem] font-semibold uppercase leading-tight text-white sm:text-[1.85rem] lg:text-[2.2rem]">
          {heading}
        </h1>

        <p className="mt-3 text-[0.85rem] text-[var(--text-body)]">
          Last updated: {lastUpdated}
        </p>

        <div className="mt-8 border-t border-[var(--border-card)]" />

        <div className="divide-y divide-[var(--border-card)]">{children}</div>

        <p className="mt-10 border-t border-[var(--border-card)] pt-6 text-[0.78rem] leading-[1.8] text-[var(--text-muted)] sm:pt-8">
          These pages provide general website information and are not a
          substitute for professional legal advice. ONTO DIGITAL should have
          these documents reviewed and adapted by a qualified legal
          professional before relying on them as formal legal documents.
        </p>

        <div className="mt-12 rounded-2xl border border-[var(--border-card)] bg-[var(--card)] p-8 text-center sm:mt-14 sm:p-10">
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
            QUESTIONS?
          </span>

          <p className="mx-auto mt-3 max-w-[32rem] text-[0.9rem] leading-[1.8] text-[var(--text-body)]">
            For privacy-related or terms-related questions, contact{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="text-[var(--primary)] underline underline-offset-2 transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            >
              {SITE.email}
            </a>
          </p>

          <div className="mt-6 flex justify-center">
            <Button href="/contact" variant="outline">
              CONTACT US
              <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

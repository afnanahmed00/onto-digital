import type { ElementType } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight, X as XIcon } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { LinkedinIcon, InstagramIcon, DribbbleIcon } from "@/components/ui/SocialIcon";
import { SITE } from "@/config/site";
import { SOCIALS } from "@/config/social";

const FOOTER_COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "/services" },
      { label: "Web Applications", href: "/services" },
      { label: "UI/UX Design", href: "/services" },
      { label: "E-Commerce", href: "/services" },
      { label: "Branding & Identity", href: "/services" },
      { label: "Maintenance & Support", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Process", href: "/#process" },
      { label: "Case Studies", href: "/projects" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-and-conditions" },
    ],
  },
];

const SOCIAL_LINKS: { name: string; href: string; icon: ElementType }[] = [
  { name: "LinkedIn", href: SOCIALS.linkedin || "#", icon: LinkedinIcon },
  { name: "X", href: SOCIALS.x || "#", icon: XIcon },
  { name: "Dribbble", href: SOCIALS.github || "#", icon: DribbbleIcon },
  { name: "Instagram", href: SOCIALS.instagram || "#", icon: InstagramIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-10 pt-16 md:px-10 lg:pt-24 xl:px-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />

            <p className="mt-6 max-w-[280px] text-[15px] leading-7 text-[var(--text-secondary)]">
              We craft high-performance digital solutions that help ambitious
              brands grow, scale and lead in the digital world.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-white transition-colors duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-[var(--font-heading)] text-sm font-bold uppercase tracking-[0.1em] text-white">
                {col.title}
              </h3>
              <span className="mt-3 block h-[2px] w-6 bg-[var(--primary)]" />

              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--primary)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Let's Connect */}
          <div>
            <h3 className="font-[var(--font-heading)] text-sm font-bold uppercase tracking-[0.1em] text-white">
              Let&apos;s Connect
            </h3>
            <span className="mt-3 block h-[2px] w-6 bg-[var(--primary)]" />

            <ul className="mt-5 flex flex-col gap-4">
              <li className="flex items-center gap-3 text-[15px] text-[var(--text-secondary)]">
                <Mail size={16} className="shrink-0 text-[var(--primary)]" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-[15px] text-[var(--text-secondary)]">
                <Phone size={16} className="shrink-0 text-[var(--primary)]" />
                <a href={`tel:${SITE.phone}`} className="hover:text-white">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-[15px] text-[var(--text-secondary)]">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--primary)]" />
                <span>{SITE.address}</span>
              </li>
            </ul>

            <Button href="/contact" variant="pill" className="mt-6">
              Let&apos;s Talk
              <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-xs uppercase tracking-[0.1em] text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} <span className="text-[var(--primary)]">Onto.Digital</span>. All Rights
            Reserved.
          </p>
          <p>
            Built With <span className="text-[var(--primary)]">Passion &amp; Precision</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

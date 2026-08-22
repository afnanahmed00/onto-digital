import type { Metadata } from "next";
import ServicesHero from "@/components/sections/ServicesHero";
import ServiceCollection from "@/components/sections/ServiceCollection";
import TechStack from "@/components/sections/TechStack";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Process from "@/components/sections/Process";
import { serviceFeatures } from "@/data/serviceFeatures";
import { serviceProcess } from "@/data/serviceProcess";
import FAQ from "@/components/sections/FAQ";
import { serviceFaqs } from "@/data/serviceFaqs";
import CTA from "@/components/sections/CTA";
import { SITE } from "@/config/site";

// ServiceCollection fetches from the Render backend on every render (see
// services/services.ts) — force-dynamic keeps that fetch off the Vercel
// build (which has no live backend to hit) and defers it to request time
// instead, the same way ProjectGallery already does client-side for
// /projects.
export const dynamic = "force-dynamic";

const description =
  "Explore ONTO DIGITAL's services — web development, UI/UX design, web applications, e-commerce and branding built to scale your business.";

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `Services | ${SITE.name}`,
    description,
    url: "/services",
  },
  twitter: {
    title: `Services | ${SITE.name}`,
    description,
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceCollection />
      <TechStack />
      <WhyChooseUs
        badge="WHY WORK WITH ONTO DIGITAL?"
        title={
          <>
            MORE THAN A
            <br />
            SERVICE PROVIDER
            <br />
            WE ARE YOUR <span className="text-[var(--primary)]">DIGITAL PARTNER</span>
          </>
        }
        description="From planning and design to development and long-term support, we work as an extension of your team to deliver measurable business growth."
        buttonText="START YOUR PROJECT"
        buttonHref="/contact"
        cards={serviceFeatures}
      />
      <Process
        badge="OUR PROCESS"
        heading={
          <>
            HOW WE
            <br />
            DELIVER
            <br />
            RESULTS
          </>
        }
        description="A transparent and collaborative workflow that ensures every project is delivered on time, with quality and measurable business impact."
        steps={serviceProcess}
      />
      <FAQ
        badge="FREQUENTLY ASKED QUESTIONS"
        heading={
          <>
            GOT QUESTIONS?
            <br />
            WE HAVE
            <br />
            <span className="text-[var(--primary)]">ANSWERS</span>
          </>
        }
        description="Find answers to the most common questions about our services, development process and project delivery."
        faqs={serviceFaqs}
      />
      <CTA />
    </>
  );
}

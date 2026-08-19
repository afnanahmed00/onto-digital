import type { Metadata } from "next";
import ContactHero from "@/components/sections/ContactHero";
import ContactSection from "@/components/sections/ContactSection";
import Process from "@/components/sections/Process";
import CTA from "@/components/sections/CTA";
import { homeProcess } from "@/data/homeProcess";
import { SITE } from "@/config/site";

const description =
  "Get in touch with ONTO DIGITAL to start your next web development, design or digital branding project.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact | ${SITE.name}`,
    description,
    url: "/contact",
  },
  twitter: {
    title: `Contact | ${SITE.name}`,
    description,
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
      <Process
        badge="OUR PROCESS"
        heading={
          <>
            A CLEAR PROCESS
            <br />
            DESIGNED FOR
            <br />
            SUCCESS
          </>
        }
        description="A clear, collaborative process that turns ideas into powerful digital solutions."
        steps={homeProcess}
      />
      <CTA />
    </>
  );
}

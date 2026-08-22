import type { Metadata } from "next";
import AboutHero from "@/components/sections/AboutHero";
import OurValues from "@/components/sections/OurValues";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CTA from "@/components/sections/CTA";
import Process from "@/components/sections/Process";
import { aboutFeatures } from "@/data/aboutFeatures";
import { aboutProcess } from "@/data/aboutProcess";
import { SITE } from "@/config/site";

const description =
  "Learn about ONTO DIGITAL — a premium digital agency combining strategy, creativity and technology to build digital experiences that drive real growth.";

export const metadata: Metadata = {
  title: "About Us",
  description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About Us | ${SITE.name}`,
    description,
    url: "/about",
  },
  twitter: {
    title: `About Us | ${SITE.name}`,
    description,
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhyChooseUs
        badge="WHY CHOOSE ONTO DIGITAL?"
        title={
          <>
            WE DON&apos;T JUST BUILD
            <br />
            WE SOLVE
            <br />
            <span className="text-[var(--primary)]">PROBLEMS</span>
          </>
        }
        description="We combine strategy, creativity and technology to deliver solutions that make a real difference."
        buttonText="WORK WITH US"
        buttonHref="/contact"
        cards={aboutFeatures}
      />
      <OurValues />
      <Process
        badge="OUR PROCESS"
        heading={
          <>
            HOW WE
            <br />
            WORK
            <br />
            TOGETHER
          </>
        }
        description="Our collaborative approach ensures every project is built with transparency, creativity and measurable impact."
        steps={aboutProcess}
      />
      <CTA />
    </>
  );
}


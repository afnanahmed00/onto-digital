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
            WE ARE YOUR <span className="text-[#51FF73]">DIGITAL PARTNER</span>
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
            <span className="text-[#51FF73]">ANSWERS</span>
          </>
        }
        description="Find answers to the most common questions about our services, development process and project delivery."
        faqs={serviceFaqs}
      />
      <CTA />
    </>
  );
}

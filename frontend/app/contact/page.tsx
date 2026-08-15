import ContactHero from "@/components/sections/ContactHero";
import ContactSection from "@/components/sections/ContactSection";
import Process from "@/components/sections/Process";
import CTA from "@/components/sections/CTA";
import { homeProcess } from "@/data/homeProcess";

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

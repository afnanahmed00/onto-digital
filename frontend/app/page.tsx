import Hero from "@/components/hero/Hero";
import TrustedCompanies from "@/components/sections/TrustedCompanies";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import { homeProcess } from "@/data/homeProcess";


export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedCompanies />
      <Services />
      <Process
        badge="OUR PROCESS"
        heading={
          <>
            A PROCESS
            <br />
            DESIGNED
            <br />
            FOR SUCCESS
          </>
        }
        description="A clear, collaborative process that turns ideas into powerful digital solutions."
        steps={homeProcess}
      />
      <Work />
      <Stats />
      <Testimonials />
      <CTA />
    
    </>
  );
}
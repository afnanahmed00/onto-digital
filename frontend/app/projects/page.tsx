import type { Metadata } from "next";
import ProjectsHero from "@/components/sections/ProjectsHero";
import ProjectGallery from "@/components/sections/ProjectGallery";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Projects | ONTO DIGITAL",
  description:
    "A selection of recent ONTO DIGITAL work across web development, design, e-commerce and digital experiences.",
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <ProjectGallery />
      <CTA />
    </>
  );
}

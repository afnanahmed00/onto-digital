import type { Metadata } from "next";
import ProjectsHero from "@/components/sections/ProjectsHero";
import ProjectGallery from "@/components/sections/ProjectGallery";
import CTA from "@/components/sections/CTA";
import { SITE } from "@/config/site";
import { SEO } from "@/config/seo";

const description =
  "A selection of recent ONTO DIGITAL work across web development, design, e-commerce and digital experiences.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Projects | ${SITE.name}`,
    description,
    url: "/projects",
    images: [SEO.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects | ${SITE.name}`,
    description,
    images: [SEO.ogImage.url],
  },
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

import type { Project } from "@/types/project";

/**
 * Local seed data for the Projects gallery.
 *
 * This stands in for a future admin-managed source (database + API). It is
 * only ever consumed through services/projects.ts — nothing outside that
 * file should import this array directly, so swapping it for a real API
 * later is a one-file change. See services/projects.ts for the swap point.
 *
 * NOTE: images currently cycle through the three placeholder screenshots
 * in public/images/projects (p1–p3) since real project photography hasn't
 * been supplied yet. Replace each `image` path once real assets exist —
 * the gallery re-renders from data, no component changes needed.
 */
export const projects: Project[] = [
  {
    id: "project-urbanhaus",
    name: "UrbanHaus",
    slug: "urbanhaus",
    category: "WEB DEVELOPMENT",
    description:
      "A refined real-estate showcase site built to present premium listings with cinematic imagery and fast page loads.",
    image: "/images/projects/p1.png",
    websiteUrl: "https://urbanhaus.example.com",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
    size: "large",
    displayOrder: 1,
  },
  {
    id: "project-nextgen-dashboard",
    name: "NextGen Dashboard",
    slug: "nextgen-dashboard",
    category: "WEB APPLICATIONS",
    description:
      "A real-time analytics dashboard for a SaaS platform, built for clarity at a glance and fast data exploration.",
    image: "/images/projects/p2.png",
    websiteUrl: "https://nextgen-dashboard.example.com",
    technologies: ["React", "Node.js", "PostgreSQL"],
    featured: false,
    size: "medium",
    displayOrder: 2,
  },
  {
    id: "project-trackflow",
    name: "TrackFlow",
    slug: "trackflow",
    category: "WEB APPLICATIONS",
    description:
      "A comprehensive project management platform designed to streamline workflows and boost team productivity.",
    image: "/images/projects/p3.png",
    websiteUrl: "https://trackflow.example.com",
    technologies: ["Next.js", "tRPC", "PostgreSQL"],
    featured: true,
    size: "medium",
    displayOrder: 3,
  },
  {
    id: "project-glow-skincare",
    name: "Glow Skincare",
    slug: "glow-skincare",
    category: "E-COMMERCE",
    description:
      "A conversion-focused storefront for a skincare brand, with fast checkout and a clean, editorial product presentation.",
    image: "/images/projects/p1.png",
    websiteUrl: "https://glowskincare.example.com",
    technologies: ["Shopify", "Liquid", "JavaScript"],
    featured: false,
    size: "small",
    displayOrder: 4,
  },
  {
    id: "project-wanderlust",
    name: "Wanderlust",
    slug: "wanderlust",
    category: "WEB DEVELOPMENT",
    description:
      "A travel brand website built around rich photography and an effortless booking enquiry flow.",
    image: "/images/projects/p2.png",
    websiteUrl: "https://wanderlust.example.com",
    technologies: ["Next.js", "Sanity CMS", "Tailwind CSS"],
    featured: false,
    size: "medium",
    displayOrder: 5,
  },
  {
    id: "project-fitpro",
    name: "FitPro",
    slug: "fitpro",
    category: "UI/UX DESIGN",
    description:
      "A mobile fitness app experience designed around habit tracking, progress visualisation and daily motivation.",
    image: "/images/projects/p3.png",
    websiteUrl: "https://fitpro.example.com",
    technologies: ["Figma", "React Native"],
    featured: false,
    size: "small",
    displayOrder: 6,
  },
  {
    id: "project-timecraft",
    name: "Timecraft",
    slug: "timecraft",
    category: "E-COMMERCE",
    description:
      "A luxury watch retailer's online store, built with detailed product configurators and secure checkout.",
    image: "/images/projects/p1.png",
    websiteUrl: "https://timecraft.example.com",
    technologies: ["Next.js", "Stripe", "Sanity CMS"],
    featured: false,
    size: "medium",
    displayOrder: 7,
  },
  {
    id: "project-casa-bistro",
    name: "Casa Bistro",
    slug: "casa-bistro",
    category: "WEB DEVELOPMENT",
    description:
      "A warm, appetite-driving restaurant website with online reservations and a live seasonal menu.",
    image: "/images/projects/p2.png",
    websiteUrl: "https://casabistro.example.com",
    technologies: ["Next.js", "Tailwind CSS"],
    featured: false,
    size: "small",
    displayOrder: 8,
  },
  {
    id: "project-lumen-branding",
    name: "Lumen",
    slug: "lumen",
    category: "BRANDING",
    description:
      "A full brand identity system — logo, typography and visual language — for a renewable-energy startup.",
    image: "/images/projects/p3.png",
    websiteUrl: "https://lumen.example.com",
    technologies: ["Figma", "Illustrator"],
    featured: false,
    size: "medium",
    displayOrder: 9,
  },
];

import "dotenv/config";
import { connectDatabase, disconnectDatabase } from "../database/connection";
import { Project } from "../models/Project.model";

/**
 * One-time import of the 9 example projects — currently hardcoded in
 * frontend/data/projects.ts — into MongoDB (Phase 11), same approach as
 * seedServices.ts. Content is copied verbatim: `name` becomes `title` and
 * `image` becomes `imageUrl` (the Project model's field names), everything
 * else maps 1:1. The frontend-only `size` field (bento grid width — small/
 * medium/large) has no equivalent on the backend Project model, since it's
 * a presentation detail rather than project content — the public gallery
 * now derives it instead (see frontend/services/projects.ts).
 *
 * Idempotent by slug: an existing document with the same slug is left
 * untouched (via $setOnInsert + upsert), so re-running this script never
 * duplicates rows or overwrites an admin's edits.
 *
 * Usage: npm run seed-projects (from backend/)
 */

type SeedProject = {
  title: string;
  slug: string;
  description: string;
  category: string;
  imageUrl: string;
  technologies: string[];
  websiteUrl: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
};

const PROJECTS: SeedProject[] = [
  {
    title: "UrbanHaus",
    slug: "urbanhaus",
    category: "WEB DEVELOPMENT",
    description:
      "A refined real-estate showcase site built to present premium listings with cinematic imagery and fast page loads.",
    imageUrl: "/images/projects/p1.png",
    websiteUrl: "https://urbanhaus.example.com",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    title: "NextGen Dashboard",
    slug: "nextgen-dashboard",
    category: "WEB APPLICATIONS",
    description:
      "A real-time analytics dashboard for a SaaS platform, built for clarity at a glance and fast data exploration.",
    imageUrl: "/images/projects/p2.png",
    websiteUrl: "https://nextgen-dashboard.example.com",
    technologies: ["React", "Node.js", "PostgreSQL"],
    featured: false,
    published: true,
    displayOrder: 2,
  },
  {
    title: "TrackFlow",
    slug: "trackflow",
    category: "WEB APPLICATIONS",
    description:
      "A comprehensive project management platform designed to streamline workflows and boost team productivity.",
    imageUrl: "/images/projects/p3.png",
    websiteUrl: "https://trackflow.example.com",
    technologies: ["Next.js", "tRPC", "PostgreSQL"],
    featured: true,
    published: true,
    displayOrder: 3,
  },
  {
    title: "Glow Skincare",
    slug: "glow-skincare",
    category: "E-COMMERCE",
    description:
      "A conversion-focused storefront for a skincare brand, with fast checkout and a clean, editorial product presentation.",
    imageUrl: "/images/projects/p1.png",
    websiteUrl: "https://glowskincare.example.com",
    technologies: ["Shopify", "Liquid", "JavaScript"],
    featured: false,
    published: true,
    displayOrder: 4,
  },
  {
    title: "Wanderlust",
    slug: "wanderlust",
    category: "WEB DEVELOPMENT",
    description:
      "A travel brand website built around rich photography and an effortless booking enquiry flow.",
    imageUrl: "/images/projects/p2.png",
    websiteUrl: "https://wanderlust.example.com",
    technologies: ["Next.js", "Sanity CMS", "Tailwind CSS"],
    featured: false,
    published: true,
    displayOrder: 5,
  },
  {
    title: "FitPro",
    slug: "fitpro",
    category: "UI/UX DESIGN",
    description:
      "A mobile fitness app experience designed around habit tracking, progress visualisation and daily motivation.",
    imageUrl: "/images/projects/p3.png",
    websiteUrl: "https://fitpro.example.com",
    technologies: ["Figma", "React Native"],
    featured: false,
    published: true,
    displayOrder: 6,
  },
  {
    title: "Timecraft",
    slug: "timecraft",
    category: "E-COMMERCE",
    description:
      "A luxury watch retailer's online store, built with detailed product configurators and secure checkout.",
    imageUrl: "/images/projects/p1.png",
    websiteUrl: "https://timecraft.example.com",
    technologies: ["Next.js", "Stripe", "Sanity CMS"],
    featured: false,
    published: true,
    displayOrder: 7,
  },
  {
    title: "Casa Bistro",
    slug: "casa-bistro",
    category: "WEB DEVELOPMENT",
    description:
      "A warm, appetite-driving restaurant website with online reservations and a live seasonal menu.",
    imageUrl: "/images/projects/p2.png",
    websiteUrl: "https://casabistro.example.com",
    technologies: ["Next.js", "Tailwind CSS"],
    featured: false,
    published: true,
    displayOrder: 8,
  },
  {
    title: "Lumen",
    slug: "lumen",
    category: "BRANDING",
    description:
      "A full brand identity system — logo, typography and visual language — for a renewable-energy startup.",
    imageUrl: "/images/projects/p3.png",
    websiteUrl: "https://lumen.example.com",
    technologies: ["Figma", "Illustrator"],
    featured: false,
    published: true,
    displayOrder: 9,
  },
];

async function run(): Promise<void> {
  await connectDatabase();

  let created = 0;
  let skipped = 0;

  try {
    for (const project of PROJECTS) {
      const result = await Project.updateOne(
        { slug: project.slug },
        { $setOnInsert: project },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        created += 1;
        console.log(`✅ Created: ${project.title} (${project.slug})`);
      } else {
        skipped += 1;
        console.log(`↷  Skipped (already exists): ${project.title} (${project.slug})`);
      }
    }

    console.log(`\nDone. ${created} created, ${skipped} already existed.`);
  } finally {
    await disconnectDatabase();
  }
}

run().catch((error) => {
  console.error("❌ Project seed failed:", error instanceof Error ? error.message : "Unknown error");
  process.exitCode = 1;
});

import "dotenv/config";
import { connectDatabase, disconnectDatabase } from "../database/connection";
import { Service } from "../models/Service.model";
import type { IServiceFeature } from "../types/service.types";

/**
 * One-time import of ONTO DIGITAL's 8 finalized services — currently
 * hardcoded in frontend/data/services.ts — into MongoDB, so the admin
 * dashboard and public site can read them from the database instead of the
 * static frontend array (Phase 11). The content below is copied verbatim
 * from that file: shortDescription/description/features/whatYouGet/
 * technologies match exactly, and each Lucide icon reference (e.g. `Globe`)
 * is stored here by its import name (e.g. "Globe") — the same
 * string-icon-name convention the admin dashboard already uses (see
 * ServiceFormModal.tsx / ServiceFeaturesEditor.tsx), resolved back to a
 * component on the public site (services/services.ts).
 *
 * Idempotent by slug: an existing document with the same slug is left
 * untouched (via $setOnInsert + upsert) rather than overwritten, so
 * re-running this script — or running it after an admin has already edited
 * one of these 8 services — never duplicates rows or clobbers their edits.
 *
 * Usage: npm run seed-services (from backend/)
 */

type SeedFeature = IServiceFeature;

type SeedService = {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: SeedFeature[];
  whatYouGet: string[];
  technologies: string[];
  published: boolean;
  displayOrder: number;
};

const SERVICES: SeedService[] = [
  {
    title: "Business Websites",
    slug: "business-websites",
    shortDescription: "Professional websites built around your business.",
    description:
      "We design and build custom business websites that establish trust and make it easy for customers to reach you — with responsive layouts, WhatsApp and contact integration, embedded Google Maps and SEO fundamentals baked in from day one.",
    icon: "Globe",
    features: [
      { icon: "Smartphone", label: "Responsive Design" },
      { icon: "MessageCircle", label: "WhatsApp Integration" },
      { icon: "MapPin", label: "Google Maps" },
      { icon: "Search", label: "Basic SEO" },
    ],
    whatYouGet: [
      "Custom business websites",
      "Responsive design across all devices",
      "Contact & WhatsApp integration",
      "Google Maps integration",
      "Basic SEO setup",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS"],
    published: true,
    displayOrder: 1,
  },
  {
    title: "WordPress Websites",
    slug: "wordpress-websites",
    shortDescription: "Flexible, manageable websites powered by WordPress.",
    description:
      "We build custom WordPress websites you can manage yourself, from theme customization and plugin setup to Elementor page-builder designs — backed by ongoing maintenance, security checks and updates.",
    icon: "LayoutTemplate",
    features: [
      { icon: "Palette", label: "Custom WP Design" },
      { icon: "Puzzle", label: "Plugin Setup" },
      { icon: "PenTool", label: "Page-Builder Ready" },
      { icon: "ShieldCheck", label: "Security & Updates" },
    ],
    whatYouGet: [
      "Custom WordPress business websites",
      "Theme customization",
      "Plugin setup & configuration",
      "Elementor / page-builder websites",
      "Ongoing WordPress maintenance",
      "Security checks & updates",
    ],
    technologies: ["WordPress", "Elementor", "WooCommerce"],
    published: true,
    displayOrder: 2,
  },
  {
    title: "Portfolio Websites",
    slug: "portfolio-websites",
    shortDescription: "Showcase your work, skills and achievements.",
    description:
      "We craft clean, modern portfolio websites for students, developers, freelancers and personal brands — designed to put your best work front and center and make a strong first impression.",
    icon: "Briefcase",
    features: [
      { icon: "GraduationCap", label: "Student Portfolios" },
      { icon: "Code2", label: "Developer Portfolios" },
      { icon: "Award", label: "Freelancer Websites" },
      { icon: "Sparkles", label: "Personal Branding" },
    ],
    whatYouGet: [
      "Student portfolio websites",
      "Developer portfolio websites",
      "Freelancer websites",
      "Personal branding websites",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS"],
    published: true,
    displayOrder: 3,
  },
  {
    title: "E-Commerce Websites",
    slug: "ecommerce-websites",
    shortDescription: "Turn your products into a professional online store.",
    description:
      "We build Shopify and WooCommerce stores with polished product pages, smooth cart and checkout flows and secure payment integration — everything you need to sell online with confidence.",
    icon: "ShoppingBag",
    features: [
      { icon: "Store", label: "Shopify & WooCommerce" },
      { icon: "Package", label: "Product Pages" },
      { icon: "ShoppingCart", label: "Cart & Checkout" },
      { icon: "CreditCard", label: "Payment Integration" },
    ],
    whatYouGet: [
      "Shopify store setup",
      "WooCommerce store setup",
      "Product page design",
      "Cart & checkout flow",
      "Payment gateway integration",
    ],
    technologies: ["Shopify", "WooCommerce", "WordPress"],
    published: true,
    displayOrder: 4,
  },
  {
    title: "Landing Pages",
    slug: "landing-pages",
    shortDescription: "Focused pages designed to generate enquiries.",
    description:
      "We design high-converting landing pages for lead generation, product launches and marketing campaigns — with WhatsApp and contact integration built in to turn visitors into enquiries.",
    icon: "Rocket",
    features: [
      { icon: "Target", label: "Lead Generation" },
      { icon: "Megaphone", label: "Campaign Pages" },
      { icon: "Zap", label: "High-Converting Design" },
      { icon: "MessageCircle", label: "WhatsApp Integration" },
    ],
    whatYouGet: [
      "Lead-generation pages",
      "Product/service landing pages",
      "Campaign pages",
      "WhatsApp/contact integration",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS"],
    published: true,
    displayOrder: 5,
  },
  {
    title: "Website Redesign",
    slug: "website-redesign",
    shortDescription: "Give your existing website a modern new look.",
    description:
      "We refresh outdated websites with a modern UI, better navigation and mobile optimization — improving performance and layout so your site converts more of the visitors it already gets.",
    icon: "RefreshCw",
    features: [
      { icon: "PenTool", label: "Modern UI Redesign" },
      { icon: "Navigation", label: "Better Navigation" },
      { icon: "Smartphone", label: "Mobile Optimization" },
      { icon: "Gauge", label: "Performance Boost" },
    ],
    whatYouGet: [
      "Modern UI redesign",
      "Mobile optimization",
      "Better navigation",
      "Performance improvements",
      "Conversion-focused layouts",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS"],
    published: true,
    displayOrder: 6,
  },
  {
    title: "Website Maintenance",
    slug: "website-maintenance",
    shortDescription: "Keep your website updated, secure and running smoothly.",
    description:
      "We keep your website running smoothly after launch with content updates, bug fixes, WordPress updates, security checks, backups and ongoing performance monitoring.",
    icon: "LifeBuoy",
    features: [
      { icon: "RefreshCw", label: "Regular Updates" },
      { icon: "Wrench", label: "Bug Fixes" },
      { icon: "ShieldCheck", label: "Security Checks" },
      { icon: "Gauge", label: "Performance Monitoring" },
    ],
    whatYouGet: [
      "Content updates",
      "Bug fixes",
      "WordPress updates",
      "Security checks",
      "Regular backups",
      "Performance monitoring",
    ],
    technologies: [],
    published: true,
    displayOrder: 7,
  },
  {
    title: "Custom Web Applications",
    slug: "web-applications",
    shortDescription: "Digital solutions built around your unique workflow.",
    description:
      "We design and build custom web applications — admin dashboards, booking systems, customer portals, authentication and API integrations — tailored to your unique business workflows.",
    icon: "Box",
    features: [
      { icon: "LayoutDashboard", label: "Admin Dashboards" },
      { icon: "CalendarCheck", label: "Booking Systems" },
      { icon: "Users", label: "Customer Portals" },
      { icon: "Lock", label: "Secure Authentication" },
    ],
    whatYouGet: [
      "Admin dashboards",
      "Booking systems",
      "Customer portals",
      "Authentication",
      "API integrations",
      "Custom business workflows",
    ],
    technologies: ["React", "Node.js", "MongoDB", "AWS"],
    published: true,
    displayOrder: 8,
  },
];

async function run(): Promise<void> {
  await connectDatabase();

  let created = 0;
  let skipped = 0;

  try {
    for (const service of SERVICES) {
      // $setOnInsert + upsert: creates the document only if the slug doesn't
      // already exist. An existing service (whether from a prior run of this
      // script, or since edited by an admin) is left completely untouched.
      const result = await Service.updateOne(
        { slug: service.slug },
        { $setOnInsert: service },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        created += 1;
        console.log(`✅ Created: ${service.title} (${service.slug})`);
      } else {
        skipped += 1;
        console.log(`↷  Skipped (already exists): ${service.title} (${service.slug})`);
      }
    }

    console.log(`\nDone. ${created} created, ${skipped} already existed.`);
  } finally {
    await disconnectDatabase();
  }
}

run().catch((error) => {
  console.error("❌ Service seed failed:", error instanceof Error ? error.message : "Unknown error");
  process.exitCode = 1;
});

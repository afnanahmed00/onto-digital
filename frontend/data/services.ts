import {
  Globe,
  LayoutTemplate,
  Palette,
  Puzzle,
  PenTool,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Code2,
  Award,
  Sparkles,
  ShoppingBag,
  Store,
  Package,
  ShoppingCart,
  CreditCard,
  Rocket,
  Target,
  Megaphone,
  Zap,
  MessageCircle,
  RefreshCw,
  Navigation,
  Smartphone,
  Gauge,
  LifeBuoy,
  Wrench,
  Box,
  LayoutDashboard,
  CalendarCheck,
  Users,
  Lock,
  Search,
  MapPin,
  type LucideIcon,
} from "lucide-react";

/**
 * Central service data source for the Service Detail page
 * (app/services/[slug]/page.tsx) and the ServiceCollection cards on the
 * Services page. Everything the detail page renders is driven from here so
 * new services can be added — or this array later swapped for an API/DB
 * call — without touching any component markup.
 */

export type ServiceFeature = {
  icon: LucideIcon;
  label: string;
};

export type Service = {
  /** URL segment — /services/{slug} */
  slug: string;
  /** Label shown in the breadcrumb and page <title> */
  breadcrumbLabel: string;
  /** Small uppercase kicker above the heading, e.g. "OUR SERVICES" */
  badge: string;
  /** Two-line heading — first line white, second line rendered in the accent green */
  titleLines: [string, string];
  /** Lead paragraph */
  shortDescription: string;
  /** Supporting paragraph with more detail */
  description: string;
  /** Icon used on the ServiceCollection card */
  icon: LucideIcon;
  /** 4 highlight items rendered as icon + label */
  features: ServiceFeature[];
  /** "What You Get" checklist */
  whatYouGet: string[];
  /** Technologies used to deliver this service, if relevant */
  technologies?: string[];
  /**
   * Value expected by the Service field in ContactForm/SERVICE_OPTIONS and
   * the contact API's SERVICE_VALUES enum (app/api/contact/route.ts) — keep
   * these three lists in sync.
   */
  contactServiceValue: string;
};

export const services: Service[] = [
  {
    slug: "business-websites",
    breadcrumbLabel: "Business Websites",
    badge: "OUR SERVICES",
    titleLines: ["BUSINESS", "WEBSITES"],
    shortDescription: "Professional websites built around your business.",
    description:
      "We design and build custom business websites that establish trust and make it easy for customers to reach you — with responsive layouts, WhatsApp and contact integration, embedded Google Maps and SEO fundamentals baked in from day one.",
    icon: Globe,
    features: [
      { icon: Smartphone, label: "Responsive Design" },
      { icon: MessageCircle, label: "WhatsApp Integration" },
      { icon: MapPin, label: "Google Maps" },
      { icon: Search, label: "Basic SEO" },
    ],
    whatYouGet: [
      "Custom business websites",
      "Responsive design across all devices",
      "Contact & WhatsApp integration",
      "Google Maps integration",
      "Basic SEO setup",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS"],
    contactServiceValue: "business-websites",
  },
  {
    slug: "wordpress-websites",
    breadcrumbLabel: "WordPress Websites",
    badge: "OUR SERVICES",
    titleLines: ["WORDPRESS", "WEBSITES"],
    shortDescription: "Flexible, manageable websites powered by WordPress.",
    description:
      "We build custom WordPress websites you can manage yourself, from theme customization and plugin setup to Elementor page-builder designs — backed by ongoing maintenance, security checks and updates.",
    icon: LayoutTemplate,
    features: [
      { icon: Palette, label: "Custom WP Design" },
      { icon: Puzzle, label: "Plugin Setup" },
      { icon: PenTool, label: "Page-Builder Ready" },
      { icon: ShieldCheck, label: "Security & Updates" },
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
    contactServiceValue: "wordpress-websites",
  },
  {
    slug: "portfolio-websites",
    breadcrumbLabel: "Portfolio Websites",
    badge: "OUR SERVICES",
    titleLines: ["PORTFOLIO", "WEBSITES"],
    shortDescription: "Showcase your work, skills and achievements.",
    description:
      "We craft clean, modern portfolio websites for students, developers, freelancers and personal brands — designed to put your best work front and center and make a strong first impression.",
    icon: Briefcase,
    features: [
      { icon: GraduationCap, label: "Student Portfolios" },
      { icon: Code2, label: "Developer Portfolios" },
      { icon: Award, label: "Freelancer Websites" },
      { icon: Sparkles, label: "Personal Branding" },
    ],
    whatYouGet: [
      "Student portfolio websites",
      "Developer portfolio websites",
      "Freelancer websites",
      "Personal branding websites",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS"],
    contactServiceValue: "portfolio-websites",
  },
  {
    slug: "ecommerce-websites",
    breadcrumbLabel: "E-Commerce Websites",
    badge: "OUR SERVICES",
    titleLines: ["E-COMMERCE", "WEBSITES"],
    shortDescription: "Turn your products into a professional online store.",
    description:
      "We build Shopify and WooCommerce stores with polished product pages, smooth cart and checkout flows and secure payment integration — everything you need to sell online with confidence.",
    icon: ShoppingBag,
    features: [
      { icon: Store, label: "Shopify & WooCommerce" },
      { icon: Package, label: "Product Pages" },
      { icon: ShoppingCart, label: "Cart & Checkout" },
      { icon: CreditCard, label: "Payment Integration" },
    ],
    whatYouGet: [
      "Shopify store setup",
      "WooCommerce store setup",
      "Product page design",
      "Cart & checkout flow",
      "Payment gateway integration",
    ],
    technologies: ["Shopify", "WooCommerce", "WordPress"],
    contactServiceValue: "ecommerce-websites",
  },
  {
    slug: "landing-pages",
    breadcrumbLabel: "Landing Pages",
    badge: "OUR SERVICES",
    titleLines: ["LANDING", "PAGES"],
    shortDescription: "Focused pages designed to generate enquiries.",
    description:
      "We design high-converting landing pages for lead generation, product launches and marketing campaigns — with WhatsApp and contact integration built in to turn visitors into enquiries.",
    icon: Rocket,
    features: [
      { icon: Target, label: "Lead Generation" },
      { icon: Megaphone, label: "Campaign Pages" },
      { icon: Zap, label: "High-Converting Design" },
      { icon: MessageCircle, label: "WhatsApp Integration" },
    ],
    whatYouGet: [
      "Lead-generation pages",
      "Product/service landing pages",
      "Campaign pages",
      "WhatsApp/contact integration",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS"],
    contactServiceValue: "landing-pages",
  },
  {
    slug: "website-redesign",
    breadcrumbLabel: "Website Redesign",
    badge: "OUR SERVICES",
    titleLines: ["WEBSITE", "REDESIGN"],
    shortDescription: "Give your existing website a modern new look.",
    description:
      "We refresh outdated websites with a modern UI, better navigation and mobile optimization — improving performance and layout so your site converts more of the visitors it already gets.",
    icon: RefreshCw,
    features: [
      { icon: PenTool, label: "Modern UI Redesign" },
      { icon: Navigation, label: "Better Navigation" },
      { icon: Smartphone, label: "Mobile Optimization" },
      { icon: Gauge, label: "Performance Boost" },
    ],
    whatYouGet: [
      "Modern UI redesign",
      "Mobile optimization",
      "Better navigation",
      "Performance improvements",
      "Conversion-focused layouts",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS"],
    contactServiceValue: "website-redesign",
  },
  {
    slug: "website-maintenance",
    breadcrumbLabel: "Website Maintenance",
    badge: "OUR SERVICES",
    titleLines: ["WEBSITE", "MAINTENANCE"],
    shortDescription: "Keep your website updated, secure and running smoothly.",
    description:
      "We keep your website running smoothly after launch with content updates, bug fixes, WordPress updates, security checks, backups and ongoing performance monitoring.",
    icon: LifeBuoy,
    features: [
      { icon: RefreshCw, label: "Regular Updates" },
      { icon: Wrench, label: "Bug Fixes" },
      { icon: ShieldCheck, label: "Security Checks" },
      { icon: Gauge, label: "Performance Monitoring" },
    ],
    whatYouGet: [
      "Content updates",
      "Bug fixes",
      "WordPress updates",
      "Security checks",
      "Regular backups",
      "Performance monitoring",
    ],
    contactServiceValue: "website-maintenance",
  },
  {
    slug: "web-applications",
    breadcrumbLabel: "Custom Web Applications",
    badge: "OUR SERVICES",
    titleLines: ["CUSTOM WEB", "APPLICATIONS"],
    shortDescription: "Digital solutions built around your unique workflow.",
    description:
      "We design and build custom web applications — admin dashboards, booking systems, customer portals, authentication and API integrations — tailored to your unique business workflows.",
    icon: Box,
    features: [
      { icon: LayoutDashboard, label: "Admin Dashboards" },
      { icon: CalendarCheck, label: "Booking Systems" },
      { icon: Users, label: "Customer Portals" },
      { icon: Lock, label: "Secure Authentication" },
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
    contactServiceValue: "web-applications",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

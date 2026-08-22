"use client";

import { useState, type ComponentType, type CSSProperties } from "react";
import {
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiFigma,
  SiWordpress,
  SiMongodb,
  SiShopify,
  SiNextdotjs,
} from "react-icons/si";
import { Check, Cloud } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type TechIcon = ComponentType<{ className?: string; style?: CSSProperties }>;

type Tech = {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  icon: TechIcon;
  color: string;
};

const techStack: Tech[] = [
  {
    id: "react",
    name: "React.js",
    category: "Frontend Library",
    description:
      "A powerful JavaScript library for building fast, interactive user interfaces with component-based architecture.",
    features: ["Component Architecture", "Virtual DOM", "Fast Rendering", "Scalable UI"],
    icon: SiReact,
    color: "#61DAFB",
  },
  {
    id: "node",
    name: "Node.js",
    category: "Backend Runtime",
    description:
      "A fast, event-driven JavaScript runtime that powers scalable, high-performance backend services and APIs.",
    features: ["Non-blocking I/O", "Event-Driven", "NPM Ecosystem", "Real-time Ready"],
    icon: SiNodedotjs,
    color: "#5FA04E",
  },
  {
    id: "aws",
    name: "AWS",
    category: "Cloud Infrastructure",
    description:
      "Reliable, secure cloud infrastructure that scales with your product from launch to enterprise growth.",
    features: ["Auto Scaling", "Global CDN", "High Availability", "Secure by Design"],
    icon: Cloud,
    color: "#FF9900",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Styling Framework",
    description:
      "A utility-first CSS framework for building custom, responsive designs without leaving your markup.",
    features: ["Utility-First", "Fully Responsive", "Design Consistency", "Rapid Development"],
    icon: SiTailwindcss,
    color: "#38BDF8",
  },
  {
    id: "figma",
    name: "Figma",
    category: "Design Tool",
    description:
      "Collaborative design platform we use to prototype, iterate and align on pixel-perfect interfaces.",
    features: ["Real-time Collaboration", "Interactive Prototypes", "Design Systems", "Dev-Ready Handoff"],
    icon: SiFigma,
    color: "#A259FF",
  },
  {
    id: "wordpress",
    name: "WordPress",
    category: "Content Management",
    description:
      "A flexible CMS that gives clients full control over content with a scalable, plugin-rich ecosystem.",
    features: ["Easy Content Editing", "Custom Themes", "Plugin Ecosystem", "SEO Friendly"],
    icon: SiWordpress,
    color: "#3499CD",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "NoSQL Database",
    description:
      "A flexible, document-based database built to handle modern applications at any scale.",
    features: ["Flexible Schema", "Horizontal Scaling", "High Performance", "Cloud Native"],
    icon: SiMongodb,
    color: "#47A248",
  },
  {
    id: "shopify",
    name: "Shopify",
    category: "E-commerce Platform",
    description:
      "A robust eCommerce platform we customize to deliver seamless, conversion-focused online stores.",
    features: ["Custom Storefronts", "Secure Checkout", "App Integrations", "Built to Convert"],
    icon: SiShopify,
    color: "#95BF47",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "React Framework",
    description:
      "A production-grade React framework delivering server-side rendering, speed and SEO out of the box.",
    features: ["Server-Side Rendering", "Static Generation", "API Routes", "SEO Optimized"],
    icon: SiNextdotjs,
    color: "#FFFFFF",
  },
];

const COUNT = techStack.length;
const STEP = 360 / COUNT;

export default function TechStack() {
  const [activeId, setActiveId] = useState(techStack[0].id);
  const active = techStack.find((tech) => tech.id === activeId) ?? techStack[0];
  const ActiveIcon = active.icon;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16 xl:px-10">

        {/* Heading */}
        <div className="mx-auto flex max-w-[38rem] flex-col items-center text-center">

          <span className="font-heading text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[var(--primary)]">
            OUR TECH STACK
          </span>

          <h2 className="mt-2 text-[2rem] font-medium uppercase leading-[1.08] sm:text-[2.5rem]">
            TECHNOLOGIES
            <br />
            WE <span className="text-[var(--primary)]">BUILD</span> WITH
          </h2>

          <p className="mt-4 text-[0.85rem] leading-[1.9] text-[var(--text-body)] sm:text-[0.95rem]">
            We carefully choose modern technologies that deliver exceptional
            performance, scalability and long-term reliability for every project.
          </p>

        </div>

        {/* Orbit */}
        {/* overflow-hidden clips the rotating square below (animate-orbit-spin) to this
            box: a rotated square's bounding box is up to sqrt(2)x wider than its own side,
            which pushed past the viewport on mobile even though every visible node/dot
            stays within --radius, well inside these bounds. */}
        <div className="group relative mx-auto mt-14 h-[min(340px,85vw)] w-[min(340px,85vw)] overflow-hidden sm:mt-16 sm:h-[460px] sm:w-[460px] lg:mt-20 lg:h-[620px] lg:w-[620px]">

          {/* Ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/10 blur-[60px]" />

          {/* Outer path (tech stack orbit) */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[var(--primary)]/25" />

          {/* Extra ring between the tech stack and the center circle */}
          <div className="absolute inset-[15%] rounded-full border border-[var(--primary)]/15" />

          {/* Rotating layer: nodes + path dots */}
          <div className="animate-orbit-spin absolute inset-0 [--dot-radius:min(166px,41.5vw)] [--radius:min(144px,36vw)] group-hover:[animation-play-state:paused] sm:[--dot-radius:226px] sm:[--radius:198px] lg:[--dot-radius:306px] lg:[--radius:272px]">

            {/* Path dots */}
            {techStack.map((tech, i) => {
              const dotAngle = STEP * i + STEP / 2;

              return (
                <div
                  key={`dot-${tech.id}`}
                  className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[var(--primary)]/70 shadow-[0_0_6px_rgba(81,255,115,.8)]"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${dotAngle}deg) translateX(var(--dot-radius))`,
                  }}
                />
              );
            })}

            {/* Nodes */}
            {techStack.map((tech, i) => {
              const angle = STEP * i;
              const isActive = tech.id === activeId;
              const Icon = tech.icon;

              return (
                <div
                  key={tech.id}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(var(--radius)) rotate(${-angle}deg)`,
                  }}
                >
                  <div className="animate-orbit-spin-reverse flex flex-col items-center gap-1.5">

                    <button
                      type="button"
                      title={tech.name}
                      aria-label={tech.name}
                      aria-pressed={isActive}
                      onClick={() => setActiveId(tech.id)}
                      className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 active:scale-90 sm:h-14 sm:w-14 lg:h-16 lg:w-16 ${isActive
                          ? "border-[var(--primary)] bg-[var(--card-hover)] shadow-[0_0_20px_rgba(81,255,115,.45)]"
                          : "border-[var(--border-card)] bg-[var(--background-secondary)] hover:border-[var(--primary)]/60 active:border-[var(--primary)]/60"
                        }`}
                    >
                      <Icon
                        style={{ color: tech.color }}
                        className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                      />
                    </button>

                    <span
                      className={`text-[0.5rem] font-medium uppercase tracking-wide transition-colors duration-300 sm:text-[0.65rem] lg:text-[0.72rem] ${isActive ? "text-[var(--primary)]" : "text-[var(--text-body)]"
                        }`}
                    >
                      {tech.name}
                    </span>

                  </div>
                </div>
              );
            })}

          </div>

          {/* Center circle */}
          <div className="absolute left-1/2 top-1/2 flex h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center overflow-hidden rounded-full border border-[var(--border-card)] bg-[var(--card)] p-3 text-center shadow-[0_0_25px_rgba(0,0,0,.6),0_0_45px_rgba(81,255,115,.2)] sm:p-5">

            {/* Shine */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-14 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/25 opacity-70 blur-2xl sm:h-20 sm:w-28" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" }}
                className="relative flex w-full flex-col items-center text-center"
              >

                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#3a3a3a] bg-[var(--background)]/40 sm:h-9 sm:w-9 lg:h-11 lg:w-11">
                  <ActiveIcon
                    style={{ color: active.color }}
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5"
                  />
                </div>

                <h3 className="mt-2 text-[0.6rem] font-medium uppercase leading-tight text-white sm:mt-3 sm:text-[0.85rem] lg:text-[1rem]">
                  {active.name}
                </h3>

                <span className="mt-1 text-[0.42rem] font-medium uppercase tracking-[0.12em] text-[var(--primary)] sm:text-[0.5rem] lg:text-[0.6rem]">
                  {active.category}
                </span>

                <div className="mt-2 h-px w-7 bg-[var(--primary)]/30 sm:mt-3 sm:w-9" />

                <p className="mt-2 line-clamp-2 text-center text-[0.4rem] leading-[1.4] text-[var(--text-body)] sm:mt-3 sm:line-clamp-none sm:text-[0.5rem] sm:leading-[1.6] lg:text-[0.6rem]">
                  {active.description}
                </p>

                <div className="mt-2 h-[30px] sm:mt-4 sm:h-auto">
                  <div className="hidden sm:flex sm:w-full sm:flex-col sm:gap-1.5">
                    {active.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center justify-center gap-1.5"
                      >
                        <Check className="h-3 w-3 shrink-0 text-[var(--primary)]" />
                        <span className="text-[0.5rem] text-[var(--text-body)]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}

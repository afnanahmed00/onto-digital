import {
  Wrench,
  Layers,
  Cpu,
  Gauge,
  ShieldCheck,
  LifeBuoy,
} from "lucide-react";
import type { Feature } from "@/components/sections/WhyChooseUs";

export const serviceFeatures: Feature[] = [
  {
    icon: Wrench,
    title: "CUSTOM SOLUTIONS",
    description: "Tailored builds designed around your exact business needs.",
  },
  {
    icon: Layers,
    title: "SCALABLE ARCHITECTURE",
    description: "Systems built to grow with your business, without limits.",
  },
  {
    icon: Cpu,
    title: "MODERN TECHNOLOGIES",
    description: "We use the latest tools and frameworks to stay ahead.",
  },
  {
    icon: Gauge,
    title: "SEO & PERFORMANCE",
    description: "Fast, optimized experiences that rank and convert.",
  },
  {
    icon: ShieldCheck,
    title: "SECURE DEVELOPMENT",
    description: "Best practices baked in to keep your product safe.",
  },
  {
    icon: LifeBuoy,
    title: "ONGOING SUPPORT",
    description: "We stay by your side long after the project launches.",
  },
];

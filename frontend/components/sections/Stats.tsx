"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { Rocket, Star, Users, Trophy, type LucideIcon } from "lucide-react";

type Stat = {
  icon: LucideIcon;
  value: number;
  suffix: string;
  title: string;
  subtitle: string;
};

const stats: Stat[] = [
  {
    icon: Rocket,
    value: 10,
    suffix: "+",
    title: "PROJECTS",
    subtitle: "DELIVERED",
  },
  {
    icon: Star,
    value: 98,
    suffix: "%",
    title: "CLIENT",
    subtitle: "SATISFACTION",
  },
  {
    icon: Users,
    value: 5,
    suffix: "+",
    title: "EXPERTS &",
    subtitle: "CREATIVES",
  },
  {
    icon: Trophy,
    value: 2.5,
    suffix: "+",
    title: "YEARS OF",
    subtitle: "EXPERIENCE",
  },
];

function StatCard({ icon: Icon, value, suffix, title, subtitle, index }: Stat & { index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: shouldReduceMotion ? 0 : 1.6,
      delay: shouldReduceMotion ? 0 : index * 0.1,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, value, index, shouldReduceMotion]);

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : index * 0.1, ease: "easeOut" }}
      className="group flex flex-col items-center rounded-[16px] border border-[var(--border)] bg-[var(--card)] px-4 py-6 text-center shadow-[0_12px_40px_rgba(0,0,0,.45)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-[0_0_30px_rgba(81,255,115,.22)] sm:rounded-[20px] sm:px-8 sm:py-8"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card-hover)] text-[var(--primary)] transition-all duration-300 group-hover:border-[var(--primary)] group-hover:text-[var(--primary)] group-hover:shadow-[0_0_30px_rgba(81,255,115,.25)] sm:h-16 sm:w-16">
        <Icon size={22} strokeWidth={1.75} className="sm:hidden" />
        <Icon size={28} strokeWidth={1.75} className="hidden sm:block" />
      </div>

      <h3 className="mt-3 text-[1.6rem] font-bold leading-[1.1] text-white transition-colors duration-300 group-hover:text-[var(--primary)] sm:mt-6 sm:text-[2.5rem]">
        {display}
        {suffix}
      </h3>

      <p className="mt-2 text-[10px] font-semibold uppercase leading-[16px] tracking-[0.1em] text-[var(--text-body)] sm:mt-4 sm:text-[12px] sm:leading-[20px] sm:tracking-[0.14em]">
        {title}
        <br />
        {subtitle}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:px-10">
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {stats.map((item, index) => (
            <StatCard key={item.title} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
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
    value: 200,
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
    value: 50,
    suffix: "+",
    title: "EXPERTS &",
    subtitle: "CREATIVES",
  },
  {
    icon: Trophy,
    value: 5,
    suffix: "+",
    title: "YEARS OF",
    subtitle: "EXPERIENCE",
  },
];

function StatCard({ icon: Icon, value, suffix, title, subtitle, index }: Stat & { index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 1.6,
      delay: index * 0.1,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, value, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group flex flex-col items-center rounded-[14px] border border-[#252525] bg-[#111111] px-4 py-6 text-center shadow-[0_12px_40px_rgba(0,0,0,.45)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#52FF2A] hover:shadow-[0_0_30px_rgba(57,255,20,.22)] sm:rounded-[18px] sm:px-8 sm:py-8"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#252525] bg-[#171717] text-[#39FF14] transition-all duration-300 group-hover:border-[#52FF2A] group-hover:text-[#52FF2A] group-hover:shadow-[0_0_30px_rgba(125,255,87,.25)] sm:h-16 sm:w-16">
        <Icon size={22} strokeWidth={1.75} className="sm:hidden" />
        <Icon size={28} strokeWidth={1.75} className="hidden sm:block" />
      </div>

      <h3 className="mt-3 font-[var(--font-heading)] text-[1.6rem] font-bold leading-[1.1] text-white transition-colors duration-300 group-hover:text-[#52FF2A] sm:mt-6 sm:text-[2.5rem]">
        {display}
        {suffix}
      </h3>

      <p className="mt-2 text-[10px] font-semibold uppercase leading-[16px] tracking-[0.1em] text-[#9B9B9B] sm:mt-4 sm:text-[12px] sm:leading-[20px] sm:tracking-[0.14em]">
        {title}
        <br />
        {subtitle}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="border-t border-[#252525] bg-[#050505]">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20 xl:px-16">
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {stats.map((item, index) => (
            <StatCard key={item.title} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

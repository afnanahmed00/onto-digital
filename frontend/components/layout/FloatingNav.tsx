"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Info, BriefcaseBusiness, FolderKanban, Mail } from "lucide-react";
import clsx from "clsx";

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: House,
  },
  {
    name: "About",
    href: "/about",
    icon: Info,
  },
  {
    name: "Services",
    href: "/services",
    icon: BriefcaseBusiness,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: Mail,
  },
];

export default function FloatingNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 max-w-[calc(100vw-1rem)] -translate-x-1/2 sm:bottom-6">
      <div className="flex items-center gap-1.5 overflow-x-auto rounded-full border border-white/10 bg-white/10 p-2 backdrop-blur-xl shadow-[0_10px_50px_rgba(0,0,0,0.45)] [&::-webkit-scrollbar]:hidden sm:gap-2 sm:p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2.5 transition-all duration-300 sm:gap-2 sm:px-4 sm:py-3",
                active
                  ? "bg-[var(--primary)] text-black"
                  : "text-white hover:bg-white/10"
              )}
            >
              <Icon
                className={clsx(
                  "shrink-0 transition-all duration-300",
                  active ? "h-5 w-5 sm:h-[18px] sm:w-[18px]" : "h-4 w-4 sm:h-4 sm:w-4"
                )}
              />

              <span
                className={clsx(
                  "text-xs font-medium sm:text-sm",
                  active ? "block" : "hidden md:block",
                  active && "font-semibold"
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
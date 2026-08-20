"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, FolderKanban, LayoutDashboard, Users } from "lucide-react";
import clsx from "clsx";
import Logo from "@/components/ui/Logo";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Leads", href: "/admin/leads", icon: Users },
];

type AdminSidebarProps = {
  /** Called after a nav link is clicked — closes the mobile drawer (AdminShell). */
  onNavigate?: () => void;
};

export default function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-20 items-center border-b border-[var(--border)] px-6">
        <Logo iconClassName="h-7 w-7" textClassName="text-sm" />
      </div>

      <nav aria-label="Admin" className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            // Exact match for the dashboard root (/admin) so it doesn't stay
            // "active" while on a nested route like /admin/projects.
            const active = item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "flex items-center gap-3 rounded-[var(--radius-md)] px-4 py-3 text-sm font-medium uppercase tracking-[0.06em] transition-colors duration-300",
                    active
                      ? "bg-[var(--primary)] text-black"
                      : "text-[var(--text-secondary)] hover:bg-white/[0.06] hover:text-white"
                  )}
                >
                  <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-[var(--border)] px-6 py-5">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--primary)]"
        >
          ← Back to website
        </Link>
      </div>
    </div>
  );
}

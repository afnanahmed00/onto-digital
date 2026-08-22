"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";

type AdminHeaderProps = {
  onMenuClick: () => void;
};

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { admin, logout } = useAdminAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    await logout();
    router.replace("/admin/login");
  };

  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--background)] px-5 sm:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-white transition-colors duration-300 hover:bg-white/[0.06] lg:hidden"
      >
        <Menu size={20} aria-hidden="true" />
      </button>

      <div className="hidden min-w-0 lg:block">
        <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">Welcome back</p>
        <p className="truncate font-heading text-base font-semibold text-white">
          {admin?.name}
        </p>
      </div>

      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <div className="min-w-0 text-right lg:hidden">
          <p className="truncate text-xs font-semibold text-white">{admin?.name}</p>
          <p className="truncate text-[0.68rem] text-[var(--text-muted)]">{admin?.email}</p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex h-10 shrink-0 items-center gap-2 rounded-full border border-[var(--border)] px-4 text-xs font-medium uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogOut size={15} aria-hidden="true" />
          <span className="hidden sm:inline">{isLoggingOut ? "Logging out..." : "Logout"}</span>
        </button>
      </div>
    </header>
  );
}

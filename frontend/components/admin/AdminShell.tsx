"use client";

import { useState, type ReactNode } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

/**
 * The authenticated admin chrome: a fixed sidebar on desktop, a slide-in
 * drawer on tablet/mobile (toggled from AdminHeader's hamburger button),
 * a header, and a scrollable main content area. Mounted once by
 * app/admin/(dashboard)/layout.tsx after the session check passes.
 */
export default function AdminShell({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-[var(--background)] text-white">
      <aside className="hidden w-64 shrink-0 border-r border-[var(--border)] lg:block">
        <AdminSidebar />
      </aside>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-[var(--background)]/70 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
            aria-hidden="true"
          />

          <aside className="absolute inset-y-0 left-0 w-72 max-w-[80vw] border-r border-[var(--border)] bg-[var(--background)] shadow-[var(--shadow-lg)]">
            <AdminSidebar onNavigate={() => setMobileNavOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-h-screen w-full min-w-0 flex-1 flex-col">
        <AdminHeader onMenuClick={() => setMobileNavOpen(true)} />

        <main className="w-full flex-1 overflow-x-hidden px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}

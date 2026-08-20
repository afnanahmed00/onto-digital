import type { Metadata } from "next";
import DashboardPageClient from "@/components/admin/DashboardPageClient";

export const metadata: Metadata = {
  title: "Dashboard",
};

// Thin server wrapper — only exists so this route gets its own page title
// (app/admin/(dashboard)/page.tsx must be a Server Component to export
// `metadata`; DashboardPageClient uses hooks and can't be one). Same
// pattern as app/admin/(dashboard)/leads/page.tsx and .../projects/page.tsx.
export default function AdminDashboardPage() {
  return <DashboardPageClient />;
}

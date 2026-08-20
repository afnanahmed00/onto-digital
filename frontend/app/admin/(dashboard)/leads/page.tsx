import type { Metadata } from "next";
import LeadsPageClient from "@/components/admin/LeadsPageClient";

export const metadata: Metadata = {
  title: "Leads",
};

// Thin server wrapper — only exists so this route gets its own page title
// (app/admin/(dashboard)/leads/page.tsx must be a Server Component to
// export `metadata`; LeadsPageClient uses hooks and can't be one). Same
// pattern as app/admin/(dashboard)/projects/page.tsx and .../services/page.tsx.
export default function AdminLeadsPage() {
  return <LeadsPageClient />;
}

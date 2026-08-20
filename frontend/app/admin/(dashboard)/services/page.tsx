import type { Metadata } from "next";
import ServicesPageClient from "@/components/admin/ServicesPageClient";

export const metadata: Metadata = {
  title: "Services",
};

// Thin server wrapper — only exists so this route gets its own page title
// (app/admin/(dashboard)/services/page.tsx must be a Server Component to
// export `metadata`; ServicesPageClient uses hooks and can't be one). Same
// pattern as app/admin/(dashboard)/projects/page.tsx.
export default function AdminServicesPage() {
  return <ServicesPageClient />;
}

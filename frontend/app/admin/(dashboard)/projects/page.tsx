import type { Metadata } from "next";
import ProjectsPageClient from "@/components/admin/ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects",
};

// Thin server wrapper — only exists so this route gets its own page title
// (app/admin/(dashboard)/projects/page.tsx must be a Server Component to
// export `metadata`; ProjectsPageClient uses hooks and can't be one).
export default function AdminProjectsPage() {
  return <ProjectsPageClient />;
}

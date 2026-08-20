"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import AdminShell from "@/components/admin/AdminShell";
import AdminLoadingScreen from "@/components/admin/AdminLoadingScreen";

/**
 * Route guard for every real dashboard page (/admin, /admin/projects,
 * /admin/services, /admin/leads — this group adds no URL segment of its
 * own). Reads the shared session from AdminAuthProvider (mounted in
 * app/admin/layout.tsx); redirects to /admin/login the moment the session
 * check comes back unauthenticated, and renders the dashboard chrome only
 * once it's confirmed authenticated.
 */
export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const { status } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/admin/login");
    }
  }, [status, router]);

  if (status !== "authenticated") {
    return <AdminLoadingScreen label="Checking session…" />;
  }

  return <AdminShell>{children}</AdminShell>;
}

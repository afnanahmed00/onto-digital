"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import FloatingNav from "./FloatingNav";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Wraps every route with the public marketing chrome (Header, FloatingNav,
 * Footer) — except /admin, which is a separate app with its own chrome (see
 * app/admin/(dashboard)/layout.tsx and components/admin/AdminShell.tsx).
 * Checking the pathname here, rather than moving /admin outside the root
 * layout via a route group, keeps every existing public route's file
 * location and rendering untouched.
 */
export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />

      <FloatingNav />
    </>
  );
}
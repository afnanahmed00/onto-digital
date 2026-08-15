import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingNav from "./FloatingNav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />

      <FloatingNav />
    </>
  );
}
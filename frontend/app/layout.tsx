import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";

import Layout from "@/components/layout/Layout";
import { SITE } from "@/config/site";
import { SEO } from "@/config/seo";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.website),
  title: {
    default: SEO.defaultTitle,
    template: SEO.titleTemplate,
  },
  description: SEO.description,
  keywords: SEO.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.website,
    siteName: SITE.name,
    title: SEO.defaultTitle,
    description: SEO.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.defaultTitle,
    description: SEO.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${inter.variable} bg-black text-white antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

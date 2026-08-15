import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

import Layout from "@/components/layout/Layout";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "ONTO DIGITAL",
  description: "Premium Digital Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} bg-black text-white antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

"use client";

import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 z-50 w-full">
      <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-24 lg:px-10 xl:px-10">
        <Logo />

        <Button
          href="/contact"
          variant="pill"
          className="px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.08em] sm:px-5 sm:py-2.5 sm:text-xs lg:px-6 lg:py-3 lg:text-sm"
        >
          Let&apos;s Talk
        </Button>
      </div>
    </header>
  );
}
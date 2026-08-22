"use client";

import { useEffect } from "react";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";

/**
 * Root error boundary. Next.js renders this in place of the page whenever a
 * render/render-time error is thrown beneath the root layout, so
 * Header/Footer/FloatingNav stay mounted around it.
 *
 * Only a generic message is shown to visitors — the actual error is logged
 * to the console for debugging, never surfaced in the UI.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-[var(--background)] px-5 py-20 text-center">
      <Logo />

      <span className="font-heading text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[var(--primary)]">
        ERROR
      </span>

      <h1 className="max-w-[32rem] text-[1.8rem] font-medium uppercase leading-[1.1] sm:text-[2.4rem]">
        Something Went Wrong.
      </h1>

      <p className="max-w-[28rem] text-[0.85rem] leading-[1.9] text-[var(--text-body)] sm:text-[0.95rem]">
        We hit an unexpected error while loading this page. Please try again,
        or head back to the homepage.
      </p>

      <div className="mt-2 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-6">
        <Button onClick={reset} variant="outline">
          <RefreshCw size={16} className="text-[var(--primary)]" />
          TRY AGAIN
        </Button>

        <Button href="/" variant="pill">
          BACK TO HOME
          <ArrowUpRight size={16} />
        </Button>
      </div>
    </div>
  );
}

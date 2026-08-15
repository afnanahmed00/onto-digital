import Logo from "@/components/ui/Logo";

/**
 * Route-level loading fallback (Next.js shows this automatically while a
 * page/segment is being prepared). Renders inside the root layout, so
 * Header/Footer/FloatingNav stay mounted — this only needs to fill the
 * content area, not paint over them.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-black px-5 text-center"
    >
      <Logo
        iconClassName="h-9 w-9 sm:h-10 sm:w-10"
        textClassName="text-[1rem] sm:text-[1.25rem]"
      />

      <span
        aria-hidden="true"
        className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--primary)]/20 border-t-[var(--primary)] sm:h-9 sm:w-9"
      />

      <span className="sr-only">Loading…</span>
    </div>
  );
}

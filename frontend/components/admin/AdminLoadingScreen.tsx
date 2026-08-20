import Logo from "@/components/ui/Logo";

/**
 * Full-screen "checking session" state, shared by the login page (while it
 * waits to find out if there's already a valid cookie, before deciding
 * whether to show the form or bounce to /admin) and the protected dashboard
 * layout (same wait, opposite redirect). Mirrors app/loading.tsx's visual
 * language so the admin area still feels like ONTO DIGITAL, not a bolted-on
 * screen.
 */
export default function AdminLoadingScreen({ label = "Loading…" }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-black px-5 text-center"
    >
      <Logo iconClassName="h-9 w-9" textClassName="text-[1rem]" />

      <span
        aria-hidden="true"
        className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--primary)]/20 border-t-[var(--primary)]"
      />

      <span className="sr-only">{label}</span>
    </div>
  );
}

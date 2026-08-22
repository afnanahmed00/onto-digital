import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";

/**
 * Branded 404 — Next.js renders this for any unmatched route beneath the
 * root layout, so Header/Footer/FloatingNav stay mounted around it.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-[var(--background)] px-5 py-20 text-center">
      <Logo />

      <span className="font-heading text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[var(--primary)]">
        404 ERROR
      </span>

      <h1 className="text-[2.4rem] font-medium uppercase leading-[1.05] sm:text-[3.2rem] lg:text-[4rem]">
        PAGE NOT FOUND
      </h1>

      <p className="max-w-[28rem] text-[0.85rem] leading-[1.9] text-[var(--text-body)] sm:text-[0.95rem]">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>

      <Button href="/" variant="pill" className="mt-2">
        BACK TO HOME
        <ArrowUpRight size={16} />
      </Button>
    </div>
  );
}

import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HeroActions() {
  return (
    <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start lg:gap-8">
      <Button
        href="/services"
        variant="outline"
        className="w-full max-w-[11rem] justify-center px-3 py-2 text-[0.6rem] sm:w-auto sm:max-w-none sm:px-5 sm:py-3 sm:text-[0.75rem] lg:px-6 lg:py-3 lg:text-sm"
      >
        <ArrowUpRight size={16} className="text-[var(--primary)]" />
        Explore Services
      </Button>

      <Link
        href="/projects"
        className="group hidden items-center gap-3 font-heading text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:text-[var(--primary)] active:text-[var(--primary)] sm:inline-flex lg:text-sm"
      >
        View Our Work

        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--primary)] text-[var(--primary)] transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1 group-active:scale-95">
          <ChevronRight size={14} />
        </span>
      </Link>
    </div>
  );
}
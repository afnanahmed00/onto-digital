import Link from "next/link";
import clsx from "clsx";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export default function Logo({ className, iconClassName, textClassName }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="ONTO.DIGITAL — Home"
      className={clsx("inline-flex items-center gap-2", className)}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className={clsx("h-7 w-7 shrink-0 text-white sm:h-8 sm:w-8", iconClassName)}
      >
        <circle cx="14" cy="18" r="10.5" stroke="currentColor" strokeWidth="3" />
        <circle cx="24" cy="7" r="2.5" fill="var(--primary)" />
      </svg>

      <span
       className={clsx(
  "font-[var(--font-heading)] text-[0.8rem] font-bold uppercase tracking-[0.02em] text-white sm:text-[1.125rem] lg:text-[1.25rem]",
  textClassName
)}
      >
        Onto Digital
      </span>
    </Link>
  );
}

import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "pill" | "outline";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: ButtonVariant;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  "aria-label"?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-heading text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-none disabled:active:scale-100";

const variants: Record<ButtonVariant, string> = {
  pill: "rounded-full border border-[var(--primary)]/35 bg-white/[0.03] px-6 py-3 text-white hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-black hover:shadow-[0_0_30px_var(--primary-glow)]",
  outline:
    "rounded-[var(--radius-md)] border border-[var(--primary)]/45 bg-transparent px-7 py-[18px] text-white hover:scale-[1.02] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-black hover:shadow-[0_0_30px_var(--primary-glow)]",
};

export default function Button({
  children,
  href,
  onClick,
  className,
  variant = "outline",
  type = "button",
  disabled,
  ...rest
}: ButtonProps) {
  const classes = clsx(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...rest}>
      {children}
    </button>
  );
}

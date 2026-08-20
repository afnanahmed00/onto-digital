"use client";

import clsx from "clsx";

type ToggleSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Accessible name — not rendered visually, this control has no visible label. */
  label: string;
  disabled?: boolean;
};

/** Small pill switch — shared by the Featured and Published controls (table + form). */
export default function ToggleSwitch({ checked, onChange, label, disabled = false }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={clsx(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60",
        checked ? "border-[var(--primary)] bg-[var(--primary)]/20" : "border-[var(--border)] bg-white/5"
      )}
    >
      <span
        aria-hidden="true"
        className={clsx(
          "inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition-transform duration-300",
          checked && "translate-x-[22px] bg-[var(--primary)]"
        )}
      />
    </button>
  );
}

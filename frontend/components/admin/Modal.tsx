"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import clsx from "clsx";

type ModalProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
  maxWidthClassName?: string;
};

/**
 * Generic centered overlay dialog — shared by ProjectFormModal (create/edit)
 * and ConfirmDialog (delete confirmation) so both get the same backdrop,
 * Escape-to-close, and scroll behavior instead of each reimplementing it.
 */
export default function Modal({ title, onClose, children, maxWidthClassName = "max-w-lg" }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={clsx(
          "relative w-full rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-lg)]",
          maxWidthClassName
        )}
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
          <h2 className="text-lg font-semibold uppercase tracking-[0.04em] text-white">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors duration-300 hover:bg-white/[0.06] hover:text-white"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto px-6 py-6">{children}</div>
      </div>
    </div>
  );
}

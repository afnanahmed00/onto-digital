"use client";

import Modal from "./Modal";
import Button from "@/components/ui/Button";

type ConfirmDialogProps = {
  title: string;
  description: string;
  confirmLabel?: string;
  isConfirming?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

/** Generic destructive-action confirmation — used for project deletion. */
export default function ConfirmDialog({
  title,
  description,
  confirmLabel = "Confirm",
  isConfirming = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal title={title} onClose={onCancel} maxWidthClassName="max-w-md">
      <p className="text-sm leading-[1.7] text-[var(--text-secondary)]">{description}</p>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isConfirming}>
          Cancel
        </Button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isConfirming}
          className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[#FF5C5C]/50 bg-[#FF5C5C]/10 px-7 py-[18px] font-[var(--font-heading)] text-sm font-semibold uppercase tracking-[0.15em] text-[#FF5C5C] transition-all duration-300 hover:bg-[#FF5C5C] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isConfirming ? "Deleting..." : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

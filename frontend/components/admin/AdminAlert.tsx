import { AlertCircle, CheckCircle2, X } from "lucide-react";
import clsx from "clsx";

type AdminAlertProps = {
  type: "success" | "error";
  message: string;
  onDismiss?: () => void;
};

/**
 * Success/error banner — same visual language as ContactForm's and the
 * admin login page's inline status message, reused here for every
 * create/update/delete/upload result on the Projects page.
 */
export default function AdminAlert({ type, message, onDismiss }: AdminAlertProps) {
  const isSuccess = type === "success";

  return (
    <p
      role="status"
      className={clsx(
        "flex items-center gap-2 rounded-xl border px-4 py-3 text-[0.85rem] leading-[1.6]",
        isSuccess
          ? "border-[var(--primary)]/35 bg-[var(--primary)]/[0.06] text-[var(--primary)]"
          : "border-[#FF5C5C]/35 bg-[#FF5C5C]/[0.06] text-[#FF5C5C]"
      )}
    >
      {isSuccess ? (
        <CheckCircle2 size={16} className="shrink-0" aria-hidden="true" />
      ) : (
        <AlertCircle size={16} className="shrink-0" aria-hidden="true" />
      )}

      <span className="flex-1">{message}</span>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 opacity-70 transition-opacity duration-300 hover:opacity-100"
        >
          <X size={14} aria-hidden="true" />
        </button>
      )}
    </p>
  );
}

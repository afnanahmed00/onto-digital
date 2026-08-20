import type { LeadStatus } from "@/types/adminLead";

/** Human-readable label for a LeadStatus value, e.g. "IN_PROGRESS" -> "In Progress". */
export function formatLeadStatusLabel(status: LeadStatus): string {
  switch (status) {
    case "NEW":
      return "New";
    case "CONTACTED":
      return "Contacted";
    case "IN_PROGRESS":
      return "In Progress";
    case "CONVERTED":
      return "Converted";
    case "CLOSED":
      return "Closed";
  }
}

/**
 * Badge classes for a lead's status pill — stays within the existing
 * black/white/green palette (no new colors introduced): NEW and CONVERTED
 * lean on the primary green accent (open opportunity / won), CONTACTED and
 * IN_PROGRESS sit in between, CLOSED reads the same muted gray as a
 * project/service's "Draft" pill.
 */
export function leadStatusBadgeClassName(status: LeadStatus): string {
  switch (status) {
    case "NEW":
      return "border-[var(--primary)]/40 bg-[var(--primary)]/10 text-[var(--primary)]";
    case "CONTACTED":
      return "border-[var(--border)] text-white";
    case "IN_PROGRESS":
      return "border-[var(--primary)]/25 bg-[var(--primary)]/[0.04] text-[var(--text-secondary)]";
    case "CONVERTED":
      return "border-[var(--primary)]/60 bg-[var(--primary)] text-black";
    case "CLOSED":
      return "border-[var(--border)] text-[var(--text-muted)]";
  }
}

"use client";

import { useState, type FormEvent } from "react";
import { Briefcase, Building2, ChevronDown, Mail, PenLine, Phone, User, Wallet } from "lucide-react";
import Modal from "./Modal";
import AdminAlert from "./AdminAlert";
import Button from "@/components/ui/Button";
import FormField from "@/components/forms/FormField";
import { formatDate } from "@/lib/utils";
import { formatLeadStatusLabel, leadStatusBadgeClassName } from "@/lib/leadStatus";
import { LEAD_STATUSES } from "@/types/adminLead";
import type { AdminLead, LeadFormValues, LeadStatus } from "@/types/adminLead";
import clsx from "clsx";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// E.164: leading "+" then 8–15 digits — matches the backend's phoneField
// (backend/src/validators/lead.validators.ts).
const PHONE_PATTERN = /^\+[1-9]\d{7,14}$/;

type LeadDetailModalProps = {
  lead: AdminLead;
  mode: "view" | "edit";
  isSubmitting: boolean;
  isStatusUpdating: boolean;
  errorMessage: string | null;
  onEnterEdit: () => void;
  onCancelEdit: () => void;
  onSaveEdit: (values: LeadFormValues) => void;
  onStatusChange: (status: LeadStatus) => void;
  onClose: () => void;
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">{label}</p>
      <p className="mt-1 text-sm leading-[1.6] text-white">{value}</p>
    </div>
  );
}

/**
 * View / edit / status-change modal for a single lead — opened from
 * LeadsTable's "View" action. Mirrors ProjectFormModal/ServiceFormModal's
 * shape (parent owns the actual API calls and keeps the modal open with
 * `errorMessage` set on failure) but adds a read-only "view" mode plus a
 * status selector wired straight to the dedicated PATCH .../status endpoint,
 * since a lead's status changes far more often than the rest of its fields.
 */
export default function LeadDetailModal({
  lead,
  mode,
  isSubmitting,
  isStatusUpdating,
  errorMessage,
  onEnterEdit,
  onCancelEdit,
  onSaveEdit,
  onStatusChange,
  onClose,
}: LeadDetailModalProps) {
  const [fullName, setFullName] = useState(lead.fullName);
  const [email, setEmail] = useState(lead.email);
  const [phone, setPhone] = useState(lead.phone);
  const [company, setCompany] = useState(lead.company ?? "");
  const [service, setService] = useState(lead.service);
  const [budget, setBudget] = useState(lead.budget ?? "");
  const [projectDetails, setProjectDetails] = useState(lead.projectDetails ?? "");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleEnterEdit = () => {
    // Reset the draft to the lead's current values every time edit mode is
    // (re-)entered, so a previously cancelled edit never lingers.
    setFullName(lead.fullName);
    setEmail(lead.email);
    setPhone(lead.phone);
    setCompany(lead.company ?? "");
    setService(lead.service);
    setBudget(lead.budget ?? "");
    setProjectDetails(lead.projectDetails ?? "");
    setValidationError(null);
    onEnterEdit();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedCompany = company.trim();
    const trimmedService = service.trim();
    const trimmedBudget = budget.trim();
    const trimmedProjectDetails = projectDetails.trim();

    if (!trimmedFullName) return setValidationError("Full name is required.");
    if (!EMAIL_PATTERN.test(trimmedEmail)) return setValidationError("Please enter a valid email address.");
    if (!PHONE_PATTERN.test(trimmedPhone)) {
      return setValidationError("Phone must be a valid international number (e.g. +917036431874).");
    }
    if (!trimmedService) return setValidationError("Service is required.");

    setValidationError(null);

    const values: LeadFormValues = {
      fullName: trimmedFullName,
      email: trimmedEmail,
      phone: trimmedPhone,
      service: trimmedService,
      ...(trimmedCompany ? { company: trimmedCompany } : {}),
      ...(trimmedBudget ? { budget: trimmedBudget } : {}),
      ...(trimmedProjectDetails ? { projectDetails: trimmedProjectDetails } : {}),
    };

    onSaveEdit(values);
  };

  const displayedError = validationError ?? errorMessage;

  return (
    <Modal title={mode === "edit" ? "Edit Lead" : lead.fullName} onClose={onClose} maxWidthClassName="max-w-2xl">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 rounded-[var(--radius-md)] border border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-white">Status</span>
          <div className="flex items-center gap-3">
            {isStatusUpdating && <span className="text-xs text-[var(--text-muted)]">Updating…</span>}
            <div className="group relative">
              <select
                value={lead.status}
                disabled={isStatusUpdating}
                onChange={(event) => onStatusChange(event.target.value as LeadStatus)}
                aria-label="Lead status"
                className={clsx(
                  "h-9 appearance-none rounded-full border bg-[var(--background-secondary)] pl-3 pr-8 text-[0.7rem] font-medium uppercase tracking-[0.06em] transition-colors duration-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60",
                  leadStatusBadgeClassName(lead.status)
                )}
              >
                {LEAD_STATUSES.map((statusOption) => (
                  <option key={statusOption} value={statusOption} className="bg-[var(--background-secondary)] text-white">
                    {formatLeadStatusLabel(statusOption)}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={13}
                strokeWidth={1.75}
                aria-hidden="true"
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-current"
              />
            </div>
          </div>
        </div>

        {mode === "view" ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <DetailRow label="Full Name" value={lead.fullName} />
              <DetailRow label="Email" value={lead.email} />
              <DetailRow label="Phone" value={lead.phone} />
              <DetailRow label="Company" value={lead.company ?? "—"} />
              <DetailRow label="Service" value={lead.service} />
              <DetailRow label="Budget" value={lead.budget ?? "—"} />
              <DetailRow label="Created" value={formatDate(lead.createdAt)} />
              <DetailRow label="Updated" value={formatDate(lead.updatedAt)} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">Project Details</p>
              <p className="mt-1.5 whitespace-pre-wrap text-sm leading-[1.7] text-[var(--text-secondary)]">
                {lead.projectDetails ?? "No project details provided."}
              </p>
            </div>

            <div className="mt-1 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button type="button" variant="pill" onClick={handleEnterEdit}>
                Edit Details
              </Button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                id="lead-full-name"
                name="fullName"
                label="Full Name"
                icon={User}
                placeholder="Full name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
              />
              <FormField
                id="lead-email"
                name="email"
                label="Email"
                type="email"
                icon={Mail}
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                id="lead-phone"
                name="phone"
                label="Phone"
                type="tel"
                icon={Phone}
                placeholder="+917036431874"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
              <FormField
                id="lead-company"
                name="company"
                label="Company"
                icon={Building2}
                placeholder="Company (optional)"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                id="lead-service"
                name="service"
                label="Service"
                icon={Briefcase}
                placeholder="Service"
                value={service}
                onChange={(event) => setService(event.target.value)}
                required
              />
              <FormField
                id="lead-budget"
                name="budget"
                label="Budget"
                icon={Wallet}
                placeholder="Budget (optional)"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
              />
            </div>

            <FormField
              id="lead-project-details"
              name="projectDetails"
              label="Project Details"
              as="textarea"
              rows={4}
              icon={PenLine}
              placeholder="Project details (optional)"
              value={projectDetails}
              onChange={(event) => setProjectDetails(event.target.value)}
            />

            {displayedError && <AdminAlert type="error" message={displayedError} />}

            <div className="mt-1 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={onCancelEdit} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" variant="pill" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}

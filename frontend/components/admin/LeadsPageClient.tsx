"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowUpDown, ChevronDown, Filter } from "lucide-react";
import AdminAlert from "./AdminAlert";
import ConfirmDialog from "./ConfirmDialog";
import LeadDetailModal from "./LeadDetailModal";
import LeadsTable from "./LeadsTable";
import Pagination from "./Pagination";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { deleteLead, fetchLeads, setLeadStatus, updateLead } from "@/services/adminLeads";
import { formatLeadStatusLabel } from "@/lib/leadStatus";
import { LEAD_STATUSES } from "@/types/adminLead";
import type { AdminLead, LeadFormValues, LeadPagination, LeadSort, LeadStatus } from "@/types/adminLead";

type PageStatus = "loading" | "loaded" | "error";
type Notice = { type: "success" | "error"; message: string } | null;
type DetailState = { lead: AdminLead; mode: "view" | "edit" } | null;

const PAGE_SIZE = 20;
const EMPTY_PAGINATION: LeadPagination = { page: 1, limit: PAGE_SIZE, total: 0, totalPages: 1 };

const selectStyles =
  "h-10 appearance-none rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--background-secondary)] py-2 pl-9 pr-8 font-sans text-sm text-white transition-colors duration-300 hover:border-[var(--primary)] focus:border-[var(--primary)] focus:outline-none";

/**
 * /admin/leads — read/filter/sort/paginate/edit/delete against the backend
 * Leads API (Phase 10.4). Rendered by app/admin/(dashboard)/leads/page.tsx
 * (a thin server component so it can still export page metadata;
 * LeadsPageClient needs hooks and can't be one) — same split as
 * ProjectsPageClient/ServicesPageClient. Session is already guaranteed
 * valid here: this page only ever mounts inside
 * app/admin/(dashboard)/layout.tsx, which redirects to /admin/login before
 * rendering children unless AdminAuthContext reports "authenticated". A 401
 * mid-session is handled the same way everywhere below: call
 * `refreshSession()`, which flips that context to "unauthenticated" and
 * lets the layout's guard redirect — no separate auth handling here.
 *
 * There is no "New Lead" action: leads are only ever created by the public
 * ContactForm submission, never by an admin.
 */
export default function LeadsPageClient() {
  const { refresh: refreshSession } = useAdminAuth();

  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [pagination, setPagination] = useState<LeadPagination>(EMPTY_PAGINATION);
  const [status, setStatus] = useState<PageStatus>("loading");
  const [loadErrorMessage, setLoadErrorMessage] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);

  const [statusFilter, setStatusFilter] = useState<LeadStatus | "">("");
  const [sort, setSort] = useState<LeadSort>("newest");
  const [page, setPage] = useState(1);

  const [detailState, setDetailState] = useState<DetailState>(null);
  const [detailErrorMessage, setDetailErrorMessage] = useState<string | null>(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);

  const [deletingLead, setDeletingLead] = useState<AdminLead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUnauthorized = useCallback(() => {
    void refreshSession();
  }, [refreshSession]);

  const loadLeads = useCallback(async () => {
    setStatus("loading");
    const result = await fetchLeads({
      status: statusFilter || undefined,
      sort,
      page,
      limit: PAGE_SIZE,
    });

    if (!result.success) {
      if (result.status === 401) return handleUnauthorized();
      setStatus("error");
      setLoadErrorMessage(result.message);
      return;
    }

    setLeads(result.data.leads);
    setPagination(result.data.pagination);
    setStatus("loaded");
  }, [handleUnauthorized, statusFilter, sort, page]);

  useEffect(() => {
    queueMicrotask(() => {
      loadLeads();
    });
  }, [loadLeads]);

  // Filter/sort changes always jump back to page 1 — a stale page number
  // from a previous, larger result set could otherwise land past the end.
  const handleStatusFilterChange = (value: LeadStatus | "") => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleSortChange = (value: LeadSort) => {
    setSort(value);
    setPage(1);
  };

  const openLeadDetails = (lead: AdminLead) => {
    setDetailErrorMessage(null);
    setDetailState({ lead, mode: "view" });
  };

  const closeLeadDetails = () => {
    setDetailState(null);
    setDetailErrorMessage(null);
  };

  const applyLeadUpdate = (updated: AdminLead) => {
    setLeads((prev) => prev.map((lead) => (lead.id === updated.id ? updated : lead)));
    setDetailState((prev) => (prev && prev.lead.id === updated.id ? { ...prev, lead: updated } : prev));
  };

  const handleSaveEdit = async (values: LeadFormValues) => {
    if (!detailState) return;

    setIsSavingEdit(true);
    const result = await updateLead(detailState.lead.id, values);
    setIsSavingEdit(false);

    if (!result.success) {
      if (result.status === 401) {
        handleUnauthorized();
        return;
      }
      setDetailErrorMessage(result.message);
      return;
    }

    applyLeadUpdate(result.data.lead);
    setDetailState({ lead: result.data.lead, mode: "view" });
    setNotice({ type: "success", message: "Lead updated." });
  };

  const handleStatusChange = async (lead: AdminLead, nextStatus: LeadStatus) => {
    if (nextStatus === lead.status) return;

    setStatusUpdatingId(lead.id);
    const result = await setLeadStatus(lead.id, nextStatus);
    setStatusUpdatingId(null);

    if (!result.success) {
      if (result.status === 401) return handleUnauthorized();
      setNotice({ type: "error", message: result.message });
      return;
    }

    applyLeadUpdate(result.data.lead);
  };

  const handleDeleteConfirmed = async () => {
    if (!deletingLead) return;

    setIsDeleting(true);
    const result = await deleteLead(deletingLead.id);
    setIsDeleting(false);

    if (!result.success) {
      if (result.status === 401) {
        setDeletingLead(null);
        handleUnauthorized();
        return;
      }
      setNotice({ type: "error", message: result.message });
      return;
    }

    setNotice({ type: "success", message: "Lead deleted." });
    setDeletingLead(null);
    if (detailState?.lead.id === deletingLead.id) closeLeadDetails();

    // Deleting the last lead on a page beyond the first would otherwise
    // leave the view stuck on a now-empty page.
    if (leads.length === 1 && page > 1) {
      setPage((prev) => prev - 1);
    } else {
      await loadLeads();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold uppercase tracking-[0.04em] text-white sm:text-3xl">
          Leads
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Contact form submissions from the public site.
        </p>
      </div>

      {notice && (
        <AdminAlert type={notice.type} message={notice.message} onDismiss={() => setNotice(null)} />
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="group relative">
          <Filter
            size={15}
            strokeWidth={1.75}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-colors duration-300 group-focus-within:text-[var(--primary)]"
          />
          <select
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(event) => handleStatusFilterChange(event.target.value as LeadStatus | "")}
            className={selectStyles}
          >
            <option value="" className="bg-[var(--background-secondary)] text-white">
              All Statuses
            </option>
            {LEAD_STATUSES.map((option) => (
              <option key={option} value={option} className="bg-[var(--background-secondary)] text-white">
                {formatLeadStatusLabel(option)}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            strokeWidth={1.75}
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
        </div>

        <div className="group relative">
          <ArrowUpDown
            size={15}
            strokeWidth={1.75}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-colors duration-300 group-focus-within:text-[var(--primary)]"
          />
          <select
            aria-label="Sort by date"
            value={sort}
            onChange={(event) => handleSortChange(event.target.value as LeadSort)}
            className={selectStyles}
          >
            <option value="newest" className="bg-[var(--background-secondary)] text-white">
              Newest First
            </option>
            <option value="oldest" className="bg-[var(--background-secondary)] text-white">
              Oldest First
            </option>
          </select>
          <ChevronDown
            size={14}
            strokeWidth={1.75}
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
        </div>
      </div>

      <LeadsTable
        leads={leads}
        status={status}
        errorMessage={loadErrorMessage}
        onView={openLeadDetails}
        onDelete={setDeletingLead}
        onRetry={loadLeads}
      />

      {status === "loaded" && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          total={pagination.total}
          onPrevious={() => setPage((prev) => Math.max(1, prev - 1))}
          onNext={() => setPage((prev) => Math.min(pagination.totalPages, prev + 1))}
        />
      )}

      {detailState && (
        <LeadDetailModal
          lead={detailState.lead}
          mode={detailState.mode}
          isSubmitting={isSavingEdit}
          isStatusUpdating={statusUpdatingId === detailState.lead.id}
          errorMessage={detailErrorMessage}
          onEnterEdit={() => setDetailState((prev) => (prev ? { ...prev, mode: "edit" } : prev))}
          onCancelEdit={() => {
            setDetailErrorMessage(null);
            setDetailState((prev) => (prev ? { ...prev, mode: "view" } : prev));
          }}
          onSaveEdit={handleSaveEdit}
          onStatusChange={(nextStatus) => handleStatusChange(detailState.lead, nextStatus)}
          onClose={closeLeadDetails}
        />
      )}

      {deletingLead && (
        <ConfirmDialog
          title="Delete Lead?"
          description={`This permanently deletes the inquiry from "${deletingLead.fullName}". This can't be undone.`}
          confirmLabel="Delete"
          isConfirming={isDeleting}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setDeletingLead(null)}
        />
      )}
    </div>
  );
}

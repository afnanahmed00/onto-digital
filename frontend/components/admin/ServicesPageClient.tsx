"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import AdminAlert from "./AdminAlert";
import ConfirmDialog from "./ConfirmDialog";
import ServiceFormModal from "./ServiceFormModal";
import ServicesTable from "./ServicesTable";
import { useAdminAuth } from "@/context/AdminAuthContext";
import {
  createService,
  deleteService,
  fetchServices,
  setServiceDisplayOrder,
  setServicePublished,
  updateService,
} from "@/services/adminServices";
import type { AdminService, ServiceFormValues } from "@/types/adminService";

type PageStatus = "loading" | "loaded" | "error";
type Notice = { type: "success" | "error"; message: string } | null;
type FormState = { mode: "create" } | { mode: "edit"; service: AdminService } | null;

/**
 * /admin/services — full CRUD against the backend Services API (Phase
 * 10.3), mirroring ProjectsPageClient (Phase 10.2) field-for-field in
 * structure. Rendered by app/admin/(dashboard)/services/page.tsx (a thin
 * server component, so it can still export page metadata — this component
 * needs hooks and can't). Session is already guaranteed valid here: the
 * page only ever mounts inside app/admin/(dashboard)/layout.tsx, which
 * redirects to /admin/login before rendering children unless
 * AdminAuthContext reports "authenticated". A 401 mid-session
 * (expired/revoked token) is handled the same way everywhere below: call
 * `refreshSession()`, which flips that context to "unauthenticated" and
 * lets the layout's guard redirect — no separate auth handling here.
 */
export default function ServicesPageClient() {
  const { refresh: refreshSession } = useAdminAuth();

  const [services, setServices] = useState<AdminService[]>([]);
  const [status, setStatus] = useState<PageStatus>("loading");
  const [loadErrorMessage, setLoadErrorMessage] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);

  const [formState, setFormState] = useState<FormState>(null);
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
  const [isMutating, setIsMutating] = useState(false);

  const [deletingService, setDeletingService] = useState<AdminService | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const sortedServices = useMemo(
    () => [...services].sort((a, b) => a.displayOrder - b.displayOrder || a.title.localeCompare(b.title)),
    [services]
  );

  const handleUnauthorized = useCallback(() => {
    void refreshSession();
  }, [refreshSession]);

  const loadServices = useCallback(async () => {
    setStatus("loading");
    const result = await fetchServices();

    if (!result.success) {
      if (result.status === 401) return handleUnauthorized();
      setStatus("error");
      setLoadErrorMessage(result.message);
      return;
    }

    setServices(result.data.services);
    setStatus("loaded");
  }, [handleUnauthorized]);

  useEffect(() => {
    queueMicrotask(() => {
      loadServices();
    });
  }, [loadServices]);

  const openCreateForm = () => {
    setFormErrorMessage(null);
    setFormState({ mode: "create" });
  };

  const openEditForm = (service: AdminService) => {
    setFormErrorMessage(null);
    setFormState({ mode: "edit", service });
  };

  const closeForm = () => {
    setFormState(null);
    setFormErrorMessage(null);
  };

  const handleSubmitForm = async (values: ServiceFormValues) => {
    if (!formState) return;

    setIsMutating(true);
    const result =
      formState.mode === "edit"
        ? await updateService(formState.service.id, values)
        : await createService(values);
    setIsMutating(false);

    if (!result.success) {
      if (result.status === 401) {
        handleUnauthorized();
        return;
      }
      setFormErrorMessage(result.message);
      return;
    }

    setNotice({
      type: "success",
      message: formState.mode === "edit" ? "Service updated." : "Service created.",
    });
    closeForm();
    await loadServices();
  };

  const handleTogglePublished = async (service: AdminService) => {
    const result = await setServicePublished(service.id, !service.published);
    if (!result.success) {
      if (result.status === 401) return handleUnauthorized();
      setNotice({ type: "error", message: result.message });
      return;
    }
    const updated = result.data.service;
    setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  // Swaps displayOrder with the adjacent service in the currently sorted
  // list — a lightweight reorder that needs no drag-and-drop dependency,
  // same approach as ProjectsPageClient.
  const handleReorder = async (service: AdminService, direction: "up" | "down") => {
    const index = sortedServices.findIndex((s) => s.id === service.id);
    const neighbor = sortedServices[direction === "up" ? index - 1 : index + 1];
    if (!neighbor) return;

    const [resultA, resultB] = await Promise.all([
      setServiceDisplayOrder(service.id, neighbor.displayOrder),
      setServiceDisplayOrder(neighbor.id, service.displayOrder),
    ]);

    if (!resultA.success) {
      if (resultA.status === 401) return handleUnauthorized();
      setNotice({ type: "error", message: resultA.message });
      // One swap may have gone through while the other failed — resync
      // from the server instead of leaving local state half-updated.
      await loadServices();
      return;
    }
    if (!resultB.success) {
      if (resultB.status === 401) return handleUnauthorized();
      setNotice({ type: "error", message: resultB.message });
      await loadServices();
      return;
    }

    const updatedA = resultA.data.service;
    const updatedB = resultB.data.service;
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === updatedA.id) return updatedA;
        if (s.id === updatedB.id) return updatedB;
        return s;
      })
    );
  };

  const handleDeleteConfirmed = async () => {
    if (!deletingService) return;

    setIsDeleting(true);
    const result = await deleteService(deletingService.id);
    setIsDeleting(false);

    if (!result.success) {
      if (result.status === 401) {
        setDeletingService(null);
        handleUnauthorized();
        return;
      }
      setNotice({ type: "error", message: result.message });
      return;
    }

    setNotice({ type: "success", message: "Service deleted." });
    setDeletingService(null);
    await loadServices();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold uppercase tracking-[0.04em] text-white sm:text-3xl">
            Services
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Manage the service catalog shown on the public site.
          </p>
        </div>

        <Button type="button" variant="outline" onClick={openCreateForm} className="w-full sm:w-auto">
          <Plus size={16} aria-hidden="true" />
          New Service
        </Button>
      </div>

      {notice && (
        <AdminAlert type={notice.type} message={notice.message} onDismiss={() => setNotice(null)} />
      )}

      <ServicesTable
        services={sortedServices}
        status={status}
        errorMessage={loadErrorMessage}
        onEdit={openEditForm}
        onDelete={setDeletingService}
        onTogglePublished={handleTogglePublished}
        onReorder={handleReorder}
        onRetry={loadServices}
      />

      {formState && (
        <ServiceFormModal
          mode={formState.mode}
          service={formState.mode === "edit" ? formState.service : null}
          isSubmitting={isMutating}
          errorMessage={formErrorMessage}
          onSubmit={handleSubmitForm}
          onClose={closeForm}
        />
      )}

      {deletingService && (
        <ConfirmDialog
          title="Delete Service?"
          description={`This permanently deletes "${deletingService.title}". This can't be undone.`}
          confirmLabel="Delete"
          isConfirming={isDeleting}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setDeletingService(null)}
        />
      )}
    </div>
  );
}

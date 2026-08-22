"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import AdminAlert from "./AdminAlert";
import ConfirmDialog from "./ConfirmDialog";
import ProjectFormModal from "./ProjectFormModal";
import ProjectsTable from "./ProjectsTable";
import { useAdminAuth } from "@/context/AdminAuthContext";
import {
  createProject,
  deleteProject,
  fetchProjects,
  setProjectDisplayOrder,
  setProjectPublished,
  updateProject,
} from "@/services/adminProjects";
import { deleteUploadedImage } from "@/services/adminUploads";
import type { AdminProject, ProjectFormValues } from "@/types/adminProject";

type PageStatus = "loading" | "loaded" | "error";
type Notice = { type: "success" | "error"; message: string } | null;
type FormState = { mode: "create" } | { mode: "edit"; project: AdminProject } | null;

/**
 * /admin/projects — full CRUD against the backend Projects API (Phase
 * 10.2). Rendered by app/admin/(dashboard)/projects/page.tsx (a thin server
 * component, so it can still export page metadata — this component needs
 * hooks and can't). Session is already guaranteed valid here: the page only
 * ever mounts inside app/admin/(dashboard)/layout.tsx, which redirects to
 * /admin/login before rendering children unless AdminAuthContext reports
 * "authenticated". A 401 mid-session (expired/revoked token) is handled
 * the same way everywhere below: call `refreshSession()`, which flips that
 * context to "unauthenticated" and lets the layout's guard redirect — no
 * separate auth handling here.
 */
export default function ProjectsPageClient() {
  const { refresh: refreshSession } = useAdminAuth();

  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [status, setStatus] = useState<PageStatus>("loading");
  const [loadErrorMessage, setLoadErrorMessage] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);

  const [formState, setFormState] = useState<FormState>(null);
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
  const [isMutating, setIsMutating] = useState(false);

  const [deletingProject, setDeletingProject] = useState<AdminProject | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => a.displayOrder - b.displayOrder || a.title.localeCompare(b.title)),
    [projects]
  );

  const handleUnauthorized = useCallback(() => {
    void refreshSession();
  }, [refreshSession]);

  const loadProjects = useCallback(async () => {
    setStatus("loading");
    const result = await fetchProjects();

    if (!result.success) {
      if (result.status === 401) return handleUnauthorized();
      setStatus("error");
      setLoadErrorMessage(result.message);
      return;
    }

    setProjects(result.data.projects);
    setStatus("loaded");
  }, [handleUnauthorized]);

  useEffect(() => {
    queueMicrotask(() => {
      loadProjects();
    });
  }, [loadProjects]);

  const openCreateForm = () => {
    setFormErrorMessage(null);
    setFormState({ mode: "create" });
  };

  const openEditForm = (project: AdminProject) => {
    setFormErrorMessage(null);
    setFormState({ mode: "edit", project });
  };

  const closeForm = () => {
    setFormState(null);
    setFormErrorMessage(null);
  };

  const handleSubmitForm = async (values: ProjectFormValues) => {
    if (!formState) return;

    setIsMutating(true);
    const result =
      formState.mode === "edit"
        ? await updateProject(formState.project.id, values)
        : await createProject(values);
    setIsMutating(false);

    if (!result.success) {
      if (result.status === 401) {
        handleUnauthorized();
        return;
      }
      setFormErrorMessage(result.message);
      return;
    }

    // Image replacement cleanup: only after the new image is confirmed
    // saved on the project above do we remove the *old* Cloudinary asset —
    // never before, so a failed save above always leaves the old image
    // intact. Skipped when the image didn't actually change (same public
    // ID), and best-effort: a failure here doesn't affect the edit that
    // already succeeded, so it's not surfaced to the admin as an error.
    if (formState.mode === "edit") {
      const oldPublicId = formState.project.imagePublicId;
      const newPublicId = result.data.project.imagePublicId;
      if (oldPublicId && oldPublicId !== newPublicId) {
        void deleteUploadedImage(oldPublicId);
      }
    }

    setNotice({
      type: "success",
      message: formState.mode === "edit" ? "Project updated." : "Project created.",
    });
    closeForm();
    await loadProjects();
  };

  const handleTogglePublished = async (project: AdminProject) => {
    const result = await setProjectPublished(project.id, !project.published);
    if (!result.success) {
      if (result.status === 401) return handleUnauthorized();
      setNotice({ type: "error", message: result.message });
      return;
    }
    const updated = result.data.project;
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleToggleFeatured = async (project: AdminProject) => {
    const result = await updateProject(project.id, { featured: !project.featured });
    if (!result.success) {
      if (result.status === 401) return handleUnauthorized();
      setNotice({ type: "error", message: result.message });
      return;
    }
    const updated = result.data.project;
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  // Swaps displayOrder with the adjacent project in the currently sorted
  // list — a lightweight reorder that needs no drag-and-drop dependency.
  const handleReorder = async (project: AdminProject, direction: "up" | "down") => {
    const index = sortedProjects.findIndex((p) => p.id === project.id);
    const neighbor = sortedProjects[direction === "up" ? index - 1 : index + 1];
    if (!neighbor) return;

    const [resultA, resultB] = await Promise.all([
      setProjectDisplayOrder(project.id, neighbor.displayOrder),
      setProjectDisplayOrder(neighbor.id, project.displayOrder),
    ]);

    if (!resultA.success) {
      if (resultA.status === 401) return handleUnauthorized();
      setNotice({ type: "error", message: resultA.message });
      // One swap may have gone through while the other failed — resync
      // from the server instead of leaving local state half-updated.
      await loadProjects();
      return;
    }
    if (!resultB.success) {
      if (resultB.status === 401) return handleUnauthorized();
      setNotice({ type: "error", message: resultB.message });
      await loadProjects();
      return;
    }

    const updatedA = resultA.data.project;
    const updatedB = resultB.data.project;
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === updatedA.id) return updatedA;
        if (p.id === updatedB.id) return updatedB;
        return p;
      })
    );
  };

  const handleDeleteConfirmed = async () => {
    if (!deletingProject) return;

    setIsDeleting(true);
    const result = await deleteProject(deletingProject.id);
    setIsDeleting(false);

    if (!result.success) {
      if (result.status === 401) {
        setDeletingProject(null);
        handleUnauthorized();
        return;
      }
      setNotice({ type: "error", message: result.message });
      return;
    }

    setNotice({ type: "success", message: "Project deleted." });
    setDeletingProject(null);
    await loadProjects();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold uppercase tracking-[0.04em] text-white sm:text-3xl">
            Projects
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Manage the portfolio projects shown on the public site.
          </p>
        </div>

        <Button type="button" variant="outline" onClick={openCreateForm} className="w-full sm:w-auto">
          <Plus size={16} aria-hidden="true" />
          New Project
        </Button>
      </div>

      {notice && (
        <AdminAlert type={notice.type} message={notice.message} onDismiss={() => setNotice(null)} />
      )}

      <ProjectsTable
        projects={sortedProjects}
        status={status}
        errorMessage={loadErrorMessage}
        onEdit={openEditForm}
        onDelete={setDeletingProject}
        onTogglePublished={handleTogglePublished}
        onToggleFeatured={handleToggleFeatured}
        onReorder={handleReorder}
        onRetry={loadProjects}
      />

      {formState && (
        <ProjectFormModal
          mode={formState.mode}
          project={formState.mode === "edit" ? formState.project : null}
          isSubmitting={isMutating}
          errorMessage={formErrorMessage}
          onSubmit={handleSubmitForm}
          onClose={closeForm}
          onUnauthorized={handleUnauthorized}
        />
      )}

      {deletingProject && (
        <ConfirmDialog
          title="Delete Project?"
          description={`This permanently deletes "${deletingProject.title}". This can't be undone.`}
          confirmLabel="Delete"
          isConfirming={isDeleting}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setDeletingProject(null)}
        />
      )}
    </div>
  );
}

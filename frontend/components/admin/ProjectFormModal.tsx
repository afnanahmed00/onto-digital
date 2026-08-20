"use client";

import { useState, type FormEvent } from "react";
import { Globe, Hash, Layers, Link2, PenLine, Tag, Type } from "lucide-react";
import Modal from "./Modal";
import AdminAlert from "./AdminAlert";
import ToggleSwitch from "./ToggleSwitch";
import ProjectImageUploader from "./ProjectImageUploader";
import Button from "@/components/ui/Button";
import FormField from "@/components/forms/FormField";
import { slugify } from "@/lib/utils";
import type { AdminProject, ProjectFormValues } from "@/types/adminProject";

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

type ProjectFormModalProps = {
  mode: "create" | "edit";
  project: AdminProject | null;
  isSubmitting: boolean;
  errorMessage: string | null;
  onSubmit: (values: ProjectFormValues) => void;
  onClose: () => void;
  onUnauthorized: () => void;
};

/**
 * Create/edit project form. Fields map 1:1 to the backend's project schema
 * (backend/src/validators/project.validators.ts) — see ProjectFormValues.
 * The parent page (app/admin/(dashboard)/projects/page.tsx) owns the actual
 * create/update API call and keeps the modal open with `errorMessage` set
 * on failure, so the admin can fix the input without losing their draft.
 */
export default function ProjectFormModal({
  mode,
  project,
  isSubmitting,
  errorMessage,
  onSubmit,
  onClose,
  onUnauthorized,
}: ProjectFormModalProps) {
  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  // Once true, typing in Title no longer auto-fills Slug — lets an admin
  // hand-edit the slug (e.g. for SEO) without it being overwritten.
  const [slugTouched, setSlugTouched] = useState(Boolean(project));
  const [description, setDescription] = useState(project?.description ?? "");
  const [category, setCategory] = useState(project?.category ?? "");
  const [imageUrl, setImageUrl] = useState(project?.imageUrl ?? "");
  const [imagePublicId, setImagePublicId] = useState(project?.imagePublicId ?? "");
  const [technologiesText, setTechnologiesText] = useState(project?.technologies.join(", ") ?? "");
  const [websiteUrl, setWebsiteUrl] = useState(project?.websiteUrl ?? "");
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [published, setPublished] = useState(project?.published ?? true);
  const [displayOrder, setDisplayOrder] = useState(String(project?.displayOrder ?? 0));
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const handleSlugChange = (value: string) => {
    setSlugTouched(true);
    setSlug(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedSlug = slug.trim().toLowerCase();
    const trimmedDescription = description.trim();
    const trimmedCategory = category.trim();
    const trimmedWebsiteUrl = websiteUrl.trim();
    const parsedDisplayOrder = Number(displayOrder);

    if (!trimmedTitle) return setValidationError("Title is required.");
    if (!SLUG_PATTERN.test(trimmedSlug)) {
      return setValidationError("Slug must be lowercase letters, numbers, and hyphens only.");
    }
    if (!trimmedDescription) return setValidationError("Description is required.");
    if (!trimmedCategory) return setValidationError("Category is required.");
    if (!imageUrl) return setValidationError("Upload a project image before saving.");
    if (!Number.isFinite(parsedDisplayOrder)) return setValidationError("Display order must be a number.");

    setValidationError(null);

    const technologies = technologiesText
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean);

    const values: ProjectFormValues = {
      title: trimmedTitle,
      slug: trimmedSlug,
      description: trimmedDescription,
      category: trimmedCategory,
      imageUrl,
      technologies,
      featured,
      published,
      displayOrder: parsedDisplayOrder,
      ...(trimmedWebsiteUrl ? { websiteUrl: trimmedWebsiteUrl } : {}),
      ...(imagePublicId ? { imagePublicId } : {}),
    };

    onSubmit(values);
  };

  const displayedError = validationError ?? errorMessage;

  return (
    <Modal
      title={mode === "edit" ? "Edit Project" : "New Project"}
      onClose={onClose}
      maxWidthClassName="max-w-2xl"
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <ProjectImageUploader
          value={imageUrl}
          onChange={(image) => {
            setImageUrl(image.url);
            setImagePublicId(image.publicId);
          }}
          onUnauthorized={onUnauthorized}
          disabled={isSubmitting}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id="project-title"
            name="title"
            label="Title"
            icon={Type}
            placeholder="Project Title"
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            required
          />

          <div className="flex flex-col">
            <FormField
              id="project-slug"
              name="slug"
              label="Slug"
              icon={Link2}
              placeholder="project-title"
              value={slug}
              onChange={(event) => handleSlugChange(event.target.value)}
              required
            />
            <p className="mt-1.5 text-[0.7rem] text-[var(--text-muted)]">
              Lowercase letters, numbers, and hyphens only.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id="project-category"
            name="category"
            label="Category"
            icon={Layers}
            placeholder="e.g. Web Development"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          />

          <FormField
            id="project-website-url"
            name="websiteUrl"
            label="Website URL"
            type="text"
            icon={Globe}
            placeholder="https://example.com"
            value={websiteUrl}
            onChange={(event) => setWebsiteUrl(event.target.value)}
          />
        </div>

        <FormField
          id="project-description"
          name="description"
          label="Description"
          as="textarea"
          rows={4}
          icon={PenLine}
          placeholder="Short description of the project"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />

        <div className="flex flex-col">
          <FormField
            id="project-technologies"
            name="technologies"
            label="Technologies"
            icon={Tag}
            placeholder="Next.js, Tailwind CSS, MongoDB"
            value={technologiesText}
            onChange={(event) => setTechnologiesText(event.target.value)}
          />
          <p className="mt-1.5 text-[0.7rem] text-[var(--text-muted)]">Comma-separated.</p>
        </div>

        <FormField
          id="project-display-order"
          name="displayOrder"
          label="Display Order"
          type="number"
          icon={Hash}
          placeholder="0"
          value={displayOrder}
          onChange={(event) => setDisplayOrder(event.target.value)}
          required
        />

        <div className="flex flex-col gap-4 rounded-[var(--radius-md)] border border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-around">
          <div className="flex items-center justify-between gap-3 sm:justify-start">
            <span className="text-sm text-white">Published</span>
            <ToggleSwitch checked={published} onChange={setPublished} label="Published" />
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-start">
            <span className="text-sm text-white">Featured</span>
            <ToggleSwitch checked={featured} onChange={setFeatured} label="Featured" />
          </div>
        </div>

        {displayedError && <AdminAlert type="error" message={displayedError} />}

        <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="pill" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : mode === "edit" ? "Save Changes" : "Create Project"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

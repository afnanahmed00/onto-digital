"use client";

import { useState, type FormEvent } from "react";
import { AlignLeft, FileText, Hash, ListChecks, Link2, Sparkles, Tag, Type } from "lucide-react";
import Modal from "./Modal";
import AdminAlert from "./AdminAlert";
import ToggleSwitch from "./ToggleSwitch";
import ServiceFeaturesEditor from "./ServiceFeaturesEditor";
import StringListEditor from "./StringListEditor";
import Button from "@/components/ui/Button";
import FormField from "@/components/forms/FormField";
import { slugify } from "@/lib/utils";
import type { AdminService, ServiceFormValues } from "@/types/adminService";

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

type ServiceFormModalProps = {
  mode: "create" | "edit";
  service: AdminService | null;
  isSubmitting: boolean;
  errorMessage: string | null;
  onSubmit: (values: ServiceFormValues) => void;
  onClose: () => void;
};

/**
 * Create/edit service form. Fields map 1:1 to the backend's service schema
 * (backend/src/validators/service.validators.ts) — see ServiceFormValues.
 * Same shape as ProjectFormModal (Phase 10.2): the parent page owns the
 * actual create/update API call and keeps the modal open with
 * `errorMessage` set on failure so the admin doesn't lose their draft.
 * Unlike projects, services have no image field on the model — nothing here
 * touches the Cloudinary uploader.
 */
export default function ServiceFormModal({
  mode,
  service,
  isSubmitting,
  errorMessage,
  onSubmit,
  onClose,
}: ServiceFormModalProps) {
  const [title, setTitle] = useState(service?.title ?? "");
  const [slug, setSlug] = useState(service?.slug ?? "");
  // Once true, typing in Title no longer auto-fills Slug — same convention
  // as ProjectFormModal, lets an admin hand-edit the slug without it being
  // overwritten.
  const [slugTouched, setSlugTouched] = useState(Boolean(service));
  const [shortDescription, setShortDescription] = useState(service?.shortDescription ?? "");
  const [description, setDescription] = useState(service?.description ?? "");
  const [icon, setIcon] = useState(service?.icon ?? "");
  const [features, setFeatures] = useState(service?.features ?? []);
  const [whatYouGet, setWhatYouGet] = useState(service?.whatYouGet ?? []);
  const [technologiesText, setTechnologiesText] = useState(service?.technologies.join(", ") ?? "");
  const [published, setPublished] = useState(service?.published ?? true);
  const [displayOrder, setDisplayOrder] = useState(String(service?.displayOrder ?? 0));
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
    const trimmedShortDescription = shortDescription.trim();
    const trimmedDescription = description.trim();
    const trimmedIcon = icon.trim();
    const parsedDisplayOrder = Number(displayOrder);

    if (!trimmedTitle) return setValidationError("Title is required.");
    if (!SLUG_PATTERN.test(trimmedSlug)) {
      return setValidationError("Slug must be lowercase letters, numbers, and hyphens only.");
    }
    if (!trimmedShortDescription) return setValidationError("Short description is required.");
    if (!trimmedDescription) return setValidationError("Description is required.");
    if (!trimmedIcon) return setValidationError("Icon is required.");
    if (!Number.isFinite(parsedDisplayOrder)) return setValidationError("Display order must be a number.");

    const trimmedFeatures = features.map((feature) => ({
      icon: feature.icon.trim(),
      label: feature.label.trim(),
    }));
    if (trimmedFeatures.some((feature) => !feature.icon || !feature.label)) {
      return setValidationError("Every feature needs both an icon name and a label.");
    }

    const trimmedWhatYouGet = whatYouGet.map((item) => item.trim()).filter(Boolean);

    setValidationError(null);

    const technologies = technologiesText
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean);

    const values: ServiceFormValues = {
      title: trimmedTitle,
      slug: trimmedSlug,
      shortDescription: trimmedShortDescription,
      description: trimmedDescription,
      icon: trimmedIcon,
      features: trimmedFeatures,
      whatYouGet: trimmedWhatYouGet,
      technologies,
      published,
      displayOrder: parsedDisplayOrder,
    };

    onSubmit(values);
  };

  const displayedError = validationError ?? errorMessage;

  return (
    <Modal
      title={mode === "edit" ? "Edit Service" : "New Service"}
      onClose={onClose}
      maxWidthClassName="max-w-2xl"
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id="service-title"
            name="title"
            label="Title"
            icon={Type}
            placeholder="Service Title"
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            required
          />

          <div className="flex flex-col">
            <FormField
              id="service-slug"
              name="slug"
              label="Slug"
              icon={Link2}
              placeholder="service-title"
              value={slug}
              onChange={(event) => handleSlugChange(event.target.value)}
              required
            />
            <p className="mt-1.5 text-[0.7rem] text-[var(--text-muted)]">
              Lowercase letters, numbers, and hyphens only.
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <FormField
            id="service-icon"
            name="icon"
            label="Icon"
            icon={Sparkles}
            placeholder="e.g. Globe"
            value={icon}
            onChange={(event) => setIcon(event.target.value)}
            required
          />
          <p className="mt-1.5 text-[0.7rem] text-[var(--text-muted)]">
            Lucide icon name shown on the service card, case-sensitive.
          </p>
        </div>

        <FormField
          id="service-short-description"
          name="shortDescription"
          label="Short Description"
          as="textarea"
          rows={2}
          icon={AlignLeft}
          placeholder="Lead paragraph shown on the service card"
          value={shortDescription}
          onChange={(event) => setShortDescription(event.target.value)}
          required
        />

        <FormField
          id="service-description"
          name="description"
          label="Description"
          as="textarea"
          rows={4}
          icon={FileText}
          placeholder="Full supporting copy shown on the service detail page"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />

        <ServiceFeaturesEditor features={features} onChange={setFeatures} disabled={isSubmitting} />

        <StringListEditor
          icon={ListChecks}
          label="What You Get"
          items={whatYouGet}
          onChange={setWhatYouGet}
          placeholder="e.g. Responsive design across all devices"
          addLabel="Add Item"
          maxLength={300}
          disabled={isSubmitting}
        />

        <div className="flex flex-col">
          <FormField
            id="service-technologies"
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
          id="service-display-order"
          name="displayOrder"
          label="Display Order"
          type="number"
          icon={Hash}
          placeholder="0"
          value={displayOrder}
          onChange={(event) => setDisplayOrder(event.target.value)}
          required
        />

        <div className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] border border-[var(--border)] p-4">
          <span className="text-sm text-white">Published</span>
          <ToggleSwitch checked={published} onChange={setPublished} label="Published" />
        </div>

        {displayedError && <AdminAlert type="error" message={displayedError} />}

        <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="pill" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : mode === "edit" ? "Save Changes" : "Create Service"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

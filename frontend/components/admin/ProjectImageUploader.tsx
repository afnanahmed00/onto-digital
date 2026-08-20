"use client";

import { useRef, useState, type ChangeEvent } from "react";
import Image from "next/image";
import { AlertCircle, ImageOff, Upload } from "lucide-react";
import Button from "@/components/ui/Button";
import { uploadProjectImage } from "@/services/adminUploads";

const ACCEPTED_TYPES = "image/jpeg,image/png,image/webp,image/gif";

type ProjectImageUploaderProps = {
  value: string;
  onChange: (image: { url: string; publicId: string }) => void;
  onUnauthorized: () => void;
  disabled?: boolean;
};

/**
 * POST /api/v1/uploads (field "image", folder "projects" — see
 * services/adminUploads.ts). Uploads straight to Cloudinary through the
 * backend; the returned secure URL and public ID are both handed back via
 * `onChange` for the parent form to save as the project's `imageUrl` /
 * `imagePublicId` — the public ID is what a later edit needs to clean up
 * *this* upload's Cloudinary asset if it's replaced again (see
 * ProjectFormModal.tsx and ProjectsPageClient.tsx). Selecting a new file
 * while one is already set re-uploads and replaces the preview/value here;
 * the previous Cloudinary asset is left in place until the form is actually
 * saved (it may still be cancelled), and is only deleted after that save
 * succeeds.
 */
export default function ProjectImageUploader({
  value,
  onChange,
  onUnauthorized,
  disabled = false,
}: ProjectImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Reset the input so selecting the same file again still fires onChange.
    event.target.value = "";
    if (!file) return;

    setError(null);
    setIsUploading(true);

    const result = await uploadProjectImage(file);

    setIsUploading(false);

    if (!result.success) {
      if (result.status === 401) {
        onUnauthorized();
        return;
      }
      setError(result.message);
      return;
    }

    onChange({ url: result.image.url, publicId: result.image.publicId });
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-medium uppercase tracking-[0.1em] text-[var(--text-secondary)]">
        Project Image
      </span>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[#0A0A0A] sm:w-48">
          {value ? (
            <Image src={value} alt="Project preview" fill sizes="192px" className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[var(--text-muted)]">
              <ImageOff size={28} aria-hidden="true" />
            </div>
          )}

          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
              <span
                aria-hidden="true"
                className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--primary)]/30 border-t-[var(--primary)]"
              />
              <span className="sr-only">Uploading…</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_TYPES}
            onChange={handleFileChange}
            disabled={disabled || isUploading}
            className="hidden"
            aria-label="Choose a project image"
          />

          <Button
            type="button"
            variant="outline"
            onClick={() => inputRef.current?.click()}
            disabled={disabled || isUploading}
            className="w-full sm:w-auto"
          >
            <Upload size={16} aria-hidden="true" />
            {isUploading ? "Uploading..." : value ? "Replace Image" : "Upload Image"}
          </Button>

          <p className="text-[0.7rem] text-[var(--text-muted)]">JPEG, PNG, WEBP, or GIF — up to 5MB.</p>

          {error && (
            <p className="flex items-center gap-1.5 text-[0.75rem] text-[#FF5C5C]">
              <AlertCircle size={13} className="shrink-0" aria-hidden="true" />
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { Plus, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const inputStyles =
  "w-full rounded-xl border border-[var(--border-card)] bg-[var(--background-secondary)] px-4 py-3 font-sans text-[0.9rem] text-white placeholder:text-[var(--text-muted)] transition-colors duration-300 hover:border-[var(--primary)] focus:border-[var(--primary)] focus:outline-none";

type StringListEditorProps = {
  icon: LucideIcon;
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  addLabel?: string;
  maxLength?: number;
  disabled?: boolean;
};

/**
 * Repeatable single-line text list — used for a Service's `whatYouGet`
 * checklist (frontend/types/adminService.ts). Projects has no array field
 * shaped like this (its `technologies` stays a comma-separated FormField,
 * see ProjectFormModal), so this is new rather than reused, but it follows
 * the same input styling as FormField/ServiceFeaturesEditor.
 */
export default function StringListEditor({
  icon: Icon,
  label,
  items,
  onChange,
  placeholder,
  addLabel = "Add Item",
  maxLength,
  disabled = false,
}: StringListEditorProps) {
  const updateItem = (index: number, value: string) => {
    onChange(items.map((item, i) => (i === index ? value : item)));
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    onChange([...items, ""]);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-[0.1em] text-[var(--text-secondary)]">
        {label}
      </span>

      {items.length === 0 && (
        <p className="text-[0.8rem] text-[var(--text-muted)]">No items yet.</p>
      )}

      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="group relative flex-1">
              <Icon
                size={16}
                strokeWidth={1.75}
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-colors duration-300 group-focus-within:text-[var(--primary)]"
              />
              <input
                type="text"
                value={item}
                placeholder={placeholder}
                maxLength={maxLength}
                disabled={disabled}
                onChange={(event) => updateItem(index, event.target.value)}
                className={`${inputStyles} pl-10`}
                aria-label={`${label} item ${index + 1}`}
              />
            </div>
            <button
              type="button"
              aria-label={`Remove ${label} item ${index + 1}`}
              disabled={disabled}
              onClick={() => removeItem(index)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-secondary)] transition-colors duration-300 hover:bg-[#FF5C5C]/10 hover:text-[#FF5C5C] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <X size={15} aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={addItem}
        className="inline-flex w-fit items-center gap-1.5 text-xs font-medium uppercase tracking-[0.06em] text-[var(--primary)] transition-opacity duration-300 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Plus size={14} aria-hidden="true" />
        {addLabel}
      </button>
    </div>
  );
}

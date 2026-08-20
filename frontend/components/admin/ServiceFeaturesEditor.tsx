"use client";

import { Plus, Shapes, Tag, X } from "lucide-react";
import type { AdminServiceFeature } from "@/types/adminService";

const inputStyles =
  "w-full rounded-xl border border-[#262626] bg-[#0A0A0A] py-2.5 pl-9 pr-3 font-sans text-[0.85rem] text-white placeholder:text-[#6B6B6B] transition-colors duration-300 hover:border-[#51FF73] focus:border-[#51FF73] focus:outline-none";

type ServiceFeaturesEditorProps = {
  features: AdminServiceFeature[];
  onChange: (features: AdminServiceFeature[]) => void;
  disabled?: boolean;
};

/**
 * Repeatable icon + label pair editor for a Service's `features` highlights
 * (backend/src/types/service.types.ts's IServiceFeature). Each `icon` is a
 * Lucide icon name string, same convention as the service's own top-level
 * `icon` field in ServiceFormModal — the admin types the name, the public
 * site resolves it to a component when Phase 10.3's public rollout happens.
 */
export default function ServiceFeaturesEditor({
  features,
  onChange,
  disabled = false,
}: ServiceFeaturesEditorProps) {
  const updateFeature = (index: number, patch: Partial<AdminServiceFeature>) => {
    onChange(features.map((feature, i) => (i === index ? { ...feature, ...patch } : feature)));
  };

  const removeFeature = (index: number) => {
    onChange(features.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    onChange([...features, { icon: "", label: "" }]);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-[0.1em] text-[var(--text-secondary)]">
        Features
      </span>

      {features.length === 0 && (
        <p className="text-[0.8rem] text-[var(--text-muted)]">No features yet.</p>
      )}

      <div className="flex flex-col gap-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="group relative w-2/5 shrink-0">
              <Shapes
                size={15}
                strokeWidth={1.75}
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] transition-colors duration-300 group-focus-within:text-[#51FF73]"
              />
              <input
                type="text"
                value={feature.icon}
                placeholder="Icon name"
                disabled={disabled}
                onChange={(event) => updateFeature(index, { icon: event.target.value })}
                className={inputStyles}
                aria-label={`Feature ${index + 1} icon name`}
              />
            </div>

            <div className="group relative flex-1">
              <Tag
                size={15}
                strokeWidth={1.75}
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] transition-colors duration-300 group-focus-within:text-[#51FF73]"
              />
              <input
                type="text"
                value={feature.label}
                placeholder="Label"
                maxLength={80}
                disabled={disabled}
                onChange={(event) => updateFeature(index, { label: event.target.value })}
                className={inputStyles}
                aria-label={`Feature ${index + 1} label`}
              />
            </div>

            <button
              type="button"
              aria-label={`Remove feature ${index + 1}`}
              disabled={disabled}
              onClick={() => removeFeature(index)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-secondary)] transition-colors duration-300 hover:bg-[#FF5C5C]/10 hover:text-[#FF5C5C] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <X size={15} aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>

      <p className="text-[0.7rem] text-[var(--text-muted)]">
        Icon name is a Lucide icon (e.g. &quot;Smartphone&quot;), case-sensitive.
      </p>

      <button
        type="button"
        disabled={disabled}
        onClick={addFeature}
        className="inline-flex w-fit items-center gap-1.5 text-xs font-medium uppercase tracking-[0.06em] text-[var(--primary)] transition-opacity duration-300 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Plus size={14} aria-hidden="true" />
        Add Feature
      </button>
    </div>
  );
}

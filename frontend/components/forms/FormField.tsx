import type { ChangeEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

type SharedProps = {
  id: string;
  name: string;
  label: string;
  icon: LucideIcon;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  /** Marks the field as failing validation — draws the border in the alert color. */
  invalid?: boolean;
  value: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
};

type InputFieldProps = SharedProps & {
  as?: "input";
  type?: "text" | "email" | "tel" | "number" | "password";
};

type TextareaFieldProps = SharedProps & {
  as: "textarea";
  rows?: number;
};

type SelectFieldProps = SharedProps & {
  as: "select";
  options: { value: string; label: string }[];
};

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

// Normal body copy (sans-serif) — kept separate from the site's display/heading
// font so form input, placeholder and typed text never render in it.
const fieldStyles =
  "w-full rounded-xl border bg-[var(--background-secondary)] font-sans text-[0.9rem] text-white placeholder:text-[0.9rem] placeholder:text-[var(--text-muted)] transition-colors duration-300 hover:border-[var(--primary)] focus:border-[var(--primary)] focus:outline-none";

/** Shared input/textarea/select used across the contact form — label stays accessible even though only the icon + placeholder are shown. */
export default function FormField(props: FormFieldProps) {
  const {
    id,
    name,
    label,
    icon: Icon,
    placeholder,
    autoComplete,
    required,
    invalid,
    value,
    onChange,
  } = props;
  const isTextarea = props.as === "textarea";
  const isSelect = props.as === "select";
  const borderStyles = invalid ? "border-[#FF5C5C]" : "border-[var(--border-card)]";

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <div className="group relative">
        <Icon
          size={18}
          strokeWidth={1.75}
          aria-hidden="true"
          className={clsx(
            "pointer-events-none absolute left-4 z-10 text-[var(--text-muted)] transition-colors duration-300 group-focus-within:text-[var(--primary)]",
            isTextarea ? "top-4" : "top-1/2 -translate-y-1/2"
          )}
        />

        {isTextarea ? (
          <textarea
            id={id}
            name={name}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required={required}
            rows={(props as TextareaFieldProps).rows ?? 5}
            value={value}
            onChange={onChange}
            className={clsx(fieldStyles, borderStyles, "min-h-[140px] resize-none py-4 pl-11 pr-4 leading-[1.7]")}
          />
        ) : isSelect ? (
          <>
            <select
              id={id}
              name={name}
              required={required}
              value={value}
              onChange={onChange}
              className={clsx(
                fieldStyles,
                borderStyles,
                "h-[52px] appearance-none pl-11 pr-10",
                value ? "text-white" : "text-[var(--text-muted)]"
              )}
            >
              <option value="" disabled hidden>
                {placeholder}
              </option>
              {(props as SelectFieldProps).options.map((option) => (
                <option key={option.value} value={option.value} className="bg-[var(--background-secondary)] text-white">
                  {option.label}
                </option>
              ))}
            </select>

            <ChevronDown
              size={16}
              strokeWidth={1.75}
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-colors duration-300 group-focus-within:text-[var(--primary)]"
            />
          </>
        ) : (
          <input
            id={id}
            name={name}
            type={(props as InputFieldProps).type ?? "text"}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required={required}
            value={value}
            onChange={onChange}
            className={clsx(fieldStyles, borderStyles, "h-[52px] pl-11 pr-4")}
          />
        )}
      </div>
    </div>
  );
}

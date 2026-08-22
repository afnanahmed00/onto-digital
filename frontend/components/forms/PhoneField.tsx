import type { ChangeEvent } from "react";
import { ChevronDown, Phone } from "lucide-react";
import clsx from "clsx";
import { COUNTRIES } from "@/data/countries";

type PhoneFieldProps = {
  id: string;
  name: string;
  label: string;
  /** ISO 3166-1 alpha-2 code of the selected country, e.g. "IN". */
  countryIso2: string;
  onCountryChange: (iso2: string) => void;
  /** Local phone number only — no country/dial code. */
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  /** Marks the field as failing validation — draws both boxes' borders in the alert color. */
  invalid?: boolean;
};

// Shares the site's field look (border, background, hover/focus green) with
// FormField so the combined control reads as one continuous input.
const fieldStyles =
  "rounded-xl border bg-[var(--background-secondary)] font-sans text-[0.9rem] text-white transition-colors duration-300 hover:border-[var(--primary)] focus:border-[var(--primary)] focus:outline-none";

/**
 * Country-code selector + local phone number input, styled to match
 * FormField. Used everywhere the site collects a phone number so the
 * backend always receives a full international number (e.g. +917036431874).
 */
export default function PhoneField({
  id,
  name,
  label,
  countryIso2,
  onCountryChange,
  value,
  onChange,
  placeholder = "Phone Number",
  required,
  invalid,
}: PhoneFieldProps) {
  const borderStyles = invalid ? "border-[#FF5C5C]" : "border-[var(--border-card)]";

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <div className="flex gap-2">
        <div className="group relative shrink-0">
          <label htmlFor={`${id}-country`} className="sr-only">
            Country code
          </label>

          <select
            id={`${id}-country`}
            name={`${name}Country`}
            value={countryIso2}
            onChange={(event) => onCountryChange(event.target.value)}
            className={clsx(
              fieldStyles,
              borderStyles,
              "h-[52px] w-[5.75rem] appearance-none pl-3 pr-6 text-[0.85rem] sm:w-[6.25rem]"
            )}
          >
            {COUNTRIES.map((country) => (
              <option
                key={country.iso2}
                value={country.iso2}
                title={country.name}
                className="bg-[var(--background-secondary)] text-white"
              >
                {country.flag} +{country.dialCode}
              </option>
            ))}
          </select>

          <ChevronDown
            size={14}
            strokeWidth={1.75}
            aria-hidden="true"
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-colors duration-300 group-focus-within:text-[var(--primary)]"
          />
        </div>

        <div className="group relative min-w-0 flex-1">
          <Phone
            size={18}
            strokeWidth={1.75}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[var(--text-muted)] transition-colors duration-300 group-focus-within:text-[var(--primary)]"
          />

          <input
            id={id}
            name={name}
            type="tel"
            inputMode="tel"
            placeholder={placeholder}
            autoComplete="tel-national"
            required={required}
            value={value}
            onChange={onChange}
            className={clsx(fieldStyles, borderStyles, "h-[52px] w-full pl-11 pr-4")}
          />
        </div>
      </div>
    </div>
  );
}

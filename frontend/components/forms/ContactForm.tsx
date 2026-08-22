"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Layers,
  Lock,
  Mail,
  PenLine,
  User,
  Wallet,
} from "lucide-react";
import Button from "@/components/ui/Button";
import FormField from "@/components/forms/FormField";
import PhoneField from "@/components/forms/PhoneField";
import { sendContactMessage } from "@/services/api";
import { COUNTRIES, DEFAULT_COUNTRY } from "@/data/countries";
import type { ContactFormData } from "@/types";

const INITIAL_STATE: ContactFormData = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  projectDetails: "",
};

const SERVICE_OPTIONS = [
  { value: "business-websites", label: "Business Websites" },
  { value: "wordpress-websites", label: "WordPress Websites" },
  { value: "portfolio-websites", label: "Portfolio Websites" },
  { value: "ecommerce-websites", label: "E-Commerce Websites" },
  { value: "landing-pages", label: "Landing Pages" },
  { value: "website-redesign", label: "Website Redesign" },
  { value: "website-maintenance", label: "Website Maintenance" },
  { value: "web-applications", label: "Custom Web Applications" },
  { value: "other", label: "Other" },
];

const BUDGET_OPTIONS = [
  { value: "under-100", label: "Under $100 USD" },
  { value: "100-250", label: "$100 – $250 USD" },
  { value: "250-500", label: "$250 – $500 USD" },
  { value: "500-1000", label: "$500 – $1,000 USD" },
  { value: "1000-plus", label: "$1000+ USD" },
];

type SubmitStatus = {
  type: "success" | "error";
  message: string;
};

// Fields the form actually validates client-side — used to know which field
// to flag red when validate() rejects the submission.
type RequiredFieldName = "fullName" | "email" | "phone" | "service" | "projectDetails";

type ContactFormProps = {
  /**
   * Pre-selects the Service field — used by the Service Detail page
   * ([slug]/page.tsx) so arriving from /services/ecommerce-websites, for
   * example, opens the form with "E-Commerce Websites" already selected.
   * Must be one of SERVICE_OPTIONS' values (kept in sync with the contact
   * API's SERVICE_VALUES enum). The visitor can still change it.
   */
  defaultService?: string;
};

export default function ContactForm({ defaultService = "" }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    ...INITIAL_STATE,
    service: defaultService,
  });
  const [phoneCountry, setPhoneCountry] = useState<string>(DEFAULT_COUNTRY.iso2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus | null>(null);
  const [errorField, setErrorField] = useState<RequiredFieldName | null>(null);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorField((prev) => (prev === name ? null : prev));
  };

  // Local phone input only ever holds digits and common formatting
  // characters — letters and other symbols are stripped as the user types.
  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const sanitized = event.target.value.replace(/[^\d\s().-]/g, "");
    setFormData((prev) => ({ ...prev, phone: sanitized }));
    setErrorField((prev) => (prev === "phone" ? null : prev));
  };

  const handlePhoneCountryChange = (iso2: string) => {
    setPhoneCountry(iso2);
    setErrorField((prev) => (prev === "phone" ? null : prev));
  };

  const selectedCountry =
    COUNTRIES.find((country) => country.iso2 === phoneCountry) ?? DEFAULT_COUNTRY;

  const validate = (): { field: RequiredFieldName; message: string } | null => {
    if (!formData.fullName.trim())
      return { field: "fullName", message: "Please enter your full name." };
    if (!formData.email.trim())
      return { field: "email", message: "Please enter your email address." };

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!phoneDigits) return { field: "phone", message: "Please enter your phone number." };
    if (
      phoneDigits.length < selectedCountry.phoneLength.min ||
      phoneDigits.length > selectedCountry.phoneLength.max
    ) {
      return {
        field: "phone",
        message: "Please enter a valid phone number for the selected country.",
      };
    }

    if (!formData.service.trim())
      return { field: "service", message: "Please select a service." };
    if (!formData.projectDetails.trim())
      return { field: "projectDetails", message: "Please tell us about your project." };
    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const validationError = validate();
    if (validationError) {
      setErrorField(validationError.field);
      setStatus({ type: "error", message: validationError.message });
      return;
    }

    setErrorField(null);
    setStatus(null);
    setIsSubmitting(true);

    try {
      // Backend always receives the full international number, e.g.
      // "+917036431874" — the country code is never typed by the user.
      const phoneDigits = formData.phone.replace(/\D/g, "");
      const payload: ContactFormData = {
        ...formData,
        phone: `+${selectedCountry.dialCode}${phoneDigits}`,
      };

      const result = await sendContactMessage(payload);

      if (result.success) {
        setStatus({
          type: "success",
          message: "Your message has been sent successfully.",
        });
        setFormData(INITIAL_STATE);
        setPhoneCountry(DEFAULT_COUNTRY.iso2);
        setErrorField(null);
      } else {
        setStatus({
          type: "error",
          message: result.message || "Unable to send your message.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Unable to send your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4 sm:mt-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="fullName"
          name="fullName"
          label="Full Name"
          type="text"
          placeholder="Your Full Name (Required)"
          autoComplete="name"
          icon={User}
          value={formData.fullName}
          onChange={handleChange}
          required
          invalid={errorField === "fullName"}
        />

        <FormField
          id="email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="Your Email (Required)"
          autoComplete="email"
          icon={Mail}
          value={formData.email}
          onChange={handleChange}
          required
          invalid={errorField === "email"}
        />
      </div>

      <PhoneField
        id="phone"
        name="phone"
        label="Phone Number"
        countryIso2={phoneCountry}
        onCountryChange={handlePhoneCountryChange}
        value={formData.phone}
        onChange={handlePhoneChange}
        placeholder="Phone Number (Required)"
        required
        invalid={errorField === "phone"}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="service"
          name="service"
          label="Service Needed"
          as="select"
          placeholder="Select a Service (Required)"
          icon={Layers}
          value={formData.service}
          onChange={handleChange}
          options={SERVICE_OPTIONS}
          required
          invalid={errorField === "service"}
        />

        <FormField
          id="company"
          name="company"
          label="Company Name"
          type="text"
          placeholder="Company (Optional)"
          autoComplete="organization"
          icon={Briefcase}
          value={formData.company}
          onChange={handleChange}
        />
      </div>

      <FormField
        id="budget"
        name="budget"
        label="Estimated Budget"
        as="select"
        placeholder="Select an Estimated Budget (Optional)"
        icon={Wallet}
        value={formData.budget}
        onChange={handleChange}
        options={BUDGET_OPTIONS}
      />

      <FormField
        id="projectDetails"
        name="projectDetails"
        label="Project Details"
        as="textarea"
        rows={5}
        placeholder="Tell us about your project (Required)"
        icon={PenLine}
        value={formData.projectDetails}
        onChange={handleChange}
        required
        invalid={errorField === "projectDetails"}
      />

      <Button
        type="submit"
        variant="outline"
        disabled={isSubmitting}
        className="mt-2 w-full sm:w-auto"
      >
        {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
        <ArrowUpRight size={16} />
      </Button>

      {status && (
        <p
          role="status"
          className={
            "flex items-center gap-2 rounded-xl border px-4 py-3 text-[0.82rem] leading-[1.6] " +
            (status.type === "success"
              ? "border-[var(--primary)]/35 bg-[var(--primary)]/[0.06] text-[var(--primary)]"
              : "border-[#FF5C5C]/35 bg-[#FF5C5C]/[0.06] text-[#FF5C5C]")
          }
        >
          {status.type === "success" ? (
            <CheckCircle2 size={16} className="shrink-0" aria-hidden="true" />
          ) : (
            <AlertCircle size={16} className="shrink-0" aria-hidden="true" />
          )}
          {status.message}
        </p>
      )}

      <p className="flex items-center gap-2 text-[0.78rem] leading-[1.6] text-[var(--text-body)]">
        <Lock size={13} className="shrink-0 text-[var(--primary)]" aria-hidden="true" />
        We respect your privacy. Your information is safe with us.
      </p>
    </form>
  );
}

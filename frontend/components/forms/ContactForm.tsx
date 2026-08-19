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
  Phone,
  User,
  Wallet,
} from "lucide-react";
import Button from "@/components/ui/Button";
import FormField from "@/components/forms/FormField";
import { sendContactMessage } from "@/services/api";
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

type SubmitStatus = {
  type: "success" | "error";
  message: string;
};

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus | null>(null);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): string | null => {
    if (!formData.fullName.trim()) return "Please enter your full name.";
    if (!formData.phone.trim()) return "Please enter your phone number.";
    if (!formData.service.trim()) return "Please select a service.";
    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const validationError = validate();
    if (validationError) {
      setStatus({ type: "error", message: validationError });
      return;
    }

    setStatus(null);
    setIsSubmitting(true);

    try {
      const result = await sendContactMessage(formData);

      if (result.success) {
        setStatus({
          type: "success",
          message: "Your message has been sent successfully.",
        });
        setFormData(INITIAL_STATE);
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
          placeholder="Your Full Name"
          autoComplete="name"
          icon={User}
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <FormField
          id="email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="Your Email (Optional)"
          autoComplete="email"
          icon={Mail}
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="phone"
          name="phone"
          label="Phone Number"
          type="tel"
          placeholder="Phone Number"
          autoComplete="tel"
          icon={Phone}
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <FormField
          id="service"
          name="service"
          label="Service Needed"
          as="select"
          placeholder="Select a Service"
          icon={Layers}
          value={formData.service}
          onChange={handleChange}
          options={SERVICE_OPTIONS}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
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

        <FormField
          id="budget"
          name="budget"
          label="Estimated Budget"
          type="number"
          placeholder="Estimated Budget in ₹ (Optional)"
          icon={Wallet}
          value={formData.budget}
          onChange={handleChange}
        />
      </div>

      <FormField
        id="projectDetails"
        name="projectDetails"
        label="Project Details"
        as="textarea"
        rows={5}
        placeholder="Tell us about your project (Optional)"
        icon={PenLine}
        value={formData.projectDetails}
        onChange={handleChange}
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
              ? "border-[#51FF73]/35 bg-[#51FF73]/[0.06] text-[#51FF73]"
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

      <p className="flex items-center gap-2 text-[0.78rem] leading-[1.6] text-[#A7A7A7]">
        <Lock size={13} className="shrink-0 text-[#51FF73]" aria-hidden="true" />
        We respect your privacy. Your information is safe with us.
      </p>
    </form>
  );
}

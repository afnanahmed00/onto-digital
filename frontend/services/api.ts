import type { ContactApiResponse, ContactFormData } from "@/types";

/**
 * Submits the contact form to the /api/contact route handler, which sends
 * the inquiry to ONTO DIGITAL via Resend (and, when an email was provided,
 * a confirmation email back to the client).
 */
export async function sendContactMessage(
  data: ContactFormData
): Promise<ContactApiResponse> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = (await res.json()) as ContactApiResponse;

    return result;
  } catch {
    return {
      success: false,
      message: "Unable to send your message. Please try again.",
    };
  }
}

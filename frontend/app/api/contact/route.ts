import { Resend } from "resend";
import { z } from "zod";

// RESEND_API_KEY is read server-side only (Route Handlers never run in the
// browser bundle). It must never be prefixed with NEXT_PUBLIC_.
const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Keep in sync with SERVICE_OPTIONS in components/forms/ContactForm.tsx.
const SERVICE_VALUES = [
  "business-websites",
  "wordpress-websites",
  "portfolio-websites",
  "ecommerce-websites",
  "landing-pages",
  "website-redesign",
  "website-maintenance",
  "web-applications",
  "other",
] as const;

const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Please enter your full name.")
    .max(120, "Full name is too long."),
  email: z
    .string()
    .trim()
    .max(254, "Email address is too long.")
    .optional()
    .default("")
    .refine((value) => value === "" || EMAIL_REGEX.test(value), {
      message: "Please enter a valid email address.",
    }),
 phone: z
  .string()
  .trim()
  .min(7, "Please enter a valid phone number.")
  .max(30, "Phone number is too long.")
  .regex(
    /^\+?[0-9][0-9\s().-]{6,28}[0-9]$/,
    "Please enter a valid phone number."
  ),
  company: z
    .string()
    .trim()
    .max(120, "Company name is too long.")
    .optional()
    .default(""),
  service: z.enum(SERVICE_VALUES),
  budget: z
    .string()
    .trim()
    .max(30, "Budget is too long.")
    .optional()
    .default(""),
  projectDetails: z
    .string()
    .trim()
    .max(5000, "Project details are too long.")
    .optional()
    .default(""),
});

// --- Minimal in-memory throttling -----------------------------------------
// Fixed-window limiter keyed by client IP. Good enough for a single-instance
// Next.js deployment without pulling in Redis/a database/a third-party
// rate-limit service; state simply resets on server restart or if a
// serverless platform spins up a new instance, which is an acceptable
// trade-off for this low-traffic contact form.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

const requestLog = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Opportunistic cleanup so the map can't grow unbounded over time.
  if (requestLog.size > 5000) {
    for (const [key, entry] of requestLog) {
      if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
        requestLog.delete(key);
      }
    }
  }

  const entry = requestLog.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    requestLog.set(ip, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

// --- HTML escaping ----------------------------------------------------------
// User input is interpolated into the email HTML below; escape it so a value
// like "<script>" or an onerror= attribute can never become executable HTML.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again.";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return Response.json(
      { success: false, message: "Invalid request data." },
      { status: 400 }
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return Response.json(
      {
        success: false,
        message: "Too many requests. Please try again in a few minutes.",
      },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, message: "Invalid request data." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    const message =
      firstIssue?.path[0] === "service"
        ? "Please select a valid service."
        : firstIssue?.message || "Please fill in all required fields.";

    return Response.json({ success: false, message }, { status: 400 });
  }

  const { fullName, email, phone, company, service, budget, projectDetails } =
    parsed.data;

  try {
    const { error } = await resend.emails.send({
      from: "ONTO DIGITAL <onboarding@resend.dev>",
      to: ["ontodigital.in@gmail.com"],
      subject: `New Project Inquiry — ${escapeHtml(fullName)}`,
      html: `
        <h2>New Project Inquiry</h2>

        <p><strong>Full Name:</strong> ${escapeHtml(fullName)}</p>

        <p><strong>Email:</strong> ${
          email ? escapeHtml(email) : "Not provided"
        }</p>

        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>

        <p><strong>Company:</strong> ${
          company ? escapeHtml(company) : "Not provided"
        }</p>

        <p><strong>Service:</strong> ${escapeHtml(service)}</p>

        <p><strong>Budget:</strong> ${
          budget ? escapeHtml(budget) : "Not provided"
        }</p>

        <p><strong>Project Details:</strong></p>

        <p>${projectDetails ? escapeHtml(projectDetails) : "Not provided"}</p>

        <hr />

        <p>
          This inquiry was submitted through the ONTO DIGITAL website.
        </p>
      `,
    });

    if (error) {
      console.error("Resend error:", error.message);

      return Response.json(
        { success: false, message: "Unable to send your message." },
        { status: 500 }
      );
    }

    // Client auto-reply — best effort only. The admin notification above has
    // already been sent, so a failure here must not turn the request into a
    // failure response; it just means the client doesn't get a confirmation.
    if (email) {
      const { error: clientError } = await resend.emails.send({
        from: "ONTO DIGITAL <onboarding@resend.dev>",
        to: [email],
        subject: "Thanks for contacting ONTO DIGITAL",
        html: `
          <p>Hi ${escapeHtml(fullName)},</p>

          <p>Thank you for reaching out to ONTO DIGITAL.</p>

          <p>We've received your project inquiry and will review it shortly.</p>

          <p>Our team will get back to you as soon as possible.</p>

          <p>Regards,<br />ONTO DIGITAL</p>
        `,
      });

      if (clientError) {
        console.error("Resend client auto-reply error:", clientError.message);
      }
    }

    return Response.json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      { success: false, message: GENERIC_ERROR_MESSAGE },
      { status: 500 }
    );
  }
}

import { Resend } from "resend";
import { z } from "zod";
import { apiUrl } from "@/config/api";

// RESEND_API_KEY is read server-side only (Route Handlers never run in the
// browser bundle). It must never be prefixed with NEXT_PUBLIC_.
const resend = new Resend(process.env.RESEND_API_KEY);

// Where the "New Project Inquiry" admin notification is sent. Configurable
// via env (CONTACT_NOTIFICATION_EMAIL, server-side only — no NEXT_PUBLIC_
// prefix) so the recipient can change without a code deploy, but defaults to
// the current ONTO DIGITAL inbox so nothing breaks if it's left unset. This
// is deliberately a plain Gmail address, not a @ontodigital.in one: the
// domain hasn't been purchased/verified with Resend yet.
const ADMIN_NOTIFICATION_EMAIL =
  process.env.CONTACT_NOTIFICATION_EMAIL?.trim() || "ontodigital.in@gmail.com";

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
 // The client always sends a full international number (e.g.
 // "+917036431874") composed from a country-code selector + local number,
 // so this enforces E.164: a leading "+", then 8-15 digits total.
 phone: z
  .string()
  .trim()
  .max(20, "Phone number is too long.")
  .regex(
    /^\+[1-9]\d{7,14}$/,
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

// --- Lead persistence (MongoDB, via the backend) ---------------------------
// The browser never talks to MongoDB or the backend directly — this route
// handler (server-side only) calls the backend's public, unauthenticated
// POST /api/v1/contact endpoint (see backend/src/routes/v1/contact.routes.ts)
// server-to-server. That endpoint can only create a lead: it can't read,
// update, or delete existing leads, and it's entirely separate from the
// admin-only /api/v1/leads routes. Duplicate-guard logic (matching
// email+phone within a short window) lives entirely in that endpoint — this
// route never needs its own duplicate check.
//
// Persistence is the source of truth for whether the visitor's enquiry was
// actually received: the POST handler below only reports success once this
// resolves true, and only sends the admin/client emails after that. A
// database or backend outage is logged server-side here and surfaced to the
// caller as `false` — it must never be reported to the browser as a
// successful submission.
type LeadPayload = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  projectDetails: string;
};

async function createLead(data: LeadPayload): Promise<boolean> {
  try {
    const res = await fetch(apiUrl("/api/v1/contact"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.error("Lead persistence failed:", res.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Lead persistence error:", error);
    return false;
  }
}

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

  // Persist to MongoDB as a Lead first. This is the gate for everything
  // else: the visitor is only ever told the enquiry was received once it is
  // actually sitting in the database (and therefore visible in Admin →
  // Leads). If persistence fails, stop here — no emails are sent, and the
  // browser gets a generic error with no MongoDB/internal detail.
  const leadPersisted = await createLead({
    fullName,
    email,
    phone,
    company,
    service,
    budget,
    projectDetails,
  });

  if (!leadPersisted) {
    return Response.json(
      { success: false, message: GENERIC_ERROR_MESSAGE },
      { status: 500 }
    );
  }

  // From here on the lead is safely stored, so the response to the visitor
  // is success regardless of what happens with either email below — losing
  // a notification email must never delete/roll back the Lead, and must
  // never turn an already-successful submission into a reported failure.
  // Each send is isolated in its own try/catch purely for server-side
  // diagnostics; failures are logged (without leaking Resend internals to
  // the browser) and otherwise swallowed.
  try {
    const { error } = await resend.emails.send({
      from: "ONTO DIGITAL <onboarding@resend.dev>",
      to: [ADMIN_NOTIFICATION_EMAIL],
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
      console.error("Resend admin notification error:", error.message);
    }
  } catch (error) {
    console.error("Resend admin notification error:", error);
  }

  // Client auto-reply — also best effort only, and only when an email was
  // provided.
  if (email) {
    try {
      const { error: clientError } = await resend.emails.send({
        from: "ONTO DIGITAL <onboarding@resend.dev>",
        to: [email],
        subject: "Thanks for contacting ONTO DIGITAL",
        html: `
          <p>Hi ${escapeHtml(fullName)},</p>

          <p>Thank you for reaching out to ONTO DIGITAL.</p>

          <p>We've received your project inquiry and our team will review it.</p>

          <p>We'll get back to you as soon as we can.</p>

          <p>Regards,<br />ONTO DIGITAL</p>
        `,
      });

      if (clientError) {
        console.error("Resend client auto-reply error:", clientError.message);
      }
    } catch (error) {
      console.error("Resend client auto-reply error:", error);
    }
  }

  return Response.json({
    success: true,
    message: "Your message has been sent successfully.",
  });
}

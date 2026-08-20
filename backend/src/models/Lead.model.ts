import { Schema, model, type Document, type Model } from "mongoose";
import { LeadStatus, type ILead } from "../types/lead.types";

export type LeadDocument = ILead & Document;

/**
 * Mongoose schema for contact/quote inquiries submitted through ContactForm.
 * The frontend's /api/contact route (Resend) handles delivery today; this
 * model is the persistence layer the future /api/v1/leads endpoints and
 * admin dashboard "Contact Leads Management" screen will read/write.
 */
const leadSchema = new Schema<LeadDocument>(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    phone: {
      type: String,
      required: true,
      trim: true,
      // E.164: leading "+" then 8–15 digits — matches PhoneField's output
      // (country dial code + local number) and the contact API's regex.
      match: /^\+[1-9]\d{7,14}$/,
    },
    company: { type: String, trim: true, maxlength: 120 },
    service: { type: String, required: true, trim: true, maxlength: 80 },
    budget: { type: String, trim: true, maxlength: 30 },
    projectDetails: { type: String, trim: true, maxlength: 5000 },
    status: {
      type: String,
      enum: Object.values(LeadStatus),
      default: LeadStatus.NEW,
    },
  },
  { timestamps: true }
);

// Admin dashboard's lead list: filter by status, newest first.
leadSchema.index({ status: 1, createdAt: -1 });
// Admin dashboard's default/unfiltered view and any date-range reporting.
leadSchema.index({ createdAt: -1 });

export const Lead: Model<LeadDocument> = model<LeadDocument>("Lead", leadSchema);

/**
 * Controlled set of lead statuses for the future admin dashboard's pipeline
 * view. Kept as a string enum (rather than free text) so status transitions
 * stay well-defined as the dashboard grows.
 */
export enum LeadStatus {
  NEW = "NEW",
  CONTACTED = "CONTACTED",
  IN_PROGRESS = "IN_PROGRESS",
  CONVERTED = "CONVERTED",
  CLOSED = "CLOSED",
}

/**
 * Shape of a contact/quote inquiry, independent of Mongoose. Used by the
 * Lead model and, later, by the leads API that will take over submission
 * handling from the frontend's Resend-based /api/contact route.
 */
export interface ILead {
  fullName: string;
  email: string;
  /** Full E.164 international number, e.g. "+917036431874" — see PhoneField.tsx. */
  phone: string;
  company?: string;
  /** One of ContactForm's SERVICE_OPTIONS values, e.g. "business-websites". */
  service: string;
  /** One of ContactForm's BUDGET_OPTIONS values, e.g. "500-1000". */
  budget?: string;
  projectDetails?: string;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
}

import { Schema, model, type Document, type Model } from "mongoose";
import type { IService, IServiceFeature } from "../types/service.types";

export type ServiceDocument = IService & Document;

// Subdocument, not a standalone collection — features only ever exist
// embedded in a service, so `_id: false` keeps them lean.
const serviceFeatureSchema = new Schema<IServiceFeature>(
  {
    icon: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true, maxlength: 80 },
  },
  { _id: false }
);

/**
 * Mongoose schema for the service catalog (frontend/data/services.ts is the
 * current static stand-in this will eventually replace). Feeds the public
 * services list/detail views, ContactForm's service dropdown, and the
 * future admin dashboard's service management screen.
 */
const serviceSchema = new Schema<ServiceDocument>(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
      unique: true, // also builds the lookup index /services/:slug needs
    },
    shortDescription: { type: String, required: true, trim: true, maxlength: 300 },
    description: { type: String, required: true, trim: true, maxlength: 3000 },
    icon: { type: String, required: true, trim: true },
    features: { type: [serviceFeatureSchema], default: [] },
    whatYouGet: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    published: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Public services list filters by `published` then sorts by `displayOrder`.
serviceSchema.index({ published: 1, displayOrder: 1 });

export const Service: Model<ServiceDocument> = model<ServiceDocument>(
  "Service",
  serviceSchema
);

import { Schema, model, type Document, type Model } from "mongoose";
import type { IProject } from "../types/project.types";

export type ProjectDocument = IProject & Document;

/**
 * Mongoose schema for portfolio projects (frontend/data/projects.ts is the
 * current static stand-in this will eventually replace). Feeds the public
 * projects gallery/detail views and the future admin dashboard's project
 * management screen.
 */
const projectSchema = new Schema<ProjectDocument>(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
      unique: true, // also builds the lookup index /projects/:slug needs
    },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    category: { type: String, required: true, trim: true, maxlength: 80 },
    imageUrl: { type: String, required: true, trim: true },
    // Present only for images uploaded through POST /api/v1/uploads — see
    // IProject.imagePublicId. Not required: legacy/seeded projects keep a
    // local imageUrl with no Cloudinary asset behind it.
    imagePublicId: { type: String, trim: true },
    technologies: { type: [String], default: [] },
    websiteUrl: { type: String, trim: true },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Public gallery reads filter by `published` then sort by `displayOrder`.
projectSchema.index({ published: 1, displayOrder: 1 });
// Homepage "featured projects" section.
projectSchema.index({ featured: 1 });

export const Project: Model<ProjectDocument> = model<ProjectDocument>(
  "Project",
  projectSchema
);

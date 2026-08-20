/**
 * Barrel export so future API routes can do
 * `import { Project, Service, Lead } from "../models"` instead of reaching
 * into individual model files.
 */
export { Project, type ProjectDocument } from "./Project.model";
export { Service, type ServiceDocument } from "./Service.model";
export { Lead, type LeadDocument } from "./Lead.model";
export { Admin, type AdminDocument } from "./Admin.model";

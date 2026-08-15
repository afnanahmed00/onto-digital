export type { Project, ProjectSize } from "./project";

export type ContactFormData = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  projectDetails: string;
};

export type ContactApiResponse = {
  success: boolean;
  message: string;
};

import type { AdminDocument } from "../models/Admin.model";

// Lets requireAuth attach the authenticated admin to the request, and every
// downstream handler read `req.admin` with full typing instead of `any`.
declare global {
  namespace Express {
    interface Request {
      admin?: AdminDocument;
    }
  }
}

export {};

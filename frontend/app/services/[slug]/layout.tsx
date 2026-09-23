import type { ReactNode } from "react";

// Required for not-found.tsx in this same folder to register as this
// segment's 404 boundary — without a layout.tsx here, Next.js has no
// boundary to attach it to and silently falls back to the root
// app/not-found.tsx UI while still returning the request's default 200
// status. This layout renders nothing of its own.
export default function ServiceSlugLayout({ children }: { children: ReactNode }) {
  return children;
}

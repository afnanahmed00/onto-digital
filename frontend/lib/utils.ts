/**
 * Lowercase-kebab-case slug, matching the backend's SLUG_PATTERN
 * (backend/src/validators/project.validators.ts:
 * /^[a-z0-9]+(-[a-z0-9]+)*$/). Used by ProjectFormModal to auto-fill the
 * slug field from the title as the admin types, before they've touched the
 * slug field themselves.
 */
export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Short human-readable date (e.g. "Jan 5, 2026") for admin list/table views. */
export function formatDate(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

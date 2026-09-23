/**
 * Renders a single JSON-LD structured data block. Server component (no
 * client JS) so the <script> tag is present in the initial HTML response,
 * not injected after hydration.
 *
 * `<` is escaped so a value containing e.g. "</script>" can't break out of
 * the tag when serialized.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

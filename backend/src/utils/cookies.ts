/**
 * Minimal `Cookie` header parser. The API only ever needs to read back the
 * one JWT cookie it sets itself (base64url content — no `;`, `=`, or spaces),
 * so a full cookie-parsing dependency isn't warranted just for this.
 */
export function parseCookies(header: string | undefined): Record<string, string> {
  if (!header) return {};

  return header.split(";").reduce<Record<string, string>>((cookies, part) => {
    const separatorIndex = part.indexOf("=");
    if (separatorIndex === -1) return cookies;

    const key = part.slice(0, separatorIndex).trim();
    const value = part.slice(separatorIndex + 1).trim();
    if (key) {
      try {
        cookies[key] = decodeURIComponent(value);
      } catch {
        cookies[key] = value;
      }
    }
    return cookies;
  }, {});
}

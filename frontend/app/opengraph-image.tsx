import { ImageResponse } from "next/og";
import { SITE } from "@/config/site";

/**
 * Site-wide default Open Graph / Twitter image (Next.js file convention).
 * Applies to every route under app/ that doesn't define its own
 * opengraph-image — i.e. all current public pages, since none do.
 */
export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050505",
          backgroundImage:
            "radial-gradient(circle at 50% 34%, rgba(81,255,115,0.18) 0%, rgba(81,255,115,0) 58%)",
          position: "relative",
        }}
      >
        {/* Frame */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24,
            display: "flex",
          }}
        />

        {/* Kicker */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 6,
            color: "#51ff73",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          Premium Digital Agency
        </div>

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <svg width="84" height="84" viewBox="0 0 32 32" fill="none">
            <circle cx="14" cy="18" r="10.5" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="24" cy="7" r="2.6" fill="#51ff73" />
          </svg>
        </div>

        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            fontSize: 78,
            fontWeight: 800,
            letterSpacing: -1,
            color: "#FFFFFF",
            textTransform: "uppercase",
          }}
        >
          ONTO{" "}
          <span style={{ color: "#51ff73" }}>DIGITAL</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            marginTop: 24,
            maxWidth: 880,
            textAlign: "center",
            justifyContent: "center",
            fontSize: 27,
            lineHeight: 1.4,
            color: "rgba(255,255,255,0.62)",
          }}
        >
          {SITE.tagline}
        </div>

        {/* Accent bar */}
        <div
          style={{
            display: "flex",
            marginTop: 42,
            width: 110,
            height: 4,
            borderRadius: 4,
            backgroundColor: "#51ff73",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

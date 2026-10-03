import type { Metadata } from "next";
import { site } from "@/data/site";

/**
 * Public base URL used to build absolute URLs (Open Graph, Twitter, canonical).
 * - Once the final domain exists, set NEXT_PUBLIC_SITE_URL (e.g. "https://your-domain.com").
 * - On Vercel, until then, the project's production URL is used automatically.
 * - Locally it falls back to http://localhost:3000.
 * Server-only: imported from layouts/pages, never from client components.
 */
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
);

// Metadata is rendered on the server, while the ES/EN choice lives in the
// browser, so it is written in Spanish (the site's default language).
export const siteTitle = `${site.name} | Ingeniero Telemático`;
export const titleTemplate = `%s | ${site.name}`;

export const siteDescription =
  "Portfolio de David Sánchez Casillas, Ingeniero Telemático especializado en redes y comunicaciones, sistemas UAV, sistemas embebidos, ciberseguridad e inteligencia artificial.";

/** Shorter description for link previews (Open Graph / X). */
export const socialDescription =
  "Ingeniero Telemático (UC3M) en Madrid. Redes y comunicaciones, sistemas UAV, sistemas embebidos, ciberseguridad e inteligencia artificial.";

/**
 * The social preview image (src/app/opengraph-image.png, served at
 * /opengraph-image.png). The root route gets it automatically through the file
 * convention; pages that define their own `openGraph`/`twitter` replace that,
 * so they must list it explicitly. Alt text mirrors opengraph-image.alt.txt.
 */
export const socialImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Portfolio de David Sánchez Casillas, Ingeniero Telemático",
};

/**
 * Open Graph fields shared by every page. Next.js merges metadata shallowly, so
 * a page that sets `openGraph` must spread this to keep them.
 */
export const openGraphBase = {
  type: "website",
  locale: "es_ES",
  siteName: site.name,
} satisfies Metadata["openGraph"];

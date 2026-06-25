/**
 * Central site configuration. Single source of truth for metadata,
 * navigation, and scalability tuning (e.g. sitemap shard size).
 */

const DEFAULT_URL = "http://localhost:3000";

export const siteConfig = {
  name: "Marketing CMS Starter",
  description:
    "A scalable, CMS-driven marketing site starter built on Next.js.",
  // Read from env in production; falls back to localhost for local dev.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_URL,
  // Google caps sitemaps at 50,000 URLs per file. Shard at this size.
  sitemapPageSize: 50_000,
  nav: [
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

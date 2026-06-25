import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import type { PageSeo } from "@/lib/cms/types";

/** Build a Next.js Metadata object from provider-agnostic SEO fields. */
export function buildMetadata(seo: PageSeo, path: string): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical },
    robots: seo.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: siteConfig.name,
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
  };
}

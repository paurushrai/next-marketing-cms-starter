import { cacheLife, cacheTag } from "next/cache";

import { mockProvider } from "./mock-provider";
import type { CmsProvider } from "./provider";
import type { ContentPage, SlugRef } from "./types";

/**
 * The active CMS provider. Swap this single line to migrate vendors — the
 * rest of the app reads through the functions below, never the provider.
 */
const provider: CmsProvider = mockProvider;

/** Cache tag for a single page; used for targeted on-demand revalidation. */
export const pageTag = (slug: string): string => `page:${slug}`;

/** Cache tag covering all page-list/sitemap reads. */
export const PAGES_INDEX_TAG = "pages:index";

/**
 * Fetch a page by slug, cached per-slug. The CMS webhook invalidates a
 * single page via `updateTag(pageTag(slug))` without redeploying. This is
 * how the long tail scales: each URL caches and revalidates independently.
 */
export async function getPage(slug: string): Promise<ContentPage | null> {
  "use cache";
  cacheTag(pageTag(slug));
  cacheLife("days");
  return provider.getPage(slug);
}

/** Slugs prerendered at build time. Cached under the index tag. */
export async function getPrioritySlugs(): Promise<SlugRef[]> {
  "use cache";
  cacheTag(PAGES_INDEX_TAG);
  cacheLife("hours");
  return provider.getPrioritySlugs();
}

/** One shard of slugs for sitemap generation. */
export async function getSlugPage(
  page: number,
  pageSize: number,
): Promise<SlugRef[]> {
  "use cache";
  cacheTag(PAGES_INDEX_TAG);
  cacheLife("hours");
  return provider.getSlugPage(page, pageSize);
}

/** Total published page count. */
export async function getTotalCount(): Promise<number> {
  "use cache";
  cacheTag(PAGES_INDEX_TAG);
  cacheLife("hours");
  return provider.getTotalCount();
}

import { cacheLife, cacheTag } from "next/cache";

import { mockProvider } from "./mock-provider";
import type { CmsProvider } from "./provider";
import type { ContentPage, SlugRef } from "./types";

/**
 * Active CMS provider, resolved once per process: Payload when DATABASE_URI is
 * set, otherwise the zero-config mock. Payload is imported lazily so the app
 * still builds and tests with no database (and without bundling Payload).
 */
const providerPromise: Promise<CmsProvider> = process.env.DATABASE_URI
  ? import("./payload-provider").then((m) => m.payloadProvider)
  : Promise.resolve(mockProvider);

const getProvider = (): Promise<CmsProvider> => providerPromise;

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
  const provider = await getProvider();
  return provider.getPage(slug);
}

/** Slugs prerendered at build time. Cached under the index tag. */
export async function getPrioritySlugs(): Promise<SlugRef[]> {
  "use cache";
  cacheTag(PAGES_INDEX_TAG);
  cacheLife("hours");
  const provider = await getProvider();
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
  const provider = await getProvider();
  return provider.getSlugPage(page, pageSize);
}

/** Total published page count. */
export async function getTotalCount(): Promise<number> {
  "use cache";
  cacheTag(PAGES_INDEX_TAG);
  cacheLife("hours");
  const provider = await getProvider();
  return provider.getTotalCount();
}

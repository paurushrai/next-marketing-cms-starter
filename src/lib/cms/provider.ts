import type { ContentPage, SlugRef } from "./types";

/**
 * The contract every CMS integration must satisfy. Pages and components
 * depend only on this interface, keeping the app decoupled from any vendor.
 */
export interface CmsProvider {
  /**
   * Resolve a single page by its slug path (e.g. "company/careers").
   * Returns null when no page exists so callers can `notFound()`.
   */
  getPage(slug: string): Promise<ContentPage | null>;

  /**
   * High-priority slugs to prerender at build time. Keep this small (top
   * landing pages); the long tail renders on-demand via ISR on first request.
   */
  getPrioritySlugs(): Promise<SlugRef[]>;

  /**
   * A single page of slugs for sitemap sharding. `page` is zero-indexed and
   * `pageSize` defaults to the sitemap cap. Enables scaling to 20k+ URLs.
   */
  getSlugPage(page: number, pageSize: number): Promise<SlugRef[]>;

  /** Total published page count, used to compute sitemap shard count. */
  getTotalCount(): Promise<number>;
}

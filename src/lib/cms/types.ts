/**
 * Provider-agnostic content model. These shapes are what the rest of the
 * app depends on — never import a CMS vendor's SDK types outside this folder.
 * Swapping Sanity/Contentful/Payload means writing one new provider, not
 * touching pages or components.
 */

/** A single composable content block, rendered by the block renderer. */
export interface ContentBlock {
  readonly id: string;
  readonly type: string;
  readonly data: Record<string, unknown>;
}

/** SEO fields surfaced to `generateMetadata`. */
export interface PageSeo {
  readonly title: string;
  readonly description: string;
  readonly ogImage?: string;
  readonly noIndex?: boolean;
}

/** A fully resolved content page keyed by its URL slug path. */
export interface ContentPage {
  readonly slug: string;
  readonly seo: PageSeo;
  readonly blocks: readonly ContentBlock[];
  readonly updatedAt: string;
}

/** Lightweight slug reference for sitemap and static-params generation. */
export interface SlugRef {
  readonly slug: string;
  readonly updatedAt: string;
}

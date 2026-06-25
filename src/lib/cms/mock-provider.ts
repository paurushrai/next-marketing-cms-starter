import type { CmsProvider } from "./provider";
import type { ContentPage, SlugRef } from "./types";

/**
 * Zero-config in-memory provider so the template runs and is testable
 * without any CMS credentials. Replace with a real provider (Sanity,
 * Contentful, Payload, …) by implementing `CmsProvider`.
 */

const FIXED_TIMESTAMP = "2024-01-01T00:00:00.000Z";

const PAGES: Record<string, ContentPage> = {
  "example-page": {
    slug: "example-page",
    seo: {
      title: "Example CMS Page",
      description: "A placeholder page served by the mock CMS provider.",
    },
    blocks: [
      {
        id: "hero-1",
        type: "hero",
        data: { heading: "Example CMS Page" },
      },
    ],
    updatedAt: FIXED_TIMESTAMP,
  },
};

export const mockProvider: CmsProvider = {
  async getPage(slug: string): Promise<ContentPage | null> {
    return PAGES[slug] ?? null;
  },

  async getPrioritySlugs(): Promise<SlugRef[]> {
    return Object.values(PAGES).map(({ slug, updatedAt }) => ({
      slug,
      updatedAt,
    }));
  },

  async getSlugPage(page: number, pageSize: number): Promise<SlugRef[]> {
    const all = Object.values(PAGES).map(({ slug, updatedAt }) => ({
      slug,
      updatedAt,
    }));
    const start = page * pageSize;
    return all.slice(start, start + pageSize);
  },

  async getTotalCount(): Promise<number> {
    return Object.keys(PAGES).length;
  },
};

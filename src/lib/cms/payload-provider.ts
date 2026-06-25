import configPromise from "@payload-config";
import { getPayload } from "payload";

import type { CmsProvider } from "./provider";
import type { ContentBlock, ContentPage, SlugRef } from "./types";

/**
 * CmsProvider backed by Payload's Local API (direct, in-process — no HTTP).
 * Reads the `pages` collection and maps it onto the app's content model, so
 * pages and components stay decoupled from Payload's generated types.
 *
 * Not active by default — see `index.ts` to switch the app onto it once a
 * MongoDB connection (DATABASE_URI) is configured.
 */

/** Shape of the `pages` collection fields this provider reads. */
interface PageDoc {
  slug: string;
  title: string;
  description?: string | null;
  ogImage?: { url?: string | null } | string | null;
  noIndex?: boolean | null;
  layout?: Array<{ id?: string; blockType: string } & Record<string, unknown>>;
  updatedAt: string;
}

function toContentPage(doc: PageDoc): ContentPage {
  const blocks: ContentBlock[] = (doc.layout ?? []).map((block, index) => {
    const { id, blockType, ...data } = block;
    return { id: id ?? `${blockType}-${index}`, type: blockType, data };
  });

  const ogImage =
    doc.ogImage && typeof doc.ogImage === "object"
      ? (doc.ogImage.url ?? undefined)
      : undefined;

  return {
    slug: doc.slug,
    seo: {
      title: doc.title,
      description: doc.description ?? "",
      ogImage,
      noIndex: doc.noIndex ?? false,
    },
    blocks,
    updatedAt: doc.updatedAt,
  };
}

const toSlugRef = (doc: { slug: unknown; updatedAt: unknown }): SlugRef => ({
  slug: String(doc.slug),
  updatedAt: String(doc.updatedAt),
});

const getClient = () => getPayload({ config: configPromise });

export const payloadProvider: CmsProvider = {
  async getPage(slug: string): Promise<ContentPage | null> {
    const payload = await getClient();
    const { docs } = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });
    const doc = docs[0];
    return doc ? toContentPage(doc as unknown as PageDoc) : null;
  },

  async getPrioritySlugs(): Promise<SlugRef[]> {
    const payload = await getClient();
    const { docs } = await payload.find({
      collection: "pages",
      where: { priority: { equals: true } },
      limit: 1_000,
      depth: 0,
      select: { slug: true, updatedAt: true },
    });
    return docs.map(toSlugRef);
  },

  async getSlugPage(page: number, pageSize: number): Promise<SlugRef[]> {
    const payload = await getClient();
    const { docs } = await payload.find({
      collection: "pages",
      limit: pageSize,
      page: page + 1, // Payload pagination is 1-indexed.
      depth: 0,
      sort: "slug",
      select: { slug: true, updatedAt: true },
    });
    return docs.map(toSlugRef);
  },

  async getTotalCount(): Promise<number> {
    const payload = await getClient();
    const { totalDocs } = await payload.count({ collection: "pages" });
    return totalDocs;
  },
};

import type { Block, CollectionConfig } from "payload";

import { PAGES_INDEX_TAG, pageTag } from "@/lib/cms";

/** Hero block — mirrors the `hero` type handled by the block renderer. */
const Hero: Block = {
  slug: "hero",
  fields: [{ name: "heading", type: "text", required: true }],
};

/**
 * Marketing content pages. Maps onto the app's `ContentPage` model and is
 * served through the `[...slug]` catch-all. Draft versions power Draft Mode
 * preview; the revalidation hooks invalidate exactly the affected page's
 * cache tag on publish/delete — no redeploy.
 */
export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  versions: { drafts: true },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        await revalidatePage(String(doc.slug));
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        await revalidatePage(String(doc.slug));
      },
    ],
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "URL path, e.g. company/careers" },
    },
    { name: "description", type: "textarea" },
    { name: "ogImage", type: "upload", relationTo: "media" },
    {
      name: "noIndex",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Exclude this page from search engines." },
    },
    {
      name: "priority",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Prerender at build time. Use for top landing pages.",
      },
    },
    { name: "layout", type: "blocks", blocks: [Hero] },
  ],
};

/** Invalidate a single page's cache tag plus the page index. */
async function revalidatePage(slug: string): Promise<void> {
  try {
    const { revalidateTag } = await import("next/cache");
    revalidateTag(pageTag(slug), "max");
    revalidateTag(PAGES_INDEX_TAG, "max");
  } catch {
    // Outside a Next.js request scope (e.g. CLI seed) — nothing to revalidate.
  }
}

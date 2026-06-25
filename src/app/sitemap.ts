import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getSlugPage, getTotalCount } from "@/lib/cms";

const PAGE_SIZE = siteConfig.sitemapPageSize;

/**
 * Shard the sitemap so it scales past Google's 50k-URL-per-file cap. Each
 * shard is a separate `/sitemap/[id].xml`. With 20k pages this is one shard;
 * the math grows automatically as content does.
 */
export async function generateSitemaps(): Promise<{ id: number }[]> {
  const total = await getTotalCount();
  const shardCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  return Array.from({ length: shardCount }, (_, id) => ({ id }));
}

export default async function sitemap({
  id,
}: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const shard = Number(await id);
  const slugs = await getSlugPage(shard, PAGE_SIZE);
  return slugs.map((entry) => ({
    url: new URL(entry.slug, siteConfig.url).toString(),
    lastModified: entry.updatedAt,
  }));
}

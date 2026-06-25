import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlockRenderer } from "@/components/blocks/block-renderer";
import { getPage, getPrioritySlugs } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo/metadata";

/**
 * CMS-driven long-tail route. This single file serves every content page.
 *
 * Scalability model (Cache Components):
 * - `generateStaticParams` prerenders only high-priority slugs at build time.
 * - Every other slug renders on first request and is cached automatically —
 *   no `dynamicParams` flag needed; build time stays flat as content grows.
 * - `getPage` is cached per-slug (`cacheTag(page:<slug>)`), revalidated
 *   individually by the CMS webhook without a redeploy.
 */

const toSlug = (segments: string[]): string => segments.join("/");

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const priority = await getPrioritySlugs();
  return priority.map(({ slug }) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = toSlug(slug);
  const page = await getPage(path);
  if (!page) {
    return {};
  }
  return buildMetadata(page.seo, `/${path}`);
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = await getPage(toSlug(slug));
  if (!page) {
    notFound();
  }
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <BlockRenderer blocks={page.blocks} />
    </main>
  );
}

import { describe, expect, it } from "vitest";

import type { CmsProvider } from "@/lib/cms/provider";

/**
 * Behavioural contract every `CmsProvider` must satisfy. Run the mock through
 * it today; run Sanity/Contentful/Payload through the SAME suite when you add
 * them — a vendor swap that breaks pages fails here instead of in production.
 *
 * Usage:
 *   runCmsProviderContract("mockProvider", () => mockProvider);
 */
export function runCmsProviderContract(
  name: string,
  makeProvider: () => CmsProvider,
): void {
  describe(`CmsProvider contract: ${name}`, () => {
    it("should_return_null_when_page_is_missing", async () => {
      const provider = makeProvider();
      expect(await provider.getPage("does-not-exist")).toBeNull();
    });

    it("should_resolve_a_known_priority_slug_to_a_matching_page", async () => {
      const provider = makeProvider();
      const slugs = await provider.getPrioritySlugs();
      expect(slugs.length).toBeGreaterThan(0);

      const first = slugs[0];
      if (!first) {
        throw new Error("Expected at least one priority slug");
      }
      const page = await provider.getPage(first.slug);
      expect(page?.slug).toBe(first.slug);
    });

    it("should_report_a_total_count_at_least_as_large_as_one_shard", async () => {
      const provider = makeProvider();
      const total = await provider.getTotalCount();
      const firstShard = await provider.getSlugPage(0, 50_000);
      expect(firstShard.length).toBeLessThanOrEqual(total);
    });

    it("should_return_empty_for_an_out_of_range_shard", async () => {
      const provider = makeProvider();
      expect(await provider.getSlugPage(9_999, 50_000)).toEqual([]);
    });

    it("should_never_return_more_than_the_requested_page_size", async () => {
      const provider = makeProvider();
      const shard = await provider.getSlugPage(0, 1);
      expect(shard.length).toBeLessThanOrEqual(1);
    });
  });
}

import { expect, test } from "@playwright/test";

/**
 * Under Cache Components / PPR, a streamed not-found returns HTTP 200, but
 * Next.js injects `<meta name="robots" content="noindex">` so the URL is never
 * indexed (Next's documented, SEO-safe behaviour). We assert the invariants
 * that actually matter for SEO, not the raw status code.
 *
 * For browser user-agents Next streams metadata in late, so we poll the live
 * DOM for the noindex tag rather than asserting it immediately.
 */
test.describe("unknown CMS slug", () => {
  test("renders the not-found UI and is marked noindex", async ({ page }) => {
    await page.goto("/this-slug-does-not-exist-xyz");

    await expect(
      page.getByRole("heading", { name: "Page not found" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
    await page.waitForFunction(() =>
      Boolean(
        document.querySelector('meta[name="robots"][content*="noindex"]'),
      ),
    );
  });

  test("a known CMS page stays indexable", async ({ page }) => {
    await page.goto("/example-page");
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  });
});

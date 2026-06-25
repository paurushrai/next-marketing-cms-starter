import { expect, test } from "@playwright/test";

test.describe("theme toggle", () => {
  test("switches to dark and persists across reload", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");

    // Starts light (colorScheme is emulated to light in the config).
    await expect(html).not.toHaveClass(/dark/);

    await page.getByRole("button", { name: "Toggle theme" }).click();
    await expect(html).toHaveClass(/dark/);

    // next-themes persists the choice; it should survive a reload.
    await page.reload();
    await expect(html).toHaveClass(/dark/);
  });
});

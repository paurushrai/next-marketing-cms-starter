import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("renders the hero and primary navigation", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 1, name: "Home" }),
    ).toBeVisible();
    for (const label of ["About", "Pricing", "Blog", "Contact"]) {
      await expect(page.getByRole("link", { name: label })).toBeVisible();
    }
  });

  test("navigates to a marketing page from the nav", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");
    await expect(
      page.getByRole("heading", { level: 1, name: "About" }),
    ).toBeVisible();
  });
});

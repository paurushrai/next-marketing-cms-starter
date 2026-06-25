import { defineConfig, devices } from "@playwright/test";

// ─── E2E SUITE MASTER SWITCH ───────────────────────────────────────────────
// Flip to `false` (or run with `E2E=off`) to disable the ENTIRE E2E suite.
// With it off, no specs are collected; the `e2e` script passes with no tests,
// so CI stays green and nothing else needs to change.
const E2E_ENABLED = process.env.E2E !== "off";
// ───────────────────────────────────────────────────────────────────────────

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  testIgnore: E2E_ENABLED ? [] : ["**/*"],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: BASE_URL,
    colorScheme: "light",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "pnpm dev",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

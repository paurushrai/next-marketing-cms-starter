"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

/**
 * Light/dark toggle. Both icons are always rendered and toggled via the
 * `.dark` class in CSS, so markup is identical on server and client — no
 * mount gating, no hydration mismatch.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <span className="dark:hidden" aria-hidden="true">
        ☾
      </span>
      <span className="hidden dark:inline" aria-hidden="true">
        ☀
      </span>
    </Button>
  );
}

import { describe, expect, it } from "vitest";

import { buildMetadata } from "./metadata";

const SEO = { title: "Careers", description: "Join us." };

describe("buildMetadata", () => {
  it("should_set_title_description_and_canonical_from_path", () => {
    const meta = buildMetadata(SEO, "/company/careers");
    expect(meta.title).toBe("Careers");
    expect(meta.description).toBe("Join us.");
    expect(String(meta.alternates?.canonical)).toContain("/company/careers");
  });

  it("should_mark_noindex_when_requested", () => {
    const meta = buildMetadata({ ...SEO, noIndex: true }, "/x");
    expect(meta.robots).toEqual({ index: false, follow: false });
  });

  it("should_omit_robots_directive_by_default", () => {
    const meta = buildMetadata(SEO, "/x");
    expect(meta.robots).toBeUndefined();
  });

  it("should_include_og_image_only_when_provided", () => {
    expect(buildMetadata(SEO, "/x").openGraph?.images).toBeUndefined();
    const withImage = buildMetadata(
      { ...SEO, ogImage: "https://cdn.test/og.png" },
      "/x",
    );
    expect(withImage.openGraph?.images).toEqual([
      { url: "https://cdn.test/og.png" },
    ]);
  });
});

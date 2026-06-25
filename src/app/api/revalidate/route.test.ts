import type { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

// next/cache only works inside Next's runtime, so stub the tag functions.
vi.mock("next/cache", () => ({
  revalidateTag: vi.fn(),
  cacheTag: vi.fn(),
  cacheLife: vi.fn(),
}));

import { revalidateTag } from "next/cache";

import { PAGES_INDEX_TAG, pageTag } from "@/lib/cms";

import { POST } from "./route";

const SECRET = "test-secret";

function makeRequest(body: unknown, secret?: string): NextRequest {
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (secret !== undefined) {
    headers["x-revalidate-secret"] = secret;
  }
  const request = new Request("http://localhost/api/revalidate", {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
  // The handler only reads `.headers` and `.json()`, both present on Request.
  return request as unknown as NextRequest;
}

describe("POST /api/revalidate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.REVALIDATE_SECRET = SECRET;
  });

  it("should_reject_when_secret_header_is_absent", async () => {
    const res = await POST(makeRequest({ slug: "company/careers" }));
    expect(res.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("should_reject_when_secret_header_is_wrong", async () => {
    const res = await POST(makeRequest({ slug: "x" }, "nope"));
    expect(res.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("should_return_400_when_body_is_not_valid_json", async () => {
    const res = await POST(makeRequest("not-json", SECRET));
    expect(res.status).toBe(400);
  });

  it("should_return_400_when_slug_is_missing", async () => {
    const res = await POST(makeRequest({}, SECRET));
    expect(res.status).toBe(400);
  });

  it("should_revalidate_page_and_index_tags_when_authorised", async () => {
    const slug = "company/careers";
    const res = await POST(makeRequest({ slug }, SECRET));

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ revalidated: true, slug });
    expect(revalidateTag).toHaveBeenCalledWith(pageTag(slug), "max");
    expect(revalidateTag).toHaveBeenCalledWith(PAGES_INDEX_TAG, "max");
  });
});

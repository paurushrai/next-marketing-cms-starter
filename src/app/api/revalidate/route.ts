import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { PAGES_INDEX_TAG, pageTag } from "@/lib/cms";

/**
 * CMS webhook endpoint for on-demand revalidation. The CMS calls this when
 * content changes, invalidating just the affected page's cache tag — no
 * redeploy, no full-site rebuild. This is what keeps 20k+ pages fresh cheaply.
 *
 * Configure the CMS to POST: { "slug": "company/careers" }
 * with header `x-revalidate-secret: <REVALIDATE_SECRET>`.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let slug: unknown;
  try {
    ({ slug } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof slug !== "string" || slug.length === 0) {
    return NextResponse.json(
      { error: "Missing 'slug' string" },
      { status: 400 },
    );
  }

  revalidateTag(pageTag(slug), "max");
  revalidateTag(PAGES_INDEX_TAG, "max");

  return NextResponse.json({ revalidated: true, slug });
}

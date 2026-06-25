import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Enables Draft Mode so editors preview unpublished CMS content. While
 * active, all `use cache` scopes re-execute per request (never cached), so
 * previews always reflect the latest draft.
 *
 * CMS preview URL: /api/draft?secret=<DRAFT_SECRET>&slug=/company/careers
 */
export async function GET(request: NextRequest): Promise<NextResponse | never> {
  const secret = process.env.DRAFT_SECRET;
  const { searchParams } = request.nextUrl;

  if (!secret || searchParams.get("secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = searchParams.get("slug");
  if (!slug?.startsWith("/")) {
    return NextResponse.json(
      { error: "Missing or invalid 'slug' (must start with '/')" },
      { status: 400 },
    );
  }

  const draft = await draftMode();
  draft.enable();
  redirect(slug);
}

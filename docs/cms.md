# CMS (Payload)

The template ships with **Payload CMS** embedded in the same Next.js app
(admin at `/admin`, REST/GraphQL under `/api`), wired to **MongoDB**.

It stays decoupled via the app's [`CmsProvider`](../src/lib/cms/provider.ts)
interface: the front-end reads through that interface, and `payloadProvider`
([payload-provider.ts](../src/lib/cms/payload-provider.ts)) is one
implementation. **Provider selection is automatic** — Payload is used when
`DATABASE_URI` is set, otherwise the zero-config mock, so the app builds and
tests with **no database**.

## Local setup

1. **Start MongoDB** (Docker). Data persists outside the repo (defaults to
   `../data/personal`; override with `MONGO_DATA_DIR`):
   ```bash
   docker compose up -d        # docker compose down to stop; data persists
   ```
2. **Set env** in `.env.local` (see [`.env.example`](../.env.example)):
   ```bash
   PAYLOAD_SECRET="$(openssl rand -base64 32)"
   DATABASE_URI="mongodb://127.0.0.1:27017/marketing-cms"
   ```
   That's it — setting `DATABASE_URI` switches the app onto Payload; no code change.
3. `pnpm dev`, open `/admin`, create the first admin user, add a **Page**
   (set a `slug` like `company/careers`; tick **priority** to prerender it).

> CI and `docker`-less setups leave `DATABASE_URI` unset and run on the mock.

## How it maps

| App model (`ContentPage`) | Payload `pages` field |
| --- | --- |
| `slug` | `slug` (unique, indexed) |
| `seo.title` | `title` |
| `seo.description` | `description` |
| `seo.ogImage` | `ogImage` (upload → `media`) |
| `seo.noIndex` | `noIndex` |
| `blocks[]` | `layout` blocks (`blockType` → `type`) |
| (prerender hint) | `priority` |

Add a block type in Payload (`Pages.ts`) **and** register its renderer in
[`block-renderer.tsx`](../src/components/blocks/block-renderer.tsx).

## Revalidation & preview

- **On publish/delete**, the `pages` collection hooks call
  `revalidateTag(page:<slug>)` — only the affected page's cache is invalidated,
  no redeploy. (The external `/api/revalidate` webhook remains for non-embedded
  setups.)
- **Draft Mode**: `versions.drafts` is enabled; wire Payload's preview URL to
  `/api/draft` to preview unpublished content.

## Verify against the contract

Run Payload through the shared provider contract (needs a seeded MongoDB):

```bash
RUN_PAYLOAD_CONTRACT=1 DATABASE_URI=... pnpm test
```

## Tooling notes

- Payload's CLI (`generate:types`, `generate:importmap`) runs via `tsx`, which
  currently fails on **Node 26**. Use **Node 22 LTS** (see `.nvmrc`) for CLI
  tasks. The Next.js build itself works on either.
- `next dev` uses `--no-server-fast-refresh` (required for Payload on Next 16.2+).

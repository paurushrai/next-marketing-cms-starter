# next-marketing-cms-starter

[![CI](https://github.com/paurushrai/next-marketing-cms-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/paurushrai/next-marketing-cms-starter/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

A scalable, CMS-driven marketing site starter built on **Next.js 16** (App
Router), **React 19**, **TypeScript**, and **Tailwind CSS v4**. Architected so a
content-heavy marketing site scales to **20k+ pages** without ballooning build
times or locking you to a single CMS.

> Click **“Use this template”** on GitHub to start a new repo from this one.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpaurushrai%2Fnext-marketing-cms-starter&env=NEXT_PUBLIC_SITE_URL,REVALIDATE_SECRET,DRAFT_SECRET,PAYLOAD_SECRET,DATABASE_URI&envDescription=Site%20URL%2C%20webhook%2Fpreview%20secrets%2C%20and%20Payload%20CMS%20credentials&envLink=https%3A%2F%2Fgithub.com%2Fpaurushrai%2Fnext-marketing-cms-starter%23environment)

## Why this template

| Concern | How it's handled |
| --- | --- |
| **Scale to 20k+ pages** | Catch-all CMS route prerenders only priority slugs; the long tail renders on first request and caches (ISR / Partial Prerendering). Build time stays flat. |
| **Per-page freshness, no redeploys** | `/api/revalidate` webhook invalidates a single page's cache tag via `revalidateTag(tag, "max")`. |
| **CMS included, no lock-in** | **Payload CMS** ships embedded (admin at `/admin`, MongoDB) behind a provider-agnostic `CmsProvider` interface. A zero-config in-memory mock runs with no database; set `DATABASE_URI` and the app switches to Payload automatically. Swap to any other CMS by implementing the same interface. |
| **Sitemaps at scale** | Sharded via `generateSitemaps` (50k URLs/file — Google's cap). |
| **Theming** | Two-tier OKLCH design tokens (primitives → semantic roles → Tailwind), light/dark via `next-themes`. Re-skin by swapping one ramp. |
| **Confidence** | Vitest unit/integration tests + a reusable CMS provider contract suite. CI gates lint, types, tests, and build on every PR. |

## Quick start

```bash
pnpm install
cp .env.example .env.local   # then fill in the secrets
docker compose up -d         # optional: local MongoDB for Payload CMS
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) (and `/admin` for the CMS).
Requires Node `>=20.9`. Without `DATABASE_URI`/Docker, the app runs on the mock
content provider — see [docs/cms.md](./docs/cms.md).

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Run the Vitest suite |
| `pnpm test:coverage` | Tests with coverage |

## Project structure

```
src/
├─ app/
│  ├─ (site)/                 # shared header/footer chrome
│  │  ├─ page.tsx             # home
│  │  ├─ about | pricing | contact | blog
│  │  └─ [...slug]/           # CMS long-tail (priority prerender + on-demand ISR)
│  ├─ api/revalidate          # CMS webhook → tag revalidation
│  ├─ api/draft               # Draft Mode preview
│  ├─ sitemap.ts | robots.ts  # sharded sitemap + robots
│  └─ error / loading / not-found / global-error
├─ components/{ui,layout,blocks}
├─ lib/cms/                   # provider interface + mock + cached reads
├─ lib/seo/                   # metadata helpers
├─ config/site.ts             # site config (name, nav, sitemap shard size)
└─ types/
```

## Environment

See [`.env.example`](./.env.example):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, robots, OG |
| `REVALIDATE_SECRET` | Shared secret for the `/api/revalidate` webhook |
| `DRAFT_SECRET` | Shared secret for Draft Mode preview links |
| `PAYLOAD_SECRET` | Signs Payload tokens (`openssl rand -base64 32`) |
| `DATABASE_URI` | MongoDB connection string for Payload |

## Documentation

- [CMS (Payload)](./docs/cms.md) — setup, content model mapping, revalidation, preview
- [Theming](./docs/theming.md) — tokens, re-skinning, adding themes, typography
- [Testing](./docs/testing.md) — strategy, the master switch, the contract suite

## Connect a CMS

Payload is wired up out of the box — see [docs/cms.md](./docs/cms.md). To use a
different CMS, implement the [`CmsProvider`](./src/lib/cms/provider.ts)
interface, point `src/lib/cms/index.ts` at it, and run it through the
[provider contract suite](./docs/testing.md#the-provider-contract-suite).

## Deployment

Optimised for [Vercel](https://vercel.com) (Cache Components, ISR, and sharded
sitemaps work out of the box) — use the **Deploy with Vercel** button above, or
`vercel deploy`. Any Node.js host that supports Next.js 16 also works. Set the
environment variables above in your host.

## Dependency security

`pnpm audit` reports clean. A few transitive advisories live inside Payload
CMS's dependency tree (e.g. `undici`, `dompurify`, `postcss`) and are
force-patched via `pnpm.overrides` in [`package.json`](./package.json) without
crossing major versions. When an upstream Payload release ships the fix, drop
the matching override and re-run `pnpm audit`. CI gates lint, types, tests, and
build on every PR.

Dependencies (npm and GitHub Actions) are kept current by
[Renovate](https://docs.renovatebot.com) — see [`renovate.json`](./renovate.json).
React and its `@types` are grouped so they bump atomically, and Payload's
packages move as one. Install the
[Renovate GitHub App](https://github.com/apps/renovate) on the repo to activate
it.

## License

[MIT](./LICENSE) © Paurush Rai

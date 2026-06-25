# next-marketing-cms-starter

A scalable, CMS-driven marketing site starter built on **Next.js 16** (App
Router), **React 19**, **TypeScript**, and **Tailwind CSS v4**. Architected so a
content-heavy marketing site scales to **20k+ pages** without ballooning build
times or locking you to a single CMS.

> Click **“Use this template”** on GitHub to start a new repo from this one.

## Why this template

| Concern | How it's handled |
| --- | --- |
| **Scale to 20k+ pages** | Catch-all CMS route prerenders only priority slugs; the long tail renders on first request and caches (ISR / Partial Prerendering). Build time stays flat. |
| **Per-page freshness, no redeploys** | `/api/revalidate` webhook invalidates a single page's cache tag via `revalidateTag(tag, "max")`. |
| **CMS included, no lock-in** | **Payload CMS** ships embedded (admin at `/admin`, MongoDB) behind a provider-agnostic `CmsProvider` interface. A zero-config in-memory mock is active by default so it builds with no database; flip one line to switch to Payload. Swap to any other CMS by implementing the same interface. |
| **Sitemaps at scale** | Sharded via `generateSitemaps` (50k URLs/file — Google's cap). |
| **Theming** | Two-tier OKLCH design tokens (primitives → semantic roles → Tailwind), light/dark via `next-themes`. Re-skin by swapping one ramp. |
| **Confidence** | Vitest unit/integration tests + a reusable CMS provider contract suite. CI gates lint, types, tests, and build on every PR. |

## Quick start

```bash
pnpm install
cp .env.example .env.local   # then fill in the secrets
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Requires Node `>=20.9`.

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
sitemaps work out of the box). Any Node.js host that supports Next.js 16 also
works. Set the environment variables above in your host.

## License

[MIT](./LICENSE) © Paurush Rai

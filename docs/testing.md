# Testing

| Layer | Tool | Scope |
| --- | --- | --- |
| Unit / integration | **Vitest** (`happy-dom`) | Logic, route handlers, components |
| Component | `@testing-library/react` | Client components |
| Coverage | `@vitest/coverage-v8` | `pnpm test:coverage` |
| E2E | Playwright (+ `@axe-core/playwright`) | Critical user journeys, a11y |

```bash
pnpm test            # unit: run once
pnpm test:watch      # unit: watch mode
pnpm test:coverage   # unit: with coverage report
pnpm e2e             # e2e: run Playwright (boots the dev server automatically)
pnpm e2e:ui          # e2e: interactive UI mode
```

First E2E run needs browsers: `pnpm exec playwright install chromium`.

## Disable a suite

Each suite has a one-line master switch.

**Unit** — [`vitest.config.ts`](../vitest.config.ts):

```ts
const TESTS_ENABLED = process.env.TESTS !== "off"; // ← set to `false` to disable
```

Flip to `false` or run `TESTS=off pnpm test`. `passWithNoTests` exits 0.

**E2E** — [`playwright.config.ts`](../playwright.config.ts):

```ts
const E2E_ENABLED = process.env.E2E !== "off"; // ← set to `false` to disable
```

Flip to `false` or run `E2E=off pnpm e2e`. The `--pass-with-no-tests` flag
exits 0. Either way CI stays green untouched.

## E2E coverage

`e2e/` covers the flows that can't be unit tested: home + nav rendering, theme
toggle persistence, the not-found path for unknown CMS slugs, and an axe
accessibility scan (no serious/critical WCAG 2 A/AA violations).

### Note on 404 status vs. `noindex`

An unknown CMS slug returns **HTTP 200**, not 404. This is intended Next.js
behaviour under Cache Components / PPR: the static shell streams first, so the
status is already committed when `notFound()` runs. Next compensates by
injecting `<meta name="robots" content="noindex">`, so the URL is **never
indexed** — Google does not treat it as a soft-404 that gets indexed. The E2E
suite asserts the not-found UI + `noindex`, which is what matters for SEO.

If you need a **hard 404 status** (compliance, analytics), resolve slug
existence before the body streams — e.g. a fast slug-existence check in
[`proxy.ts`](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)
that rewrites or 404s missing slugs. Keep it lightweight (an index lookup, not
a full content fetch) so it stays cheap at 20k+ pages.

## What we test (and what we don't)

- **Logic in plain functions** (`lib/cms`, `lib/seo`, sitemap math) — unit tested directly. Fast, deterministic.
- **Route handlers** (`/api/revalidate`) — import the exported `POST`/`GET`, call with a `Request`. Auth + validation are security-sensitive, so they're covered first.
- **Client components** (`Button`, …) — React Testing Library.
- **Async Server Components** — _not_ unit tested (React 19 + RTL can't render them cleanly). Verify their output via Playwright E2E instead.

## The provider contract suite

[`tests/contract/cms-provider.contract.ts`](../tests/contract/cms-provider.contract.ts)
is a behavioural contract every `CmsProvider` must pass. Run any implementation
through the same suite:

```ts
runCmsProviderContract("sanity", () => sanityProvider);
```

This is the safety net for vendor swaps — a provider that breaks page resolution
fails here, not in production.

## Conventions

- Colocate unit tests as `*.test.ts(x)` next to source; cross-cutting suites live in `tests/`.
- Name tests `should_<behaviour>_when_<condition>`.
- Keep tests deterministic — mock time, network, and randomness.

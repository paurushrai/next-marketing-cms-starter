# Testing

| Layer | Tool | Scope |
| --- | --- | --- |
| Unit / integration | **Vitest** (`happy-dom`) | Logic, route handlers, components |
| Component | `@testing-library/react` | Client components |
| Coverage | `@vitest/coverage-v8` | `pnpm test:coverage` |
| E2E _(fast-follow)_ | Playwright | Critical user journeys, a11y |

```bash
pnpm test            # run once
pnpm test:watch      # watch mode
pnpm test:coverage   # with coverage report
```

## Disable the entire suite

One switch in [`vitest.config.ts`](../vitest.config.ts):

```ts
const TESTS_ENABLED = process.env.TESTS !== "off"; // ← set to `false` to disable
```

Flip it to `false`, or run `TESTS=off pnpm test`. No specs are collected and
`passWithNoTests` exits 0, so CI stays green untouched.

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

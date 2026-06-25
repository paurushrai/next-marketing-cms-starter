# Contributing

Thanks for your interest in improving this template.

## Getting started

```bash
pnpm install
pnpm dev
```

Requires Node `>=20.9` and pnpm (see `packageManager` in `package.json`).

## Before opening a PR

All of these must pass — CI runs them on every PR:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Guidelines

- **One concern per PR.** Keep changes focused and reviewable.
- **Conventional Commits** for messages: `type(scope): summary`
  (e.g. `feat(cms): add Sanity provider`).
- **Tests with behaviour changes.** New logic needs happy + edge + failure
  cases. New CMS providers must pass the
  [provider contract suite](./docs/testing.md#the-provider-contract-suite).
- **Update docs** when you change behaviour (`docs/`, `README.md`).
- **No secrets** in code or commits — use environment variables.

## Reporting issues

Use the issue templates for bugs and feature requests. For security issues, see
[SECURITY.md](./SECURITY.md).

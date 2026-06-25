# Security Policy

## Reporting a vulnerability

Please **do not** open a public issue for security vulnerabilities.

Instead, report privately via GitHub's
[security advisories](https://github.com/paurushrai/next-marketing-cms-starter/security/advisories/new).

We aim to acknowledge reports within 72 hours and to provide a remediation
timeline after triage. Please include reproduction steps and impact assessment
where possible.

## Scope

This is a starter template. When you build on it, you own the security of your
deployment — in particular:

- Set strong `REVALIDATE_SECRET` and `DRAFT_SECRET` values; never commit them.
- Validate all CMS input at the provider boundary.
- Keep dependencies current (Dependabot is preconfigured).

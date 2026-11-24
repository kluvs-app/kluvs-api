# kluvs-api

Public API contract for the [Kluvs](https://kluvs.com) platform — a multi-server Discord book club manager.

**Interactive API Reference → [docs.kluvs.com](https://docs.kluvs.com)**

---

## What's in this repo

| Path | Description |
|------|-------------|
| `openapi.json` | OpenAPI 3.0 specification (canonical source) |
| `docs/` | Scalar API Reference page for docs.kluvs.com. The `Deploy Docs` workflow publishes it together with the root `openapi.json`; no copy of the spec is committed here |
| `redocly.yaml`, `.redocly.lint-ignore.yaml` | Lint rules, and the problems that already existed when linting was introduced |

## How this repo is updated

The spec is generated and dispatched automatically from `kluvs-backend` on every merge to `main`.

Do not edit `openapi.json` directly — it will be overwritten by the next automated update.

## Validate the spec locally

```bash
deno task validate
```

Lints `openapi.json` with [Redocly CLI](https://redocly.com/docs/cli/): it checks the spec against the OpenAPI 3.0 schema, checks that every `$ref` resolves, and applies the rules in `redocly.yaml`. Errors fail; warnings are reported only. CI runs the same check on every PR. Requires [Deno](https://deno.land/).

Every PR that changes the spec also gets a **breaking-change report** (oasdiff). It is report only: annotations on the PR and a job summary, never a failure.

## Authentication

All endpoints require a Bearer token:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Base URL

| Environment | URL |
|-------------|-----|
| Production | `https://<project-ref>.supabase.co/functions/v1` |
| Local dev | `http://localhost:54321/functions/v1` |

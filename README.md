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

## How the API changes (spec-first)

`openapi.json` here is the API contract, and it is written by hand. Every change to the API starts as a PR in this repo:

1. **Open a spec PR** editing `openapi.json`. Bump `info.version`: minor for additions, major for breaking changes, patch for documentation-only fixes.
2. **CI checks it**: Redocly lints it (`deno task validate`), and oasdiff reports any breaking changes (see below).
3. **Merge it.** `notify-consumers.yml` tells every consumer (kluvs-backend, kluvs-frontend, kluvs-mobile), and each one gets a regen PR with its generated types; their CI runs on it.
4. **Implement** in the backend and the clients in parallel. The backend reports operations it doesn't implement yet as pending.
5. **Release the backend first.** A client release must not depend on an operation the backend hasn't released.

The spec's `info.version` belongs to this repo and is independent of the backend's release version.

## Validate the spec locally

```bash
deno task validate
```

Lints `openapi.json` with [Redocly CLI](https://redocly.com/docs/cli/): it checks the spec against the OpenAPI 3.0 schema, checks that every `$ref` resolves, and applies the rules in `redocly.yaml`. Errors fail; warnings are reported only. CI runs the same check on every PR. Requires [Deno](https://deno.land/).

Every PR that changes the spec also gets a **breaking-change report** (oasdiff). It is report only and never fails: annotations on the PR, a job summary, and (when something breaks) a PR comment linking to a side-by-side review on oasdiff.com.

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

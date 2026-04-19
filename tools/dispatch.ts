/**
 * Smoke-tests the update-spec.yml workflow by triggering it without a spec payload.
 *
 * Usage:
 *   deno task dispatch:no-spec
 *
 * Reads KLUVS_API_PAT from .env.local (via --env-file in deno.jsonc).
 */

const WORKFLOW_URL =
  "https://api.github.com/repos/kluvs-app/kluvs-api/actions/workflows/update-spec.yml/dispatches";

const PAT = Deno.env.get("KLUVS_API_PAT");
if (!PAT) {
  console.error("❌  KLUVS_API_PAT is not set. Add it to .env.local.");
  Deno.exit(1);
}

console.log("🚀  Dispatching update-spec.yml (no spec)...");

const res = await fetch(WORKFLOW_URL, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${PAT}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ ref: "main" }),
});

if (res.ok) {
  console.log("✅  Done! https://github.com/kluvs-app/kluvs-api/actions");
} else {
  const text = await res.text();
  console.error(`❌  Dispatch failed (${res.status}): ${text}`);
  Deno.exit(1);
}

#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

echo "Bootstrapping phantom-digital-human skeleton"
echo "Repository: ${repo_root}"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js 22+ is required" >&2
  exit 1
fi

node "${repo_root}/tools/validate-guardrails.mjs"

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm not found; workspace installation skipped by design for this empty skeleton"
  exit 0
fi

echo "pnpm detected; install and build steps are intentionally deferred until runnable packages exist"

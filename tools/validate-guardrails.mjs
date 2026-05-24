import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const guardrailsPath = path.join(repoRoot, "infra/governance/platform-guardrails.json");
const readmePath = path.join(repoRoot, "README.md");

const fail = (message) => {
  console.error(`ERROR: ${message}`);
  process.exitCode = 1;
};

if (!existsSync(guardrailsPath)) {
  fail(`Missing guardrail file: ${guardrailsPath}`);
  process.exit(process.exitCode ?? 1);
}

const guardrails = JSON.parse(readFileSync(guardrailsPath, "utf8"));
const expectedPlans = ["free_trial", "professional", "enterprise"];
const requiredDirs = [
  "apps",
  "services",
  "packages",
  "infra",
  "docs",
  "deploy",
  "deploy/manifests/production",
  "deploy/manifests/production/machine-readable",
  "deploy/manifests/production/environment-matrix",
  "deploy/manifests/production/health-checks",
  "deploy/manifests/production/release-guards",
  "deploy/manifests/production/cloudflare-boundary",
  "docs/compliance/16b8c611",
  "docs/compliance/LG-ROOT-20260524",
  "docs/compliance/LG-ROOT-20260524/rights-matrix",
  "docs/compliance/LG-ROOT-20260524/manifest-alignment",
  "docs/compliance/LG-ROOT-20260524/release-guard-decisions"
];

for (const dir of requiredDirs) {
  if (!existsSync(path.join(repoRoot, dir))) {
    fail(`Missing required directory: ${dir}`);
  }
}

if (guardrails.product_name !== "幻影数字人") {
  fail("product_name must remain 幻影数字人");
}

if (guardrails.api?.public_prefix !== "/api/v1") {
  fail("api.public_prefix must remain /api/v1");
}

if (JSON.stringify(guardrails.plans) !== JSON.stringify(expectedPlans)) {
  fail(`plans must remain ${expectedPlans.join(", ")}`);
}

if (guardrails.billing?.truth_source_service !== "billing-service") {
  fail("billing.truth_source_service must remain billing-service");
}

if (guardrails.adapter_enablement_policy?.default_policy !== "deny") {
  fail("adapter_enablement_policy.default_policy must remain deny");
}

const requiredAdapterStates = {
  fay: "saas_only_candidate",
  ai_xiaopi: "reference_or_limited_adapter",
  ai_vtuber_koischizo: "reference_or_limited_adapter",
  persona_live: "legal_gated_experimental",
  live_talking: "legal_gated_experimental",
  ai_vtuber_ikaros_521: "prohibited"
};

for (const [adapter, state] of Object.entries(requiredAdapterStates)) {
  const current = guardrails.adapter_enablement_policy?.adapters?.[adapter]?.status;
  if (current !== state) {
    fail(`adapter ${adapter} must remain ${state}`);
  }
}

if (guardrails.compliance?.legacy_gate_ref !== "16b8c611") {
  fail("compliance.legacy_gate_ref must remain 16b8c611");
}

if (guardrails.compliance?.canonical_gate_ref !== "LG-ROOT-20260524") {
  fail("compliance.canonical_gate_ref must remain LG-ROOT-20260524");
}

if (!existsSync(readmePath)) {
  fail(`Missing repository README: ${readmePath}`);
} else {
  const readme = readFileSync(readmePath, "utf8");
  const requiredReadmeFragments = [
    "/api/v1",
    "billing-service",
    "唯一事实源",
    "适配层",
    "不得直连"
  ];

  for (const fragment of requiredReadmeFragments) {
    if (!readme.includes(fragment)) {
      fail(`README must mention guardrail fragment: ${fragment}`);
    }
  }
}

if (process.exitCode && process.exitCode !== 0) {
  process.exit(process.exitCode);
}

console.log("Guardrail validation passed");

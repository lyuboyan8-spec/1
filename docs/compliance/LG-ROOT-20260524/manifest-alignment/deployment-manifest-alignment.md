# Deployment Manifest Alignment

## Canonical Refs

- `canonical_gate_ref`: `LG-ROOT-20260524`
- `legacy_gate_ref`: `16b8c611`
- `updated_at`: `2026-05-24`
- `manifest_example_ref`: `/workspace/agents/devops/output/deployment-manifest-extended-example.json`

## Stage And Environment Model

| Manifest Field | Required Value | Reason |
|---|---|---|
| `product.stage` | `stage_4_productionization` | 当前方案已冻结到生产化阶段 |
| `stage_model.current` | `stage_4_productionization` | 必须与 `product.stage` 一致 |
| `product.environment` | `cloud_production` | 当前示例以云上生产拓扑为正式候选 |
| `environment_model.current` | `cloud_production` | 必须与 `product.environment` 一致 |
| `release_guards.stage_environment_alignment.status` | `passed` | 阶段/环境模型一致，但不代表合规自动放行 |

## Adapter Enablement Policy Alignment

| Adapter | Required `status` | `default_enabled` | `commercial_default_allowed` | `private_deployment_allowed` |
|---|---|---|---|---|
| `fay` | `saas_only_candidate` | `false` | `false` | `false` |
| `ai_xiaopi` | `reference_or_limited_adapter` | `false` | `false` | `true` |
| `ai_vtuber_koischizo` | `reference_or_limited_adapter` | `false` | `false` | `true` |
| `live_talking` | `legal_gated_experimental` | `false` | `false` | `false` |
| `persona_live` | `legal_gated_experimental` | `false` | `false` | `false` |
| `ai_vtuber_ikaros_521` | `prohibited` | `false` | `false` | `false` |

## Legal Gate Alignment

| Manifest Field | Required Value | Reason |
|---|---|---|
| `legal_gate_status.overall` | `restricted` | 当前仍有未收口阻断项 |
| `legal_gate_status.blocking` | `true` | 最终商用发布仍不可放行 |
| `legal_gate_status.adapters[fay].reason_code` | `gpl3_saas_only_candidate` | 仅允许 SaaS 隔离候选 |
| `legal_gate_status.adapters[live_talking].reason_code` | `rights_chain_incomplete_and_output_obligation_unclear` | 权利链和输出义务未闭合 |
| `legal_gate_status.adapters[persona_live].reason_code` | `academic_research_only_conflict` | 研究限定冲突未澄清 |
| `legal_gate_status.adapters[ai_vtuber_ikaros_521].reason_code` | `gpl3_and_commercial_authorization_required` | 禁入口径冻结 |

当前已知差异：

- `/workspace/agents/devops/output/deployment-manifest-extended-example.json` 中 `live_talking.reason_code` 仍为 `rights_chain_incomplete`。
- 本目录以 `SEC-GATE-CLOSURE-20260524` 冻结口径为准，要求更新为 `rights_chain_incomplete_and_output_obligation_unclear`，否则视为 `LG-05` 未完全收口。

## Private Deployment Alignment

以下适配器必须出现在 `private_deployment_exclusions`：

- `fay`
- `live_talking`
- `persona_live`
- `ai_vtuber_ikaros_521`

缺失任一项时，`release_guards.private_deployment_scope_valid` 必须维持 `blocked`；若四项排除均已显式列出，则该 guard 应标记为 `passed`，表示私有化默认交付边界清晰，而不是表示这些适配器已获商用放行。

## Release Guard Alignment

| Guard | Required Status | Why |
|---|---|---|
| `compliance_gate` | `blocked` | `legal_gate_status.blocking = true` |
| `private_deployment_scope_valid` | `passed` | 私有化默认排除项已显式列出，边界清晰 |
| `cloudflare_human_approval` | `blocked` | Cloudflare 连接与真实变更仍需人工与 trusted runner |
| `paid_resource_approval` | `blocked` | GPU、Cloudflare、存储均有付费资源审批边界 |

## Canonical Policy

- 浏览器、BFF、业务服务不得直连五个开源仓库原生接口。
- 适配器只能通过平台内部协议挂接。
- 合规门禁通过前，不得把受限适配器写成标准套餐能力、默认开关或私有化默认交付项。

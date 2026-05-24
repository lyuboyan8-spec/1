# LG-ROOT-20260524 Summary

## Canonical Refs

- `canonical_gate_ref`: `LG-ROOT-20260524`
- `legacy_gate_ref`: `16b8c611`
- `mirror_mode`: `legacy_ref_preserved_canonical_root_active`
- `updated_at`: `2026-05-24`

`LG-ROOT-20260524` 是当前环境的正式合规门禁根引用；`16b8c611` 仅作为历史引用镜像保留，不构成第二套独立事实源。

## Current Gate Status

- `overall_legal_gate_status = restricted`
- `blocking = true`
- `release_guards.compliance_gate = blocked`
- `final_commercial_release_allowed = false`

## Stage And Environment Alignment

- `product.stage = stage_4_productionization`
- `product.environment = cloud_production`
- `stage_environment_alignment = passed`
- `legal_gate_status` 仍然独立阻断最终商用发布

阶段/环境模型允许形成 `cloud_production` 候选 manifest，但不等于合规门禁放行。只要适配器权利链、输出义务或私有化排除未收口，正式商用发布仍维持阻断。

## Frozen Adapter Boundary

| Adapter | Policy Status | Legal Gate Status | Default Commercial Path | Private Deployment Default | Frozen Position |
|---|---|---|---|---|---|
| `Fay` | `saas_only_candidate` | `restricted` | `false` | `false` | 仅允许隔离适配，禁止并仓，禁止私有化默认交付 |
| `AI-XiaoPi` | `reference_or_limited_adapter` | `restricted` | `false` | `true` | 可参考或有限适配，直播平台采集与硬件链单独审查 |
| `AI-Vtuber (Koischizo)` | `reference_or_limited_adapter` | `restricted` | `false` | `true` | 仅参考或轻量适配，不作为商用主线底座 |
| `LiveTalking` | `legal_gated_experimental` | `blocked` | `false` | `false` | 默认禁用，待权利链与输出义务书面放行 |
| `PersonaLive` | `legal_gated_experimental` | `blocked` | `false` | `false` | 默认禁用，研究限定冲突未澄清 |
| `AI-Vtuber (Ikaros-521)` | `prohibited` | `prohibited` | `false` | `false` | 禁并仓，禁商用主线，禁默认交付 |

## Blocking Conditions

以下任一命中，`blocking` 必须保持 `true`：

1. rights matrix 未覆盖代码、权重、素材、输出义务、私有化分发边界。
2. `README`、`LICENSE`、模型卡、作者声明存在冲突且未获书面澄清。
3. `LiveTalking`、`PersonaLive`、`AI-Vtuber (Ikaros-521)` 被写入默认商用路径、默认镜像或私有化默认交付包。
4. `Fay` 未维持 `SaaS-only` 隔离候选定位，却被纳入私有化默认交付。
5. deployment manifest 中的 `adapter_enablement_policy`、`legal_gate_status`、`private_deployment_exclusions` 与本目录结论不一致。
6. `16b8c611` 与 `LG-ROOT-20260524` 的 legacy/canonical 映射缺失，导致审计链无法追踪历史门禁来源。

## Release Conditions

仅在以下条件同时满足时，才允许把整体状态改为放行：

1. `LG-01` rights matrix 完整性通过。
2. `LG-02` 许可冲突与商用声明收口通过。
3. `LG-03` 部署与分发边界收口通过。
4. `LG-04` 产品、销售、合同口径收口通过。
5. `LG-05` deployment manifest 机器事实收口通过。
6. `private_deployment_exclusions` 与适配器默认状态和交付清单一致，未放行项未被打包为默认能力。

## Notes

- 本目录是当前环境的 `canonical` 合规门禁事实源。
- `16b8c611` 镜像目录只负责保留历史引用、说明恢复状态并指向本目录。
- 当前结论仍然是“可继续推进平台主系统开发，不可宣告最终商用合规门禁通过”。

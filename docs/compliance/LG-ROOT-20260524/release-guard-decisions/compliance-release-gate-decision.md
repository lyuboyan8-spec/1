# Compliance Release Gate Decision

## Canonical Refs

- `canonical_gate_ref`: `LG-ROOT-20260524`
- `legacy_gate_ref`: `16b8c611`
- `decision_ref`: `LG-RG-20260524-01`
- `updated_at`: `2026-05-24`

## Current Decision

- `overall_legal_gate_status = restricted`
- `blocking = true`
- `final_commercial_release_allowed = false`
- `release_guards.compliance_gate.status = blocked`

## Blocking Conditions

以下任一命中，必须继续阻断：

1. `rights-matrix/adapter-rights-matrix.md` 仍存在 `unknown`、`unclear` 或未闭合的代码/权重/素材/输出义务/再分发边界。
2. `Fay` 被纳入私有化默认交付，或丢失 `saas_only_candidate` 限制。
3. `LiveTalking`、`PersonaLive`、`AI-Vtuber (Ikaros-521)` 被写入默认商用路径、标准套餐能力、默认镜像或私有化默认交付。
4. deployment manifest 的 `adapter_enablement_policy`、`legal_gate_status`、`private_deployment_exclusions`、`release_guards` 与 canonical 文档不一致。
5. `README`、`LICENSE`、模型卡、作者声明、商业条款之间仍有冲突且没有书面澄清。

## Release Conditions

仅在以下条件同时满足时，才允许解除阻断：

1. `LG-01`：rights matrix 已覆盖所有适配器的代码许可、权重/素材来源、输出义务、商用状态、私有化状态、再分发状态与证据链接。
2. `LG-02`：许可证冲突、研究限定冲突、商业授权边界均已形成书面结论。
3. `LG-03`：部署/分发边界已在交付物、镜像、私有化包和销售口径中保持一致。
4. `LG-04`：产品、销售、合同、实施说明明确排除了未放行适配器的默认交付承诺。
5. `LG-05`：deployment manifest 示例和正式机读文件与 canonical 文档完全一致，且阻断字段已通过复核。

## Adapter-Specific Decision Freeze

| Adapter | Current Decision | Release Requirement |
|---|---|---|
| `Fay` | `restricted` | 仅允许内部协议隔离服务；私有化默认交付继续禁止，除非替代实现和权利链闭合 |
| `AI-XiaoPi` | `restricted` | 可参考或有限适配，但需完成平台采集、硬件链和外部服务边界审查 |
| `AI-Vtuber (Koischizo)` | `restricted` | 仅参考或轻量适配，需补齐第三方插件、桌面链路与外部 SaaS 条款 |
| `LiveTalking` | `blocked` | 权利链、素材、输出义务、商业版边界书面放行前不得进入默认商用或私有化 |
| `PersonaLive` | `blocked` | 研究限定冲突、权重链、作者/机构授权未收口前继续阻断 |
| `AI-Vtuber (Ikaros-521)` | `prohibited` | 不进入当前产品主线；除非 CEO 单独重启授权谈判 |

## Audit Rule

任何门禁状态变更都必须同步更新以下文件：

- `summary.md`
- `evidence-index.md`
- `rights-matrix/adapter-rights-matrix.md`
- `manifest-alignment/deployment-manifest-alignment.md`

若只更新其中一部分，不视为有效放行。

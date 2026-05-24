# Evidence Index

## Root Mapping

- `canonical_gate_ref`: `LG-ROOT-20260524`
- `legacy_gate_ref`: `16b8c611`
- `status`: `restricted`
- `blocking`: `true`

## Canonical Documents In This Directory

| Path | Role | Status |
|---|---|---|
| `summary.md` | 当前正式门禁结论、legacy/canonical 映射、阻断与放行条件 | `active` |
| `rights-matrix/README.md` | rights matrix 规则、字段与适配器结论 | `active` |
| `rights-matrix/adapter-rights-matrix.md` | 首版适配器权利链台账 | `active` |
| `manifest-alignment/README.md` | manifest 对齐原则与阻断字段说明 | `active` |
| `manifest-alignment/deployment-manifest-alignment.md` | machine-readable 字段到门禁结论的对齐表 | `active` |
| `release-guard-decisions/README.md` | 发布门禁决策归档入口 | `active` |
| `release-guard-decisions/compliance-release-gate-decision.md` | 当前阻断与放行条件正式决议 | `active` |

## Upstream And Internal Evidence Sources

| Evidence Ref | Source Type | Path | Why It Matters |
|---|---|---|---|
| `SEC-GATE-BASE-20260524` | internal report | `/workspace/agents/security-engineer/output/open-source-compliance-gate-report.md` | 基础开源适配层合规结论 |
| `SEC-GATE-ADDENDUM-20260524` | internal report | `/workspace/agents/security-engineer/output/open-source-compliance-gate-addendum-report.md` | 各适配器禁入口径、放行条件、默认商用禁区 |
| `SEC-GATE-CLOSURE-20260524` | internal report | `/workspace/agents/security-engineer/output/phantom-digital-human-legal-gate-closure-report.md` | `LG-01 ~ LG-05` 结构、reason_code、legacy/canonical 策略 |
| `RM-TEMPLATE-20260524` | internal report | `/workspace/agents/evidence-collector/output/adapter-rights-matrix-evidence-template-report.md` | rights matrix 字段模板与待核项台账 |
| `MANIFEST-EXT-20260524` | internal report | `/workspace/agents/devops/output/phantom-digital-human-deployment-manifest-extension-report.md` | stage/environment、adapter policy、legal gate、release guards 结构 |
| `MANIFEST-EXAMPLE-20260524` | machine-readable example | `/workspace/agents/devops/output/deployment-manifest-extended-example.json` | 当前冻结状态的 JSON 示例 |
| `MANIFEST-SCAFFOLD-20260524` | internal report | `/workspace/agents/dev/output/phantom-digital-human-manifest-compliance-scaffold-report.md` | canonical 占位路径补齐与待回填清单 |

## Evidence Coverage Matrix

| Gate | Decision Topic | Primary Evidence | Secondary Evidence |
|---|---|---|---|
| `LG-01` | rights matrix 完整性 | `RM-TEMPLATE-20260524` | `rights-matrix/adapter-rights-matrix.md` |
| `LG-02` | 许可冲突与商用声明收口 | `SEC-GATE-ADDENDUM-20260524` | `SEC-GATE-CLOSURE-20260524` |
| `LG-03` | 部署与分发边界收口 | `MANIFEST-EXT-20260524` | `manifest-alignment/deployment-manifest-alignment.md` |
| `LG-04` | 产品/销售/合同口径收口 | `SEC-GATE-CLOSURE-20260524` | `summary.md` |
| `LG-05` | manifest 机器事实收口 | `MANIFEST-EXAMPLE-20260524` | `manifest-alignment/README.md` |
| `LG-RG` | 发布阻断/放行正式决议 | `release-guard-decisions/compliance-release-gate-decision.md` | `summary.md` |

## Legacy Mirror Rule

- `docs/compliance/16b8c611/README.md`：仅保留历史引用说明，不重建第二套结论。
- `docs/compliance/16b8c611/summary.md`：镜像当前正式状态，指向 `summary.md`。
- `docs/compliance/16b8c611/evidence-index.md`：复用本索引的 canonical 路径，不复制证据原文。

## Audit Rule

任何后续更新必须同时记录：

- `legacy_gate_ref`
- `canonical_gate_ref`
- `evidence_ref`
- `updated_at`

缺失以上任一字段时，不视为可审计的门禁更新。

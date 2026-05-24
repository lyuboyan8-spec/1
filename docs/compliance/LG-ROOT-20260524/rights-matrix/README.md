# Rights Matrix

本目录是 `LG-ROOT-20260524` 的适配器权利链台账入口，服务 `LG-01 rights matrix 完整性` 门禁。

## Required Fields

每个适配器至少要覆盖以下字段：

- `adapter_id`
- `upstream_project`
- `code_license`
- `readme_usage_statement`
- `weights_in_scope`
- `dataset_or_asset_source`
- `output_obligation`
- `commercial_use_status`
- `commercial_auth_required`
- `private_deployment_status`
- `redistribution_status`
- `default_ga_eligible`
- `current_gate_status`
- `blocking_reason`
- `required_next_evidence`
- `evidence_links`

## Gate Rule

以下任一情况出现时，`LG-01` 不得标记为通过：

1. 只写代码许可证，未写权重、素材或输出义务。
2. `unknown` 或 `unclear` 落在商用、私有化、再分发、输出义务这些关键字段。
3. `README`、`LICENSE`、模型卡或作者声明互相冲突。
4. 门禁结论与 deployment manifest 的 `adapter_enablement_policy` 或 `legal_gate_status` 不一致。

## Canonical Ledger

- [adapter-rights-matrix.md](./adapter-rights-matrix.md)

## Frozen Position

- `Fay`：`conditional / saas_only_candidate`
- `AI-XiaoPi`：`conditional / reference_or_limited_adapter`
- `AI-Vtuber (Koischizo)`：`conditional / reference_or_limited_adapter`
- `LiveTalking`：`blocked / legal_gated_experimental`
- `PersonaLive`：`blocked / legal_gated_experimental`
- `AI-Vtuber (Ikaros-521)`：`prohibited`

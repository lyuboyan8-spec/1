# Manifest Alignment

本目录用于把 `LG-ROOT-20260524` 的文字门禁结论映射到 deployment manifest 的 machine-readable 字段，服务 `LG-05 manifest 机器事实收口`。

## Alignment Rule

以下字段必须与本目录内容一致：

- `adapter_enablement_policy`
- `legal_gate_status`
- `private_deployment_exclusions`
- `release_guards.compliance_gate`
- `release_guards.private_deployment_scope_valid`
- `product.stage`
- `product.environment`

## Blocking Rule

以下任一情况出现时，正式 manifest 不得视为通过：

1. `default_policy != deny`
2. 高风险适配器不是 `default_enabled = false`
3. `legal_gate_status.overall` 不是 `restricted` 或 `approved` 中的实际审定值
4. `legal_gate_status.blocking = true` 但 `release_guards.compliance_gate.status != blocked`
5. `private_deployment_exclusions` 漏掉 `Fay`、`LiveTalking`、`PersonaLive`、`AI-Vtuber (Ikaros-521)`
6. `legacy_gate_ref` 和 `canonical_gate_ref` 未出现在对齐文档或 evidence 链中

## Canonical Alignment Sheet

- [deployment-manifest-alignment.md](./deployment-manifest-alignment.md)

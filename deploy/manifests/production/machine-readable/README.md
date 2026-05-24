# Machine Readable Placeholder

本目录预留给正式 deployment manifest 的 machine-readable JSON 及其 schema 对齐文件。

当前正式事实源为上级目录的 `deployment-manifest.json`。

复核时请显式校验：

- `private_deployment_exclusions.live_talking.reason_code = rights_chain_incomplete_and_output_obligation_unclear`
- `legal_gate_status.adapters.live_talking.reason_code = rights_chain_incomplete_and_output_obligation_unclear`

禁止把 `legal_gate_status.adapters.fay.reason_code = gpl3_saas_only_candidate` 误判为 `live_talking` 的私有化排除短码。

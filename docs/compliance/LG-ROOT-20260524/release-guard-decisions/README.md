# Release Guard Decisions

本目录归档 `LG-ROOT-20260524` 的正式阻断/放行决策，服务发布门禁、审计与 deployment manifest 对齐。

## Canonical Decisions

- [compliance-release-gate-decision.md](./compliance-release-gate-decision.md)

## Mandatory Rule

- 任何改变 `blocking`、`final_commercial_release_allowed`、`adapter_enablement_policy` 或 `private_deployment_exclusions` 的动作，都必须先更新本目录的正式决策文件。
- 若本目录决策与 `summary.md`、`rights-matrix/adapter-rights-matrix.md`、`manifest-alignment/deployment-manifest-alignment.md` 不一致，以“更严格的阻断结论”为准，且发布必须暂停。

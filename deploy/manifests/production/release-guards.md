# Release Guards

本文件定义《幻影数字人》正式发布候选必须满足的门禁。

## 机器门禁

| Guard | 当前状态 | 说明 |
|---|---|---|
| `stage_environment_alignment` | `passed` | 当前 manifest 使用 `stage_4_productionization + cloud_production`，配对合法 |
| `api_prefix_guard` | `passed` | 对外前缀固定为 `/api/v1/*` |
| `billing_truth_source_guard` | `passed` | `billing-service` 仍为唯一事实源 |
| `adapter_policy_guard` | `passed` | 所有适配器默认 `deny`，高风险路径默认关闭 |
| `private_deployment_scope_valid` | `passed` | 私有化排除项已显式列出 |
| `health_checks_defined` | `passed` | 最小必需健康检查已定义 |
| `observability_guard` | `pending_runtime_validation` | 需真实运行期指标与告警联通 |
| `rollback_readiness` | `pending_runtime_validation` | 需真实回滚方案和演练记录 |
| `compliance_gate` | `blocked` | `legacy_gate_ref=16b8c611`，`canonical_gate_ref=LG-ROOT-20260524`，整体仍受限 |
| `cloudflare_human_approval` | `blocked` | human 尚未连接/审批 |
| `paid_resource_approval` | `blocked` | 正式资源与公网副作用需 human 审批 |

## 阻断结论

`release_guards.overall = blocked`

阻断原因：

1. `legal_gate_status.blocking = true`
2. Cloudflare 连接与部署审批尚未获 human 决策
3. 付费资源开通与域名影响变更尚未获 human 决策
4. 运行期观测与回滚尚未完成真实环境校验

## 放行前必须补齐

1. `LG-01 ~ LG-05` 全部通过，或至少把整体 `legal_gate_status` 从 `restricted` 收口为可放行状态。
2. 生产观测面板、告警升级链路、回滚预案具备真实环境证据。
3. 由 human 在 Wanman 中完成 Cloudflare 连接和具体部署审批。
4. 付费资源、域名、WAF/Access、流量切换等影响项完成人工决策。

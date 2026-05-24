# 幻影数字人正式 Deployment Manifest 包

本目录是《幻影数字人》云上生产候选发布的正式 deployment manifest 包。它描述的是部署事实、合规边界、审批边界与发布门禁，不代表已经获准商用上线。

## 当前结论

- `schema = wanman.deployment-manifest`
- `version = 1`
- `product.stage = stage_4_productionization`
- `product.environment = cloud_production`
- `legal_gate_status.overall = restricted`
- `legal_gate_status.blocking = true`
- `release_guards.overall.status = blocked`
- `private_deployment_exclusions.live_talking.reason_code = rights_chain_incomplete_and_output_obligation_unclear`

因此，本包当前只能作为“生产化阶段的受限候选发布事实源”，不能作为“最终商用发布已放行”的证明。

## 一致性说明

- `deploy/manifests/production/deployment-manifest.json` 是本包唯一 machine-readable 事实源。
- 本包对 `LiveTalking` 的统一口径只针对 `private_deployment_exclusions.live_talking.reason_code`，固定为 `rights_chain_incomplete_and_output_obligation_unclear`。
- `legal_gate_status.adapters[*].reason_code` 与 `private_deployment_exclusions[*].reason_code` 服务于不同语义，复核时不得把 `fay.reason_code = gpl3_saas_only_candidate` 误读为 `live_talking` 的私有化排除短码。

## 文件清单

- `deployment-manifest.json`
  正式 machine-readable manifest。
- `../../cloudflare/`
  Cloudflare 边缘交付包，固定选择 `Workers`，不使用 `Pages` 承载主系统。
- `environment-matrix.md`
  阶段模型与环境模型，以及允许配对关系。
- `health-checks.md`
  入口、服务和基础依赖的健康检查定义。
- `release-guards.md`
  发布前必须通过的工程、合规、审批与回滚门禁。
- `cloudflare-approval-boundary.md`
  Cloudflare 连接、部署审批与 agent 执行边界。

## 冻结边界

- 产品名固定为 `幻影数字人`。
- 对外 API 前缀固定为 `/api/v1/*`。
- 套餐枚举固定为 `free_trial`、`professional`、`enterprise`。
- `billing-service` 是订阅、权益、只读状态和配额守卫唯一事实源。
- 所有开源能力必须通过适配层接入。
- `Fay` 仅为 `SaaS-only` 受限候选，不进入默认私有化交付。
- `LiveTalking`、`PersonaLive` 默认禁用，且受法务门禁约束。
- `AI-Vtuber (Ikaros-521 fork)` 为 `prohibited`，不得进入仓库、镜像、SBOM 或交付包。

## 当前使用方式

1. 先读取 `deployment-manifest.json` 作为机器事实源。
2. 再结合本目录其余说明文件与 `deploy/cloudflare/` 交付包判断 go / no-go。
3. 若需实际部署，必须先完成 human 的 Cloudflare 连接与部署审批。

## 非目标

本目录不保存：

- Cloudflare 凭证
- 任何 provider secret 明文
- 直接执行部署的脚本
- 生产域名切换结果

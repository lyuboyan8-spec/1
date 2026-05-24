# 环境矩阵

本文件把研发阶段 `stage` 与部署环境 `environment` 分离表达，避免把“做到哪一步”和“部署到哪里”混为同一个字段。

## 阶段与环境配对

| `stage` | 允许 `environment` | 是否允许正式 production manifest |
|---|---|---|
| `stage_1_platform_foundation` | `local_development` | 否 |
| `stage_2_adapter_enablement` | `local_development`、`single_gpu_validation` | 否 |
| `stage_3_console_and_director` | `local_development`、`single_gpu_validation` | 否 |
| `stage_4_productionization` | `local_development`、`single_gpu_validation`、`cloud_production` | 是 |

## 环境定义

| `environment` | 运行拓扑 | 主要目标 |
|---|---|---|
| `local_development` | Docker Compose / 本地依赖 | 验证控制面、BFF、数据库、缓存、对象存储与 `/api/v1/*` 基础链路 |
| `single_gpu_validation` | 单机 GPU 工作站 | 验证渲染、口型、表情、推流与 GPU 指标链路 |
| `cloud_production` | Kubernetes + CPU/GPU 分池 + Cloudflare | 形成正式生产候选发布事实、审批与回滚体系 |

## 冻结判断

- 只有 `stage_4_productionization + cloud_production` 才允许生成当前目录中的正式 manifest。
- `single_gpu_validation` 仍然只是验证环境，不等于商用放行。
- 即使进入 `stage_4_productionization`，只要 `legal_gate_status.blocking = true`，仍不得冻结最终商用发布。

## 与适配器策略的关系

- `Fay` 可作为 `single_gpu_validation` 或 `cloud_production` 下的受控 SaaS 候选，但不能默认启用，也不能进入私有化默认交付。
- `AI-XiaoPi` 可用于受控适配验证或生产候选中的白名单试点。
- `PersonaLive`、`LiveTalking` 仅允许 `single_gpu_validation` 受控验证，默认禁用。
- `AI-Vtuber (Ikaros-521 fork)` 在所有环境下都不得启用。

# Health Checks

本文件定义当前 production manifest 候选发布必须具备的健康检查。

## 入口与服务检查

| 名称 | 目标 | 成功条件 | 发布必需 |
|---|---|---|---|
| `public-api` | `https://api.phantom-digital-human.example.com/api/v1/health` | `HTTP 200` | 是 |
| `billing-service` | `http://billing-service:8082/health` | `HTTP 200` 且 entitlement snapshot 就绪 | 是 |
| `media-gateway` | `http://media-gateway:9000/healthz` | `HTTP 200` | 是 |
| `avatar-render-service` | `http://avatar-render-service:7000/health` | `HTTP 200` 且 GPU ready | 是 |

## 基础依赖检查

| 名称 | 目标 | 成功条件 | 发布必需 |
|---|---|---|---|
| `postgresql16` | 控制面数据库 | 连接成功 | 是 |
| `redis7.2` | 控制面缓存 | 连接成功 | 是 |
| `nats-jetstream` | 事件总线 | 连接成功 | 是 |
| `temporal1.26` | 工作流集群 | namespace ready | 是 |

## 观测要求

- 必须能观测 API 可用性。
- 必须能观测实时链路与推流状态。
- 必须能观测 GPU 利用率与显存。
- 必须能观测队列堆积、慢查询、支付回调失败和用量入账延迟。

## 当前状态

当前文件只定义发布前必需的检查项，不声称这些检查已经在真实生产环境跑通。真实运行结果必须由后续部署 runner 和观测系统提供。

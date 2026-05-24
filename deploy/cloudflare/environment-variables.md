# Cloudflare 环境变量清单

本文件只列变量名，不包含任何密钥值。

## Worker 运行变量

| 变量名 | 用途 | 必需 | 类型 |
|---|---|---|---|
| `CF_EDGE_ENV` | 标记边缘环境，例如 production / staging | 是 | 普通变量 |
| `CF_DEFAULT_ORIGIN` | 未命中特定 host 时的默认回源 | 是 | 普通变量 |
| `CF_CONSOLE_ORIGIN` | `console.*` 回源 | 是 | 普通变量 |
| `CF_API_ORIGIN` | `api.*` 回源 | 是 | 普通变量 |
| `CF_PREVIEW_ORIGIN` | `preview.*` 回源 | 是 | 普通变量 |
| `CF_ALLOWED_HOSTS` | 允许通过 Worker 的 Host 白名单 | 否 | 普通变量 |
| `CF_MAINTENANCE_MODE` | 维护模式开关 | 是 | 普通变量 |
| `CF_MAINTENANCE_TARGET` | 维护模式跳转目标 | 否 | 普通变量 |

## Worker Secret

| 变量名 | 用途 | 必需 | 类型 |
|---|---|---|---|
| `CF_BYPASS_TOKEN` | 紧急绕过维护页的人工旁路 token | 否 | Secret |

## CI / Trusted Runner 变量名

| 变量名 | 用途 | 必需 | 类型 |
|---|---|---|---|
| `CLOUDFLARE_ACCOUNT_ID` | 指定目标 Cloudflare Account | 是 | Secret |
| `CLOUDFLARE_API_TOKEN` | trusted runner 发布 Worker 所需 token | 是 | Secret |

## 与主系统 manifest 的关系

- Cloudflare Worker 变量只负责边缘入口和回源路由。
- 应用本体运行变量仍以 `deploy/manifests/production/deployment-manifest.json` 中 `env_bindings` 为唯一事实源。
- 不得把 `DATABASE_URL`、`SESSION_SECRET`、`PAYMENT_WEBHOOK_SECRET` 等后端 secret 注入 Cloudflare Worker，除非 manifest 后续显式新增边缘依赖并重新审批。

# Cloudflare 交付包

本目录是《幻影数字人》生产候选发布的 Cloudflare 交付包。它回答 human 当前最关心的 6 个部署问题，并把边缘入口、变量名、推送检查与回滚路径固定下来。

## 6 个关键结论

1. `Cloudflare Pages` 还是 `Cloudflare Workers`
   结论：选择 `Cloudflare Workers`，不选择 `Pages`。
2. 是否需要 `wrangler`
   结论：需要，仓库内统一使用 `deploy/cloudflare/wrangler.jsonc`。
3. 环境变量需要哪些
   结论：只维护变量名清单，见 `environment-variables.md`。
4. GitHub 推送前要检查什么
   结论：先跑仓库校验、manifest 对齐和 Worker 配置检查，见 `github-deployment-checklist.md`。
5. GitHub 推送后要做什么
   结论：等 human 在 Wanman 中连接 Cloudflare 并审批，再由 trusted runner 执行真实部署与切流，见 `github-deployment-checklist.md`。
6. 回滚怎么做
   结论：优先切 `CF_MAINTENANCE_MODE` / `CF_MAINTENANCE_TARGET`，必要时回退上一个 Worker 版本并撤销域名切流，见 `rollback-runbook.md`。

## 为什么不是 Pages

- 当前生产拓扑冻结为 `浏览器 -> Cloudflare -> Gateway/Ingress -> 控制面服务 -> 编排层 -> 实时层 -> GPU 推理层 -> 数据层`。
- 仓库内尚无可直接交给 `Pages` 的正式 Next.js 产物，也没有把控制面或 BFF 收敛为单一静态站点的事实。
- `Workers` 更适合承担统一域名入口、路由转发、维护模式、流量切换与回滚开关。

## 目录

- `wrangler.jsonc`
  Cloudflare Worker 配置入口。
- `src/edge-entry.ts`
  最小边缘入口，负责按 host 转发、维护模式和健康探针。
- `environment-variables.md`
  Cloudflare 边缘层需要的变量名清单。
- `pages-vs-workers-decision.md`
  为什么此仓当前必须选 `Workers`。
- `github-deployment-checklist.md`
  GitHub 推送前后步骤与审批边界。
- `rollback-runbook.md`
  受控回滚流程。

## 非目标

- 不在仓库内保存 Cloudflare token、Zone ID 或任何 secret 值。
- 不在此目录直接执行生产部署。
- 不把主 SaaS Runtime 迁移到 Cloudflare 内运行。

# Pages / Workers 选择结论

## 结论

《幻影数字人》当前 Cloudflare 交付路径固定为 `Workers`，不使用 `Pages` 承载正式生产入口。

## 判定依据

1. 冻结生产拓扑已经明确 Cloudflare 位于统一公网入口层，而业务核心运行在 Kubernetes、CPU/GPU 分池和后端服务集群中。
2. 当前仓库没有可直接部署到 `Pages` 的正式 Web 构建链路，也没有把 BFF、API Gateway、实时面收敛为单个前端站点。
3. 发布阶段需要 `WAF`、`Access`、域名路由、维护模式、回源切换与快速回滚，这些更符合 `Workers` 的边缘代理职责。
4. `Pages` 适合作为营销站点或文档静态托管的后续选项，但不是当前主系统的正式交付边界。

## 适用口径

- `console.phantom-digital-human.*` 走 Worker 边缘入口再回源控制台上游。
- `api.phantom-digital-human.*` 走 Worker 边缘入口再回源 API Gateway / Ingress。
- `preview.phantom-digital-human.*` 走 Worker 边缘入口再回源预览/导演台上游。

## 例外约束

如果后续出现真正独立的营销官网静态产物，可以新增单独 `Pages` 项目，但不得改变当前 production manifest 中主系统的 `Workers` 结论，除非重新过 human 审批与 manifest 更新。

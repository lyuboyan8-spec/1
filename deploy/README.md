# Deploy

部署交付物目录。

## 当前内容

- `deploy/manifests/production/`
  正式 production manifest 包，记录机器可读部署事实、门禁与审批边界。
- `deploy/cloudflare/`
  Cloudflare 边缘交付包，当前结论固定为 `Workers`，不使用 `Pages` 承载主系统。

## 当前 Cloudflare 口径

- 主系统生产入口采用 `Cloudflare Workers` 作为统一边缘入口。
- `Cloudflare Pages` 不是当前主系统正式交付路径。
- Worker 只负责入口路由、维护模式、健康探针与回源切换，不承载控制面、BFF、实时面或 GPU 面主运行时。

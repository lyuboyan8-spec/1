# apps/web

`apps/web` 是《幻影数字人》的 Next.js 15 官网入口骨架，当前服务于 GitHub 空仓交付与 marketing 静态站点特例，不承担主系统默认交付入口。

## 技术基线

- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS 4
- App Router + 静态导出

## 当前范围

- 已提供 `/`、`/pricing`、`/docs` 三个最小页面入口
- 已固化套餐枚举 `free_trial`、`professional`、`enterprise`
- 当前仅用于官网与部署说明，不承载控制台认证态逻辑

## Cloudflare 边界

- 主系统默认入口: `deploy/cloudflare/wrangler.jsonc` 对应的 `Cloudflare Workers`
- `apps/web` root directory: `apps/web`
- `apps/web` build command: `npm run build`
- `apps/web` static export output: `out`
- Node.js: `22`

说明：当前站点采用 `next.config.ts` 中的 `output: "export"`，因此可作为未来纯静态 marketing 子站特例；当前正式主系统交付仍以 Cloudflare Workers 边缘入口为准，不得把本目录写成默认 Pages 方案。

## 本地验证

在仓库根目录执行：

```bash
npm install
npm run web:typecheck
npm run web:build
```

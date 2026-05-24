# apps/web

`apps/web` 是《幻影数字人》的 Next.js 15 单一 Web 主入口骨架，当前服务于 GitHub 空仓交付，并沿 `Cloudflare Workers` 作为唯一正式交付目标演进。

## 技术基线

- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS 4
- App Router

## 当前范围

- 已提供 `/`、`/pricing`、`/docs` 三个最小页面入口
- 已固化套餐枚举 `free_trial`、`professional`、`enterprise`
- 当前最小实现仍偏 marketing，但正式产品边界已经冻结为承载 `marketing`、`auth`、`console`、`admin` 的统一 SaaS 主入口

## Cloudflare 正式交付参数

- 主系统默认入口: `deploy/cloudflare/wrangler.jsonc` 对应的 `Cloudflare Workers`
- Source app root directory: `apps/web`
- Repository root directory for CI/build entry: `/workspace/phantom-digital-human`
- Build command: `npm run web:build`
- Static output directory produced by current app build: `apps/web/out`
- Worker config entry: `deploy/cloudflare/wrangler.jsonc`
- Node.js: `22`

说明：当前站点在 `next.config.ts` 中仍保留 `output: "export"`，因此 `npm run web:build` 会产出 `apps/web/out` 作为当前最小静态构建结果；但这不改变主系统正式交付目标，生产默认方案仍是 `Cloudflare Workers`。`Cloudflare Pages` 只保留给未来独立纯静态 marketing 子站特例，不作为当前主系统默认方案。

## 本地验证

在仓库根目录执行：

```bash
npm install
npm run web:typecheck
npm run web:build
```

# 幻影数字人 Monorepo

`phantom-digital-human` 是《幻影数字人》的唯一代码基线，面向 `SaaS 优先，兼容后续私有化` 的部署执行系统。

## 冻结边界

- 商业主系统、自研控制面、权限、审计、计费与部署体系在本仓持续演进。
- 对外 API 前缀固定为 `/api/v1/*`。
- 套餐枚举固定为 `free_trial`、`professional`、`enterprise`。
- `billing-service` 是订阅、权益、只读状态与配额守卫的唯一事实源。
- 所有开源能力必须通过适配层接入，前端与业务服务不得直连原生仓库接口。
- `Fay` 仅为 `SaaS-only` 隔离候选；`LiveTalking`、`PersonaLive` 默认禁用；`AI-Vtuber (Ikaros-521 fork)` 禁并仓。

## Monorepo 结构

```text
apps/       Web、Console、Admin 等前端入口
services/   控制面、业务面、实时面、引擎适配服务
packages/   UI、SDK、共享配置
infra/      启动脚本、治理规则、环境与自动化约束
docs/       部署、合规、架构与执行文档
deploy/     deployment manifest 与环境交付物
tools/      仓库级校验工具
tests/      仓库级最小校验入口
```

## 快速开始

当前骨架不依赖已安装的 `pnpm`，最小校验使用 Node.js 22 内建能力执行。

```bash
npm install
npm run web:typecheck
npm run web:build
npm run validate
npm run check
./infra/scripts/check.sh
./infra/scripts/bootstrap.sh
```

## Web 入口与 Cloudflare 基线

仓库已补齐真实的官网代码入口：

- Web app root: `apps/web`
- Runtime: `Next.js 15 + React 19 + TypeScript 5`
- 当前主系统部署目标: `Cloudflare Workers`
- Repository root directory for CI/build entry: `/workspace/phantom-digital-human`
- Source app root directory: `apps/web`
- Build command: `npm run web:build`
- Static output directory produced by current app build: `apps/web/out`
- Worker config: `deploy/cloudflare/wrangler.jsonc`
- Node.js: `22`

当前主系统默认由 `deploy/cloudflare/wrangler.jsonc` 对应的 `Cloudflare Workers` 作为正式边缘入口。`apps/web` 当前仍会产出 `apps/web/out` 作为最小静态构建结果，但该输出只用于当前 GitHub 空仓交付与后续纯静态 marketing 子站特例，不得写成主系统默认部署方案。

`npm run validate` 与 `npm run check` 会同时校验以下冻结约束：

- 对外 API 前缀必须保持为 `/api/v1`。
- `billing-service` 必须保持为订阅、权益、只读状态与配额守卫的唯一事实源。
- 所有开源能力只能经由适配层接入，前端与业务服务不得直连原生引擎接口。
- `deploy/manifests/production/` 与 `docs/compliance/LG-ROOT-20260524/` 的占位目录必须存在，供后续 manifest 与合规资料直接回填。

## 当前范围

阶段目标聚焦于部署执行系统骨架，不在本次初始化中实现以下内容：

- 业务 API、BFF、控制台页面和数据库模型的可运行逻辑
- 适配器调用、媒体链路、WebRTC、推流与 GPU 工作负载
- 生产级 CI/CD、Kubernetes、Cloudflare、密钥注入和发布流程

但以下 Cloudflare 交付事实已经冻结，用于后续人审和 trusted runner 接管：

- 主系统生产入口选择 `Cloudflare Workers`，不选择 `Cloudflare Pages`。
- 配置入口固定为 `deploy/cloudflare/wrangler.jsonc`。
- 变量名清单、GitHub 推送前后检查和回滚说明固定在 `deploy/cloudflare/`。
- 真正的 Cloudflare 连接、发版、域名切换和付费资源副作用仍由 human 审批与 trusted runner 执行。

已预留以下路径供后续任务接续：

- `docs/compliance/16b8c611/`
- `docs/compliance/LG-ROOT-20260524/`
- `deploy/manifests/production/`
- `deploy/manifests/production/machine-readable/`
- `deploy/manifests/production/environment-matrix/`
- `deploy/manifests/production/health-checks/`
- `deploy/manifests/production/release-guards/`
- `deploy/manifests/production/cloudflare-boundary/`
- `docs/compliance/LG-ROOT-20260524/rights-matrix/`
- `docs/compliance/LG-ROOT-20260524/manifest-alignment/`
- `docs/compliance/LG-ROOT-20260524/release-guard-decisions/`

## 参考输入

- `/workspace/agents/product-manager/output/phantom-digital-human-deployment-execution-master-plan-report.md`
- `/workspace/agents/devops/output/phantom-digital-human-stage-environment-model-report.md`
- `/workspace/agents/security-engineer/output/phantom-digital-human-legal-gate-closure-report.md`

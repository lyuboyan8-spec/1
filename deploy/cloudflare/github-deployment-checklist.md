# GitHub 推送前后检查

## 推送前

1. 确认 `deploy/manifests/production/deployment-manifest.json` 仍保持：
   - `schema = wanman.deployment-manifest`
   - `version = 1`
   - `cloudflare_boundary.agent_may_execute_direct_changes = false`
2. 运行仓库校验：
   - `npm run validate`
   - `npm run check`
3. 校验 Cloudflare 交付包：
   - `node -e "JSON.parse(require('fs').readFileSync('deploy/cloudflare/wrangler.jsonc','utf8'))"`
   - `test -f deploy/cloudflare/src/edge-entry.ts`
   - `test -f deploy/cloudflare/environment-variables.md`
4. 确认只输出变量名，没有输出任何密钥值。
5. 确认 README、manifest 与 Cloudflare 文档口径一致，特别是：
   - 选择 `Workers`
   - 不使用 `Pages` 承载主系统
   - human 审批仍是阻断项

## 推送后但部署前

1. 等 human 在 Wanman 中完成：
   - Cloudflare 连接
   - 具体部署审批
   - 付费资源审批
2. 确认 trusted runner 持有：
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CLOUDFLARE_API_TOKEN`
3. 用 trusted runner 执行 Worker 发布与路由绑定。
4. 验证边缘健康探针：
   - `GET /__edge/health`
5. 验证正式业务健康探针：
   - `GET /api/v1/health`
6. 验证维护开关、Host 路由和回源行为符合预期。

## 明确禁止

- agent 直接用本地 Cloudflare 凭证发版
- 未经 human 审批直接切生产域名
- 在仓库、artifact 或消息中写任何 secret 值

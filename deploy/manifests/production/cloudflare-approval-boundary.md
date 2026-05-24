# Cloudflare 审批边界

本文件用于把“连接 Cloudflare”和“审批具体部署”分离表达。

## 两个独立动作

1. `Cloudflare 连接`
   让 Wanman control plane 获得目标账户或 Zone 的受控托管前提。
2. `部署审批`
   允许某次具体发布对 DNS、CDN、WAF、Access 和公网入口产生真实副作用。

这两个动作不能视为同一份默认授权。

## agent 可以做的事

- 在 manifest 中声明需要 Cloudflare 托管的域名和能力。
- 说明哪些变更会影响公网入口、账单或安全策略。
- 在 manifest 入库后向 human 请求连接和审批。

## agent 禁止做的事

- 直接使用 Cloudflare 凭证。
- 直接修改 DNS、证书、WAF、Access、缓存或回源规则。
- 在 artifact 或消息中写入 provider secret 明文。
- 对付费资源或域名影响变更做静默发布。

## 必须 human 决策的场景

- 首次连接 Cloudflare 账户或 Zone
- 新增、切换、删除生产域名
- 首次对公网开放生产流量
- 修改 WAF、Access、缓存或回源策略
- 引入新付费资源或提升正式资源规格

## 当前状态

- `connection_ready = false`
- `deployment_approval_granted = false`
- `trusted_runner_required = true`

## 审批消息模板

```bash
wanman send human --type decision "幻影数字人 deployment manifest 已就绪；请在 Wanman 中连接 Cloudflare 并审批部署。当前 manifest 仍受合规门禁限制，未授权任何 agent 直接执行公网副作用。"
```

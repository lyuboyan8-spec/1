# Adapter Rights Matrix

## Canonical Refs

- `canonical_gate_ref`: `LG-ROOT-20260524`
- `legacy_gate_ref`: `16b8c611`
- `updated_at`: `2026-05-24`

## Ledger

| Adapter | Code License | Usage Statement | Output Obligation | Commercial Use | Private Deployment | Default GA | Gate Status | Blocking Reason |
|---|---|---|---|---|---|---|---|---|
| `fay-adapter` | `GPL-3.0` | README 含“完全开源，商用免责”，但不能替代 GPL 义务 | `unknown` | `restricted` | `restricted` | `no` | `conditional` | 仅允许 `SaaS-only` 隔离候选；插件、模型、私有化分发边界未闭合 |
| `ai-xiaopi-adapter` | `MIT` | 适合参考/适配，不得直接继承其私有化与硬件销售口径 | 平台采集与硬件链待单独审查 | `restricted` | `restricted_by_scope` | `no` | `conditional` | 直播采集、硬件、外部服务依赖仍需平台规则和风控审查 |
| `ai-vtuber-koischizo-adapter` | `MIT` | README 明示仅为 fun / YouTube 视频用途 | 未见强制输出义务 | `restricted` | `restricted_by_scope` | `no` | `conditional` | 第三方插件、桌面链路和外部 SaaS 依赖未平台化 |
| `livetalking-adapter` | `Apache-2.0` | README-EN 提示接近商用，但 README 同时存在品牌/水印义务 | 发布视频需带 `LiveTalking` 水印和标识 | `restricted` | `prohibited` | `no` | `blocked` | 权重、素材、输出义务和商业版边界未形成完整 rights matrix |
| `personalive-adapter` | `Apache-2.0` | README 明示 `academic research only` | 研究限定视为商用阻断 | `prohibited` | `prohibited` | `no` | `blocked` | README 研究限定与仓库/HF 许可显示冲突，权重链未闭合 |
| `ai-vtuber-ikaros-prohibited` | `GPL-3.0` | README 明示个人免费、商用抽成、需授权 | 单独商业授权要求 | `prohibited` | `prohibited` | `no` | `prohibited` | 与闭源收费主系统和标准私有化交付模式直接冲突 |

## Mandatory Release Rule

- `LiveTalking`、`PersonaLive`、`AI-Vtuber (Ikaros-521)` 不得进入默认商用能力、默认镜像或私有化默认交付。
- `Fay` 只能以内部协议隔离服务接入，且 `private_deployment_allowed = false`。
- `AI-XiaoPi` 与 `Koischizo` 只能作为参考或有限适配，不得让前端或业务服务直连上游原生接口。

## Required Next Evidence

| Adapter | Required Next Evidence |
|---|---|
| `fay-adapter` | 实际模型/插件清单、私有化交付拓扑、替代实现说明 |
| `ai-xiaopi-adapter` | 直播平台采集合规评估、硬件链与第三方服务边界 |
| `ai-vtuber-koischizo-adapter` | VTS/桌面音频/外部 SaaS 依赖条款与替代方案 |
| `livetalking-adapter` | 权重许可、avatar 素材许可、输出义务解除条件、商业版条款 |
| `personalive-adapter` | 作者/机构商业授权或研究限定澄清、基础权重权利链 |
| `ai-vtuber-ikaros-prohibited` | 当前不推进；除非 CEO 重启单独授权谈判 |

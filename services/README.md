# Services

服务分层按冻结架构拆分：

- 控制面：`api-gateway`、`bff-console`、`auth-service`、`tenant-service`、`billing-service`
- 业务面：`avatar-service`、`knowledge-service`、`liveops-service`、`workflow-service`、`media-gateway`
- 引擎面：`conversation-service`、`speech-service`、`emotion-service`、`lipsync-service`、`avatar-render-service`

`billing-service` 是套餐、订阅、权益、只读与配额的唯一事实源；其他服务只能消费其快照或结果，不得自行维护收费真相。

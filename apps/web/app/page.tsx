const planCards = [
  {
    name: "免费试用版",
    code: "free_trial",
    value: "0 元 / 7 天",
    summary: "单租户、60 分钟额度、1 路测试推流。",
  },
  {
    name: "专业版",
    code: "professional",
    value: "1999 元 / 月",
    summary: "5 个席位、3000 分钟、2 路推流。",
  },
  {
    name: "企业版",
    code: "enterprise",
    value: "9999 元 / 月起",
    summary: "多团队、SSO、审计、SLA 与实施服务。",
  },
];

const architectureLayers = [
  "体验层：官网、控制台、管理后台、开发者文档",
  "平台层：API Gateway、BFF、Auth/IAM、Tenant、Billing、Audit",
  "能力层：对话、知识库、语音、表情、口型、渲染、推流",
  "引擎层：Fay、AI-XiaoPi、PersonaLive、LiveTalking、AI-Vtuber 适配器",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--surface)] text-[var(--ink)]">
      <section className="hero-shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Phantom Digital Human</p>
            <h1>幻影数字人部署执行系统</h1>
            <p className="lede">
              以商业主系统为中心，统一承接权限、计费、审计、部署与引擎适配边界。
            </p>
            <div className="cta-row">
              <a href="/pricing/" className="cta-primary">
                查看套餐
              </a>
              <a href="/docs/" className="cta-secondary">
                部署说明
              </a>
            </div>
          </div>
          <div className="hero-panel">
            <p className="panel-kicker">冻结约束</p>
            <ul>
              <li>所有对外接口统一为 `/api/v1/*`</li>
              <li>`billing-service` 是订阅与权益唯一事实源</li>
              <li>前端与业务服务不得直连开源引擎原生接口</li>
              <li>Cloudflare 只承接边界流量与静态发布，不注入明文密钥</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="content-shell">
        <div className="section-heading">
          <p className="eyebrow">Pricing</p>
          <h2>冻结套餐枚举</h2>
        </div>
        <div className="plan-grid">
          {planCards.map((plan) => (
            <article key={plan.code} className="plan-card">
              <p className="plan-code">{plan.code}</p>
              <h3>{plan.name}</h3>
              <p className="plan-value">{plan.value}</p>
              <p>{plan.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-shell">
        <div className="section-heading">
          <p className="eyebrow">Architecture</p>
          <h2>四层架构入口</h2>
        </div>
        <div className="architecture-list">
          {architectureLayers.map((item) => (
            <article key={item} className="architecture-item">
              {item}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

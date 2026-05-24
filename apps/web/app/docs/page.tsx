const commands = [
  "npm install",
  "npm run web:typecheck",
  "npm run web:build",
];

export default function DocsPage() {
  return (
    <main className="subpage-shell">
      <p className="eyebrow">Docs</p>
      <h1>本地验证入口</h1>
      <p>当前 `apps/web` 为静态导出骨架，Cloudflare Pages 以 monorepo 子目录方式接入。</p>
      <ul className="command-list">
        {commands.map((command) => (
          <li key={command}>
            <code>{command}</code>
          </li>
        ))}
      </ul>
    </main>
  );
}

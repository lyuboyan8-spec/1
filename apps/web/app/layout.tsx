import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "幻影数字人 | SaaS 部署执行系统",
  description:
    "幻影数字人商业主系统的部署执行基线，覆盖官网入口、能力边界、Cloudflare 交付参数与本地验证命令。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

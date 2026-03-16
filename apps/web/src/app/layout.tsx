import type { Metadata } from "next";
import "./globals.css";

// TODO: プロジェクトに合わせてメタデータを変更してください
export const metadata: Metadata = {
  title: "App",  // アプリ名に変更
  description: "App",  // アプリの説明に変更
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}

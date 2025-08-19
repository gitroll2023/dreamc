import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "드림캐쳐 - 청년문화단체",
  description: "청년들의 꿈과 도전을 지원하는 청년문화단체 드림캐쳐입니다.",
  keywords: "청년, 문화, 지원, 창업, 네트워킹, 멘토링, 드림캐쳐",
  openGraph: {
    title: "드림캐쳐 - 청년문화단체",
    description: "청년들의 꿈과 도전을 지원하는 청년문화단체 드림캐쳐입니다.",
    url: "https://dreamcatcher.or.kr",
    siteName: "드림캐쳐",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-background font-pretendard antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}

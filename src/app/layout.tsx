import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "드림캐쳐 - 청년 문화 체험 플랫폼 | 여수 드림캐쳐, 목포 드림캐쳐, 화순 드림캐쳐, 나주 드림캐쳐",
  description: "여수 드림캐쳐, 목포 드림캐쳐, 화순 드림캐쳐, 나주 드림캐쳐 - 전라남도 청년들을 위한 할인 체험 프로그램. 칵테일, 베이킹, 보드게임, 캘리그래피 등 다양한 문화 체험을 특별 할인가로 만나보세요.",
  keywords: "여수 드림캐쳐, 목포 드림캐쳐, 화순 드림캐쳐, 나주 드림캐쳐, 드림캐쳐, 여수 청년 프로그램, 목포 청년 프로그램, 화순 청년 프로그램, 나주 청년 프로그램, 여수 문화체험, 목포 문화체험, 화순 문화체험, 나주 문화체험, 할인체험권, 칵테일클래스, 홈베이킹, 보드게임, 캘리그래피, 사진클래스, 석고방향제, AI부트캠프",
  authors: [{ name: "드림캐쳐" }],
  creator: "드림캐쳐",
  publisher: "드림캐쳐",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/og-icon.png', type: 'image/png' },
    ],
    apple: '/og-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/icon-192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/icon-512.png',
      },
    ],
  },
  openGraph: {
    title: "드림캐쳐 - 청년 문화 체험 플랫폼 | 여수 드림캐쳐, 목포 드림캐쳐, 화순 드림캐쳐, 나주 드림캐쳐",
    description: "여수 드림캐쳐, 목포 드림캐쳐, 화순 드림캐쳐, 나주 드림캐쳐 - 전라남도 청년들을 위한 할인 체험 프로그램. 칵테일, 베이킹, 보드게임, 캘리그래피 등 다양한 문화 체험을 특별 할인가로 만나보세요.",
    url: "http://dreamcatcher.sslab.cloud",
    siteName: "드림캐쳐",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "드림캐쳐 - 청년 문화 체험 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "드림캐쳐 - 청년 문화 체험 플랫폼 | 여수 드림캐쳐, 목포 드림캐쳐, 화순 드림캐쳐, 나주 드림캐쳐",
    description: "여수 드림캐쳐, 목포 드림캐쳐, 화순 드림캐쳐, 나주 드림캐쳐 - 전라남도 청년들을 위한 할인 체험 프로그램",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "IFuaHsRqP1CgcGqshUM3MFLI0OaVDmFiGcSdnbbx-7A",
    other: {
      "naver-site-verification": "2ec2b78de538fa3284870310d6cea72383e63f97",
    },
  },
  alternates: {
    types: {
      'application/rss+xml': [{ url: '/rss.xml', title: '드림캐쳐 RSS 피드' }],
    },
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

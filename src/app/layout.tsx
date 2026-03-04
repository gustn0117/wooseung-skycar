import type { Metadata } from "next";
import { Noto_Sans_KR, Figtree } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: "우승 스카이차 | 안전한 고공 작업 전문",
  description: "신속한 대응, 완벽한 작업 - 우승 스카이차와 함께하세요",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} ${figtree.variable} font-noto`}>
        {children}
      </body>
    </html>
  );
}

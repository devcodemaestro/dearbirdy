import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Providers from "./providers";

const pretendard = localFont({
  src: "../app/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const nanumBrush = localFont({
  src: "../app/fonts/NanumBrushScript-Regular.ttf",
  display: "swap",
  weight: "400",
  style: "normal",
  variable: "--font-nanumBrush",
});

export const metadata: Metadata = {
  title: "DearBirdy",
  description: "편지로 연결되는 따뜻한 마음, 인생 선후배들의 만남",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>{/* 구글 폰트 관련 링크 제거 */}</head>
      <body
        className={`${pretendard.variable} font-pretendard min-h-[852px] w-full max-w-[375px] mx-auto flex flex-col items-center justify-center`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

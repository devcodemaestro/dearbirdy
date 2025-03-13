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
      <body
        className={`${pretendard.variable} box-border font-pretendard max-w-[476px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] mx-auto`}
      >
        {/* ✅ React Query Provider 적용 */}
        <main className="max-w-[476px] h-full">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}

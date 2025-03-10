"use client";

import { usePathname } from "next/navigation";
import Limit from "@/components/home/Limit";
import Report from "@/components/home/Report";
import Footer from "@/components/ui/Footer";

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Footer를 숨길 페이지 목록
  const noFooterPages = [
    "/mybuddy/settings",
    "/mybuddy/faq",
    "/mybuddy/find-buddy",
    "/mybuddy/all-buddy-types",
  ];

  const report = false;
  const limit = false;

  return (
    <>
      {report && <Report />}
      {limit && <Limit />}
      <div className="w-[375px] min-h-screen bg-[#f9f8f3] flex flex-col">
        <main className="flex-1">{children}</main>
        {!noFooterPages.includes(pathname) && <Footer />}
      </div>
    </>
  );
}

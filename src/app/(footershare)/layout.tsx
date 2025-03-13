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
    "/mybirdy/settings",
    "/mybirdy/faq",
    "/mybirdy/find-birddy",
    "/mybirdy/all-birdy-types",
  ];

  const report = false;
  const limit = false;

  return (
    <>
      {report && <Report />}
      {limit && <Limit />}
      <div
        className={`box-border font-pretendard min-h-screen min-w-[375px] max-w-[476px] xs:min-h-[852px] sm:min-h-screen sm:w-full `}
      >
        <div className="flex-1 w-full justify-center">{children}</div>
        {!noFooterPages.includes(pathname) && <Footer />}
      </div>
    </>
  );
}

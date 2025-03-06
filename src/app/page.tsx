"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onboardingComplete = localStorage.getItem("onboardingComplete");

    if (!onboardingComplete) {
      console.log("✅ 온보딩이 필요함 → /onboarding 이동");
      router.push("/onboarding");
    } else {
      console.log("✅ 온보딩 완료된 사용자 → /main 이동");
      router.push("/main");
    }

    // ✅ 로딩 상태를 false로 설정하여 UI 업데이트
    setLoading(false);
  }, [router]);

  // ✅ 로딩 화면 추가하여 화면 깜빡임 방지
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-lg text-gray-500">로딩 중...</p>
      </div>
    );
  }

  return null;
}

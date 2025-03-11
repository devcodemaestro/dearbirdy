"use client";

import Logo from "@/components/Icons/common/Logo";
import KakaoLogin from "@/components/ui/KakaoLogin";
import { getKakaoLoginUrl } from "@/lib/kakaoAuth";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainPage() {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const handleLogin = () => {
    const url = getKakaoLoginUrl();
    // console.log("카카오 로그인 URL:", url);
    window.location.href = url;
  };

  useEffect(() => {
    setLoading(false);
    if (accessToken) {
      // console.log("✅ 로그인된 사용자 → 메인 페이지로 이동");
      router.push("/main");
    } else {
      // console.log("✅ 온보딩 완료된 사용자 → 메인 페이지로 이동");
    }
  }, [accessToken, router]); // ✅ accessToken 추가

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        로딩 중...
      </div>
    );

  return (
    <div className="w-full max-h-[752px] flex flex-col">
      <Logo fill="white" className="w-40 h-12 mx-auto mt-32" />
      <div className="whitespace-pre-wrap text-center text-lg text-white2 font-bold leading-[26px] tracking-[-0.072px] mt-4">
        <h2>{`편지로 연결되는 따뜻한 마음,\n인생 선후배들의 만남`}</h2>
      </div>

      {/* 로그인 링크 */}
      <div className="absolute text-center bottom-24 left-1/2 transform -translate-x-1/2 w-[315px] max-w-[315px] flex justify-center gap-2">
        <p className="text-base font-normal leading-6 tracking-tight">
          이미 디어버디 회원이신가요?
        </p>
        <button
          onClick={handleLogin}
          className="cursor-pointer select-none hover:underline text-base font-bold leading-6 tracking-tight"
        >
          로그인
        </button>
      </div>

      {/* 카카오 로그인 버튼 */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex w-[315px] max-w-[315px]">
        <KakaoLogin className="cursor-pointer" />
      </div>
    </div>
  );
}

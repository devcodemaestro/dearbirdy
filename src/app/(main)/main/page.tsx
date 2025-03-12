"use client";

import Logo from "@/components/Icons/common/Logo";
import CustomKakaoLogin from "@/components/Icons/CustomKakaoLogin";
import { getKakaoLoginUrl } from "@/lib/kakaoAuth";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainPage() {
  const router = useRouter();
  const { accessToken } = useAuthStore();

  // ✅ 로그인된 사용자는 메인 페이지로 리디렉트
  useEffect(() => {
    if (accessToken) {
      router.push("/main");
    }
  }, [accessToken, router]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-4 py-18">
      {/* 로고 & 텍스트 */}
      <div className="flex flex-col items-center gap-4">
        <Logo fill="white" className="w-40 h-12" />
        <h2 className="whitespace-break-spaces text-center text-lg text-white2 font-bold leading-[26px] tracking-[-0.072px]">
          편지로 연결되는 따뜻한 마음,{"\n"}인생 선후배들의 만남
        </h2>
      </div>

      <div className="w-[343px] h-[50px] gap-4 flex flex-col justify-center">
        {/* 로그인 링크 */}
        <div className="text-center w-full max-w-[315px] flex justify-center gap-2">
          <p className="text-base font-normal leading-6 tracking-tight">
            이미 디어버디 회원이신가요?
          </p>
          <button
            onClick={() => {
              window.location.href = getKakaoLoginUrl();
            }}
            className="cursor-pointer select-none hover:underline text-base font-bold leading-6 tracking-tight"
          >
            로그인
          </button>
        </div>

        {/* 카카오 로그인 버튼 */}
        <div className="flex justify-center w-full max-w-[343px]">
          <CustomKakaoLogin />
        </div>
      </div>
    </div>
  );
}

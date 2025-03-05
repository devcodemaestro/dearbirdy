"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAccessToken } from "@/services/authService";

const KakaoCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  console.log("✅ 현재 URL에서 code 값 확인:", code);

  useEffect(() => {
    console.log("✅ useEffect 실행됨");

    if (!code) {
      console.error("❌ 카카오 로그인 실패: code 값 없음");
      router.push("/login");
      return;
    }

    const handleKakaoLogin = async () => {
      try {
        console.log("✅ 백엔드에 code 값 전송하여 access_token 요청 시작");
        await getAccessToken(code);
        console.log("✅ 로그인 완료");

        router.push("/signup");
      } catch (error) {
        console.error("❌ 카카오 로그인 요청 실패:", error);
        router.push("/login");
      }
    };

    handleKakaoLogin();
  }, [code, router]);

  return <div>로그인 처리 중...</div>;
};

export default KakaoCallback;

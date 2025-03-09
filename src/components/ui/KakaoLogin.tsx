import React from "react";
import { getKakaoLoginUrl } from "@/lib/kakaoAuth";

export const handleKakaoLogin = () => {
  const url = getKakaoLoginUrl();
  console.log("카카오 로그인 URL:", url);
  window.location.href = url; // 카카오 로그인 페이지로 이동
};

interface KakaoLoginProps {
  className?: string;
}

const KakaoLogin: React.FC<KakaoLoginProps> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 343 51"
      fill="none"
      onClick={handleKakaoLogin} // ✅ 클릭 시 로그인 실행
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="0.931641" width="343" height="50" rx="12" fill="#FEE500" />
      <text
        x="50%"
        y="50%"
        fontSize="18"
        fill="black"
        textAnchor="middle"
        dy=".3em"
      >
        카카오 로그인
      </text>
    </svg>
  );
};

export default KakaoLogin;

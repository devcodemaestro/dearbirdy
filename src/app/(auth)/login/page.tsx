"use client";

import { getKakaoLoginUrl } from "@/lib/kakaoAuth";

export default function LoginPage() {
  const handleLogin = () => {
    window.location.href = getKakaoLoginUrl();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <button
        onClick={handleLogin}
        className="mt-6 bg-yellow-400 text-black px-4 py-2 rounded-lg"
      >
        카카오 로그인
      </button>
    </div>
  );
}

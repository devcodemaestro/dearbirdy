"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout(); // ✅ Zustand에서 accessToken 초기화
    router.push("/"); // ✅ 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
      >
        로그아웃
      </button>
    </div>
  );
}

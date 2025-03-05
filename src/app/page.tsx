"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export default function Main() {
  const { user } = useAuthStore();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">Dear Birdy</h1>
        <nav>
          {user ? (
            <span>{user.name}님 환영합니다!</span>
          ) : (
            <Link href="/login">카카오톡 회원가입</Link>
          )}
        </nav>
      </div>
    </div>
  );
}

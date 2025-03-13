"use client";

import LetterHistory from "@/components/mybirdy/letterHistory";
import ProfileSection from "@/components/mybirdy/profileSection";

export default function MyBirdy() {
  return (
    <div className="flex flex-col gap-6 w-full bg-[#292D32]">
      {/* 🐦 사용자 프로필 섹션 */}
      <ProfileSection />

      <div className="bg-[#F9F8F3] min-h-screen px-4 py-8 rounded-t-[20px] ">
        {/* 📩 편지 기록 */}
        <LetterHistory />
      </div>
    </div>
  );
}

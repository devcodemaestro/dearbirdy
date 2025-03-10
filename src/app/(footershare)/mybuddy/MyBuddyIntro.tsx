"use client";

import LetterHistory from "@/components/mybuddy/letterHistory";
import ProfileSection from "@/components/mybuddy/profileSection";
import SettingsMenu from "@/components/mybuddy/settingsMenu";

export default function MyBuddyIntro() {
  return (
    <div className="relative flex flex-col items-center text-black bg-[#292D32] min-h-screen">
      {/* 🐦 사용자 프로필 섹션 */}
      <ProfileSection />

      {/* 📩 편지 기록 */}
      <LetterHistory />

      {/* ⚙️ 설정 메뉴 */}
      <SettingsMenu />
    </div>
  );
}

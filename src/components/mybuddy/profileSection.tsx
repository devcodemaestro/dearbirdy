"use client";

import { useLetterStore } from "@/store/useLetterStore";
import Image from "next/image";

export default function ProfileSection() {
  const { myBirdName, nickname } = useLetterStore(); // ✅ 닉네임 가져오기
  const roleText = myBirdName === "MENTEE" ? "인생후배" : "인생선배";

  return (
    <>
      {/* 상단 프로필 이미지 */}
      <div className="mt-[123px]">
        <Image
          src={`/images/letter-slide/${myBirdName}_profile.png`}
          alt="프로필 이미지"
          width={184}
          height={184}
          className="rounded-full"
        />
      </div>

      {/* ✅ 닉네임 적용 */}
      <p className="text-[#F9F8F3] text-center text-[20px] font-medium leading-[28px] tracking-[-0.08px] mt-[10px]">
        {nickname}
      </p>

      {/* 새 이름 & 역할 */}
      <div className="flex gap-[6px] mt-2">
        <p className="text-[#F9F8F3] text-[16px] font-medium">{myBirdName}</p>
        <div className="bg-[#E6FFE9] text-[#26632C] text-[14px] font-medium leading-[20px] tracking-[-0.056px] px-3 py-1 rounded-[6px]">
          {roleText}
        </div>
      </div>
    </>
  );
}

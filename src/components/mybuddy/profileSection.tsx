"use client";

import { useEffect, useState } from "react";
import { getUserInfo } from "@/services/userService";
import Image from "next/image";
import { birdNameMap } from "@/constants/birdNameMap"; // ✅ 외부에서 불러오기

export default function ProfileSection() {
  const [nickname, setNickname] = useState(""); // 닉네임 상태
  const [myBirdName, setMyBirdName] = useState(""); // 새 이름 상태
  const [roleName, setRoleName] = useState("");
  const [loading, setLoading] = useState(true); // ✅ 데이터 로딩 상태 추가

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        const response = data.data;

        if (response) {
          setNickname(response.nickname ?? "익명의 사용자");
          setMyBirdName(response.birdName ?? "익명새");
          setRoleName(response.roleName ?? "익명");
        }
      } catch (error) {
        console.error("❌ 사용자 정보 불러오기 실패:", error);
      } finally {
        setLoading(false); // ✅ 데이터 로딩 완료 후 상태 변경
      }
    };

    fetchUserInfo();
  }, []);

  const roleText = roleName === "MENTEE" ? "인생후배" : "인생선배";

  // ✅ 한글 → 영문 변환 후 이미지 경로 설정
  const getImageSrc = (birdName: string) => {
    const englishName = birdNameMap[birdName] || "default";
    return `/images/letter-slide/${englishName}_profile.png`;
  };

  // ✅ 데이터 로딩 중이면 표시
  if (loading) {
    return <p className="text-center mt-20">로딩 중...</p>;
  }

  return (
    <>
      {/* 상단 프로필 이미지 */}
      <div className="mt-[123px]">
        <Image
          src={getImageSrc(myBirdName)}
          alt="프로필 이미지"
          width={184}
          height={184}
          className="rounded-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/images/letter-slide/default_profile.png";
          }} // ✅ 이미지 로드 실패 시 기본 이미지 적용
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

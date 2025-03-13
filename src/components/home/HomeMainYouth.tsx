"use client";
import React, { useState } from "react";
import HomeLetterIcon from "@/components/Icons/Home_letter_icon";
import Image from "next/image";
import SendMessage from "./SendMessage";
import SendMessageLimit from "./SendMessageLimit";
import Banner from "./Banner";
import { IUserData } from "@/app/(footershare)/home/page";
import { useRouter } from "next/navigation";
import { birdNameMap } from "@/constants/birdNameMap"; // ✅ birdName 변환 맵 추가
import LetterGuideModal from "@/components/letter/LetterGuideModal"; // ✅ 모달 컴포넌트 추가

interface IProps {
  userData?: IUserData; // ✅ 옵셔널 값으로 변경 (불러오지 못한 경우 대비)
}

const HomeMainYouth: React.FC<IProps> = ({ userData }) => {
  const router = useRouter();
  const [isGuideOpen, setIsGuideOpen] = useState(false); // ✅ 모달 상태 추가
  const serviceLimit = false;

  // ✅ birdName이 undefined일 경우 대비하여 변환
  const birdKey =
    userData?.birdName && birdNameMap[userData.birdName]
      ? birdNameMap[userData?.birdName]
      : "default";

  return (
    <>
      <main className="flex flex-col min-h-screen p-4">
        <div className="flex flex-col flex-1 gap-4">
          {/* ✅ 배너 클릭 시 모달 열기 */}
          <button onClick={() => setIsGuideOpen(true)}>
            <Banner />
          </button>

          <div className="flex flex-col items-center p-[3vh] rounded-[24px] border border-[#F0F1EC] bg-[#FFF]">
            {serviceLimit ? (
              <SendMessageLimit />
            ) : (
              <SendMessage userData={userData as IUserData} />
            )}
            <Image
              src={`/images/birds/${birdKey}_280.svg`}
              alt="홈 나의 새 프로필사진"
              width={280}
              height={226}
              className="mt-[2vh] max-h-[30vh]"
            />
            <span className="mt-[2vh] text-[#292D32] text-center font-bold text-[16px] leading-[24px] tracking-[-0.064px]">
              {userData?.nickname || "회원"}님,
            </span>
            <span className="text-[#292D32] text-center font-bold text-[18px] leading-[26px] tracking-[-0.072px]">
              오늘은 무슨 고민이 있나요?
            </span>
            <div
              className="flex w-full cursor-pointer select-none h-[50px] justify-center items-center gap-1 mt-[2vh] align-stretch rounded-lg bg-[#292D32]"
              onClick={() => router.push("/send")}
            >
              <HomeLetterIcon fill="#FFF" />
              <span className="text-center flex text-white font-pretendard text-base leading-6 tracking-[-0.064px]">
                편지쓰기
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* ✅ LetterGuideModal 추가 */}
      {isGuideOpen && (
        <LetterGuideModal
          isOpen={isGuideOpen}
          onClose={() => setIsGuideOpen(false)}
          type="letter"
        />
      )}
    </>
  );
};

export default HomeMainYouth;

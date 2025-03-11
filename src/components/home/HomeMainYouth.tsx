"use client";
import React from "react";
import HomeLetterIcon from "@/components/Icons/Home_letter_icon";
import Image from "next/image";
import SendMessage from "./SendMessage";
import SendMessageLimit from "./SendMessageLimit";
import Banner from "./Banner";
import { IUserData } from "@/app/(footershare)/home/page";
import { useRouter } from "next/navigation";
import { birdNameMap } from "@/constants/birdNameMap"; // ✅ birdName 변환 맵 추가

interface IProps {
  userData?: IUserData; // ✅ 옵셔널 값으로 변경 (불러오지 못한 경우 대비)
}

const HomeMainYouth: React.FC<IProps> = ({ userData }) => {
  const router = useRouter();
  const serviceLimit = false;
  // console.log("userData", userData);
  // ✅ birdName이 undefined일 경우 대비하여 변환
  const birdKey =
    userData?.birdName && birdNameMap[userData.birdName]
      ? birdNameMap[userData?.birdName]
      : "default";

  // console.log("유스 birdKey", birdKey);
  return (
    <main className="flex-grow mt-[8px] px-4">
      <div className="">
        <Banner />
        <div className="flex flex-col items-center mt-4 self-stretch p-[24px_16px] rounded-[24px] border border-[#F0F1EC] bg-[#FFF]">
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
            className="mt-4"
          />
          <span className="mt-6 text-[#292D32] text-center font-bold text-[16px] leading-[24px] tracking-[-0.064px]">
            {userData?.nickname || "회원"}님,
          </span>
          <span className="text-[#292D32] text-center font-bold text-[18px] leading-[26px] tracking-[-0.072px]">
            오늘은 무슨 고민이 있나요?
          </span>
          <div
            className="flex w-full cursor-pointer select-none h-[50px] justify-center items-center gap-1 mt-4 align-stretch rounded-lg bg-[#292D32]"
            onClick={() => router.push("/send")}
          >
            <HomeLetterIcon fill="#FFF" />
            <span className="text-center text-white font-pretendard text-base leading-6 tracking-[-0.064px]">
              편지쓰기
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeMainYouth;

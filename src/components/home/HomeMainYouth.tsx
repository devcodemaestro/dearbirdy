import React from "react";
import HomeLetterIcon from "@/components/Icons/Home_letter_icon";
import Image from "next/image";
import SendMessage from "./SendMessage";
import SendMessageLimit from "./SendMessageLimit";
import Banner from "./Banner";

const HomeMainYouth: React.FC = () => {
  const serviceLimit = true;
  return (
    <main className="flex-grow mt-[8px] px-4">
      <div className="">
        <Banner />
        <div className="flex flex-col items-center mt-4 self-stretch p-[24px_16px] rounded-[24px] border border-[#F0F1EC] bg-[#FFF]">
          {serviceLimit ? <SendMessageLimit /> : <SendMessage />}
          <Image
            src="/images/birds/hummingbird_280.svg"
            alt="홈 나의 새 프로필사진"
            width={280}
            height={226}
            className="mt-4"
          />
          <span className="mt-6 text-[#292D32] text-center font-bold text-[16px] leading-[24px] tracking-[-0.064px]">
            웃기는햄칠이약을먹자님,
          </span>
          <span className="text-[#292D32] text-center font-bold text-[18px] leading-[26px] tracking-[-0.072px]">
            오늘은 무슨 고민이 있나요?
          </span>
          <div className="flex w-full h-[50px] justify-center items-center  gap-1 mt-4 align-stretch rounded-lg bg-[#292D32]">
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

import React from "react";
import HomeLetterIcon from "@/components/Icons/Home_letter_icon";
import Image from "next/image";

const HomeMainYouth: React.FC = () => {
  return (
    <main className="flex-grow mt-[8px]">
      <div className="">
        <div className="relative flex px-4 justify-between items-center content-center rounded-[12px] opacity-[0.99] bg-white overflow-hidden">
          <div className="absolute left-[16px] bottom-[-26px] w-[261px] h-[34px] rounded-full bg-[#FFD85BB2] bg-opacity-70 blur-[37px]"></div>
          <div className="flex flex-col">
            <span className="text-[#CAB29A] text-[12px] leading-[16px] font-normal">
              편지 보내기 전 읽어봐요
            </span>
            <span className="text-[#292D32] font-bold text-[16px] leading-[24px]">
              답답한 마음을 어떻게
            </span>
            <span className="text-[#292D32] font-bold text-[16px] leading-[24px]">
              풀어내야할지 막막할 때는
            </span>
          </div>
          <Image
            src="/images/birds/home_birds.svg"
            alt="홈 새두마리"
            width={126}
            height={92}
          />
        </div>
        <div className="flex flex-col items-center mt-4 self-stretch p-[24px_16px] rounded-[24px] border border-[#F0F1EC] bg-[#FFF]">
          <div className="flex justify-end w-full">
            <div className="flex justify-start items-center gap-[2px] p-[4px_8px_4px_6px] w-[82px] h-[32px] rounded-[8px] bg-[#D6E173]">
              <HomeLetterIcon fill="#292D32" />
              <span className="text-[#292D32] text-center font-bold text-[12px] leading-[16px] tracking-[-0.048px]">
                🚩data
              </span>
            </div>
          </div>
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

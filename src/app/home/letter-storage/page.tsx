"use client";

import HomeLetterIcon from "@/components/Icons/Home_letter_icon";
import Image from "next/image";
import React, { useState } from "react";

const LetterStorage: React.FC = () => {
  const category = ["전체", "답장 기다리는 편지", "저장한 편지"];
  const images = [
    "hummingbird",
    "canary",
    "parrot",
    "owl",
    "bluebird",
    "crowtit",
  ];
  const text1 = [
    "편지를 250자 이상 쓰면",
    "마음을 글로 표현하는 습관은",
    "조언하는 과정에서 나도 새로운",
    "나의 시행착오가 누군가의",
    "세대를 넘어선 따뜻한 대화로",
    "우울한 감정을 이야기만 해도",
  ];
  const text2 = [
    "정성스러운 답장을 받을 수 있대요!",
    "자기 이해의 시작이에요.",
    "깨달음을 얻을 수 있어요.",
    "좋은 길잡이가 될 수 있어요.",
    "서로 힘이 될 수 있어요.",
    "감정이 해소되는 연구 결과가 있어요.",
  ];

  const [cateNum, setCateNum] = useState<number>(1);

  // 랜덤으로 이미지 하나 선택
  const randomNum = Math.floor(Math.random() * images.length);

  const categoryClicked = (idx: number) => {
    console.log(idx);

    setCateNum(idx);
  };
  return (
    <div className="px-4 ">
      <header className="flex gap-1 py-[11px] items-center mt-[59px] ">
        {category.map((title, idx) => (
          <span
            key={idx}
            onClick={() => categoryClicked(idx + 1)}
            className={`px-3.5 py-1.5 rounded-[20px] min-w-[53px] text-center ${
              cateNum === idx + 1
                ? "bg-[#292D32] text-[#FFF]"
                : "bg-[#F9F8F3] border border-[#E5E5EA] text-[#C7C7CC]"
            }`}
          >
            {title}
          </span>
        ))}
      </header>

      <main className="flex flex-grow">
        <div className="flex flex-col items-center w-full rounded-[30px] border border-[#F4F5EF] bg-white px-4">
          <p className="text-[#292D32] text-center font-medium text-[16px] leading-[24px] tracking-[-0.064px] mt-[32px]">
            편지를 써보세요
          </p>
          <p className="text-[#292D32] text-center font-bold text-[18px] leading-[26px] tracking-[-0.072px] mt-2">
            나의 현재 고민을 편지에 쓰고 <br />
            버디에게 보내볼까요?
          </p>

          <Image
            src="/images/birds/letter_storage_bird.svg"
            alt="편지보관함 새 이미지"
            width={300}
            height={260}
            className="mt-8"
          />

          <div className="flex w-full h-[50px] justify-center items-center  gap-1 rounded-[12px] bg-[#292D32] mt-8 mb-6">
            <HomeLetterIcon fill="#FFF" />
            <span className="text-center text-white font-pretendard text-base leading-6 tracking-[-0.064px]">
              편지쓰기
            </span>
          </div>
        </div>
      </main>

      <div className="flex flex-col p-[20px_24px] justify-center items-start rounded-[16px] bg-[#FFF] mt-4 px-6 py-5">
        <div className="flex items-center w-full gap-4">
          <Image
            src={`/images/birds/${images[randomNum]}_tip.svg`}
            alt="버디팁 새 프로필"
            width={61}
            height={60}
            className="w-[68px] h-[68px]"
          />
          <div>
            <span className="text-[#6B7178] text-[12px] leading-[16px] tracking-[-0.048px]">
              버디팁
            </span>
            <p className="text-[#292D32] text-[14px] leading-[20px] tracking-[-0.056px] font-bold font-pretendard">
              {text1[randomNum]}
              <br />
              {text2[randomNum]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterStorage;

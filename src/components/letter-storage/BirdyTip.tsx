"use client";
import Image from "next/image";
import React from "react";

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

const BirdyTip: React.FC = () => {
  // 랜덤으로 이미지 하나 선택
  const randomNum = Math.floor(Math.random() * images.length);

  return (
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
  );
};

export default BirdyTip;

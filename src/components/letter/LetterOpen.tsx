"use client";
import { useLetterInfoStore } from "@/store/letterInfoStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const LetterOpen: React.FC = () => {
  const router = useRouter();
  const { letterStatusSeq, nickname, birdName } = useLetterInfoStore();

  return (
    <div className="w-full min-h-screen bg-[#f9f8f3] flex flex-col px-4">
      <header className="w-full h-[56px] mt-[59px] flex justify-between items-center">
        <Image
          src="/images/icons/arrow_left_icon.svg"
          alt="왼쪽 방향 아이콘"
          width={24}
          height={24}
          className=""
          onClick={() => router.back()}
        />
      </header>

      <main className="flex flex-col items-center justify-cente ">
        <div className="mt-[63px]">
          <p className="text-[#292D32] text-center font-bold text-2xl leading-7 tracking[-0.08px]">
            진심어린 답장을 기다리는
            <br />
            편지가 도착했어요
          </p>
        </div>
        <div className="relative w-full h-[388px] flex justify-center items-center mt-[25px]">
          <Image
            src="/images/letter/letter_back.svg"
            alt="편지지 뒤쪽"
            width={319}
            height={241}
            className="absolute bottom-0"
          />
          <Image
            src="/images/letter/letter_front.svg"
            alt="편지지 앞쪽"
            width={309}
            height={191}
            className="absolute bottom-0"
          />
          <div className="absolute bottom-[36px] flex items-center justify-center gap-1 ">
            <Image
              src={`/images/birds/${birdName}_40.svg`}
              alt="프로필 새 40"
              width={40}
              height={40}
            />
            <span>from, {nickname}</span>
          </div>
          <div
            className="flex justify-center w-[277px] h-[340px] rounded-[30px] border border-[#F0F1EC] bg-white"
            onClick={() => router.push(`/letter-detail/${letterStatusSeq}`)}
          >
            <p className="text-[#292D32] text-center font-bold text-base leading-6 tracking[-0.064px] mt-[70px]">
              어떤 이야기가 담겨있는지
              <br />
              편지를 열어볼까요?
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LetterOpen;

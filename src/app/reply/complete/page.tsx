"use client";
import Image from "next/image";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const LetterReplyCompletePage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-[#f9f8f3] flex flex-col px-4">
      <main className="flex flex-col justify-center items-center mt-[167px]">
        <div>
          <p className="text-[#292D32] text-center text-[20px] font-bold leading-[28px] tracking-[-0.08px]">
            버디가 후배버디에게
            <br />
            마음을 정성껏 전달할 거에요
          </p>
        </div>
        {/* 애니메이션 */}
        {/* <div className="mt-[117px]">
        {animationData && (
          <Lottie
            animationData={animationData}
            style={{ width: 216, height: 167 }}
          />
        )}
      </div> */}
        <div className="rounded-[12px] border border-[#E5E5EA] bg-[#F0F1EC] flex w-[343px] p-[10px_16px] justify-between items-center mt-[154px]">
          <div className="flex flex-col items-start justify-start">
            <p className="text-[#6B7178] text-center text-[14px] font-normal leading-[22px] tracking-[-0.056px]">
              답장을 확인하면 고마움 표시가 도착해요.
            </p>
            <p className="text-[#6B7178] text-center  text-[14px] font-normal leading-[22px] tracking-[-0.056px]">
              고마움 표시가 오면 알림을 받을까요?
            </p>
          </div>
          <Image
            src="/images/icons/toggle_off_icon.svg"
            alt="토글 off 아이콘"
            width={60}
            height={30}
            className=""
          />
        </div>
        <div
          className="w-[343px] p-[13px_16px] flex justify-center items-center gap-[8px] rounded-[8px] bg-[#292D32] mt-[17px]"
          onClick={() => router.push("/home")}
        >
          <span className="text-[#E5E5EA] text-center text-[16px] font-medium leading-[24px] tracking-[-0.064px]">
            홈으로
          </span>
        </div>
      </main>
    </div>
  );
};

export default LetterReplyCompletePage;

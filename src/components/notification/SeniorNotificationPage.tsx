import Image from "next/image";
import React from "react";

const SeniorNotificationPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-2">
      <div className="flex w-screen h-[40px] px-4 py-2 bg-[#F4F5EF]">
        <span className="text-[#6B7178] text-[16px] font-medium leading-[24px] tracking-[-0.064px]">
          읽지 않음
        </span>
      </div>
      {/* 읽지 않은 알림 */}
      <div className="flex w-screen px-4 py-2.5  border-b border-[#F0F1EC] bg-[#F3F0EA]">
        <div className="flex items-start min-w-[40px]">
          <Image
            src={`/images/birds/벌새_40.svg`}
            alt="알림함 보낸 새 프로필 40"
            width={40}
            height={40}
          />
        </div>
        <div className="ml-4">
          <div className="flex items-center justify-between h-6">
            <p className="text-[#6B7178] text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
              고마움 표시를 받았어요
            </p>
            <Image
              src="/images/icons/reddot_icon.svg"
              alt="빨간점 아이콘"
              width={24}
              height={24}
              className=""
            />
          </div>
          <p className="text-[#292D32] text-[14px] font-normal leading-[22px] tracking-[-0.056px]">
            <span className="font-bold leading-[20px] ">
              오늘밤주인공은벌새님
            </span>
            으로부터 나의 답장에 대한 고마움 표시가 도착했어요.
          </p>
          <span className="text-[#6B7178] text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
            3월 6일
          </span>
        </div>
      </div>

      <div className="flex w-screen h-10 px-4 py-2.5 bg-[#F4F5EF]">
        <span className="text-[#6B7178] text-[16px] font-medium leading-[24px] tracking-[-0.064px]">
          이전 알림
        </span>
      </div>
      {/* 이전 알림 */}
      <div className="flex w-screen px-4 py-2.5 border-b border-[#F0F1EC]">
        <div className="flex items-start min-w-[40px]">
          <Image
            src="/images/birds/파랑새_40.svg"
            alt="알림함 보낸 새 프로필 40"
            width={40}
            height={40}
          />
        </div>
        <div className="ml-4">
          <p className="text-[#6B7178] text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
            편지가 도착했어요
          </p>
          <p className="text-[#292D32] text-[14px] font-normal leading-[22px] tracking-[-0.056px]">
            <span className="font-bold leading-[20px] ">
              햄스터가만든수제비님
            </span>
            으로부터 날아온 편지를 확인 해보세요 가볼까요?
          </p>
          <span className="text-[#6B7178] text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
            3월 6일
          </span>
        </div>
      </div>
    </div>
  );
};

export default SeniorNotificationPage;

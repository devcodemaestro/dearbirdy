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
      <div className="relative flex w-screen h-[90px] px-4 py-2.5 items-center border-b border-[#F0F1EC] bg-[#F3F0EA]">
        <Image
          src="/images/birds/owl_40.svg"
          alt="알림함 보낸 새 프로필 40"
          width={40}
          height={40}
        />
        <div className="ml-4">
          <Image
            src="/images/icons/reddot_icon.svg"
            alt="빨간점 아이콘"
            width={24}
            height={24}
            className="absolute top-0 right-0"
          />
          <p className="text-[#6B7178] font-pretendard text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
            고마움 표시를 받았어요
          </p>
          <p className="text-[#292D32] font-pretendard text-[14px] font-normal leading-[22px] tracking-[-0.056px]">
            <span className="font-bold leading-[20px] ">
              오늘밤주인공은 올빼미님
            </span>
            으로부터 나의 답장에 대한 고마움 표시가 도착했어요.
          </p>
        </div>
      </div>
      <div className="flex w-screen h-10 px-4 py-2.5 bg-[#F4F5EF]">
        <span className="text-[#6B7178] text-[16px] font-medium leading-[24px] tracking-[-0.064px]">
          최근 일주일
        </span>
      </div>
      {/* 최근 일주일 알림 */}
      <div className="flex w-screen h-[90px] px-4 py-2.5 items-center border-b border-[#F0F1EC]">
        <Image
          src="/images/birds/owl_40.svg"
          alt="알림함 보낸 새 프로필 40"
          width={40}
          height={40}
        />
        <div className="ml-4">
          <p className="text-[#6B7178] font-pretendard text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
            편지가 도착했어요
          </p>
          <p className="text-[#292D32] font-pretendard text-[14px] font-normal leading-[22px] tracking-[-0.056px]">
            <span className="font-bold leading-[20px] ">
              오늘밤주인공은 올빼미님
            </span>
            외 N명으로부터 날아온 편지를 확인해보세요
          </p>
        </div>
      </div>
      <div className="flex w-screen h-10 px-4 py-2.5 bg-[#F4F5EF]">
        <span className="text-[#6B7178] text-[16px] font-medium leading-[24px] tracking-[-0.064px]">
          이전 알림
        </span>
      </div>
      {/* 이전 알림 */}
      <div className="flex w-screen h-[90px] px-4 py-2.5 items-center border-b border-[#F0F1EC]">
        <Image
          src="/images/birds/owl_40.svg"
          alt="알림함 보낸 새 프로필 40"
          width={40}
          height={40}
        />
        <div className="ml-4">
          <p className="text-[#6B7178] font-pretendard text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
            편지가 도착했어요
          </p>
          <p className="text-[#292D32] font-pretendard text-[14px] font-normal leading-[22px] tracking-[-0.056px]">
            <span className="font-bold leading-[20px] ">
              오늘밤주인공은 올빼미님
            </span>
            외 N명으로부터 날아온 편지를 확인해보세요
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeniorNotificationPage;

import Image from "next/image";
import React from "react";

const NotificationBox: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f9f8f3] flex flex-col px-4">
      <header className="relative w-full h-[56px] mt-[59px] flex justify-center items-center">
        <Image
          src="/images/icons/arrow_left_icon.svg"
          alt="왼쪽 방향 아이콘"
          width={24}
          height={24}
          className="absolute left-0"
        />
        <span className="text-[#292D32] text-[16px] font-bold leading-[24px] tracking-[-0.064px]">
          알림함
        </span>
      </header>
      <main className="flex flex-col justify-center items-center">
        <Image
          src="/images/icons/notification_bell_icon.svg"
          alt="알림함 종 아이콘"
          width={70}
          height={70}
          className="mt-[54px]"
        />
        <span className="text-[#000] text-[14px] font-normal leading-[22px] tracking-[-0.056px] mt-4">
          새로운 알림이 없어요
        </span>
      </main>
    </div>
  );
};

export default NotificationBox;

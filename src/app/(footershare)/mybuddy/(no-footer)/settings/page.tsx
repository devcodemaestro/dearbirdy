"use client";

import NextArrow from "@/components/common/NextArrow";
import MybuddyHeader from "@/components/ui/MybuddyHeader";
import React, { useState } from "react";

const SettingsPage = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="p-6  min-h-screen">
      {/* 상단 네비게이션 */}
      <div className="text-lg font-medium text-gray-700 pb-4">
        <MybuddyHeader title="설정" />
      </div>

      {/* 알림 영역 */}
      <div className="w-full h-10 px-4 py-2 bg-[#F4F5EF]">
        <span className="text-[#6B7178] text-[16px] font-medium leading-6 tracking-[-0.064px]">
          알림
        </span>
      </div>

      <div className="w-full h-16 flex justify-between items-center px-4 mt-4">
        <span className="text-gray-700 text-[16px] font-medium">
          편지 알림 받기
        </span>
        <div
          className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-all ${
            isToggled ? "bg-[#292d32]" : "bg-[#D1D1D6]"
          }`}
          onClick={() => setIsToggled(!isToggled)}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all ${
              isToggled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      </div>

      <div className="w-[342px] h-[74px] p-4 bg-[#F4F5EF] mt-3 border rounded-[10px]">
        <span className="block text-gray-600 text-sm">알림 받을 이메일</span>
        <span className="block text-gray-900 text-md font-medium mt-1">
          example@email.com
        </span>
      </div>

      {/* 계정 영역 */}
      <div className="w-full h-10 px-4 py-2 bg-[#F4F5EF] mt-4">
        <span className="text-[#6B7178] text-[16px] font-medium leading-6 tracking-[-0.064px]">
          계정
        </span>
      </div>

      <div className="w-[342px] h-[24px] flex justify-between items-center px-4 mt-4">
        <span className="text-gray-700 text-[16px] font-medium">
          내 정보 수정
        </span>
        <NextArrow />
      </div>

      {/* 운영 영역 */}
      <div className="w-full h-10 px-4 py-2 bg-[#F4F5EF] mt-5">
        <span className="text-[#6B7178] text-[16px] font-medium leading-6 tracking-[-0.064px]">
          운영
        </span>
      </div>

      <div className="w-[342px] h-[24px] flex justify-between items-center px-4 mt-4">
        <span className="text-gray-700 text-[16px] font-medium">
          개인정보 처리방침
        </span>
        <NextArrow url="https://important-pansy-82d.notion.site/Dearbirdy-1a01b9cea31e8070b6f5ec4c08fe0485?pvs=74"></NextArrow>
      </div>

      <div className="w-[342px] h-[24px] flex justify-between items-center px-4 mt-4">
        <span className="text-gray-700 text-[16px] font-medium">
          서비스 이용안내
        </span>
        <NextArrow url="https://important-pansy-82d.notion.site/DearBirdy-1a01b9cea31e80209dcef7dd4a75f23f" />
      </div>

      <div className="w-[342px] h-[24px] flex justify-between items-center px-4 mt-4">
        <span className="text-gray-700 text-[16px] font-medium">
          피드백 보기
        </span>
        <NextArrow url="#" />
      </div>
    </div>
  );
};

export default SettingsPage;

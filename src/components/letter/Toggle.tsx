"use client";

import { useLetterStore } from "@/store/useLetterStore";

export default function Toggle() {
  const { isNotificationOn, toggleNotification } = useLetterStore();

  return (
    <div
      className={`w-[60px] h-[30px] rounded-[12px] border border-[#E5E5EA] ${
        isNotificationOn ? "bg-[#8DC3DB]" : "bg-[#F0F1EC]"
      } flex items-center px-1 cursor-pointer transition-all duration-300`}
      onClick={toggleNotification}
    >
      <div
        className={`w-[26px] h-[26px] bg-white rounded-full shadow-md transition-transform duration-300 ${
          isNotificationOn ? "translate-x-[30px]" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
}

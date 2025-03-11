"use client";

import { getLetterHistory } from "@/services/userService";
import { useEffect, useState } from "react";

export default function LetterHistory() {
  const [sendLetter, setSendLetter] = useState(0);
  const [replyLetter, setReplyLetter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("🚀 API 호출 시작");
        const response = await getLetterHistory();
        // console.log("✅ API 응답 데이터:", response);

        if (response) {
          setSendLetter(response.data.sendLetter ?? 0);
          setReplyLetter(response.data.replyLetter ?? 0);
          // console.log("✅ 상태 업데이트 요청됨");
        }
      } catch (error) {
        console.error("❌ API 호출 중 오류 발생:", error);
      }
    };
    // console.log("🎯 변경된 값 - 보낸 편지:", sendLetter);
    // console.log("🎯 변경된 값 - 받은 편지:", replyLetter);
    fetchData();
  }, [sendLetter, replyLetter]);

  return (
    <div>
      <div>
        <p className="text-[#292D32] text-[16px] font-medium leading-[24px] tracking-[-0.064px]">
          나의 편지 기록
        </p>
        <div className="flex justify-center items-center mt-4">
          <div className="flex flex-col items-center px-[20px] py-[5px]">
            <span className="text-[#6B7178] text-[14px]">보낸 편지</span>
            <span className="text-[#6B7178] text-[16px] font-bold mt-[8px]">
              {sendLetter}
            </span>
          </div>
          <div className="w-[1px] h-[64px] bg-[#E5E5EA] mx-[20px]"></div>
          <div className="flex flex-col items-center px-[20px] py-[5px]">
            <span className="text-[#6B7178] text-[14px]">받은 편지</span>
            <span className="text-[#6B7178] text-[16px] font-bold mt-[6px]">
              {replyLetter}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

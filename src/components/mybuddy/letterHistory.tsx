"use client";

export default function LetterHistory() {
  return (
    <div className="w-[375px] bg-[#F9F8F3] rounded-t-[20px] px-[16px] pt-[32px] pb-[24px] mt-[25px] flex flex-col gap-[24px]">
      {/* 편지 기록 */}
      <div>
        <p className="text-[#292D32] text-[16px] font-medium leading-[24px] tracking-[-0.064px]">
          나의 편지 기록
        </p>
        <div className="flex justify-center items-center mt-4">
          <div className="flex flex-col items-center px-[20px] py-[5px]">
            <span className="text-[#6B7178] text-[14px]">보낸 편지</span>
            <span className="text-[#6B7178] text-[16px] font-bold mt-[8px]">
              0
            </span>
          </div>
          <div className="w-[1px] h-[64px] bg-[#E5E5EA] mx-[20px]"></div>
          <div className="flex flex-col items-center px-[20px] py-[5px]">
            <span className="text-[#6B7178] text-[14px]">받은 편지</span>
            <span className="text-[#6B7178] text-[16px] font-bold mt-[8px]">
              0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

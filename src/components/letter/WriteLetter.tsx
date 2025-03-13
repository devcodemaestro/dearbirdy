"use client";

import LeftArrow from "@/components/Icons/common/LeftArrow";
import { useLetterStore } from "@/store/useLetterStore";
import { useState, useRef } from "react";
import LetterGuideModal from "./LetterGuideModal";
import LetterProgress from "./LetterProgress";

export default function WriteLetter() {
  const { categoryName, title, setTitle, letter, setLetter, setStep } =
    useLetterStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // ✅ 스크롤을 따라가기 위한 ref 추가
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  // ✅ 공백을 제외한 최소 1자 이상의 제목 & 최소 30자 이상의 내용 필요
  const isNextEnabled = title.trim().length > 0 && letter.trim().length >= 30;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLetter(e.target.value.slice(0, 300));

    // ✅ 높이 자동 조정
    const target = e.target;
    target.style.height = "auto"; // 초기화 후 다시 설정
    target.style.height = `${Math.min(target.scrollHeight, 200)}px`; // 최대 높이 제한 (200px)
  };

  return (
    <div className="relative w-full h-full text-black flex flex-col items-around gap-2">
      <div>
        <nav className="flex justify-between py-4 border-b border-[#F0F1EC]">
          <LeftArrow
            className="w-6 h-6 cursor-pointer"
            stroke="#292D32"
            onClick={() => setStep(1)}
          />
          <button
            className={`w-[57px] h-[40px] cursor-pointer select-none text-sm font-medium rounded-[10px] transition-all duration-200 ${
              isNextEnabled
                ? "bg-[#84A667] text-[#F0F1EC]"
                : "bg-[#D1D1D6] text-[#8E8E93]"
            }`}
            disabled={!isNextEnabled} // ✅ 조건 반영
            onClick={() => setStep(3)}
          >
            다음
          </button>
        </nav>
      </div>
      <div>
        <div className="flex flex-col gap-1.5">
          <p className="whitespace-break-spaces text-xl font-bold leading-7 tracking-tight">
            {categoryName
              ? `${categoryName}에 대한 고민\n이야기를 편지에 담아주세요`
              : "어떤 이야기를 나누고 싶으신가요?"}
          </p>
          <div>
            <button
              className=" text-[#84A667] underline inline cursor-pointer text-sm"
              onClick={() => setIsDrawerOpen(true)}
            >
              편지 이렇게 써보세요
            </button>
          </div>
        </div>

        <input
          ref={inputRef}
          type="text"
          className="w-full h-[24px] py-[20px] text-[#292D32] placeholder-[#C7C7CC] mt-4 focus:outline-none focus:border-b-[#C7C7CC] caret-[#D6E173]"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={handleInputChange}
        />
        <div className="-mx-4 border-b border-[#E5E5EA] "></div>
        <textarea
          ref={textAreaRef}
          className="w-full min-h-[392px] max-h-[200px] text-[#292D32] placeholder-[#C7C7CC]  mt-4 
             focus:outline-none focus:border-b-[#C7C7CC] caret-[#D6E173] overflow-y-auto resize-none"
          placeholder="편지를 작성해주세요"
          value={letter}
          maxLength={300}
          onChange={handleTextareaChange}
        />

        {/* 프로그레스바 컴포넌트 적용 */}
        <LetterProgress letterLength={letter.trim().length} />

        {/* 편지 가이드 모달 컴포넌트 적용 */}
        <div className="relative flex justify-center">
          <LetterGuideModal
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            type="letter"
          />
        </div>
      </div>
    </div>
  );
}

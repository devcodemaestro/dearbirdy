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

  const isNextEnabled = title.length > 0 && letter.length > 0;

  // ✅ 입력할 때 스크롤이 자동으로 따라가도록 설정
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLetter(e.target.value.slice(0, 300));
    textAreaRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="relative text-black">
      <nav className="mt-[58px] w-[343px] flex justify-between py-4">
        <LeftArrow
          className="w-6 h-6 cursor-pointer"
          stroke="#292D32"
          onClick={() => setStep(1)}
        />
        <button
          className={`w-[57px] h-[40px] text-sm font-medium rounded-[10px] transition-all duration-200 ${
            isNextEnabled
              ? "bg-[#84A667] text-[#F0F1EC]"
              : "bg-[#D1D1D6] text-[#8E8E93]"
          }`}
          disabled={!isNextEnabled}
          onClick={() => setStep(3)}
        >
          다음
        </button>
      </nav>
      <div className="mt-2">
        <p className="whitespace-break-spaces text-xl font-bold leading-7 tracking-tight">
          {categoryName
            ? `${categoryName}에 대한 고민\n이야기를 편지에 담아주세요`
            : "어떤 이야기를 나누고 싶으신가요?"}
        </p>
        <p
          className="mt-1.5 text-[#84A667] underline cursor-pointer text-sm"
          onClick={() => setIsDrawerOpen(true)}
        >
          편지 이렇게 써보세요
        </p>
      </div>
      <input
        ref={inputRef} // ✅ input에 ref 적용
        type="text"
        className="w-[352px] h-[24px] px-[16px] py-[20px] text-[#292D32] placeholder-[#C7C7CC] border-b border-[#C7C7CC] mt-4 focus:outline-none focus:border-b-[#C7C7CC] caret-[#D6E173]"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={handleInputChange} // ✅ 입력 시 스크롤 이동
      />
      <textarea
        ref={textAreaRef} // ✅ textarea에 ref 적용
        className="w-[335px] h-[360px] px-[16px] text-[#292D32] placeholder-[#C7C7CC] border-b border-[#C7C7CC] mt-4 focus:outline-none focus:border-b-[#C7C7CC] caret-[#D6E173] overflow-hidden"
        placeholder="편지를 작성해주세요"
        value={letter}
        maxLength={300}
        onChange={handleTextareaChange} // ✅ 입력 시 스크롤 이동
      />

      {/* 프로그레스바 컴포넌트 적용 */}
      <LetterProgress letterLength={letter.length} />

      {/* 편지 가이드 모달 컴포넌트 적용 */}
      <LetterGuideModal
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        type="letter"
      />
    </div>
  );
}

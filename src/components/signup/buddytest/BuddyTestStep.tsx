"use client";

import { questions } from "@/constants/buddyTestQuestions";
import { useEffect, useState } from "react";

interface BuddyTestStepProps {
  step: number;
  onAnswer: (answer: number) => void;
}

const BuddyTestStep = ({ step, onAnswer }: BuddyTestStepProps) => {
  const question = questions[step - 1];
  const [selected, setSelected] = useState<number | null>(null);

  // 단계가 변경될 때마다 선택 상태를 리셋
  useEffect(() => {
    setSelected(null);
  }, [step]);

  const handleSelect = (answer: number) => {
    setSelected(answer);

    // 선택 후 짧은 딜레이 후에 다음 질문으로 이동
    setTimeout(() => {
      onAnswer(answer);
    }, 300);
  };

  return (
    <div className="p-4">
      {/* 프로그레스 바 */}
      <div className="w-full bg-[#E5E5EA] h-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#84A667] transition-all duration-300"
          style={{ width: `${(step / 12) * 100}%` }}
        />
      </div>

      {/* 단계 표시 */}
      <div className="flex justify-between mt-2 mb-6">
        <span className="text-xs text-[#6B7178]">질문 {step}/12</span>
        <span className="text-xs text-[#6B7178]">
          {Math.round((step / 12) * 100)}%
        </span>
      </div>

      {/* 질문 */}
      <p className="text-lg font-medium text-center mt-8 mb-12">
        {question.text}
      </p>

      {/* 답변 선택 */}
      <div className="flex flex-col gap-4 mt-12">
        {question.options.map((option) => (
          <button
            key={option.value}
            className={`flex items-center w-full h-[80px] px-4 py-5 rounded-[20px] border transition-all ${
              selected === option.value
                ? "bg-[#84A667] text-white border-[#84A667]"
                : "border-[#F4F5EF] bg-white hover:border-[#84A667]"
            }`}
            onClick={() => handleSelect(option.value)}
          >
            <div className="flex items-center">
              <span className="text-xl mr-2">{option.emoji}</span>
              <span className="text-base font-medium">{option.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BuddyTestStep;

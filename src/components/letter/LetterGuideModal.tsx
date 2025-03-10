"use client";

import Image from "next/image";
import { GuideType, LETTER_GUIDES } from "@/constants/letterGuide";

interface LetterGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: GuideType;
}

export default function LetterGuideModal({
  isOpen,
  onClose,
  type,
}: LetterGuideModalProps) {
  if (!isOpen) return null;

  const guide = LETTER_GUIDES[type];

  return (
    <div
      className={`fixed bottom-0 left-0 w-full h-[372px] bg-white shadow-lg px-4 rounded-t-[30px] transition-transform duration-500 ${
        isOpen ? "animate-slide-up" : "translate-y-full opacity-0"
      }`}
    >
      <button
        className="cursor-pointer absolute top-4 right-4 w-[24px] h-[24px]"
        onClick={onClose}
      >
        ✖
      </button>
      <div className="text-center mx-auto justify-center items-center bg-white rounded-lg mt-[64px]">
        <div>
          <Image
            src="/images/common/guide.png"
            alt="가이드"
            className="mx-auto"
            width={60}
            height={60}
          />
        </div>
        <div>
          <p className="text-lg font-semibold">{guide.title}</p>
          <p className="text-[#6B7178] text-sm font-normal leading-5 tracking-[-0.056px]">
            {guide.subtitle}
          </p>
        </div>
      </div>
      <div className="mt-4 bg-gray-100 rounded-lg p-4">
        <p className="text-[#6B7178] font-medium">{guide.guideTitle}</p>
        <p className="text-[#292D32] text-sm mt-2 leading-relaxed">
          {guide.tips.map((tip, index) => (
            <span key={index}>
              - {tip}
              <br />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

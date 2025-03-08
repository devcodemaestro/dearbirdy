"use client";

import React from "react";

interface NextButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({
  text,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer rounded-xl text-white text-base leading-6 tracking-tight font-medium h-12 w-[342px] ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-[#292d32]"
      }`}
    >
      {text}
    </button>
  );
};

export default NextButton;

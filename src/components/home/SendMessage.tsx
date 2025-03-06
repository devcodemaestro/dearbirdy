import React from "react";
import HomeLetterIcon from "../Icons/Home_letter_icon";

const SendMessage: React.FC = () => {
  return (
    <div className="flex justify-end w-full">
      <div className="flex justify-start items-center gap-[2px] p-[4px_8px_4px_6px] w-[82px] h-[32px] rounded-[8px] bg-[#D6E173]">
        <HomeLetterIcon fill="#292D32" />
        <span className="text-[#292D32] text-center font-bold text-[12px] leading-[16px] tracking-[-0.048px]">
          🚩data
        </span>
      </div>
    </div>
  );
};

export default SendMessage;

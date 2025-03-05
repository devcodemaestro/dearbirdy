import Image from "next/image";
import React from "react";

const Banner: React.FC = () => {
  return (
    <div className="relative flex px-4 justify-between items-center content-center rounded-[12px] opacity-[0.99] bg-white overflow-hidden">
      <div className="absolute left-[16px] bottom-[-26px] w-[261px] h-[34px] rounded-full bg-[#FFD85BB2] bg-opacity-70 blur-[37px]"></div>
      <div className="flex flex-col">
        <span className="text-[#CAB29A] text-[12px] leading-[16px] font-normal">
          편지 보내기 전 읽어봐요
        </span>
        <span className="text-[#292D32] font-bold text-[16px] leading-[24px]">
          답답한 마음을 어떻게
        </span>
        <span className="text-[#292D32] font-bold text-[16px] leading-[24px]">
          풀어내야할지 막막할 때는
        </span>
      </div>
      <Image
        src="/images/birds/home_birds.svg"
        alt="홈 새두마리"
        width={126}
        height={92}
      />
    </div>
  );
};

export default Banner;

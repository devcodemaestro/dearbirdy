import React from "react";
import LeftArrow from "../Icons/common/LeftArrow";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
}

const MybirdyHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const router = useRouter();

  return (
    <div className="mt-14 flex items-center relative">
      <LeftArrow
        onClick={() => router.back()}
        className="w-6 h-6 absolute cursor-pointer"
        stroke="#292D32"
      />
      <p className="text-base font-bold m-4 leading-6 tracking-[-0.064px] w-full text-center">
        {title}
      </p>
    </div>
  );
};

export default MybirdyHeader;

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import NextButton from "@/components/common/NextButton";
import { getBirdData } from "@/services/buddyService";
import { birdStyleMap, defaultBirdStyle } from "@/constants/birdStyles"; // 🔥 스타일 맵 가져오기

interface BuddyResultCardProps {
  birdType: string;
}

interface BirdData {
  birdName: string;
  traits: string;
  explanation: string;
}

const BuddyResultCard = ({ birdType }: BuddyResultCardProps) => {
  const router = useRouter();
  const [birdData, setBirdData] = useState<BirdData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBirdData = async () => {
      setLoading(true);
      const data = await getBirdData(birdType);
      setBirdData(data);
      setLoading(false);
    };

    loadBirdData();
  }, [birdType]);

  const handleGoHome = () => {
    router.push("/home");
  };

  // 버디 타입별 스타일 가져오기
  const birdStyle = birdStyleMap[birdData?.birdName || ""] || defaultBirdStyle;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-t-[#84A667] border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* 결과 카드 */}
      <div className="w-[343px] bg-[#F9F8F3] rounded-[30px] shadow-[0px_0px_20px_0px_rgba(107,107,107,0.10)] p-4 mb-16">
        <p className="mt-8 text-center text-[#6B7178] text-[14px] font-normal leading-[22px] tracking-[-0.056px]">
          나의 버디는?
        </p>
        <div className="flex flex-col items-center">
          {/* 버디 이미지 */}
          <div className="mb-4">
            <Image
              src={`/images/birds/${birdData?.birdName}_280.png`}
              alt={birdData?.birdName || ""}
              width={200}
              height={200}
            />
          </div>

          {/* 태그 (traits) */}
          <div className="mb-[10px]">
            <span
              className="px-3 py-1 rounded-[4px] text-xs font-medium leading-4 tracking-[-0.048px]"
              style={{
                color: birdStyle.color,
                backgroundColor: birdStyle.background,
              }}
            >
              {birdData?.traits}
            </span>
          </div>

          {/* 버디 타입 제목 */}
          <h2 className="text-[20px] font-bold text-[#292D32] mb-6 leading-[28px] tracking-[-0.08px]">
            {birdData?.birdName}
          </h2>

          {/* 버디 특성 설명 */}
          <div className="mb-6">
            <p className="text-[14px] text-[#292D32] leading-[22px] tracking-[-0.056px] font-normal">
              {birdData?.explanation}
            </p>
          </div>
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="absolute bottom-10 flex justify-center">
        <NextButton text="환영해, 나의 버디!" onClick={handleGoHome} />
      </div>
    </div>
  );
};

export default BuddyResultCard;

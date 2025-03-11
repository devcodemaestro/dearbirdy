"use client";

import LeftArrow from "@/components/Icons/common/LeftArrow";
import { useLetterStore } from "@/store/useLetterStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { getBirdyInfo, postLetter } from "@/services/userService";

export interface Bird {
  birdName: string;
  traits: string;
  explanation: string;
}

export default function SelectBird() {
  const {
    setStep,
    selectedBird,
    setSelectedBird,
    categoryName,
    title,
    letter,
  } = useLetterStore();
  const [birds, setBirds] = useState<Bird[]>([]);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    async function fetchBirds() {
      try {
        const response = await getBirdyInfo();
        // console.log("🐦 가져온 새 데이터:", response);

        if (response?.data?.birdyList) {
          setBirds(response.data.birdyList);
        } else {
          console.warn("🚨 API 응답이 없어서 기본 데이터를 사용합니다.");
          setBirds([]);
        }
      } catch (error) {
        console.error("❌ 새 정보 불러오기 실패:", error);
        setBirds([]);
      }
    }
    fetchBirds();
  }, []);

  const handleSendLetter = async () => {
    if (!selectedBird) {
      alert("받을 새를 선택해주세요! 🐦");
      return;
    }

    setIsSending(true);

    try {
      const response = await postLetter({
        birdName: selectedBird,
        categoryName: categoryName ?? "기타",
        title,
        letter,
      });

      console.log("✅ 편지 전송 성공:", response.message);
      setStep(4);
    } catch (error) {
      console.error("❌ 편지 전송 실패:", error);
      alert("편지 전송에 실패했어요. 다시 시도해주세요.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative text-black flex flex-col items-center">
      {/* 상단 네비게이션 */}
      <nav className="mt-[58px] w-[343px] flex justify-start py-4">
        <LeftArrow
          className="w-6 h-6 cursor-pointer"
          stroke="#292D32"
          onClick={() => setStep(2)}
        />
      </nav>

      {/* 제목 */}
      <p className="text-[#292D32] text-center text-[20px] font-bold leading-[28px] tracking-[-0.08px] mt-4">
        어떤 새에게 답장을 받아볼까요?
      </p>

      {/* 설명 */}
      <p className="text-[#6B7178] text-center text-[16px] font-normal leading-[24px] tracking-[-0.064px] mt-1.5">
        선택한 새와 다른 새에게 답장이 올 수도 있어요
      </p>

      {/* Swiper 카드 영역 */}
      <div className="mt-[21px] w-[360px]">
        <Swiper
          modules={[Pagination]}
          spaceBetween={10} // ✅ 카드 간격 유지
          slidesPerView="auto" // ✅ Centered Auto 적용
          centeredSlides={true} // ✅ 가운데 정렬
          className="select-bird-swiper"
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className}" style="background-color: ${
                index ===
                birds.findIndex((bird) => bird.birdName === selectedBird)
                  ? "#84A667"
                  : "#E5E5EA"
              }; width: 8px; height: 8px; border-radius: 50%; margin: 0 4px;"></span>`;
            },
          }}
        >
          {birds.map((bird, index) => (
            <SwiperSlide key={index} className="max-w-[306px]">
              <div
                className="w-full h-[492px] bg-white rounded-xl flex flex-col items-center justify-center px-4 py-10 cursor-pointer"
                onClick={() => setSelectedBird(bird.birdName)}
              >
                {/* 🐦 프로필 이미지 */}
                <Image
                  src={`/images/letter-slide/${bird.birdName}_profile.png`}
                  alt={bird.birdName}
                  width={100}
                  height={100}
                  className="mb-2"
                />

                {/* Traits (태그 형태) */}
                <div className="bg-[rgba(255,216,91,0.10)] w-[100px] h-[24px] flex items-center justify-center rounded-[6px] mb-2">
                  <span className="text-[#ECBF30] text-[14px] font-medium leading-[20px] tracking-[-0.056px]">
                    {bird.traits}
                  </span>
                </div>
                {/* 새 이름 */}
                <p className="text-[#292D32] text-center text-[16px] font-bold leading-[24px] tracking-[-0.064px] mb-4">
                  {bird.birdName}
                </p>
                {/* 설명 박스 */}
                <div className="w-[274px] h-[224px] p-[16px] border border-[#F0F1EC] bg-[#F9F8F3] rounded-[10px]">
                  {bird.explanation.split("\n").map((text, i) => (
                    <p
                      key={i}
                      className={`text-[#292D32] text-[16px] ${
                        i === 0 ? "font-medium" : "font-normal"
                      } leading-[24px] tracking-[-0.064px]`}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 하단 버튼 */}
      <button
        className="w-[343px] h-[50px] bg-[#292D32] text-white text-[16px] font-semibold rounded-[12px] flex items-center justify-center mt-6"
        onClick={handleSendLetter}
        disabled={isSending}
      >
        {isSending ? "전송 중..." : "편지 보내기"}
      </button>
    </div>
  );
}

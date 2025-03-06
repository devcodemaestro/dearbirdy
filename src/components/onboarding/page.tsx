"use client";

import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const onboardingSlides = [
  { image: "/images/onboarding/step1.svg", text: "온보딩 첫 번째 페이지" },
  { image: "/images/onboarding/step2.svg", text: "온보딩 두 번째 페이지" },
  { image: "/images/onboarding/step3.svg", text: "온보딩 세 번째 페이지" },
  { image: "/images/onboarding/step4.svg", text: "온보딩 네 번째 페이지" },
];

export default function OnboardingPage() {
  const router = useRouter();

  const handleSkip = () => {
    console.log("✅ 온보딩 건너뛰기 → /main 이동");
    router.push("/main");
  };

  return (
    <div className="relative w-full h-screen">
      {/* Swiper 슬라이드 */}
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="w-full h-full"
      >
        {onboardingSlides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <img
              src={slide.image} // ✅ 경로 수정
              alt={`onboarding-step-${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-2xl font-bold">
              {slide.text}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 건너뛰기 버튼 */}
      <button
        onClick={handleSkip}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-3 rounded-lg font-bold shadow-md"
      >
        건너뛰기
      </button>
    </div>
  );
}

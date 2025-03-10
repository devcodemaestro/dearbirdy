"use client";

import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { onboardingSlides } from "@/constants/onboarding";

export default function OnboardingPage() {
  const router = useRouter();

  const handleSkip = () => {
    localStorage.setItem("onboardingComplete", "true");
    console.log("✅ 온보딩 완료 저장");
    console.log("✅ 온보딩 건너뛰기 → /main 이동");
    router.push("/main");
  };

  return (
    <div className="relative w-full h-full">
      {/* Swiper 슬라이드 */}
      <Swiper
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="onboarding-swiper w-full h-full"
      >
        {onboardingSlides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            {/* swiper로 인해 Image 미사용 vercel 배포 에러로 ESLint 경고 무시 처리 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={`onboarding-step-${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="pl-7 absolute inset-0 mt-12">
              {/* 페이지네이션 위치 - 콘텐츠 상단에 배치 */}
              <div className="pagination-placeholder"></div>
              <div className="text-white text-2xl font-bold text-left leading-[30px] tracking-[-0.096px] whitespace-pre-wrap">
                {slide.title}
              </div>
              <div className="text-white text-lg mt-3 text-left whitespace-pre-wrap">
                {slide.content}
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination"></div>
      </Swiper>

      {/* 건너뛰기 버튼 */}
      <button
        onClick={handleSkip}
        className="bg-[#292D32] cursor-pointer absolute bottom-10 left-1/2 transform -translate-x-1/2 flex w-[342px] h-[50px] px-4 py-[13px] justify-center items-center flex-shrink-0 rounded-xl z-10 text-white font-bold shadow-md"
      >
        반가워요!
      </button>
    </div>
  );
}

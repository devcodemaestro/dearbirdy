"use client";

import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const onboardingSlides = [
  {
    image: "/images/onboarding/step1.svg",
    title: `Dear. My Birdy \n당신을 기다렸어요`,
    content:
      "고민이라는 건 참 자주 머릿속을 드나들며 \n나를 힘들게 만드는 것 같아요.",
  },
  {
    image: "/images/onboarding/step2.svg",
    title: `디어버디가 있으니까 \n이제 당신은 혼자가 아니에요`,
    content: "주변에 쉽게 말도 못하고 그동안 혼자 \n힘들었던 적이 있었죠?",
  },
  {
    image: "/images/onboarding/step3.svg",
    title: `당신의 이야기를 들어줄 \n버디들이 많이 있어요`,
    content: "나 혼자 안고 있던 고민들, \n이젠 편지로 훨훨 날려보아요.",
  },
  {
    image: "/images/onboarding/step4.svg",
    title: `우리, 디어버디에서 \n편히 다 털어놓아요`,
    content: "이곳에는 서로의 이야기를 들어줄 \n준비가 된 버디들만 모여있어요.",
  },
];

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
        className="custom-swiper w-full h-full"
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
            <div className="pl-7 absolute inset-0 mt-36">
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

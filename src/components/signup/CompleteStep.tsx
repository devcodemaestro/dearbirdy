"use client";

import dynamic from "next/dynamic";

import { useEffect, useRef } from "react";
import { useSignupStore } from "@/store/useSignupStore";
import loadingEgg from "@/animations/loading_egg.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false }); // ✅ 서버 사이드 렌더링 방지

const CompleteStep = () => {
  const { nextStep } = useSignupStore();
  const lottieRef = useRef(null);

  useEffect(() => {
    // 3초 후 다음 스텝으로 자동 이동 (BuddyTest로 이동)
    const timer = setTimeout(() => {
      nextStep();
    }, 3000);

    return () => clearTimeout(timer);
  }, [nextStep]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      {/* ✅ 메시지 */}
      <p className="text-xl font-bold text-center text-[#292D32] mb-12">
        이제 나의 버디들을 만나러 가볼까요?
      </p>

      {/* ✅ Lottie 애니메이션 */}
      <div className="w-[250px] h-[250px]">
        <Lottie
          lottieRef={lottieRef}
          animationData={loadingEgg}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  );
};

export default CompleteStep;

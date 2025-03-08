"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { useSignupStore } from "@/store/useSignupStore";
import { Answer, processTestResults } from "@/util/buddyTestUtils";
import InfoBox from "@/components/common/InfoBox";
import BuddyResultCard from "./BuddyResultCard";
import loadingResult from "@/animations/loading_result.json";
import { LottieRefCurrentProps } from "lottie-react";

// ✅ Lottie를 동적으로 로드 (SSR 방지)
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const BuddyTestLoading = ({ answers }: { answers: number[] }) => {
  const { updateFormData, formData } = useSignupStore();
  const nickname = formData.nickname || "";
  const [isAnimationClicked, setIsAnimationClicked] = useState(false);
  const [showResultCard, setShowResultCard] = useState(false);
  const [birdType, setBirdType] = useState("");

  // ✅ useRef는 Lottie를 제어하기 위한 것이므로 그대로 유지
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    // ✅ answers를 Answer[] 타입으로 변환
    const formattedAnswers: Answer[] = answers.map(
      (answer) => answer as Answer
    );

    // ✅ 결과 계산 및 저장
    const result = processTestResults(formattedAnswers);
    updateFormData({ birdName: result.result.name });
    setBirdType(result.result.name);
  }, [answers, updateFormData]);

  // ✅ 애니메이션 완료 핸들러
  const handleAnimationComplete = () => {
    setShowResultCard(true);
  };

  // ✅ 알 애니메이션 클릭 핸들러
  const handleAnimationClick = () => {
    if (!isAnimationClicked) {
      setIsAnimationClicked(true);

      if (lottieRef.current) {
        lottieRef.current.play();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 pt-20 mx-auto">
      {/* ✅ InfoBox와 안내 텍스트 - 클릭 전에만 표시 */}
      {!isAnimationClicked && (
        <>
          <div className="mt-14">
            <InfoBox
              imageSrc="/images/signup/bluebird-3.svg"
              altText="버디테스트 아이콘"
              text={`${nickname}님과 찰떡 궁합인 버디가 태어날 준비를 하고 있어요. 우리 버디를 응원해주세요!`}
            />
          </div>

          <p className="text-xl font-bold text-center text-[#292D32] my-8">
            알을 눌러서 버디를 깨워주세요!
          </p>
        </>
      )}

      {/* ✅ 애니메이션 컨테이너 */}
      <div
        className={`w-[242px] cursor-pointer mx-auto 
          ${!isAnimationClicked ? "mt-[-.625rem]" : ""} 
          ${
            isAnimationClicked
              ? "fixed top-[calc(50%-44px)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
              : ""
          }
        `}
        onClick={!isAnimationClicked ? handleAnimationClick : undefined}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={loadingResult}
          loop={false}
          autoplay={false}
          onComplete={handleAnimationComplete}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice",
          }}
          style={{
            height: isAnimationClicked ? "852px" : "241px",
            width: "242px",
            marginTop: isAnimationClicked ? "-44px" : "0px",
          }}
        />
      </div>

      {/* ✅ 결과 카드 - 애니메이션 위에 표시 */}
      {showResultCard && (
        <div className="z-20 absolute inset-0 flex flex-col items-center justify-center">
          <BuddyResultCard birdType={birdType} />
        </div>
      )}
    </div>
  );
};

export default BuddyTestLoading;

"use client";

import { useState } from "react";
import BuddyResultCard from "@/components/signup/buddytest/BuddyResultCard";
import CategoryStep from "@/components/signup/CategoryStep";
import CompleteStep from "@/components/signup/CompleteStep";
import NicknameStep from "@/components/signup/NicknameStep";
import RoleStep from "@/components/signup/RoleStep";
import SignupIntro from "@/components/signup/SignupIntro";
import SignupNav from "@/components/signup/SignupNav";
import { useSignupStore } from "@/store/useSignupStore";
import BuddyTest from "@/components/signup/buddytest/BuddyTest";

const SignUp = () => {
  const { step } = useSignupStore();
  const [showResult, setShowResult] = useState(false); // ✅ 상태 관리

  return (
    <div className="px-4 w-full">
      {!showResult && <SignupNav />} {/* ✅ 결과 화면이면 SignupNav 숨김 */}
      {step === 0 && <SignupIntro />}
      {step === 1 && <NicknameStep />}
      {step === 2 && <RoleStep />}
      {step === 4 && <CategoryStep />}
      {step === 5 && <CompleteStep />}
      {step === 6 && !showResult && <BuddyTest />}
      {/* ✅ BuddyResultCard에 `setShowResult` 필수로 전달 */}
      {showResult && (
        <BuddyResultCard birdType="앵무새" setShowResult={setShowResult} />
      )}
    </div>
  );
};

export default SignUp;

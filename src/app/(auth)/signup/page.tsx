"use client";

import { useState } from "react";
import BuddyTest from "@/components/signup/buddytest/BuddyTest";
import BuddyResultCard from "@/components/signup/buddytest/BuddyResultCard";
import CategoryStep from "@/components/signup/CategoryStep";
import CompleteStep from "@/components/signup/CompleteStep";
import NicknameStep from "@/components/signup/NicknameStep";
import RoleStep from "@/components/signup/RoleStep";
import SignupIntro from "@/components/signup/SignupIntro";
import SignupNav from "@/components/signup/SignupNav";
import { useSignupStore } from "@/store/useSignupStore";

const SignUp = () => {
  const { step } = useSignupStore();
  const [showResult, setShowResult] = useState(false); // 결과 화면 여부

  return (
    <div className="px-4 w-full">
      <SignupNav isResultVisible={showResult} />
      {step === 0 && <SignupIntro />}
      {step === 1 && <NicknameStep />}
      {step === 2 && <RoleStep />}
      {step === 4 && <CategoryStep />}
      {step === 5 && <CompleteStep />}
      {step === 6 && !showResult && <BuddyTest />}
      {showResult && (
        <BuddyResultCard birdType="앵무새" setShowResult={setShowResult} />
      )}
    </div>
  );
};

export default SignUp;

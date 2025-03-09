"use client";

import { useEffect } from "react";
import BuddyTest from "@/components/signup/buddytest/BuddyTest";
import CategoryStep from "@/components/signup/CategoryStep";
import CompleteStep from "@/components/signup/CompleteStep";
import NicknameStep from "@/components/signup/NicknameStep";
import RoleStep from "@/components/signup/RoleStep";
import SignupIntro from "@/components/signup/SignupIntro";
import SignupNav from "@/components/signup/SignupNav";
import { useSignupStore } from "@/store/useSignupStore";
import { useBuddyTestStore } from "@/store/useBuddyTestStore";

const SignUp = () => {
  const { step, setStep, hideNav } = useSignupStore();
  const { testStep, setTestStep } = useBuddyTestStore();

  // ✅ 새로고침 시 `sessionStorage`에서 `step`과 `testStep` 값을 복원
  useEffect(() => {
    const savedSignupState = sessionStorage.getItem("signup-storage");
    if (savedSignupState) {
      try {
        setStep(JSON.parse(savedSignupState).state.step);
      } catch (error) {
        console.error("❌ SignUp: sessionStorage 데이터 복원 오류", error);
      }
    }

    const savedBuddyTestState = sessionStorage.getItem("buddytest-storage");
    if (savedBuddyTestState) {
      try {
        setTestStep(JSON.parse(savedBuddyTestState).state.testStep);
      } catch (error) {
        console.error("❌ SignUp: BuddyTest sessionStorage 복원 오류", error);
      }
    }
  }, [setStep, setTestStep]);

  return (
    <div className="px-4 w-full">
      {!hideNav && step !== 4 && <SignupNav />}
      {step === 0 && <SignupIntro />}
      {step === 1 && <NicknameStep />}
      {step === 2 && <RoleStep />}
      {step === 3 && <CategoryStep />}
      {step === 4 && <CompleteStep />}
      {step === 5 && <BuddyTest />}
    </div>
  );
};

export default SignUp;

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

import { useRouter } from "next/navigation"; // ✅ useRouter import

const SignUp = () => {
  const router = useRouter(); // ✅ useRouter 사용
  const { step, setStep, hideNav } = useSignupStore();
  const { setTestStep } = useBuddyTestStore();

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
  }, [setStep, setTestStep, router]); // ✅ router 추가

  return (
    <div className="w-full px-4">
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

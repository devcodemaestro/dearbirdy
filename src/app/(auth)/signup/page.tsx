"use client";

import BuddyTest from "@/components/signup/BuddyTest";
import CategoryStep from "@/components/signup/CategoryStep";
import CompleteStep from "@/components/signup/CompleteStep";
import NicknameStep from "@/components/signup/NicknameStep";
import RoleStep from "@/components/signup/RoleStep";
import SignupIntro from "@/components/signup/SignupIntro";
import SignupNav from "@/components/signup/SignupNav";
import { useSignupStore } from "@/store/useSignupStore";

const SignUp = () => {
  const { step } = useSignupStore();

  return (
    <div className="px-4 w-full">
      <SignupNav />
      {step === 0 && <SignupIntro />}
      {step === 1 && <NicknameStep />}
      {step === 2 && <RoleStep />}
      {step === 4 && <CategoryStep />}
      {step === 5 && <CompleteStep />}
      {step === 6 && <BuddyTest />} {/* ✅ handleTestComplete 제거 */}
    </div>
  );
};

export default SignUp;

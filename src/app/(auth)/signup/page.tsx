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
  const { step, hideNav } = useSignupStore();

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

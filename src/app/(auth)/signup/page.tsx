"use client";

import BuddyTest from "@/components/signup/BuddyTest";
import CategoryStep from "@/components/signup/CategoryStep";
import CompleteStep from "@/components/signup/CompleteStep";
import NicknameStep from "@/components/signup/NicknameStep";
import RoleStep from "@/components/signup/RoleStep";
import SignupIntro from "@/components/signup/SignupIntro";
import SignupNav from "@/components/signup/SignupNav";
import TermsStep from "@/components/signup/TermsStep";
import { postAdditionalInfo } from "@/services/authService";
import { useSignupStore } from "@/store/useSignupStore"; // ✅ Zustand 가져오기

const SignUp = () => {
  const { step, nextStep, formData } = useSignupStore(); // ✅ Zustand 상태 사용

  const handleSubmit = async () => {
    try {
      console.log("✅ 전송할 데이터:", formData);
      await postAdditionalInfo(formData);
      console.log("✅ 회원가입 완료");
      nextStep(); // ✅ 회원가입 완료 후 다음 단계로 이동
    } catch (error) {
      console.error("❌ 회원가입 실패:", error);
    }
  };

  return (
    <div className="p-4 w-full">
      <SignupNav />
      {step === 0 && <SignupIntro />}
      {step === 1 && <NicknameStep />}
      {step === 2 && <RoleStep />}
      {step === 3 && <TermsStep />}
      {step === 4 && <CategoryStep />}
      {step === 5 && <CompleteStep onSubmit={handleSubmit} />}
      {step === 6 && <BuddyTest />}
    </div>
  );
};

export default SignUp;

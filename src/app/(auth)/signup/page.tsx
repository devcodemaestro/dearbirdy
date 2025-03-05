"use client";

import { useState } from "react";
import NicknameStep from "@/components/signup/NicknameStep";
import RoleStep from "@/components/signup/RoleStep";
import TermsStep from "@/components/signup/TermsStep";
import CategoryStep from "@/components/signup/CategoryStep";
import CompleteStep from "@/components/signup/CompleteStep";
import BuddyTest from "@/components/signup/BuddyTest";
import { postAdditionalInfo } from "@/services/authService";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nickname: "",
    userRole: "",
    userCategory: {
      career: false,
      mental: false,
      relationship: false,
      love: false,
      life: false,
      finance: false,
      housing: false,
      other: false,
    },
    birdName: "",
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => Math.max(1, prev - 1));

  const handleSubmit = async () => {
    try {
      console.log("✅ 전송할 데이터:", formData);
      await postAdditionalInfo(formData);
      console.log("✅ 회원가입 완료");
      setStep(6);
    } catch (error) {
      console.error("❌ 회원가입 실패:", error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <NicknameStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return <RoleStep setFormData={setFormData} onNext={handleNext} />;
      case 3:
        return <TermsStep onNext={handleNext} />;
      case 4:
        return (
          <CategoryStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        );
      case 5:
        return <CompleteStep onSubmit={handleSubmit} />;
      case 6:
        return <BuddyTest setFormData={setFormData} formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <nav className="w-[375px] h-[56px] flex items-center justify-between bg-gray-100 px-4">
        <button onClick={handlePrev}>◀</button>
        <h1 className="text-lg font-bold">회원가입</h1>
      </nav>
      {renderStep()}
    </div>
  );
};

export default SignUp;

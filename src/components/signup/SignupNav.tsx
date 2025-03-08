import React from "react";
import LeftArrow from "../Icons/common/LeftArrow";
import { useRouter } from "next/navigation";
import { useSignupStore } from "@/store/useSignupStore";

interface SignupNavProps {
  isResultVisible?: boolean; // 버디 결과 화면이 보일 때 숨김 여부
}

const SignupNav = ({ isResultVisible = false }: SignupNavProps) => {
  const { step, prevStep } = useSignupStore();
  const router = useRouter();

  // 현재 단계에 따라 제목 텍스트 결정
  const getNavTitle = () => {
    return step >= 6 ? "버디테스트" : "회원가입";
  };

  const handleBack = () => {
    if (step === 0) {
      router.back();
    } else {
      prevStep();
    }
  };

  return (
    <div
      className={`mt-14 flex items-center relative ${
        isResultVisible ? "hidden" : ""
      }`}
    >
      <LeftArrow
        onClick={handleBack}
        className="w-6 h-6 absolute cursor-pointer"
        stroke="#292D32"
      />
      <p className="text-base font-bold m-4 leading-6 tracking-[-0.064px] w-full text-center">
        {getNavTitle()}
      </p>
    </div>
  );
};

export default SignupNav;

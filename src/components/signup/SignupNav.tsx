import React from "react";
import LeftArrow from "../Icons/common/LeftArrow";
import { useRouter } from "next/navigation";
import { useSignupStore } from "@/store/useSignupStore"; // ✅ Zustand에서 상태 가져오기

const SignupNav = () => {
  const { step, prevStep } = useSignupStore(); // ✅ Zustand에서 현재 단계 가져오기
  const router = useRouter();

  const handleBack = () => {
    if (step === 0) {
      router.back(); // 🚀 첫 단계에서는 이전 페이지로 이동
    } else {
      prevStep(); // 🚀 이전 단계로 이동
    }
  };

  return (
    <div className="mt-14 flex items-center relative">
      <LeftArrow
        onClick={handleBack} // ✅ 클릭 시 handleBack 실행
        className="w-6 h-6 absolute cursor-pointer"
        stroke="#292D32"
      />
      <p className="text-base font-bold m-4 leading-6 tracking-[-0.064px] w-full text-center">
        회원가입
      </p>
    </div>
  );
};

export default SignupNav;

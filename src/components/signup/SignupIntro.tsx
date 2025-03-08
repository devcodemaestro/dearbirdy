"use client";

import { useSignupStore } from "@/store/useSignupStore";
import Background from "../common/Background";
import NextButton from "../common/NextButton";

const SignupIntro = () => {
  const { nextStep } = useSignupStore(); // ✅ Zustand 상태 사용
  return (
    <div className="w-full h-full">
      <div className=" px-4">
        {/* 인트로 텍스트 */}
        <div className="text-center mt-6">
          <p className="whitespace-pre-wrap text-2xl font-bold leading-[30px] tracking-tighter">
            {`안녕? 반가워요\n나는 편지를 전하는 파랑새에요`}
          </p>
          <p className="text-lg font-normal leading-[26px] tracking-[-0.072px] mt-2">
            진솔하게 털어 놓은 고민이 잘 전달될 수 있도록 몇 가지 질문에 답변
            부탁드려요
          </p>
        </div>
        <div className="mt-16 w-72 h-64 mx-auto relative">
          <Background
            src="/images/common/background_bluebird.png"
            alt="background_main"
            className="absolute w-full h-full"
          />
        </div>

        {/* ✅ NextButton 적용 */}
        <div className="absolute bottom-10 flex justify-center">
          <NextButton text="좋아요" onClick={nextStep} />
        </div>
      </div>
    </div>
  );
};

export default SignupIntro;

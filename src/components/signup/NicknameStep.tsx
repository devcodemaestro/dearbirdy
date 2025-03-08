"use client";

import { checkNickname } from "@/services/userService";
import { useSignupStore } from "@/store/useSignupStore";
import { useState, useEffect } from "react";

import Image from "next/image"; // ✅ Next.js Image 컴포넌트 사용
import InfoBox from "../common/InfoBox";
import NextButton from "../common/NextButton";

const isValidNickname = (nickname: string) => {
  const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;
  return nicknameRegex.test(nickname);
};

const NicknameStep = () => {
  const { updateFormData, nextStep } = useSignupStore();
  const [nickname, setNickname] = useState(""); // 입력값
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [errorType, setErrorType] = useState<
    "tooShort" | "tooLong" | "invalidChar" | "duplicate" | null
  >(null);
  const [debouncedNickname, setDebouncedNickname] = useState(""); // 디바운싱 적용 값

  /** ✅ 닉네임 입력 핸들러 */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;

    // ✅ 입력값 상태 업데이트
    setNickname(newNickname);

    // ✅ 유효성 검사 (입력 직후)
    if (newNickname.length > 10) {
      setErrorType("tooLong");
      setIsAvailable(false);
      return;
    }

    if (newNickname.length < 2) {
      setErrorType("tooShort");
      setIsAvailable(false);
      return;
    }

    if (!isValidNickname(newNickname)) {
      setErrorType("invalidChar");
      setIsAvailable(false);
      return;
    }

    // ✅ 내부 검증 통과 → API 요청을 위한 디바운싱 값 설정
    setErrorType(null);
    setDebouncedNickname(newNickname);
  };

  /** ✅ 닉네임 중복 확인 API 호출 (Debounce 적용) */
  useEffect(() => {
    if (debouncedNickname.length < 2 || debouncedNickname.length > 10) return; // 유효한 경우만 실행

    const timer = setTimeout(async () => {
      setLoading(true);
      const available = await checkNickname(debouncedNickname);
      setIsAvailable(available);
      setErrorType(available ? null : "duplicate");
      setLoading(false);
    }, 1500); // 1.5초 후 API 호출

    return () => clearTimeout(timer);
  }, [debouncedNickname]);

  /** ✅ "다음" 버튼 클릭 시 닉네임 상태 최종 업데이트 후 단계 이동 */
  const handleNextStep = () => {
    updateFormData({ nickname }); // ✅ 닉네임 최종 저장
    nextStep(); // ✅ 다음 단계로 이동
  };

  return (
    <div>
      {/* ✅ InfoBox 컴포넌트 적용 */}
      <InfoBox
        imageSrc="/images/signup/bluebird.svg"
        altText="닉네임 아이콘"
        text="고마워요! 우선은요. 제가 당신을 기억할 수 있게 이름을 알려주세요!"
      />
      <div className="px-4">
        {/* ✅ 닉네임 입력 영역 */}
        <div className="relative mt-14 w-full">
          <input
            type="text"
            value={nickname}
            onChange={handleChange}
            maxLength={10}
            placeholder="닉네임을 입력하세요"
            className={`w-full pb-3 text-lg outline-none border-b-2 transition-colors
      ${
        errorType
          ? "border-[#FF2A2C]"
          : focused
          ? "border-[#292D32]"
          : "border-[#D1D1D6]"
      }
      placeholder:text-[#6B7178] placeholder:text-[14px] placeholder:leading-[22px] placeholder:tracking-[-0.056px] placeholder:font-normal
    `}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />

          {/* ✅ 닉네임 사용 가능 체크 아이콘 */}
          {isAvailable && !errorType && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Image
                src="/images/icons/Icon_check.svg"
                alt="사용 가능"
                width={24}
                height={24}
              />
            </div>
          )}
        </div>

        {/* ✅ 닉네임 검증 메시지 & 입력 길이 카운트 */}
        <div className="flex justify-between mt-2">
          {/* 왼쪽 - 검증 메시지 */}
          <p
            className={`text-xs ${
              errorType
                ? "text-[#FF2A2C]"
                : isAvailable
                ? "text-[#30B16C]"
                : "text-[#6B7178]"
            }`}
          >
            {errorType === "tooShort"
              ? "닉네임은 2자 이상으로 작성해주세요."
              : errorType === "tooLong"
              ? "최대 글자수는 10자까지입니다."
              : errorType === "invalidChar"
              ? "특수문자 제외 한글, 영문, 숫자만 사용할 수 있어요."
              : errorType === "duplicate"
              ? "이미 존재하는 닉네임입니다."
              : isAvailable
              ? "사용 가능한 닉네임입니다."
              : "특수문자 제외 한글, 영문, 숫자로만 작성해주세요."}
          </p>

          {/* 오른쪽 - 닉네임 입력 길이 카운트 */}
          <p
            className={`text-xs ${
              errorType ? "text-[#FF2A2C]" : "text-[#6B7178]"
            }`}
          >
            {nickname.length}/10
          </p>
        </div>

        {/* ✅ 다음 버튼 */}
        <div className="absolute bottom-10 flex justify-center">
          <NextButton
            text="다음"
            onClick={handleNextStep}
            disabled={!isAvailable}
          />
        </div>

        {/* ✅ 로딩 상태 아이콘 */}
        {loading && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <svg
              className="animate-spin h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default NicknameStep;

"use client";

import { useEffect } from "react";
import BuddyTestIntro from "./BuddyTestIntro";
import BuddyTestStep from "./BuddyTestStep";
import BuddyTestLoading from "./BuddyTestLoading";
import { useBuddyTestStore } from "@/store/useBuddyTestStore";
import { Answer } from "@/constants/buddyTestQuestions";

const BuddyTest = () => {
  const { testStep, setTestStep, setAnswer, calculateResults } =
    useBuddyTestStore();

  // ✅ 새로고침 시 `sessionStorage`에서 `testStep` 값을 불러오기
  useEffect(() => {
    const savedTestStep = sessionStorage.getItem("buddytest-storage");
    if (savedTestStep) {
      try {
        setTestStep(JSON.parse(savedTestStep).state.testStep);
      } catch (error) {
        console.error("❌ BuddyTest: sessionStorage 데이터 복원 오류", error);
      }
    }
  }, [setTestStep]);

  const handleAnswer = (answer: Answer) => {
    setAnswer(testStep - 1, answer); // ✅ 응답 저장
    if (testStep === 12) {
      calculateResults(); // ✅ 마지막 질문에 도달하면 결과 계산
      setTestStep(13);
    } else {
      setTestStep(testStep + 1);
    }
  };

  return (
    <div>
      {testStep === 0 && <BuddyTestIntro onStart={() => setTestStep(1)} />}
      {testStep > 0 && testStep <= 12 && (
        <BuddyTestStep step={testStep} onAnswer={handleAnswer} />
      )}
      {testStep === 13 && <BuddyTestLoading />}
    </div>
  );
};

export default BuddyTest;

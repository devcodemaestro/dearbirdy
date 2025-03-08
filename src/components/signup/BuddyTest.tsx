"use client";

import { useState } from "react";
import { useSignupStore } from "@/store/useSignupStore";
// import BuddyTestIntro from "./BuddyTestIntro";
// import BuddyTestStep from "./BuddyTestStep";
// import BuddyTestLoading from "./BuddyTestLoading";
import { postAdditionalInfo } from "@/services/authService";

// 타입 정의
type Answer = 0 | 1 | 2; // 0: 아니다, 1: 보통이다, 2: 그렇다
type Direction = "life" | "lifestyle"; // life: 삶의 지향성, lifestyle: 생활 지향성

interface Question {
  id: number;
  text: string;
  direction: Direction;
}

interface BirdType {
  name: string;
  lifeScore: {
    min: number;
    max: number;
  };
  lifestyleScore: {
    min: number;
    max: number;
  };
  traits: string[];
}

// 질문 목록
const questions: Question[] = [
  // 삶의 지향성 질문
  { id: 1, text: "취미나 여가보다 자기계발이 더 중요하다", direction: "life" },
  {
    id: 2,
    text: "즐거운 방식보다 효율적인 방식을 선호한다",
    direction: "life",
  },
  {
    id: 3,
    text: "목표를 이루기 위해서라면 힘들어도 참을 수 있다",
    direction: "life",
  },
  { id: 4, text: "하고 싶은 일보다 돈이 더 중요하다", direction: "life" },
  { id: 5, text: "성공한 삶이 여유로운 삶보다 중요하다", direction: "life" },
  {
    id: 6,
    text: "일과 삶의 균형에서 일이 우선이라고 생각한다",
    direction: "life",
  },

  // 생활 지향성 질문
  {
    id: 7,
    text: "여러 사람과 교류하는 것이 에너지를 준다",
    direction: "lifestyle",
  },
  {
    id: 8,
    text: "혼자만의 시간보다 함께하는 시간이 더 즐겁다",
    direction: "lifestyle",
  },
  { id: 9, text: "새로운 사람을 만나는 것이 설렌다", direction: "lifestyle" },
  { id: 10, text: "개인 활동보다 단체 활동이 편하다", direction: "lifestyle" },
  {
    id: 11,
    text: "주말에 나는 주로 약속을 잡아 친구들과 만난다",
    direction: "lifestyle",
  },
  {
    id: 12,
    text: "모임에서 처음 보는 사람이 있다면 먼저 다가가 말을 건다",
    direction: "lifestyle",
  },
];

// 새 유형 정의
const birdTypes: BirdType[] = [
  {
    name: "앵무새",
    lifeScore: { min: 10, max: 12 },
    lifestyleScore: { min: 7, max: 12 },
    traits: ["소통능력", "문제해결"],
  },
  {
    name: "부엉이",
    lifeScore: { min: 10, max: 12 },
    lifestyleScore: { min: 0, max: 6 },
    traits: ["지혜", "분석력"],
  },
  {
    name: "뱁새",
    lifeScore: { min: 7, max: 9 },
    lifestyleScore: { min: 0, max: 6 },
    traits: ["신중함", "분석력"],
  },
  {
    name: "카나리아",
    lifeScore: { min: 4, max: 6 },
    lifestyleScore: { min: 7, max: 12 },
    traits: ["음악성", "조화"],
  },
  {
    name: "벌새",
    lifeScore: { min: 0, max: 3 },
    lifestyleScore: { min: 7, max: 12 },
    traits: ["활력", "예술성"],
  },
  {
    name: "파랑새",
    lifeScore: { min: 0, max: 3 },
    lifestyleScore: { min: 0, max: 6 },
    traits: ["순수함", "사색"],
  },
];

const BuddyTest = () => {
  const { updateFormData, formData } = useSignupStore();
  const [testStep, setTestStep] = useState<number>(0); // 0: 인트로, 1-12: 질문, 13: 로딩
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleStartTest = () => {
    setTestStep(1); // 인트로에서 첫 번째 질문으로
  };

  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (testStep === 12) {
      // 마지막 질문에 대한 답변 후 결과 계산
      const lifeScore = calculateScore(newAnswers, "life");
      const lifestyleScore = calculateScore(newAnswers, "lifestyle");
      const matchedBird = matchBirdType(lifeScore, lifestyleScore);

      // 결과 저장
      updateFormData({ birdName: matchedBird.name });

      // 서버에 모든 데이터 전송
      submitTestResults(newAnswers, matchedBird);

      // 로딩 화면으로 이동
      setTestStep(13);
    } else {
      // 다음 질문으로 이동
      setTestStep(testStep + 1);
    }
  };

  // 점수 계산 함수
  const calculateScore = (answers: Answer[], direction: Direction): number => {
    return questions
      .filter(
        (_, index) =>
          index < answers.length && questions[index].direction === direction
      )
      .reduce((sum, _, index) => sum + answers[index], 0);
  };

  // 새 유형 매칭 함수
  const matchBirdType = (
    lifeScore: number,
    lifestyleScore: number
  ): BirdType => {
    return birdTypes.find(
      (bird) =>
        lifeScore >= bird.lifeScore.min &&
        lifeScore <= bird.lifeScore.max &&
        lifestyleScore >= bird.lifestyleScore.min &&
        lifestyleScore <= bird.lifestyleScore.max
    )!;
  };

  // 테스트 결과 제출
  const submitTestResults = async (
    answers: Answer[],
    matchedBird: BirdType
  ) => {
    try {
      const testResults = {
        answers,
        scores: {
          life: calculateScore(answers, "life"),
          lifestyle: calculateScore(answers, "lifestyle"),
        },
        birdName: matchedBird.name,
        traits: matchedBird.traits,
      };

      const completeData = {
        ...formData,
        ...testResults,
      };

      console.log("✅ 전송할 데이터:", completeData);
      await postAdditionalInfo(completeData);
      console.log("✅ 회원가입 완료");

      // 성공 시 추가 로직 (예: 홈 페이지로 리다이렉트)
    } catch (error) {
      console.error("❌ 회원가입 실패:", error);
    }
  };

  // 현재 단계에 따라 컴포넌트 렌더링
  // if (testStep === 0) {
  //   return <BuddyTestIntro onStart={handleStartTest} />;
  // } else if (testStep >= 1 && testStep <= 12) {
  //   return (
  //     <BuddyTestStep
  //       question={questions[testStep - 1]}
  //       currentStep={testStep}
  //       totalSteps={12}
  //       onAnswer={handleAnswer}
  //     />
  //   );
  // } else {
  //   return <BuddyTestLoading />;
  // }
};

export default BuddyTest;

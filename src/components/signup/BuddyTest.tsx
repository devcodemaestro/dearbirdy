"use client";

import { useState } from "react";

const BuddyTest = ({ setFormData, formData, onNext }) => {
  const [progress, setProgress] = useState(0);
  const questions = [
    "어떤 환경에서 일하는 걸 선호하나요?",
    "새로운 사람들과 쉽게 어울리는 편인가요?",
    "문제를 해결할 때 논리적으로 접근하는 편인가요?",
  ];

  const handleAnswer = () => {
    if (progress < questions.length - 1) {
      setProgress((prev) => prev + 1);
    } else {
      setFormData((prev) => ({ ...prev, birdName: "부엉이" }));
      console.log("✅ 버디 테스트 완료: 부엉이");
      onNext();
    }
  };

  return (
    <div className="p-4">
      <nav className="w-[375px] h-[56px] bg-gray-100 text-center">
        버디테스트
      </nav>
      <div className="progress-bar w-full h-2 bg-gray-200">
        <div
          className="h-full bg-green-500"
          style={{ width: `${((progress + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
      <p className="my-4">{questions[progress]}</p>
      <button
        className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleAnswer}
      >
        예
      </button>
      <button
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
        onClick={handleAnswer}
      >
        아니오
      </button>
    </div>
  );
};

export default BuddyTest;

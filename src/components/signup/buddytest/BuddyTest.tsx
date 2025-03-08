"use client";

import { useState } from "react";
import BuddyTestIntro from "./BuddyTestIntro";
import BuddyTestStep from "./BuddyTestStep";
import BuddyTestLoading from "./BuddyTestLoading";

const BuddyTest = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(12).fill(null));

  const handleAnswer = (answer: number) => {
    const newAnswers = [...answers];
    newAnswers[step - 1] = answer;
    setAnswers(newAnswers);
    setStep(step === 12 ? 13 : step + 1);
  };

  return (
    <div>
      {step === 0 && <BuddyTestIntro onStart={() => setStep(1)} />}
      {step > 0 && step <= 12 && (
        <BuddyTestStep step={step} onAnswer={handleAnswer} />
      )}
      {step === 13 && <BuddyTestLoading answers={answers} />}
    </div>
  );
};

export default BuddyTest;

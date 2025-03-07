"use client";

import { useState } from "react";

const TermsStep = ({ onNext }) => {
  const [agreed, setAgreed] = useState(false);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.checked);
  };

  return (
    <div className="p-4">
      <p className="mb-2">약관에 동의해주세요.</p>
      <label className="flex items-center gap-2">
        <input type="checkbox" onChange={handleCheck} />
        서비스 이용약관 (필수)
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" onChange={handleCheck} />
        개인정보 처리방침 (필수)
      </label>
      <button
        onClick={agreed ? onNext : undefined}
        disabled={!agreed}
        className={`mt-4 px-4 py-2 rounded ${
          agreed ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500"
        }`}
      >
        다음
      </button>
    </div>
  );
};

export default TermsStep;

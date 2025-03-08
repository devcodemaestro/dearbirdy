"use client";

import { useSignupStore } from "@/store/useSignupStore";
import { useState } from "react";
import InfoBox from "../common/InfoBox";
import NextButton from "../common/NextButton";
import TermsStep from "./TermsStep"; // ✅ 약관 동의 모달 추가
import RoleCard from "./RoleCard";

const RoleStep = () => {
  const { updateFormData, nextStep } = useSignupStore();
  const [selectedRole, setSelectedRole] = useState<"MENTEE" | "MENTOR" | null>(
    null
  );
  const [isTermsOpen, setIsTermsOpen] = useState(false); // ✅ 약관 동의 모달 상태

  /** ✅ 역할 선택 핸들러 */
  const handleSelectRole = (role: "MENTEE" | "MENTOR") => {
    setSelectedRole(role);
  };

  /** ✅ "다음" 버튼 클릭 시 */
  const handleNextStep = () => {
    if (selectedRole) {
      updateFormData({ userRole: selectedRole }); // ✅ Zustand에 역할 저장
      setIsTermsOpen(true); // ✅ 약관 동의 모달 열기
    }
  };

  /** ✅ 약관 동의 모달 닫기 핸들러 - 순서 중요 */
  const handleTermsClose = () => {
    // 상태 업데이트를 비동기적으로 처리하기 위해 setTimeout 사용
    setTimeout(() => {
      setIsTermsOpen(false);
      // 모달이 닫힌 후 다음 단계로 이동
      const { setStep } = useSignupStore.getState();
      setStep(4); // TermsStep(3)을 건너뛰고 CategoryStep(4)으로 직접 이동
    }, 0);
  };

  return (
    <div>
      {/* ✅ InfoBox 컴포넌트 적용 */}
      <InfoBox
        imageSrc="/images/signup/bluebird-2.svg"
        altText="역할 선택 아이콘"
        text="고민 상담이 필요한 후배와 들어줄 선배 중 어느 쪽에 해당하는지 궁금해요."
      />

      <div>
        {/* ✅ 역할 선택 영역 */}
        <div className="flex justify-center gap-6 mt-14">
          <RoleCard
            role="MENTEE"
            selectedRole={selectedRole}
            onSelect={handleSelectRole}
            imageSrc="/images/role/mentee.svg"
            description="조언을 듣고 싶은 2040"
            title="인생후배"
          />

          <RoleCard
            role="MENTOR"
            selectedRole={selectedRole}
            onSelect={handleSelectRole}
            imageSrc="/images/role/mentor.svg"
            description="조언을 해주고픈 5060"
            title="인생선배"
          />
        </div>

        {/* ✅ 다음 버튼 (약관 모달이 열려도 위치 유지) */}
        <div
          className={`absolute bottom-10 flex justify-center ${
            isTermsOpen ? "opacity-0 pointer-events-none" : ""
          }`}
        >
          <NextButton
            text="다음"
            onClick={handleNextStep}
            disabled={!selectedRole}
          />
        </div>
      </div>

      {/* ✅ 약관 동의 모달 */}
      {isTermsOpen && <TermsStep isModal={true} onClose={handleTermsClose} />}
    </div>
  );
};

export default RoleStep;

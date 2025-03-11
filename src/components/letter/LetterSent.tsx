"use client";

import { useLetterStore } from "@/store/useLetterStore";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import Toggle from "./Toggle";
import { postLetter } from "@/services/userService";

export default function LetterSent() {
  const { myBirdName, selectedBird, title, letter, categoryName, resetLetter } =
    useLetterStore();
  const router = useRouter();
  const [animationData, setAnimationData] = useState(null);
  const [isSending, setIsSending] = useState(false); // ✅ 로딩 상태 추가

  useEffect(() => {
    import(`@/animations/${myBirdName}_deliver.json`).then((data) => {
      setAnimationData(data.default);
    });

    // ✅ API 호출하여 편지 보내기
    async function sendLetter() {
      setIsSending(true); // 🚀 전송 시작
      try {
        const response = await postLetter({
          birdName: selectedBird,
          categoryName: categoryName ?? "기타", // 기본값 처리
          title,
          letter,
        });

        console.log("✅ 편지 전송 성공:", response.message);
      } catch (error) {
        console.error("❌ 편지 전송 실패:", error);
      } finally {
        setIsSending(false); // 🛑 전송 종료
      }
    }

    sendLetter();
  }, [myBirdName, selectedBird, title, letter, categoryName]);

  return (
    <div className="relative flex flex-col items-center text-black">
      {/* 상단 여백 */}
      <div className="mt-[167px] text-center">
        <p className="text-[#292D32] text-[20px] font-bold leading-[28px] tracking-[-0.08px]">
          나의 {myBirdName}가 {selectedBird}에게 <br />
          마음을 정성껏 전달할 거예요
        </p>
      </div>

      {/* 애니메이션 */}
      <div className="mt-[117px]">
        {animationData && (
          <Lottie
            animationData={animationData}
            style={{ width: 216, height: 167 }}
          />
        )}
      </div>

      {/* 안내 박스 */}
      <div className="mt-[171px] w-[343px] h-[64px] border border-[#E5E5EA] bg-[#F0F1EC] rounded-[12px] p-[10px] flex justify-between items-center">
        <div>
          <p className="text-[#6B7178] text-[14px] font-medium">
            빠르면 하루, 최대 7일이 걸릴 수 있어요.
          </p>
          <p className="text-[#6B7178] text-[14px] font-medium">
            답장이 오면 알림을 받을까요?
          </p>
        </div>
        <Toggle />
      </div>

      {/* 홈으로 버튼 */}
      <button
        className="w-[343px] h-[50px] bg-[#292D32] text-white text-[16px] font-semibold rounded-[12px] flex items-center justify-center mt-6 select-none cursor-pointer"
        onClick={() => {
          resetLetter();
          router.push("/home");
        }}
        disabled={isSending} // ✅ 로딩 중 버튼 비활성화
      >
        {isSending ? "전송 중..." : "홈으로"}
      </button>
    </div>
  );
}

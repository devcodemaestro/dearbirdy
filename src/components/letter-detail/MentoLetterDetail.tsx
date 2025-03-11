import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BookMarkIcon from "@/components/Icons/Bookmark_icon";
import ThrowAfterModal from "@/components/letter-storage/ThrowAfterModal";
import ThrowModal from "@/components/letter-storage/ThrowModal";
import { IData } from "./LetterDetailContainer";
import { birdNameMap } from "@/constants/birdNameMap";

interface Props {
  letter: IData;
}

const MentoLetterDetail: React.FC<Props> = ({ letter }) => {
  const router = useRouter();
  const [showThrowModal, setShowThrowModal] = useState(false);
  const [showThrowAfterModal, setShowThrowAfterModal] = useState(false);

  // 새 이름을 한글 → 영어 변환
  const sendUserBirdKey =
    birdNameMap[letter.sendLetter.sendUserBird] || "default";
  const replyUserBirdKey =
    birdNameMap[letter.replyLetter?.replyUserBird] || "default";

  return (
    <div className="relative min-h-screen bg-[#f9f8f3] flex flex-col px-4 gap-2">
      {showThrowModal && (
        <ThrowModal
          letterStatusSeq={letter.letterStatusSeq}
          setShowThrowModal={setShowThrowModal}
          setShowThrowAfterModal={setShowThrowAfterModal}
        />
      )}
      {showThrowAfterModal && (
        <ThrowAfterModal setShowThrowAfterModal={setShowThrowAfterModal} />
      )}

      {/* 헤더 */}
      <header className="relative w-full h-[56px] mt-[59px] flex items-center">
        <Image
          src="/images/icons/arrow_left_icon.svg"
          alt="뒤로 가기"
          width={24}
          height={24}
          onClick={() => router.back()}
        />
        <Image
          src={`/images/birds/${replyUserBirdKey}_24.svg`}
          alt="프로필 새"
          width={24}
          height={24}
          className="ml-2"
        />
        <span className="flex-auto text-[#292D32] font-bold text-base ml-1">
          {letter?.replyLetter.sendUser}
        </span>
        <BookMarkIcon
          letterStatusSeq={letter.letterStatusSeq}
          fill={letter.saved ? "#84A667" : "none"}
          stroke={letter.saved ? "#84A667" : "#C7C7CC"}
        />
      </header>

      {/* 보낸 편지 */}
      <main className="flex flex-col items-center justify-center">
        <div className="w-[343px] p-[16px] pt-[16px] pb-[20px] flex flex-col items-center gap-[24px] border border-[#F0F1EC] bg-[#FFF] rounded-[20px]">
          <div className="flex items-end justify-start gap-2">
            <Image
              src={`/images/birds/${sendUserBirdKey}_50.svg`}
              alt="프로필 새 50"
              width={50}
              height={50}
            />
            <p className="text-[#292D32] text-[23px] leading-[27.6px] font-bold">
              Dear. {letter.sendLetter.replyUser}
            </p>
            <span className="p-[1px_6px] rounded-[6px] bg-[#E5E5EA] text-[#6B7178] text-[14px] font-medium">
              {letter.sendLetter.categoryName}
            </span>
          </div>

          <p className="w-full h-[240px] text-[#292D32] text-[16px] leading-[24px]">
            {letter.sendLetter.letter}
          </p>

          <div className="flex items-center justify-center gap-2">
            <span className="text-[#292D32] text-[18px] font-bold">
              from. {letter.sendLetter.sendUser}
            </span>
          </div>

          {/* 고마움 표시 */}
          {letter.thanksToMentor && (
            <div className="flex w-[311px] h-[50px] p-[13px_16px] items-center rounded-[12px] bg-[#F0F1EC]">
              <Image
                src={`/images/birds/${
                  letter.thanksToMentor === "정성어린 답장에 감동 받았어요!"
                    ? "MOVED"
                    : letter.thanksToMentor === "편지 내용이 도움이 되었어요!"
                    ? "HELPFUL"
                    : "NOT_ALONE"
                }_24.svg`}
                alt="고마움 아이콘"
                width={24}
                height={24}
                className="mr-1"
              />
              <p className="text-[#292D32] text-[16px] font-medium">
                {letter.thanksToMentor}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* 답장 상태 */}
      {!letter.sendLetter ? (
        <div className="w-[342px] p-[14px] flex flex-col items-center gap-[8px] border border-[#4CA7D0] bg-[#F0FDFF] rounded-[14px]">
          <p className="text-[#292D32] text-center text-[16px]">
            후배버디가 답장을 기다리고 있어요.
          </p>
        </div>
      ) : (
        <main className="flex flex-col items-center justify-center">
          <div className="w-[343px] p-[16px] pt-[16px] pb-[20px] flex flex-col items-center gap-[24px] border border-[#F0F1EC] bg-[#FFF] rounded-[20px]">
            <div className="flex items-end justify-start gap-2">
              <Image
                src={`/images/birds/${replyUserBirdKey}_50.svg`}
                alt="프로필 새 50"
                width={50}
                height={50}
              />
              <p className="text-[#292D32] text-[23px] leading-[27.6px] font-bold">
                Dear. {letter.replyLetter.replyUser}
              </p>
              <span className="p-[1px_6px] rounded-[6px] bg-[#E5E5EA] text-[#6B7178] text-[14px] font-medium">
                {letter.replyLetter.categoryName}
              </span>
            </div>

            <p className="w-full h-[240px] text-[#292D32] text-[16px] leading-[24px]">
              {letter.replyLetter.letter}
            </p>

            <div className="flex items-center justify-center gap-2">
              <span className="text-[#292D32] text-[18px] font-bold">
                from. {letter.replyLetter.sendUser}
              </span>
            </div>
          </div>
        </main>
      )}

      {!letter.sendLetter && (
        <>
          <div className="flex items-center justify-center mt-16">
            <p
              className="text-[#84A667] text-[14px] font-medium"
              onClick={() => setShowThrowModal(true)}
            >
              답하기 어렵다면, 다른 새에게 맡기기
            </p>
          </div>
          <div
            className="flex w-full h-[50px] justify-center items-center gap-1 rounded-lg bg-[#292D32]"
            onClick={() => router.push("/reply")}
          >
            <Image
              src="/images/icons/letter_icon.svg"
              alt="편지쓰기 아이콘"
              width={24}
              height={24}
            />
            <span className="text-center text-white text-base">답장 쓰기</span>
          </div>
        </>
      )}
    </div>
  );
};

export default MentoLetterDetail;

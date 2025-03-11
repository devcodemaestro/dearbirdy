import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BookMarkIcon from "@/components/Icons/Bookmark_icon";
import { IData } from "./LetterDetailContainer";
import { getThanks } from "@/services/letterDetail";
import { birdNameMap } from "@/constants/birdNameMap";

interface Props {
  letter: IData;
}

const MenteeLetterDetail: React.FC<Props> = ({ letter }) => {
  const router = useRouter();
  const [showModal, setModal] = useState(false);

  // 새 이름을 한글 → 영어 변환
  const sendUserBirdKey =
    birdNameMap[letter.sendLetter.sendUserBird] || "default";
  const replyUserBirdKey =
    birdNameMap[letter.replyLetter?.replyUserBird] || "default";

  return (
    <div className="relative">
      {showModal && (
        <>
          <div className="absolute inset-0 z-10 bg-[rgba(51,51,51,0.80)]"></div>
          <div className="fixed bottom-0 left-0 z-20 w-[375px] p-[24px_16px_44px_16px] flex flex-col items-center rounded-t-[30px] bg-[#F9F8F3]">
            <div
              className="flex justify-end w-full"
              onClick={() => setModal(false)}
            >
              <Image
                src="/images/icons/close_icon.svg"
                alt="닫기 아이콘"
                width={24}
                height={24}
              />
            </div>
            <div className="text-[#292D32] text-center font-semibold text-[18px] leading-[26px] mt-4">
              답장이 도움이 되셨나요?
            </div>
            <div className="text-[#292D32] text-center text-[14px] leading-[22px] mt-2 mb-6">
              {letter.replyLetter.replyUser}의 답장에 고마움을 보내주세요!
            </div>
            <div
              className="flex w-full h-[80px] p-[20px_16px] items-center rounded-[20px] border border-[#D6E173] bg-[#FFF]"
              onClick={() => getThanks(letter.replyLetter.letterSeq, "MOVED")}
            >
              <Image
                src="/images/birds/MOVED_40.svg"
                alt="고마움 40"
                width={40}
                height={40}
                className="mr-2"
              />
              <p className="text-[#292D32] text-[18px] font-medium">
                정성어린 답장에 감동 받았어요!
              </p>
            </div>
          </div>
        </>
      )}

      {/* 헤더 */}
      <header className="flex items-center w-full h-[56px] mt-[59px]">
        <div className="cursor-pointer select-none ">
          <Image
            src="/images/icons/arrow_left_icon.svg"
            alt="뒤로 가기"
            width={24}
            height={24}
            onClick={() => router.back()}
          />
        </div>
        <Image
          src={`/images/birds/${sendUserBirdKey}_24.svg`}
          alt="프로필 새"
          width={24}
          height={24}
          className="ml-2"
        />
        <span className="flex-auto text-[#292D32] font-bold text-base ml-1">
          {letter.replyLetter
            ? letter.sendLetter.sendUser
            : "답장을 기다리는 중"}
        </span>
        <BookMarkIcon
          letterStatusSeq={letter.letterStatusSeq}
          fill={letter.saved ? "#84A667" : "none"}
          stroke={letter.saved ? "#84A667" : "#C7C7CC"}
        />
      </header>

      {/* 받은 편지 내용 */}
      {letter.replyLetter ? (
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

            {/* 고마움 표시 */}
            {letter.thanksToMentor ? (
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
            ) : (
              <div
                className="flex w-[311px] h-[50px] px-[16px] py-[13px] items-center rounded-[12px] bg-[#84A667]"
                onClick={() => setModal(true)}
              >
                <Image
                  src="/images/icons/heart_icon.svg"
                  alt="하트 아이콘"
                  width={24}
                  height={24}
                  className="mr-1"
                />
                <span className="text-white text-[16px] font-medium">
                  고마움 표시하기
                </span>
              </div>
            )}
          </div>
        </main>
      ) : (
        // 답장 대기 중
        <div className="w-[342px] p-[14px] flex flex-col items-center gap-[8px] border border-[#4CA7D0] bg-[#F0FDFF] rounded-[14px]">
          <p className="text-[#6B7178] text-center text-[14px] font-bold">
            따뜻한 말이 담긴 답장을 작성하고 있어요
          </p>
          <p className="text-[#292D32] text-center text-[16px]">
            빠르면 1일, 최대 7일이 걸릴 수 있어요
          </p>
        </div>
      )}
    </div>
  );
};

export default MenteeLetterDetail;

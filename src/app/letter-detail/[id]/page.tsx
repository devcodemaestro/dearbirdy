"use client";

import { IUserData } from "@/app/(footershare)/home/page";
import BookMarkIcon from "@/components/Icons/Bookmark_icon";
import { getLetterDetail } from "@/services/letterDetail";
import { useBookMarkStore } from "@/store/bookMarkStore";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ILetter {
  letterSeq: number;
  replyUserBird: string;
  replyUser: string;
  letterTitle: string;
  categoryName: string;
  letter: string;
  creatAt: string;
  sendUserBird: string;
  sendUser: string;
}

interface IData {
  replyLetter: ILetter;
  sendLetter: ILetter;
  saved: boolean;
}

const LetterDetailId: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [letter, setLetter] = useState<IData | undefined>(undefined);
  const { bookMark } = useBookMarkStore();

  const [userData, setUserData] = useState<IUserData>();

  useEffect(() => {
    const fetchLetterDetail = async () => {
      try {
        if (id) {
          const data = await getLetterDetail(id);
          setLetter(data);
        } else {
          console.error("ID가 없습니다.");
        }
      } catch (error) {
        console.error("편지 상세 정보 가져오기 실패:", error);
      }
    };
    fetchLetterDetail();
  }, [id, bookMark]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("userData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log(parsedData);

      setUserData(parsedData);
    }
  }, []);

  // 날짜 형식
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = date.getDate();
    const hours = date.getHours();

    // 시간에 따라 아침, 점심, 저녁 구분
    let timeOfDay = "";
    if (hours >= 6 && hours < 12) {
      timeOfDay = "아침";
    } else if (hours >= 12 && hours < 14) {
      timeOfDay = "점심";
    } else if (hours >= 14 && hours < 19) {
      timeOfDay = "저녁";
    } else {
      timeOfDay = "밤";
    }

    const hour = hours % 12 || 12; // 12시간제 포맷으로 변환

    return `${month}월 ${day}일, ${timeOfDay} ${hour}시의 마음`;
  };

  let replyDate = "";
  let sendDate = "";

  if (letter) {
    replyDate = formatDate(letter.replyLetter.creatAt);
    sendDate = formatDate(letter.sendLetter.creatAt);
  }

  if (!letter) return <div>Loading</div>;

  return (
    <div className="min-h-screen bg-[#f9f8f3] flex flex-col px-4 gap-2">
      <header className="relative w-full h-[56px] mt-[59px] flex items-center">
        <Image
          src="/images/icons/arrow_left_icon.svg"
          alt="왼쪽 방향 아이콘"
          width={24}
          height={24}
          onClick={() => router.back()}
        />
        <Image
          src={`/images/birds/${letter.sendLetter.sendUserBird}_24.svg`}
          alt="프로필 새 24"
          width={24}
          height={24}
          className="ml-2"
        />
        <span className="flex-auto text-[#292D32] font-bold text-base leading-6 tracking-tight ml-1">
          {letter.replyLetter
            ? `${letter?.sendLetter.sendUser}`
            : "답장을 기다리는중"}
        </span>
        <Image
          src="/images/icons/more_icon.svg"
          alt="더보기 아이콘"
          width={24}
          height={24}
          className="mr-2"
        />
        <BookMarkIcon
          letterStatusSeq={
            userData?.roleName === "MENTEE"
              ? letter.sendLetter.letterSeq
              : letter.replyLetter.letterSeq
          }
          fill={letter.saved ? "#84A667" : "none"}
          stroke={letter.saved ? "#84A667" : "#C7C7CC"}
        />
      </header>

      {letter.replyLetter ? (
        // 받은 편지
        <main className="flex flex-col items-center justify-center">
          <div className="w-[343px] p-[16px] pt-[16px] pb-[20px] flex flex-col items-center gap-[24px] border border-[#F0F1EC] bg-[#FFF] rounded-[20px]">
            <div className="flex flex-col w-full gap-4">
              <div className="flex justify-start gap-2">
                <Image
                  src="/images/icons/direct_inbox_icon.svg"
                  alt="받은편지 아이콘"
                  width={16}
                  height={16}
                />
                <span className="text-[#4CA7D0] font-pretendard text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
                  받은 편지
                </span>
              </div>
              <div className="flex items-end justify-start gap-2">
                <Image
                  src={`/images/birds/${letter.replyLetter.replyUserBird}_50.svg`}
                  alt="프로필 새 50"
                  width={50}
                  height={50}
                />
                <p className="text-[#000] text-[23px] font-normal leading-[27.6px]">
                  Dear, {letter.replyLetter.replyUser}
                </p>
                <span className="p-[1px_6px] rounded-[6px] bg-[#E5E5EA] text-[#6B7178] text-center text-[14px] font-medium leading-[20px] tracking-[-0.056px]">
                  {letter.replyLetter.categoryName}
                </span>
              </div>
            </div>
            <p className="w-full h-[240px] text-[#292D32] text-[16px] font-normal leading-[24px] tracking-[-0.064px]   ">
              {letter.replyLetter.letter}
            </p>
            <div className="flex flex-col items-start w-full gap-2 ">
              <p className="text-right text-[#8E8E93] text-xs font-normal leading-4 tracking-[-0.048px]">
                {replyDate}
              </p>
              <div className="flex items-center justify-center gap-2">
                <Image
                  src={`/images/birds/${letter.replyLetter.sendUserBird}_24.svg`}
                  alt="프로필 새 24"
                  width={24}
                  height={24}
                />
                <span className="text-right text-[#292D32] font-sandoll-baikzongyulpil text-[18px] font-normal leading-[21.6px]">
                  from, {letter.replyLetter.sendUser}
                </span>
              </div>
            </div>
          </div>
        </main>
      ) : (
        // 답장 기다리고 있을때 배너
        <div className="w-[342px] p-[14px] flex flex-col items-center gap-[8px] border border-[#4CA7D0] bg-[#F0FDFF] rounded-[14px]">
          <p className="text-[#6B7178] text-center text-[14px] font-bold leading-[20px] tracking-[-0.056px]">
            따뜻한 말이 담긴 답장을 작성하고 있어요
          </p>
          <p className="text-[#292D32] text-center text-[16px] font-normal leading-[24px] track ing-[-0.064px]">
            빠르면 1일, 최대 7일이 걸릴 수 있어요
          </p>
        </div>
      )}

      {/* 보낸 편지 */}
      <main className="flex flex-col items-center justify-center">
        <div className="w-[343px] p-[16px] pt-[16px] pb-[20px] flex flex-col items-center gap-[24px] border border-[#F0F1EC] bg-[#FFF] rounded-[20px]">
          <div className="flex flex-col w-full gap-4">
            <div className="flex justify-start gap-2">
              <Image
                src="/images/icons/direct_send_icon.svg"
                alt="보낸편지 아이콘"
                width={16}
                height={16}
              />
              <span className="text-[#8E8E93] font-pretendard text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
                보낸 편지
              </span>
            </div>
            <div className="flex items-end justify-start gap-2">
              <Image
                src={`/images/birds/${letter.sendLetter.replyUserBird}_50.svg`}
                alt="프로필 새 50"
                width={50}
                height={50}
              />
              <p className="text-[#000] text-[23px] font-normal leading-[27.6px]">
                Dear, {letter.sendLetter.replyUser}
              </p>
              <span className="p-[1px_6px] rounded-[6px] bg-[#E5E5EA] text-[#6B7178] text-center text-[14px] font-medium leading-[20px] tracking-[-0.056px]">
                {letter.sendLetter.categoryName}
              </span>
            </div>
          </div>
          <p className="w-full h-[240px] text-[#292D32] text-[16px] font-normal leading-[24px] tracking-[-0.064px]   ">
            {letter.sendLetter.letter}
          </p>
          <div className="flex flex-col items-start w-full gap-2 ">
            <p className="text-right text-[#8E8E93] text-xs font-normal leading-4 tracking-[-0.048px]">
              {sendDate}
            </p>
            <div className="flex items-center justify-center gap-2">
              <Image
                src={`/images/birds/${letter.sendLetter.sendUserBird}_24.svg`}
                alt="프로필 새 24"
                width={24}
                height={24}
              />
              <span className="text-right text-[#292D32] font-sandoll-baikzongyulpil text-[18px] font-normal leading-[21.6px]">
                from, {letter.sendLetter.sendUser}
              </span>
            </div>
          </div>
        </div>
      </main>
      <div className="h-2"></div>
    </div>
  );
};

export default LetterDetailId;

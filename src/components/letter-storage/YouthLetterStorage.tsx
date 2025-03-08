"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import HomeLetterIcon from "../Icons/Home_letter_icon";
import BookMarkIcon from "../Icons/Bookmark_icon";
import BirdyTip from "./BirdyTip";
import { IData } from "@/app/(footershare)/letter-storage/page";
import {
  getLetterAll,
  getLetterSaved,
  getLetterWait,
} from "@/services/letterStorage";
import { useRouter } from "next/navigation";
import { useBookMarkStore } from "@/store/bookMarkStore";

const YouthLetterStorage: React.FC = () => {
  const category = ["전체", "답장 기다리는 편지", "저장한 편지"];
  const [cateNum, setCateNum] = useState<number>(1);
  const [letters, setLetters] = useState<IData | undefined>(undefined);
  const [totalLetters, setTotalLetters] = useState<IData | undefined>();

  const { bookMark } = useBookMarkStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showToast, setShowToast] = useState(false);

  const router = useRouter();
  const isFirstRender = useRef(true); // 첫 렌더링 여부를 추적

  // 페이지 어떻게 할지? pageNum 처리
  const pageNum = 1;

  useEffect(() => {
    const fetchData = async () => {
      if (isFirstRender.current) {
        setIsLoading(true);
      }

      try {
        let data;
        if (cateNum === 1) {
          data = await getLetterAll(pageNum);
          setTotalLetters(data.data);
        } else if (cateNum === 2) {
          data = await getLetterWait(pageNum);
        } else {
          data = await getLetterSaved(pageNum);
        }

        setLetters(data.data);
      } catch (error) {
        console.error("편지 데이터 불러오기 실패:", error);
      } finally {
        if (isFirstRender.current) {
          setIsLoading(false); // 첫 로딩 완료 후 로딩 해제
          isFirstRender.current = false; // 이후에는 로딩 안 보이도록 설정
        }
      }
    };

    fetchData();
  }, [cateNum, bookMark]);

  const categoryClicked = (idx: number) => {
    console.log(idx);

    setCateNum(idx);
  };
  const cardClicked = (id: number) => {
    router.push(`/letter-detail/${id}`);
  };
  const letterBtnClicked = () => {
    router.push(`/send`);
  };

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (isLoading) {
    return <div className="mt-10 text-center">로딩 중...</div>;
  }

  return (
    <>
      <header className="flex gap-1 py-[11px] items-center mt-[59px] ">
        {category.map((title, idx) => (
          <span
            key={idx}
            onClick={() => {
              if (totalLetters?.totalData !== 0) {
                categoryClicked(idx + 1);
              }
            }}
            className={`px-3.5 py-1.5 rounded-[20px] min-w-[53px] text-center ${
              cateNum === idx + 1
                ? "bg-[#292D32] text-[#FFF]"
                : "bg-[#F9F8F3] border border-[#E5E5EA] text-[#C7C7CC]"
            }`}
          >
            {title}
          </span>
        ))}
      </header>
      {totalLetters?.totalData !== 0 ? (
        <main className="">
          <div className="grid w-full min-w-[343px] grid-cols-2 gap-2">
            {letters?.dataList.map((data, idx) => (
              <div
                onClick={() => cardClicked(data.letterStatusSeq)}
                key={idx}
                className={`rounded-[16px] h-[182px] bg-white flex flex-col flex-1 p-4 ${
                  !data.read && data.birdName !== "익명새"
                    ? "border border-[#84A667]"
                    : ""
                }`}
              >
                <div className="flex justify-between">
                  <Image
                    src={`/images/birds/${data.birdName}_60.svg`}
                    alt="보관함 새 프로필"
                    width={60}
                    height={60}
                  />
                  <div onClick={(e) => e.stopPropagation()}>
                    {/* 이벤트 전파 방지 */}
                    <BookMarkIcon
                      bookMarkToast={data.saved}
                      handleShowToast={handleShowToast}
                      letterStatusSeq={data.letterStatusSeq}
                      fill={data.saved ? "#84A667" : "none"}
                      stroke={data.saved ? "#84A667" : "#C7C7CC"}
                    />
                  </div>
                </div>
                <div className="text-[#292D32] text-[14px] font-normal leading-[22px] tracking-[-0.056px] mt-[5px]">
                  {data.nickname}
                </div>
                <div className="text-[#292D32] text-[16px] font-bold leading-[24px] tracking-[-0.064px] mb-[15px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {data.title}
                </div>
                {!data.read &&
                  data.birdName !== "익명새" &&
                  data.thanksToMentor && (
                    <span className="inline-flex rounded-md bg-[#D6E173] h-6 px-2 w-fit items-center text-[#292D32] text-[12px] font-medium leading-[16px] tracking-[-0.048px] text-center">
                      답장 도착
                    </span>
                  )}
              </div>
            ))}
          </div>
        </main>
      ) : (
        // 데이터 없을때 UI
        <>
          <main className="flex flex-grow">
            <div className="flex flex-col items-center w-full rounded-[30px] border border-[#F4F5EF] bg-white px-4">
              <p className="text-[#292D32] text-center font-medium text-[16px] leading-[24px] tracking-[-0.064px] mt-[32px]">
                편지를 써보세요
              </p>
              <p className="text-[#292D32] text-center font-bold text-[18px] leading-[26px] tracking-[-0.072px] mt-2">
                나의 현재 고민을 편지에 쓰고 <br />
                버디에게 보내볼까요?
              </p>

              <Image
                src="/images/birds/letter_storage_bird.svg"
                alt="편지보관함 새 이미지"
                width={300}
                height={260}
                className="mt-8"
              />

              <div
                className="flex w-full h-[50px] justify-center items-center gap-1 rounded-[12px] bg-[#292D32] mt-8 mb-6"
                onClick={letterBtnClicked}
              >
                <HomeLetterIcon fill="#FFF" />
                <span className="text-center text-white font-pretendard text-base leading-6 tracking-[-0.064px]">
                  편지쓰기
                </span>
              </div>
            </div>
          </main>

          <BirdyTip />
        </>
      )}
      <div className="fixed flex flex-col items-center translate-x-1/2 bottom-10 right-1/2">
        {showToast && (
          <div className="fixed text-sm text-white rounded-xl  bg-[rgba(100,100,100,0.8)] flex w-[323px] h-[56px] px-5 py-[19px] justify-center items-center shadow-lg bottom-10 animate-bounce">
            책갈피는 &apos;저장한 편지&apos;에서 확인할 수 있어요!
          </div>
        )}
      </div>
    </>
  );
};

export default YouthLetterStorage;

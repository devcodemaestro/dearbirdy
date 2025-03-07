"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import BookMarkIcon from "../Icons/Bookmark_icon";
import {
  getLetterAll,
  getLetterSaved,
  getLetterWait,
} from "@/services/letterStorage";
import { useRouter } from "next/navigation";
import { useBookMarkStore } from "@/store/bookMarkStore";
import { IData } from "@/app/(footershare)/letter-storage/page";
import BirdyTip from "./BirdyTip";

const SeniorLetterStorage: React.FC = () => {
  const category = ["전체", "답장 해야하는 편지", "저장한 편지"];
  const [cateNum, setCateNum] = useState<number>(1);
  const [letters, setLetters] = useState<IData | undefined>(undefined);
  const [totalLetters, setTotalLetters] = useState<IData | undefined>();
  const { bookMark } = useBookMarkStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
  console.log(totalLetters?.dataList?.length);

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
              if (totalLetters?.dataList?.length !== 0) {
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
      {totalLetters?.dataList?.length !== 0 ? (
        <main className="">
          <div className="grid w-full grid-cols-2 gap-2">
            {letters?.dataList.map((data, idx) => (
              <div
                onClick={() => cardClicked(data.letterStatusSeq)}
                key={idx}
                className={`rounded-[16px] h-[182px] bg-white flex flex-col flex-1 p-4`}
              >
                <div className="flex justify-between">
                  <Image
                    src={`/images/birds/${data.birdName}_60.svg`}
                    alt="보관함 새 프로필"
                    width={60}
                    height={60}
                  />
                  <div onClick={(e) => e.stopPropagation()}>
                    {" "}
                    {/* 이벤트 전파 방지 */}
                    <BookMarkIcon
                      letterStatusSeq={data.letterStatusSeq}
                      fill={data.saved ? "#84A667" : "none"}
                      stroke={data.saved ? "#84A667" : "#C7C7CC"}
                    />
                  </div>
                </div>
                <div className="text-[#292D32] text-[14px] font-normal leading-[22px] tracking-[-0.056px] mt-[5px]">
                  {data.birdName}
                </div>
                <div className="text-[#292D32] text-[16px] font-bold leading-[24px] tracking-[-0.064px] mb-[39px]">
                  {data.title}
                </div>
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
                조금만 기다려 주세요
              </p>
              <p className="text-[#292D32] text-center font-bold text-[18px] leading-[26px] tracking-[-0.072px] mt-2">
                선배 버디님의 조언이 듣고 싶은 <br />
                인생후배 버디들이 편지를 쓰고 있어요
              </p>

              <Image
                src="/images/birds/letter_storage_bird.svg"
                alt="편지보관함 새 이미지"
                width={300}
                height={260}
                className="mt-8 mb-6"
              />
            </div>
          </main>

          <BirdyTip />
        </>
      )}
    </>
  );
};

export default SeniorLetterStorage;

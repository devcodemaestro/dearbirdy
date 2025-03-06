"use client";
import Image from "next/image";
import React, { useState } from "react";
import BookMarkIcon from "../Icons/Bookmark_icon";

interface IData {
  letterStatusSeq: number;
  birdName: string;
  nickname: string;
  title: string;
  read: boolean;
  saved: boolean;
}

interface IDummy {
  pageNumber: number;
  totalPage: number;
  totalData: number;
  dataList: IData[];
}

const SeniorLetterStorage: React.FC = () => {
  const category = ["전체", "답장 해야하는 편지", "저장한 편지"];
  const [cateNum, setCateNum] = useState<number>(1);
  const categoryClicked = (idx: number) => {
    console.log(idx);

    setCateNum(idx);
  };

  const dummy: IDummy = {
    pageNumber: 1,
    totalPage: 1,
    totalData: 2,
    dataList: [
      {
        letterStatusSeq: 4,
        birdName: "벌새",
        nickname: "새새벌",
        title: "젤최신",
        read: true,
        saved: true,
      },
      {
        letterStatusSeq: 3,
        birdName: "카나리아",
        nickname: "카타",
        title: "최신순",
        read: true,
        saved: false,
      },
      {
        letterStatusSeq: 2,
        birdName: "파랑새",
        nickname: "희망찬 블루버드",
        title: "dear 짱구2",
        read: false,
        saved: false,
      },
      {
        letterStatusSeq: 1,
        birdName: "올빼미",
        nickname: "짱구",
        title: "dear 단지공주1",
        read: true,
        saved: true,
      },
    ],
  };

  const dummyWait: IDummy = {
    pageNumber: 1,
    totalPage: 1,
    totalData: 1,
    dataList: [
      {
        letterStatusSeq: 2,
        birdName: "익명새",
        nickname: "익명새",
        title: "아직 답장안옴",
        read: false,
        saved: false,
      },
      {
        letterStatusSeq: 1,
        birdName: "익명새",
        nickname: "익명새",
        title: "읽어주세요",
        read: false,
        saved: false,
      },
    ],
  };
  const dummySaved: IDummy = {
    pageNumber: 1,
    totalPage: 1,
    totalData: 1,
    dataList: [
      {
        letterStatusSeq: 2,
        birdName: "벌새",
        nickname: "새새벌",
        title: "젤최신",
        read: true,
        saved: true,
      },
      {
        letterStatusSeq: 1,
        birdName: "올빼미",
        nickname: "짱구",
        title: "dear 단지공주1",
        read: true,
        saved: true,
      },
    ],
  };

  return (
    <>
      <header className="flex gap-1 py-[11px] items-center mt-[59px] ">
        {category.map((title, idx) => (
          <span
            key={idx}
            onClick={() => categoryClicked(idx + 1)}
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
      {dummy ? (
        cateNum === 1 ? (
          // 데이터 있을때 전체 UI (카테고리 1)
          <main className="">
            <div className="grid w-full grid-cols-2 gap-2">
              {dummy.dataList.map((data, idx) => (
                <div
                  key={idx}
                  className={`rounded-[16px] h-[182px] ${
                    data.read ? "" : "border border-[#84A667]"
                  } bg-white flex flex-col flex-1 p-4`}
                >
                  <div className="flex justify-between">
                    <Image
                      src={`/images/birds/${data.birdName}_60.svg`}
                      alt="보관함 새 프로필"
                      width={60}
                      height={60}
                    />
                    <BookMarkIcon
                      fill={data.saved ? "#84A667" : "none"}
                      stroke={data.saved ? "#84A667" : "#C7C7CC"}
                    />
                  </div>
                  <div className="text-[#292D32] text-[14px] font-normal leading-[22px] tracking-[-0.056px] mt-[5px]">
                    {data.nickname}
                  </div>
                  <div className="text-[#292D32] text-[16px] font-bold leading-[24px] tracking-[-0.064px]">
                    {data.title}
                  </div>
                  {data.read ? null : (
                    <div className="flex w-[61px] h-[24px] px-[8px] py-[1px] justify-center items-center rounded-[6px] bg-[#D6E173] mt-[15px]">
                      <span className="text-center text-[#292D32] text-[12px] font-medium leading-[16px] tracking-[-0.048px]">
                        답장 도착
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>
        ) : cateNum === 2 ? (
          // 데이터 있을때 답장기다리는 편지 UI (카테고리 2)
          <main className="">
            <div className="grid w-full grid-cols-2 gap-2">
              {dummyWait.dataList.map((data, idx) => (
                <div
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
                    <BookMarkIcon
                      fill={data.saved ? "#84A667" : "none"}
                      stroke={data.saved ? "#84A667" : "#C7C7CC"}
                    />
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
        ) : cateNum === 3 ? (
          // 데이터 있을때 저장한 편지 UI (카테고리 3)
          <main className="">
            <div className="grid w-full grid-cols-2 gap-2">
              {dummySaved.dataList.map((data, idx) => (
                <div
                  key={idx}
                  className={`rounded-[16px] h-[182px] ${
                    data.read ? "" : "border border-[#84A667]"
                  } bg-white flex flex-col flex-1 p-4`}
                >
                  <div className="flex justify-between">
                    <Image
                      src={`/images/birds/${data.birdName}_60.svg`}
                      alt="보관함 새 프로필"
                      width={60}
                      height={60}
                    />
                    <BookMarkIcon
                      fill={data.saved ? "#84A667" : "none"}
                      stroke={data.saved ? "#84A667" : "#C7C7CC"}
                    />
                  </div>
                  <div className="text-[#292D32] text-[14px] font-normal leading-[22px] tracking-[-0.056px] mt-[5px]">
                    {data.nickname}
                  </div>
                  <div className="text-[#292D32] text-[16px] font-bold leading-[24px] tracking-[-0.064px]">
                    {data.title}
                  </div>
                  {data.read ? null : (
                    <div className="flex w-[61px] h-[24px] px-[8px] py-[1px] justify-center items-center rounded-[6px] bg-[#D6E173] mt-[15px]">
                      <span className="text-center text-[#292D32] text-[12px] font-medium leading-[16px] tracking-[-0.048px]">
                        답장 도착
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>
        ) : null
      ) : (
        // 데이터 없을때 UI
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
      )}
    </>
  );
};

export default SeniorLetterStorage;

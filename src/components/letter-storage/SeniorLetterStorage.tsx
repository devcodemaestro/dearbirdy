"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BookMarkIcon from "../Icons/Bookmark_icon";
import {
  getLetterAll,
  getLetterSaved,
  getLetterWait,
} from "@/services/letterStorage";
import { useRouter } from "next/navigation";
import { useBookMarkStore } from "@/store/bookMarkStore";
import { Letter } from "@/app/(footershare)/letter-storage/page";
import BirdyTip from "./BirdyTip";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

const queryClient = new QueryClient();

const SeniorLetterStorage: React.FC = () => {
  const category = ["전체", "답장 해야하는 편지", "저장한 편지"];
  const [cateNum, setCateNum] = useState<number>(1);
  const { bookMark } = useBookMarkStore();
  const router = useRouter();

  const [showToast, setShowToast] = useState(false);

  const fetchLetters = async ({ pageParam }: { pageParam: number }) => {
    if (cateNum === 1) return await getLetterAll(pageParam);
    if (cateNum === 2) return await getLetterWait(pageParam);
    return await getLetterSaved(pageParam);
  };

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["letters", cateNum, bookMark],
      queryFn: fetchLetters,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.pageNumber < lastPage.totalPage) {
          return lastPage.pageNumber + 1;
        }
        return undefined;
      },
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    console.log(data);
    console.log("hasNextPage: ", hasNextPage);
    console.log("isFetchingNextPage: ", isFetchingNextPage);
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (isLoading) {
    return <div className="mt-10 text-center">로딩 중...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="mb-[60px]">
        {/* 헤더 */}
        <header className="fixed top-0 w-[343px] flex gap-1 h-[115px] py-[11px] items-end bg-[#F9F8F3]">
          {category.map((title, idx) => (
            <span
              key={idx}
              onClick={() => setCateNum(idx + 1)}
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
        {data?.pageParams ? (
          <main className="overflow-y-auto mt-[110px] min-h-[calc(100vh)]">
            <div className="grid w-full min-w-[343px] grid-cols-2 gap-2">
              {data?.pages.map((page) =>
                page.dataList.map((letter: Letter) => (
                  <div
                    key={letter.letterStatusSeq}
                    onClick={() =>
                      router.push(`/letter-detail/${letter.letterStatusSeq}`)
                    }
                    className="rounded-[16px] h-[182px] bg-white flex flex-col flex-1 p-4"
                  >
                    <div className="flex justify-between">
                      <Image
                        src={`/images/birds/${letter.birdName}_60.svg`}
                        alt="보관함 새 프로필"
                        width={60}
                        height={60}
                      />
                      <div onClick={(e) => e.stopPropagation()}>
                        {/* 이벤트 전파 방지 */}
                        <BookMarkIcon
                          bookMarkToast={letter.saved}
                          handleShowToast={handleShowToast}
                          letterStatusSeq={letter.letterStatusSeq}
                          fill={letter.saved ? "#84A667" : "none"}
                          stroke={letter.saved ? "#84A667" : "#C7C7CC"}
                        />
                      </div>
                    </div>
                    <div className="text-[#292D32] text-[14px] font-normal leading-[22px] tracking-[-0.056px] mt-[5px]">
                      {letter.nickname}
                    </div>
                    <div className="text-[#292D32] text-[16px] font-bold leading-[24px] tracking-[-0.064px] mb-[15px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {letter.title}
                    </div>
                    {!letter.read && (
                      <span className="inline-flex rounded-md bg-[#D6E173] h-6 px-2 w-fit items-center text-[#292D32] text-[12px] font-medium leading-[16px] tracking-[-0.048px] text-center">
                        편지 도착
                      </span>
                    )}
                    {letter.thanksToMentor && (
                      <span className="inline-flex rounded-md bg-[#FFD85B] h-6 px-2 w-fit items-center text-[#292D32] text-[12px] font-medium leading-[16px] tracking-[-0.048px] text-center">
                        고마움 도착
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
            <div ref={ref} className="h-10" />
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
        {/* 책갈피 토스트 메세지 */}
        <div className="fixed flex flex-col items-center translate-x-1/2 bottom-10 right-1/2">
          {showToast && (
            <div className="fixed text-sm text-white rounded-xl  bg-[rgba(100,100,100,0.8)] flex w-[323px] h-[56px] px-5 py-[19px] justify-center items-center shadow-lg bottom-10 animate-bounce">
              책갈피는 &apos;저장한 편지&apos;에서 확인할 수 있어요!
            </div>
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default SeniorLetterStorage;

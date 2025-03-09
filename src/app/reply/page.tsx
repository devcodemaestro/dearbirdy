"use client";

import { useLetterInfoStore } from "@/store/letterInfoStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const ReplyPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [charCount, setCharCount] = useState(0);
  const { categoryName } = useLetterInfoStore();

  const handleChange = (value: string) => {
    setCharCount(value.length); // 글자 수 업데이트
  };

  const onSubmit = (data: FormValues) => {
    console.log("폼 데이터:", data);
  };
  return (
    <div className="w-full min-h-screen bg-[#f9f8f3] flex flex-col px-4">
      <header className="w-full h-[56px] mt-[59px] flex justify-between items-center">
        <Image
          src="/images/icons/arrow_left_icon.svg"
          alt="왼쪽 방향 아이콘"
          width={24}
          height={24}
          className=""
          onClick={() => router.back()}
        />
        <div
          className={`flex h-10 px-4 py-2 items-center gap-1 rounded-[10px] ${
            charCount === 0 ? "bg-[#D1D1D6]" : "bg-[#84A667]"
          }`}
        >
          <span
            className={`text-center text-sm font-medium leading-[20px] tracking-[-0.056px] ${
              charCount === 0 ? "text-[#8E8E93]" : "text-[#F0F1EC]"
            } `}
          >
            다음
          </span>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-start w-full mt-2.5">
          <p className="text-[#292D32] text-xl font-bold leading-7 tracking-[-0.08px]">
            {categoryName}에 대한 고민을 보내온 마음에
            <br />
            답장을 써주세요
          </p>
        </div>
        <div className="flex items-center justify-start w-full mt-[7px]">
          <p className="text-[#84A667] text-center text-sm font-medium leading-5 tracking-[-0.056px] underline">
            답장 이렇게 쓰세요
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mt-[13px]"
        >
          {/* 제목 입력 필드 */}
          <div className="flex w-[375px] p-4 flex-col items-start border-b border-[#E5E5EA]">
            <input
              {...register("name", {
                required: "편지 제목을 입력 해 주세요",
              })}
              placeholder="이 편지의 제목을 알려주세요"
              className="text-[#000] placeholder-[#C7C7CC] text-[16px] font-medium leading-6 tracking-[-0.064px] focus:outline-none"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* 내용 필드 */}
          <div className="flex w-[375px] h-[392px] p-4 flex-col">
            <input
              {...register("email", {
                required: "편지 내용을 입력해주세요",
              })}
              placeholder="편지 내용을 입력해주세요"
              className="text-[#000] placeholder-[#C7C7CC] text-[16px] font-medium leading-6 tracking-[-0.064px] focus:outline-none"
              onChange={(e) => handleChange(e.target.value)}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex justify-end mt-2 mr-4">
            <span className="text-[#AEAEB2] text-center text-sm font-medium leading-5 tracking-[-0.056px]">
              {charCount}/300자
            </span>
          </div>
          <div className="w-full h-1 mt-1.5 rounded-[10px] bg-[#E5E5EA]"></div>
        </form>
      </main>
    </div>
  );
};

export default ReplyPage;

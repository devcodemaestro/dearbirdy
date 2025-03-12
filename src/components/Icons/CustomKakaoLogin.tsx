import { getKakaoLoginUrl } from "@/lib/kakaoAuth";
import Image from "next/image";

export default function CustomKakaoLogin() {
  return (
    <button
      className="cursor-pointer select-none flex h-[50px] w-[343px] items-center justify-center gap-2 rounded-[12px] bg-[#FEE500] px-4"
      onClick={() => {
        window.location.href = getKakaoLoginUrl();
      }}
    >
      <Image
        src="images/logo/kakao-logo.svg"
        alt="카카오 로고"
        width={18}
        height={18}
      />
      <span className="text-[15px] font-semibold leading-[22.5px] text-[rgba(0,0,0,0.85)]">
        카카오로 회원가입
      </span>
    </button>
  );
}

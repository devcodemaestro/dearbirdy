"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    text: "설정",
    icon: "/images/my-buddy/setup.svg",
    route: "/mybuddy/settings",
  },
  { text: "FAQ", icon: "/images/my-buddy/faq.svg", route: "/mybuddy/faq" },
  {
    text: "마이 버디 새롭게 찾기",
    icon: "/images/my-buddy/find.svg",
    route: "/mybuddy/find-buddy",
  },
  {
    text: "버디 유형 모두 보기",
    icon: "/images/my-buddy/types.svg",
    route: "/mybuddy/all-buddy-types",
  },
];

export default function SettingsMenu() {
  const router = useRouter();

  return (
    <div className="w-[343px] border select-none cursor-pointer border-[#F4F5EF] bg-white rounded-[20px] p-4 flex flex-col gap-[18px]">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center"
          onClick={() => router.push(item.route)}
        >
          <div className="flex items-center gap-[4px]">
            <Image src={item.icon} alt={item.text} width={20} height={20} />
            <span className="text-[#292D32] text-[16px] font-medium">
              {item.text}
            </span>
          </div>
          <Image
            src="/images/icons/arrow-right.svg"
            alt=">"
            width={16}
            height={16}
          />
        </div>
      ))}
    </div>
  );
}

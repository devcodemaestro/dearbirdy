"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import HomeIcon from "../Icons/Footer_home_icon";
import LetterIcon from "../Icons/Footer_letter_icon";
import MyBirdyIcon from "../Icons/Footer_mybirdy_icon";

const Footer: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const menuItems = [
    { id: 1, Icon: HomeIcon, label: "홈", path: "/home" },
    { id: 2, Icon: LetterIcon, label: "편지 보관함", path: "/letter-storage" },
    { id: 3, Icon: MyBirdyIcon, label: "마이버디", path: "/new-page" },
  ];

  const initialIcon = menuItems.find((item) => item.path === pathname)?.id || 1;
  const [selectedIcon, setSelectedIcon] = useState<number>(initialIcon);

  const iconClicked = (id: number) => {
    setSelectedIcon(id);
    const selectedItem = menuItems.find((item) => item.id === id);
    if (selectedItem) {
      router.push(selectedItem.path);
    }
  };

  return (
    <div className="w-full h-[60px] flex justify-around items-center self-stretch border-t border-[#F0F1EC] bg-[#F9F8F3]">
      {menuItems.map(({ id, Icon, label }) => (
        <div
          key={id}
          className="flex flex-col items-center justify-center gap-1 cursor-pointer"
          onClick={() => iconClicked(id)}
        >
          <Icon fill={selectedIcon === id ? "#292D32" : "#AEAEB2"} />
          <span
            className={`text-center font-pretendard text-xs font-medium leading-4 tracking-tight ${
              selectedIcon === id ? "text-[#292D32]" : "text-[#AEAEB2]"
            }`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Footer;

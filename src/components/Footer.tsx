"use client";

import React, { useState } from "react";
import HomeIcon from "./Icons/Footer_home_icon";
import LetterIcon from "./Icons/Footer_letter_icon";
import MyBirdyIcon from "./Icons/Footer_mybirdy_icon";

const Footer: React.FC = () => {
  const menuItems = [
    { id: 1, Icon: HomeIcon, label: "홈" },
    { id: 2, Icon: LetterIcon, label: "편지 보관함" },
    { id: 3, Icon: MyBirdyIcon, label: "마이버디" },
  ];

  const [selectedIcon, setSelectedIcon] = useState<number>(1);
  const [check, setCheck] = useState<boolean>(true);

  const iconClicked = (id: number) => {
    setSelectedIcon(id);

    if (id === 2) {
      setCheck(false);
    }
  };

  return (
    <div className="w-full h-[60px] flex justify-around items-center self-stretch border-t border-[#F0F1EC] bg-[#F9F8F3]">
      {menuItems.map(({ id, Icon, label }) => (
        <div
          key={id}
          className="flex flex-col gap-1 justify-center items-center cursor-pointer"
          onClick={() => iconClicked(id)}
        >
          <Icon
            fill={selectedIcon === id ? "#292D32" : "#AEAEB2"}
            check={check}
          />
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

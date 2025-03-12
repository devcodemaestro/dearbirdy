"use client";

import { IUserData } from "@/app/(footershare)/home/page";
import { menuItems } from "@/constants/menuItems";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Footer: React.FC = () => {
  const [userData, setUserData] = useState<IUserData>();
  const router = useRouter();
  const pathname = usePathname();

  const initialIcon = menuItems.find((item) => item.path === pathname)?.id || 1;
  const [selectedIcon, setSelectedIcon] = useState<number>(initialIcon);

  useEffect(() => {
    const currentItem = menuItems.find((item) => item.path === pathname);
    if (currentItem) {
      setSelectedIcon(currentItem.id);
    }

    const storedData = sessionStorage.getItem("userData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      setUserData(parsedData);
    }
  }, [pathname]);

  const iconClicked = (id: number) => {
    setSelectedIcon(id);
    const selectedItem = menuItems.find((item) => item.id === id);
    if (selectedItem) {
      router.push(selectedItem.path);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="fixed w-full bottom-0 h-[60px] flex justify-evenly items-center border-t border-[#F0F1EC] bg-[#F9F8F3]">
        {menuItems.map(({ id, Icon, label }) => (
          <div
            key={id}
            className="flex flex-col items-center justify-center gap-1 cursor-pointer"
            onClick={() => iconClicked(id)}
          >
            <Icon
              read={userData?.read}
              fill={selectedIcon === id ? "#292D32" : "#AEAEB2"}
            />
            <span
              className={`select-none cursor-pointer text-center font-pretendard text-xs font-medium leading-4 tracking-tight ${
                selectedIcon === id ? "text-[#292D32]" : "text-[#AEAEB2]"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;

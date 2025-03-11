import React from "react";
import NextArrow from "@/components/common/NextArrow";
import { SettingType } from "@/constants/settings";

interface ISettingItem {
  type: SettingType;
  label: string;
  url?: string;
  isToggled?: boolean;
  onToggle?: () => void;
}

const SettingItem: React.FC<ISettingItem> = ({
  type,
  label,
  url,
  isToggled,
  onToggle,
}) => {
  return (
    <div className="w-full cursor-pointer select-none flex justify-between items-center px-4 mt-4">
      <span className="text-gray-700 text-[16px] font-medium">{label}</span>

      {type === "toggle" && (
        <div
          className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-all ${
            isToggled ? "bg-[#292d32]" : "bg-[#D1D1D6]"
          }`}
          onClick={onToggle}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all ${
              isToggled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      )}

      {type === "link" && url && <NextArrow url={url} />}
    </div>
  );
};

export default SettingItem;

import React from "react";

interface SvgIconProps {
  className?: string;
  fill?: string;
}

const LeftArrow: React.FC<SvgIconProps> = ({ className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        fill={fill}
      />
      <path
        d="M7.5 11.5L10.1077 15.2253C10.5252 15.8218 11.4198 15.7864 11.7889 15.1589L16 8"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LeftArrow;

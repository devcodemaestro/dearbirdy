import React from "react";

interface SvgIconProps {
  fill?: string;
  className?: string;
}

const LeftArrow: React.FC<SvgIconProps> = ({ fill, className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.0001 19.9201L8.48009 13.4001C7.71009 12.6301 7.71009 11.3701 8.48009 10.6001L15.0001 4.08008"
        stroke="white"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default LeftArrow;

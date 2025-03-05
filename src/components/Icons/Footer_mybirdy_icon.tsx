import React from "react";

interface SvgIconProps {
  fill?: string;
}

const MyBirdyIcon: React.FC<SvgIconProps> = ({ fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M12.833 12C15.5944 12 17.833 9.76142 17.833 7C17.833 4.23858 15.5944 2 12.833 2C10.0716 2 7.83301 4.23858 7.83301 7C7.83301 9.76142 10.0716 12 12.833 12Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.4232 22C21.4232 18.13 17.5732 15 12.8332 15C8.09316 15 4.24316 18.13 4.24316 22"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MyBirdyIcon;

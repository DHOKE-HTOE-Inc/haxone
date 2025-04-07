import React from "react";

const Ellipse = ({ width, height, fill, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 66 66"
      fill="none"
    >
      <g filter="url(#filter0_f_17_15)">
        <circle
          cx="33.2598"
          cy="32.7004"
          r="17.5372"
          transform="rotate(39.8269 33.2598 32.7004)"
          fill="#4CC9F0"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_17_15"
          x="0.722107"
          y="0.16272"
          width="65.0753"
          height="65.0753"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="7.5"
            result="effect1_foregroundBlur_17_15"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Ellipse;

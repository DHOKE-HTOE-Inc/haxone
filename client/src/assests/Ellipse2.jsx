import React from "react";

const Ellipse2 = ({ width, height, fill, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      fill="none"
    >
      <g filter="url(#filter0_f_17_19)">
        <circle
          cx="28.2448"
          cy="28.2448"
          r="12.9538"
          transform="rotate(39.8269 28.2448 28.2448)"
          fill="#4CC9F0"
        />
      </g>
      <path
        d="M52 28C52 41.8071 40.8071 53 27 53C13.1929 53 2 41.8071 2 28C2 14.1929 13.1929 3 27 3C40.8071 3 52 14.1929 52 28ZM5.37562 28C5.37562 39.9428 15.0572 49.6244 27 49.6244C38.9428 49.6244 48.6244 39.9428 48.6244 28C48.6244 16.0572 38.9428 6.37562 27 6.37562C15.0572 6.37562 5.37562 16.0572 5.37562 28Z"
        fill="#0CC5FF"
      />
      <defs>
        <filter
          id="filter0_f_17_19"
          x="0.290665"
          y="0.29068"
          width="55.9082"
          height="55.9082"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="7.5"
            result="effect1_foregroundBlur_17_19"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Ellipse2;

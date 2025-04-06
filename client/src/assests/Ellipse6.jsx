import profileImage from "../assests/profile-image.png";

const Ellipse6 = ({ width, height, fill, className }) => {
  return (
    <svg
      width="55"
      height="55"
      viewBox="0 0 55 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Ellipse 6">
        <circle cx="27.5" cy="27.5" r="27.5" fill="#F7C5BF" />
        <defs>
          <clipPath id="circleClip">
            <circle cx="27.5" cy="27.5" r="27.5" />
          </clipPath>
        </defs>
        <image
          href={profileImage}
          width="55"
          height="55"
          clipPath="url(#circleClip)"
          preserveAspectRatio="xMidYMid slice"
        />
      </g>
    </svg>
  );
};

export default Ellipse6;

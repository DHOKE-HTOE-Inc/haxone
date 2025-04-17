import React from "react";
import { SquareChevronDown } from "lucide-react";
import Ellipse from "../assests/Ellipse";
import Ellipse2 from "../assests/Ellipse2";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="container mx-auto h-screen w-full">
      {/* Main content container */}
      <div className="flex items-end h-[75%]">
        {/* Left section - Text content */}
        <div className="w-full md:w-1/2">
          {/* main text  */}
          <div className="text-3xl text-center md:text-left md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-wide ">
            <div>Find, Join &</div>
            <div className="my-2">
              Win <span className="text-accent">Hackathon</span>
            </div>
            <div>All in one place!</div>
          </div>
          {/* description */}
          <div className="text-md text-center md:text-left md:text-md lg:text-lg xl:text-xl text-muted-gray my-12 w-[80%] mx-auto md:mx-0 md:w-2/3">
            Apply to top Hackathons in Myanmar, join individual or with your
            team, and showcase your skills.
          </div>
          {/* button  */}
          <div className="mt-20 flex gap-8 flex-col md:flex-row px-10 md:px-0">
            <button className="text-sm md:text-md lg:text-lg xl:text-xl py-2 px-4 xl:px-12 lg:py-4 border-2 border-primary rounded-md cursor-pointer hover:bg-accent-hover hover:text-secondary hover:border-accent-hover transition-all duration-200 ease-in-out">
              How it works
            </button>
            <Link
              to={"/events"}
              className="text-sm md:text-md lg:text-lg xl:text-xl py-2 text-center px-4 xl:px-12 lg:py-4 border-2 border-accent text-secondary bg-accent hover:bg-accent-hover rounded-md cursor-pointer transition-colors duration-200 ease-in-out"
            >
              Browse Hackathons
            </Link>
          </div>
        </div>

        {/* Right section - Image */}
        <div className="w-1/2 justify-center items-center relative hidden md:flex">
          <Ellipse
            width={66}
            height={66}
            className="absolute -top-20 lg:left-30 md:left-0"
          />
          <Ellipse2
            width={70}
            height={70}
            className="absolute -top-10 lg:right-20 md:right-0"
          />
          <Ellipse
            width={66}
            height={66}
            className="absolute top-80 lg:right-35 md:right-10"
          />
          <img src="/heroimage.png" alt="heroimage" />
        </div>
      </div>

      {/* arrowdown  */}
      <div className="flex items-center justify-center mt-20 md:mt-28 lg:mt-32 cursor-pointer">
        <SquareChevronDown
          strokeWidth={1}
          className="w-10 h-10 md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px]"
        />
      </div>
    </section>
  );
};

export default Hero;

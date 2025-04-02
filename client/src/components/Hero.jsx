import React from "react";
import { SquareChevronDown } from "lucide-react";
import Ellipse from "../../public/ellipse";

const Hero = () => {
  return (
    <section className="container mx-auto h-screen w-full">
      {/* Main content container */}
      <div className="flex items-end h-[75%]">
        {/* Left section - Text content */}
        <div className="w-1/2">
          {/* main text  */}
          <div className="text-6xl font-semibold tracking-wide ">
            <div>Find, Join &</div>
            <div className="my-2">
              Win <span className="text-accent">Hackathon</span>
            </div>
            <div>All in one place!</div>
          </div>
          {/* description */}
          <div className="text-xl text-muted-gray my-12 w-2/3">
            Apply to top Hackathons in Myanmar, join individual or with your
            team, and showcase your skills.
          </div>
          {/* button  */}
          <div className="mt-20 flex gap-8">
            <button className="text-xl px-12 py-4 border-2 border-primary rounded-md cursor-pointer hover:bg-accent-hover hover:text-secondary hover:border-accent-hover transition-all duration-200 ease-in-out">
              How it works
            </button>
            <button className="text-xl px-12 py-4 text-secondary bg-accent hover:bg-accent-hover rounded-md cursor-pointer transition-colors duration-200 ease-in-out">
              Browse Hackathons
            </button>
          </div>
        </div>

        {/* Right section - Image */}
        <div className="w-1/2  flex justify-center items-center relative">
          <Ellipse
            width={66}
            height={66}
            className="absolute -top-20 left-30"
          />
          <Ellipse
            width={70}
            height={70}
            className="absolute -top-10 right-20"
          />
          <Ellipse
            width={66}
            height={66}
            className="absolute top-80 right-35"
          />
          <img src="/heroimage.png" alt="heroimage" />
        </div>
      </div>

      {/* arrowdown  */}
      <div className="flex items-center justify-center mt-32 cursor-pointer">
        <SquareChevronDown strokeWidth={1} size={60} />
      </div>
    </section>
  );
};

export default Hero;

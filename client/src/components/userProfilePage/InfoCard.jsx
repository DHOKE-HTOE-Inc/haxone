import { LogOut } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
const InfoCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-xl text-center py-8 relative">
      <Link>
        <LogOut className="absolute right-8 hover:text-error cursor-pointer" />
      </Link>
      <img
        src="/defaultUserProfile.png"
        alt="pfp"
        className="mx-auto rounded-full w-32"
      />
      <div className="my-2 font-semibold text-xl">@hurri69</div>
      <div className="text-muted-gray">hurricane969@gmail.com</div>
      <div className="">
        <span>Miscrosoft CEO</span> | <span>Yangon, Myanmar</span>
      </div>
      <div className="flex gap-4 justify-center items-center mt-4">
        <button className="px-8 py-2 border-2 border-primary rounded-md cursor-pointer hover:bg-accent-hover hover:text-secondary hover:border-accent-hover transition-all duration-200 ease-in-out">
          Share Profile
        </button>
        <button className="px-8 py-2 border-2 border-primary rounded-md cursor-pointer hover:bg-accent-hover hover:text-secondary hover:border-accent-hover transition-all duration-200 ease-in-out">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default InfoCard;

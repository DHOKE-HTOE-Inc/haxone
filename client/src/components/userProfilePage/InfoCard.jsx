import { LogOut } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
const InfoCard = ({ userInfo }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl text-center py-8 relative">
      <Link to="/logout">
        <LogOut className="absolute right-8 hover:text-error cursor-pointer transition-all duration-200 ease-in-out" />
      </Link>
      <img
        src="/defaultUserProfile.png"
        alt="pfp"
        className="mx-auto rounded-full w-32"
      />
      <div className="my-2 font-semibold text-xl">@{userInfo.username}</div>
      <div className="text-neutral-500">{userInfo.email}</div>

      {/* d code ka current job and location shi mha pya ag loke thar tr */}
      <div>
        {(userInfo.current_job || userInfo.location) && (
          <>
            {userInfo.current_job && <span>{userInfo.current_job}</span>}
            {userInfo.current_job && userInfo.location && <span> | </span>}
            {userInfo.location && <span>{userInfo.location}</span>}
          </>
        )}
      </div>

      <div className="flex gap-4 justify-center items-center mt-4">
        <button className="px-8 py-2 border-2 border-primary rounded-md cursor-pointer hover:bg-accent-hover hover:text-secondary hover:border-accent-hover transition-all duration-200 ease-in-out">
          Share Profile
        </button>
        <Link
          to="/edit-profile"
          className="px-8 py-2 border-2 border-primary rounded-md cursor-pointer hover:bg-accent-hover hover:text-secondary hover:border-accent-hover transition-all duration-200 ease-in-out"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default InfoCard;

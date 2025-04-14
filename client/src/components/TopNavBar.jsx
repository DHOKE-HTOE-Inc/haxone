import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { getTokens } from "../store/slices/authSlice.js";
import { useSelector } from "react-redux";
import { LogOut, User } from "lucide-react";

const TopNavBar = () => {
  const tokens = getTokens();
  const [isShowProfileDropDown, setIsShowProfileDropDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <nav className="fixed w-full bg-white/50 backdrop-blur-sm z-50">
        <section className="container mx-auto py-4 flex justify-between items-center">
          <Link to={"/"} className="text-2xl font-bold">
            Haxone
          </Link>
          <div className="flex items-center gap-20">
            <div className="flex items-center gap-6">
              <NavLink to={"/"} className="text-lg font-semibold p-2">
                Home
              </NavLink>
              <NavLink to={"/events"} className="text-lg font-semibold p-2">
                <div>Events</div>
              </NavLink>
              <NavLink to={"/contact"} className="text-lg font-semibold p-2">
                Contact
              </NavLink>
            </div>

            {tokens ? (
              <>
                <div className="cursor-pointer">
                  <img
                    src={user?.profile_img || "/defaultUserProfile.png"}
                    alt="pfp"
                    className="w-10 h-10 object-cover rounded-full"
                    onClick={() =>
                      setIsShowProfileDropDown(!isShowProfileDropDown)
                    }
                  />
                </div>
                <ProfileDropDown
                  isShowProfileDropDown={isShowProfileDropDown}
                  username={user?.username}
                />
              </>
            ) : (
              <div>
                <Link
                  to={"/register"}
                  className="mx-2 px-4 py-2 font-semibold text-lg cursor-pointer"
                >
                  Register
                </Link>
                <Link
                  to={"/login"}
                  className="mx-2 px-4 py-2 font-semibold text-lg text-secondary bg-accent hover:bg-accent-hover rounded-md duration-200 transition-colors cursor-pointer"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </section>
      </nav>
    </>
  );
};

export default TopNavBar;

const ProfileDropDown = ({ isShowProfileDropDown, username }) => {
  if (!isShowProfileDropDown) {
    return null;
  }

  if (isShowProfileDropDown) {
    return (
      <>
        <section className="absolute text-center shadow-2xl -bottom-20 right-40 flex flex-col rounded-md">
          <Link
            to={username}
            className="px-4 py-2 hover:bg-neutral-100 font-semibold"
          >
            <div className="flex items-center gap-2">
              <User />
              Profile
            </div>
          </Link>
          <Link
            to="/logout"
            className="px-4 py-2 hover:text-error hover:bg-neutral-100 font-semibold"
          >
            <div className="flex items-center gap-2">
              <LogOut />
              Logout
            </div>
          </Link>
        </section>
      </>
    );
  }
};

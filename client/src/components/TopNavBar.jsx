import React from "react";
import { Link, NavLink } from "react-router-dom";
import { getTokens } from "../store/slices/authSlice.js";

const TopNavBar = () => {
  const tokens = getTokens();

  return (
    <>
      <nav className="fixed w-full">
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
              <Link to={localStorage.getItem("username")}>
                <img
                  src="/defaultUserProfile.png"
                  alt="pfp"
                  className="w-10 h-10 object-cover rounded-full"
                />
              </Link>
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

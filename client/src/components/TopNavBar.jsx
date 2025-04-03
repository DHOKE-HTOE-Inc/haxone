import React from "react";
import { Link, NavLink } from "react-router-dom";

const TopNavBar = () => {
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
            <div>
              <button className="mx-2 px-4 py-2 font-semibold text-lg cursor-pointer">
                Register
              </button>
              <button className="mx-2 px-4 py-2 font-semibold text-lg text-secondary bg-accent hover:bg-accent-hover rounded-md duration-200 transition-colors cursor-pointer">
                Login
              </button>
            </div>
          </div>
        </section>
      </nav>
    </>
  );
};

export default TopNavBar;

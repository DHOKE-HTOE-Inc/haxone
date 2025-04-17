import React from "react";
import { NavLink } from "react-router-dom";

const StateNavbar = () => {
  return (
    <section className="bg-neutral-100 w-[80%] md:w-1/2 mx-auto px-2 py-1 rounded-md flex justify-evenly">
      <NavLink
        to={"pending"}
        className="state font-semibold p-2 px-4 rounded-md text-sm md:text-base"
      >
        Pending
      </NavLink>
      <NavLink
        to={""}
        className="state font-semibold p-2 px-4 rounded-md text-sm md:text-base"
      >
        Accepted
      </NavLink>
      <NavLink
        to={"rejected"}
        className="state font-semibold p-2 px-4 rounded-md text-sm md:text-base"
      >
        Rejected
      </NavLink>
    </section>
  );
};

export default StateNavbar;

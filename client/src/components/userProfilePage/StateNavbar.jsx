import React from "react";
import { NavLink } from "react-router-dom";

const StateNavbar = () => {
  return (
    <section className="bg-neutral-100 w-1/2 mx-auto px-2 py-1 rounded-md flex justify-evenly">
      <NavLink
        to={"pending"}
        className="state font-semibold p-2 px-4 rounded-md"
      >
        Pending
      </NavLink>
      <NavLink to={""} className="state font-semibold p-2 px-4 rounded-md">
        Accepted
      </NavLink>
      <NavLink
        to={"rejected"}
        className="state font-semibold p-2 px-4 rounded-md"
      >
        Rejected
      </NavLink>
    </section>
  );
};

export default StateNavbar;

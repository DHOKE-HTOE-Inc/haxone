import React from "react";
import { Link } from "react-router-dom";

const NoData = () => {
  return (
    <section className="px-12 mt-12">
      <img src="/datalist.png" alt="datalist" className="w-1/3 mx-auto" />
      <div className="text-center flex flex-col justify-between items-center py-10">
        <div className="text-2xl font-semibold mb-2">Start apply events</div>
        <div className="text-md text-muted-gray mb-8">
          You have no application yet. Browse events and apply to get started.
        </div>
        <Link
          to={"/"}
          className="bg-accent hover:bg-accent-hover text-white w-fit px-4 py-2 rounded-md"
        >
          Browse Events
        </Link>
      </div>
    </section>
  );
};

export default NoData;

import React from "react";
import StateNavbar from "./StateNavbar";
import DataBox from "./DataBox";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Application = () => {
  return (
    <section className="bg-white w-1/2 min-h-[90vh] h-fit pb-8 shadow-xl rounded-xl relative">
      <div className="py-8 ml-8 font-semibold text-2xl mb-4">Application</div>

      <StateNavbar />

      <DataBox />

      {/* pagination */}
      <div className="absolute left-[50%] -translate-x-[50%] bottom-8 w-fit mx-auto">
        <div className="flex items-center space-x-2">
          <button className="h-10 w-10 border rounded border-neutral-400 hover:bg-gray-100 cursor-pointer place-items-center">
            <ChevronLeft size={24} strokeWidth={1} />
          </button>

          <button className="h-10 w-10 border rounded border-neutral-400 bg-gray-200 text-primary font-medium cursor-pointer">
            1
          </button>
          <button className="h-10 w-10 border rounded border-neutral-400 hover:bg-gray-100 cursor-pointer">
            2
          </button>
          <button className="h-10 w-10 border rounded border-neutral-400 hover:bg-gray-100 cursor-pointer">
            3
          </button>
          <button className="h-10 w-10 border rounded border-neutral-400 hover:bg-gray-100 cursor-pointer">
            4
          </button>

          <button className="h-10 w-10 border rounded border-neutral-400 hover:bg-gray-100 cursor-pointer place-items-center">
            <ChevronRight size={24} strokeWidth={1} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Application;

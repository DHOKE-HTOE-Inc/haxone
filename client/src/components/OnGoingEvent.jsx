import React from "react";
import Event from "./Event";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const OnGoingEvent = () => {
  return (
    <section id="ongoing-events" className="container mx-auto w-full my-8">
      <div className="flex justify-between items-center mb-8">
        <div className="text-4xl font-semibold">On-Going Events</div>
        <Link className="flex gap-4 items-center">
          see all <ArrowRight />
        </Link>
      </div>

      {/* Events */}
      <div className="flex gap-12 py-4 w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        <Event />
        <Event />
        <Event />
        <Event />
        <Event />
      </div>
    </section>
  );
};

export default OnGoingEvent;

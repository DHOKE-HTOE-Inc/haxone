import React, { useEffect, useState } from "react";
import Event from "./Event";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import axiosInstance from "../utils/axios";

const OnGoingEvent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axiosInstance.get("/events/events-to-apply");
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  return (
    <section
      id="ongoing-events"
      className="container mx-auto w-full my-20 px-8 md:px-0"
    >
      <div className="flex justify-between items-center mb-4 md:mb-8">
        <div className="text-2xl md:text-3xl xl:text-4xl font-semibold">
          On-Going Events
        </div>
        <Link
          to={"/events"}
          className="gap-4 items-center hidden md:flex text-muted-gray hover:text-primary-color"
        >
          see all <ArrowRight />
        </Link>
      </div>

      {/* Events */}
      <div className="flex gap-12 py-2 md:py-4 w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {events.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default OnGoingEvent;

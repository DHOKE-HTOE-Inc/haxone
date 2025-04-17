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
      console.log(response.data);
    };
    fetchEvents();
  }, []);

  return (
    <section id="ongoing-events" className="container mx-auto w-full my-20">
      <div className="flex justify-between items-center mb-8">
        <div className="text-4xl font-semibold">On-Going Events</div>
        <Link to={"/events"} className="flex gap-4 items-center">
          see all <ArrowRight />
        </Link>
      </div>

      {/* Events */}
      <div className="flex gap-12 py-4 w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {events.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default OnGoingEvent;

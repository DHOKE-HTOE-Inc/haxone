import { CalendarDays, MapPin } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Event = ({ event }) => {
  console.log(event);

  return (
    <section className="bg-white min-w-md max-w-md p-8 rounded-xl shadow-md">
      <div>
        <img
          src={`http://localhost:8000/${event?.img}` || "/eventdefault.png"}
          alt="eventimage"
          className="rounded-md min-h-56 w-full object-cover"
        />
      </div>

      {/* text  */}
      <div className="min-h-60 flex flex-col justify-between">
        <div>
          <div className="text-2xl font-semibold my-4">{event.title}</div>
          <div className="text-muted-gray">
            {event.description}
            ducimus ratione suscipit. Rem deleniti aliquid earum sint
            accusantium?
          </div>
        </div>

        <div className="flex mt-8 justify-between items-end">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <CalendarDays /> <div>{event.start_date}</div>
            </div>
            <div className="flex gap-4">
              <MapPin /> <div>{event.location}</div>
            </div>
          </div>
          <Link
            to={`/event-detail/${event.id}`}
            className="px-8 h-12 flex items-center justify-center text-secondary bg-accent hover:bg-accent-hover rounded-md cursor-pointer transition-colors duration-200 ease-in-out"
          >
            Explore
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Event;

import { CalendarDays, MapPin } from "lucide-react";
import React from "react";

const Event = () => {
  return (
    <section className="bg-white min-w-md  p-8 rounded-xl shadow-md">
      <div>
        <img src="/eventdefault.png" alt="eventdefault" className="rounded" />
      </div>

      {/* text  */}
      <div>
        <div className="text-2xl font-semibold my-4">
          Tech Innovators Summit 2025
        </div>
        <div className="text-muted-gray">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo facilis
          ducimus ratione suscipit. Rem deleniti aliquid earum sint accusantium?
        </div>

        <div className="flex mt-8 justify-between items-end">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <CalendarDays /> <div>May 10, 2025</div>
            </div>
            <div className="flex gap-4">
              <MapPin /> <div>Bagon, Myanmar</div>
            </div>
          </div>
          <button className="px-8 h-12 text-secondary bg-accent hover:bg-accent-hover rounded-md cursor-pointer transition-colors duration-200 ease-in-out">
            Explore
          </button>
        </div>
      </div>
    </section>
  );
};

export default Event;

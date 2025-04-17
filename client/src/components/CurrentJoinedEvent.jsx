import React from "react";
import { CalendarDays, MapPin, Users } from "lucide-react";

const CurrentJoinedEvent = () => {
  return (
    <section className="container mx-auto mt-0 md:mt-12 mb-20 px-8 md:px-0">
      <div className="text-2xl md:text-3xl xl:text-4xl font-semibold mb-8">
        Currently Joined Event
      </div>

      <div className="bg-white w-full rounded-xl shadow-md flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <img
            src="/eventdefault.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="py-4 px-4 md:px-8 w-full md:w-1/2">
          <div className="text-lg sm:text-2xl md:text-3xl font-semibold mb-4">
            Tech Innovators Summit 2025
          </div>
          <div className="text-muted-gray text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo
            facilis ducimus ratione suscipit. Rem deleniti aliquid earum sint
            accusantium?Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Velit ullam provident similique.
          </div>

          <div className="flex mt-8 gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <CalendarDays />{" "}
                <div className="text-sm md:text-base">May 10, 2025</div>
              </div>
              <div className="flex gap-4">
                <MapPin />{" "}
                <div className="text-sm md:text-base">Bagon, Myanmar</div>
              </div>
            </div>
            <div>
              <div className="flex gap-4">
                <Users />{" "}
                <div className="text-sm md:text-base">May 10, 2025</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentJoinedEvent;

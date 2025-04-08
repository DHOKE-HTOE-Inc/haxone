import React from "react";
import { CalendarDays } from "lucide-react";

const DataBox = () => {
  return (
    <section className="px-12 mt-12">
      <div className="flex justify-between items-center border-b-2 border-muted-gray pb-4">
        <div className="font-semibold text-lg">Event Name</div>
        <div className="font-semibold text-lg">Status</div>
      </div>

      <div>
        <Event
          status="Accepted"
          color="success"
          eventName="Cosplay 2025"
          date="May 10, 2025"
        />
        <Event
          status="Pending"
          color="pending"
          eventName="Donation 2025"
          date="May 10, 2025"
        />
        <Event
          status="Rejected"
          color="error"
          eventName="Ok pr event"
          date="May 10, 2025"
        />
      </div>
    </section>
  );
};

export default DataBox;

const Event = ({ status, color, eventName, date }) => {
  return (
    <section className="flex justify-between items-center border-b-2 border-neutral-400 py-4">
      <div>
        <div className="font-medium mb-2">{eventName}</div>
        <div className="flex gap-2 items-center text-sm">
          <CalendarDays color="#737373" size={20} />
          <div className="text-neutral-500">{date}</div>
        </div>
      </div>
      <div
        className={`border-2 rounded-xl px-4 py-2 text-sm
          ${color === "success" && "border-success bg-success/10 text-success"}
          ${color === "pending" && "border-pending bg-pending/10 text-pending"} 
          ${color === "error" && "border-error bg-error/10 text-error"}`}
      >
        {status}
      </div>
    </section>
  );
};

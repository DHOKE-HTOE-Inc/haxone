import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ title, image, date, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/manage-events/${id}`)}
      className="w-80 h-60 relative rounded-lg overflow-hidden group cursor-pointer"
    >
      {/* Background Image */}
      <img src={image} alt={title} className="w-full h-full object-cover" />

      <div className="absolute inset-0">
        {/* Event Title */}
        <h3 className="text-white text-xl font-medium bg-black/[0.27] px-2 py-3 my-4">
          {title}
        </h3>

        {/* Date Badge */}
        <div className="absolute bottom-6 right-4 flex items-center gap-2 border border-[#00f767] bg-green-500/50 text-[#00f767] px-3 py-1 rounded-md">
          <CalendarDays size={14} />
          <span className="text-sm">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

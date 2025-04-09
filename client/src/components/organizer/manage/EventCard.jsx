import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ id, title, image, date }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/organizer/events/${id}`)}
      className="w-full aspect-[3/2] relative rounded-lg overflow-hidden cursor-pointer shadow-sm"
    >
      {/* Background Image */}
      <img src={image} alt={title} className="w-full h-full object-cover" />

      <div className="absolute inset-0 flex flex-col justify-between">
        {/* Title with overlay */}
        <div className="bg-black/30 py-3 px-4 mt-4">
          <h3 className="text-white text-xl font-medium">{title}</h3>
        </div>

        {/* Date Badge */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-primary border-2 border-accent px-3 py-1 rounded-md">
          <CalendarDays size={14} className="text-accent" />
          <span className="text-sm font-medium text-accent">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

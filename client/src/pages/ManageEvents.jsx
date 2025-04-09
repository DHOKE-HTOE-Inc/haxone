import { useState, useEffect, useMemo } from "react";
import { Filter, ArrowDownUp, Search, Plus } from "lucide-react";
import EventCard from "../components/organizer/manage/EventCard";
import AddEventModal from "../components/organizer/manage/AddEventModal";
import { fetchEvents } from "../store/slices/eventSlice";
import { useDispatch, useSelector } from "react-redux";

const ManageEvents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Memoize the event cards for better performance with large lists
  const eventCards = useMemo(() => {
    return events.map((event) => (
      <EventCard
        key={event.id}
        id={event.id}
        title={event.title}
        image={event.img}
        date={new Date(event.start_date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      />
    ));
  }, [events]);

  if (error) {
    return (
      <div className="w-full p-8 text-center text-red-500">
        Error loading events: {error}
      </div>
    );
  }

  return (
    <div className="w-full p-3">
      {/* Header Section */}
      <h1 className="text-2xl font-medium mb-10">Event Management</h1>

      {/* Actions Bar */}
      <div className="flex justify-end gap-6 mb-8">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50">
          <Filter size={20} />
          <span>Filter</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50">
          <ArrowDownUp size={20} />
          <span>Sort</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50">
          <Search size={20} />
          <span>Search</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 pb-16 mx-auto w-full max-w-[1800px]">
        {/* Event Cards */}
          <>
            {eventCards}

            {/* Add New Event Card */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full aspect-[3/2] rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Plus size={32} className="text-gray-400" />
            </button>
          </>
      </div>

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ManageEvents;

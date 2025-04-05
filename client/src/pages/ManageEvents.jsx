import React, { useState } from "react";
import { Filter, SortDesc, Search, Plus } from "lucide-react";
import EventCard from "../components/organizer/manage/EventCard";
import AddEventModal from "../components/organizer/manage/AddEventModal";

const ManageEvents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-3 w-full">
      {/* Header Section */}
      <h1 className="text-2xl font-medium mb-8">Event Management</h1>

      {/* Actions Bar */}
      <div className="flex justify-end gap-4 mb-8">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50">
          <Filter size={20} />
          <span>Filter</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50">
          <SortDesc size={20} />
          <span>Sort</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50">
          <Search size={20} />
          <span>Search</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Event Cards */}
        <EventCard
          title="Tech Innovators Summit 2025"
          image="/eventdefault.png"
          date="27 Mar, 2025"
        />
        <EventCard
          title="Tech Innovators Summit 2025"
          image="/eventdefault.png"
          date="27 Mar, 2025"
        />
        <EventCard
          title="Tech Innovators Summit 2025"
          image="/eventdefault.png"
          date="27 Mar, 2025"
        />
        <EventCard
          title="Tech Innovators Summit 2025"
          image="/eventdefault.png"
          date="27 Mar, 2025"
        />
        <EventCard
          title="Tech Innovators Summit 2025"
          image="/eventdefault.png"
          date="27 Mar, 2025"
        />

        {/* Add New Event Card */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-80 h-60 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <Plus size={32} className="text-gray-400" />
        </button>
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

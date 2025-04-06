import { useState } from "react";
import { X } from "lucide-react";

const AddEventModal = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-280 overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-end mb-6">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Event Form */}
        <form className="grid grid-cols-2 gap-32 mx-auto max-w-[1000px]">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Event Name */}
            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Event Name
              </label>
              <input
                type="text"
                className="w-full h-12 px-4 py-2 border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Description
              </label>
              <div className="relative">
                <textarea
                  className="w-full h-12 px-4 py-2 border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-accent resize-none pr-12"
                  rows={1}
                  maxLength={100}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                  {description.length}/100
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Location
              </label>
              <input
                type="text"
                className="w-full h-12 px-4 py-2 border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 mb-2 text-sm">Image</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-xs hover:bg-gray-50"
                >
                  Choose file
                </button>
                <span className="text-gray-500">No file chosen</span>
              </div>
            </div>

            {/* Max Participants */}
            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Max Participants
              </label>
              <input
                type="number"
                className="w-full h-12 px-4 py-2 border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Start Date */}
            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Start Date
              </label>
              <input
                type="date"
                className="w-full h-12 px-4 py-2 border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                End Date
              </label>
              <input
                type="date"
                className="w-full h-12 px-4 py-2 border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Application Deadline */}
            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Application Deadline
              </label>
              <input
                type="date"
                className="w-full h-12 px-4 py-2 border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Project Submission Deadline */}
            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Project Submission Deadline
              </label>
              <input
                type="date"
                className="w-full h-12 px-4 py-2 border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Reward */}
            <div>
              <label className="block text-gray-700 mb-2 text-sm">Reward</label>
              <input
                type="text"
                className="w-full h-12 px-4 py-2 border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </form>

        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          <button className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;

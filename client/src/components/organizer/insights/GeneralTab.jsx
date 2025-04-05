import { Check, Trash2 } from "lucide-react";

const GeneralTab = ({ formData, handleChange }) => {
  const DateInput = ({ label, name, value }) => (
    <div>
      <label className="block text-gray-700 mb-2 text-sm">{label}</label>
      <div className="relative">
        <input
          type="date"
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full h-12 px-4 py-2 text-sm border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-accent appearance-none"
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-x-32 mx-auto max-w-[1000px] pt-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Event Name */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm">
              Event Name
            </label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              className="w-full h-12 px-4 py-2 text-sm border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm">
              Description
            </label>
            <div className="relative">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full h-12 px-4 py-2 text-sm border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-accent resize-none pr-12"
                rows={1}
                maxLength={100}
              />
              <span className="absolute bottom-2 right-2 text-xs text-gray-500">
                {formData.description.length}/100
              </span>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full h-12 px-4 py-2 text-sm border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm">Image</label>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-xs hover:bg-gray-50">
                Choose file
              </button>
              <span className="text-sm text-gray-500">No file chosen</span>
            </div>
          </div>

          {/* Max Participants */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm">
              Max Participants
            </label>
            <input
              type="number"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              className="w-full h-12 px-4 py-2 text-sm border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <DateInput
            label="Start Date"
            name="startDate"
            value={formData.startDate}
          />
          <DateInput label="End Date" name="endDate" value={formData.endDate} />
          <DateInput
            label="Application Deadline"
            name="applicationDeadline"
            value={formData.applicationDeadline}
          />
          <DateInput
            label="Project Submission Deadline"
            name="submissionDeadline"
            value={formData.submissionDeadline}
          />

          {/* Reward */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm">Reward</label>
            <select
              name="reward"
              value={formData.reward}
              onChange={handleChange}
              className="w-full h-12 px-4 py-2 text-sm border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-accent appearance-none bg-white"
            >
              <option value="1000">1000</option>
              <option value="2000">2000</option>
              <option value="3000">3000</option>
            </select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors flex items-center gap-2 cursor-pointer">
          <Check size={20} />
          Confirm
        </button>
        <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 cursor-pointer">
          <Trash2 size={20} />
          Delete
        </button>
      </div>
    </>
  );
};

export default GeneralTab;

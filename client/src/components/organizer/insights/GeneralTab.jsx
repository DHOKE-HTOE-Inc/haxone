import { Check, Trash2 } from "lucide-react";
import { useMemo } from "react";
import {
  TextField,
  NumberField,
  TextAreaField,
  DateField,
  FileField,
} from "../manage/InputFields";
import { validateEventForm, hasErrors } from "../../../utils/formValidation";

const GeneralTab = ({
  formData,
  handleChange,
  handleSubmit,
  handleDelete,
  isSubmitting,
  isDirty,
}) => {
  // Calculate validation errors (image not required for editing)
  const formErrors = useMemo(
    () => validateEventForm(formData, false),
    [formData]
  );

  // Check if any validation errors exist
  const hasFormErrors = useMemo(() => hasErrors(formErrors), [formErrors]);

  return (
    <form onSubmit={handleSubmit} className="px-8">
      <div className="grid grid-cols-2 gap-x-32 mx-auto max-w-[1000px] pt-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Event Name */}
          <TextField
            label="Event Name"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={formErrors.title}
          />

          {/* Description */}
          <TextAreaField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={formErrors.description}
            maxLength={100}
          />

          {/* Location */}
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            error={formErrors.location}
          />

          {/* Max Participants */}
          <NumberField
            label="Max Participants"
            name="max_participants"
            value={formData.max_participants}
            onChange={handleChange}
            error={formErrors.max_participants}
            min="1"
          />

          <TextAreaField
            label="Requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            error={formErrors.requirements}
            rows={1}
          />

          {/* Image */}
          <FileField
            label="Image"
            name="img"
            onChange={handleChange}
            file={formData.img}
            error={formErrors.img}
            accept="image/*"
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Start Date */}
          <DateField
            label="Start Date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            error={formErrors.start_date}
          />

          {/* End Date */}
          <DateField
            label="End Date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            error={formErrors.end_date}
          />

          {/* Application Deadline */}
          <DateField
            label="Application Deadline"
            name="application_deadline"
            value={formData.application_deadline}
            onChange={handleChange}
            error={formErrors.application_deadline}
          />

          {/* Project Submission Deadline */}
          <DateField
            label="Project Submission Deadline"
            name="project_submission_deadline"
            value={formData.project_submission_deadline}
            onChange={handleChange}
            error={formErrors.project_submission_deadline}
          />

          {/* Reward */}
          <NumberField
            label="Reward"
            name="reward"
            value={formData.reward}
            onChange={handleChange}
            error={formErrors.reward}
            min="0"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 max-w-[1000px] mx-auto py-8">
        {/* Update Button */}
        <button
          type="submit"
          disabled={isSubmitting || !isDirty || hasFormErrors}
          className={`px-6 py-2 text-white rounded-lg flex items-center gap-2 transition-colors ${
            isDirty && !hasFormErrors
              ? "bg-accent hover:bg-accent-hover cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          <Check size={20} />
          {isSubmitting ? "Updating..." : "Confirm"}
        </button>

        {/* Delete Button */}
        <button
          type="button"
          onClick={handleDelete}
          disabled={isSubmitting}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Trash2 size={20} />
          Delete
        </button>
      </div>
    </form>
  );
};

export default GeneralTab;

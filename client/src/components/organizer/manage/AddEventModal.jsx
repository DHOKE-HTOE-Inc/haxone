import { useState, useMemo, useCallback } from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { createEvent } from "../../../store/slices/eventSlice";
import { showToast } from "../../../utils/toast";
import {
  TextField,
  NumberField,
  TextAreaField,
  DateField,
  FileField,
} from "./InputFields";
import { validateEventForm, hasErrors } from "../../../utils/formValidation";

const AddEventModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    img: null,
    max_participants: "",
    start_date: "",
    end_date: "",
    application_deadline: "",
    project_submission_deadline: "",
    reward: "",
  });

  // Track which fields have been touched by the user
  const [touchedFields, setTouchedFields] = useState({});

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate form errors based on current form data
  const formErrors = useMemo(
    () => validateEventForm(formData, true),
    [
      formData.title,
      formData.description,
      formData.requirements,
      formData.location,
      formData.max_participants,
      formData.start_date,
      formData.end_date,
      formData.application_deadline,
      formData.project_submission_deadline,
      formData.reward,
      formData.img,
    ]
  );

  // Check if form has any errors
  const hasFormErrors = useMemo(() => hasErrors(formErrors), [formErrors]);

  // Memoize the change handler to prevent unnecessary rerenders
  const handleChange = useCallback((e) => {
    const { name, value, type, files } = e.target;

    // Mark field as touched
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));

    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        img: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mark all fields as touched when submitting
    setIsSubmitted(true);
    const allFieldsTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouchedFields(allFieldsTouched);

    if (hasFormErrors) {
      showToast.error(
        "Please correct the highlighted fields before submitting"
      );
      setIsSubmitting(false);
      return;
    }

    // Create FormData object for file upload
    const eventData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        eventData.append(key, formData[key]);
      }
    });

    try {
      await dispatch(createEvent(eventData)).unwrap();
      showToast.success("Event created successfully");
      onClose();
    } catch (error) {
      const errorMessage =
        typeof error === "object" && error !== null
          ? error.message || JSON.stringify(error)
          : String(error);
      showToast.error(`Failed to create event: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Only show error if field has been touched or form has been submitted
  const shouldShowError = (fieldName) => {
    return touchedFields[fieldName] || isSubmitted
      ? formErrors[fieldName]
      : null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-5xl w-full mx-auto overflow-y-auto px-6 py-2">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">Create New Event</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Event Form */}
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
                error={shouldShowError("title")}
              />

              {/* Description */}
              <TextAreaField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={shouldShowError("description")}
                maxLength={100}
              />

              {/* Location */}
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                error={shouldShowError("location")}
              />

              {/* Max Participants */}
              <NumberField
                label="Max Participants"
                name="max_participants"
                value={formData.max_participants}
                onChange={handleChange}
                error={shouldShowError("max_participants")}
                min="1"
              />

              {/* Requirements */}
              <TextAreaField
                label="Requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                error={shouldShowError("requirements")}
                rows={1}
              />

              {/* Image */}
              <FileField
                label="Image"
                name="img"
                onChange={handleChange}
                file={formData.img}
                error={shouldShowError("img")}
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
                error={shouldShowError("start_date")}
              />

              {/* End Date */}
              <DateField
                label="End Date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                error={shouldShowError("end_date")}
              />

              {/* Application Deadline */}
              <DateField
                label="Application Deadline"
                name="application_deadline"
                value={formData.application_deadline}
                onChange={handleChange}
                error={shouldShowError("application_deadline")}
              />

              {/* Project Submission Deadline */}
              <DateField
                label="Project Submission Deadline"
                name="project_submission_deadline"
                value={formData.project_submission_deadline}
                onChange={handleChange}
                error={shouldShowError("project_submission_deadline")}
              />

              {/* Reward */}
              <NumberField
                label="Reward"
                name="reward"
                value={formData.reward}
                onChange={handleChange}
                error={shouldShowError("reward")}
                min="0"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 max-w-[1000px] mx-auto py-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 text-white rounded-lg transition-colors ${
                isSubmitting ? "bg-gray-400" : "bg-accent hover:bg-accent-hover"
              } cursor-pointer`}
            >
              {isSubmitting ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;

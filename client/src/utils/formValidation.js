// Helper function to check if a date is valid
export const isValidDate = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

// Get validation errors for dates
export const getDateError = (name, value, formData) => {
  if (!value) return "This field is required";
  if (!isValidDate(value)) return "Please enter a valid date";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(value);

  if (name === "start_date" && date < today) {
    return "Start date cannot be in the past";
  }

  if (name === "end_date" && isValidDate(formData.start_date)) {
    const startDate = new Date(formData.start_date);
    if (date < startDate) {
      return "End date must be after start date";
    }
  }

  if (name === "application_deadline") {
    if (date < today) {
      return "Application deadline cannot be in the past";
    }

    if (isValidDate(formData.start_date)) {
      const startDate = new Date(formData.start_date);
      if (date > startDate) {
        return "Application deadline must be before start date";
      }
    }
  }

  if (name === "project_submission_deadline") {
    if (isValidDate(formData.start_date)) {
      const startDate = new Date(formData.start_date);
      if (date < startDate) {
        return "Submission deadline must be after start date";
      }
    }

    if (isValidDate(formData.end_date)) {
      const endDate = new Date(formData.end_date);
      if (date > endDate) {
        return "Submission deadline must be before end date";
      }
    }
  }

  return null;
};

// Check for required field errors
export const getTitleError = (value) =>
  !value ? "Event name is required" : null;
export const getDescriptionError = (value) =>
  !value ? "Description is required" : null;
export const getLocationError = (value) =>
  !value ? "Location is required" : null;

// Validation for max participants
export const getMaxParticipantsError = (value) => {
  if (!value) return "Max participants is required";
  if (isNaN(Number(value)) || Number(value) <= 0) {
    return "Max participants must be a positive number";
  }
  if (Number(value) > 1000) {
    return "Max participants cannot exceed 1000";
  }
  return null;
};

// Validation for reward
export const getRewardError = (value) => {
  if (!value && value !== 0) return "Reward is required";
  if (isNaN(Number(value)) || Number(value) < 0) {
    return "Reward must be a non-negative number";
  }
  return null;
};

// Validation for requirements
export const getRequirementsError = (value) => {
  if (!value) return "Requirements is required";
  if (value.length > 500) {
    return "Requirements cannot exceed 500 characters";
  }
  return null;
};

// Validation for image (only needed for new event creation)
export const getImageError = (value, isRequired = false) => {
  if (isRequired && !value) return "Image is required";

  return null;
};

// Validate all event form fields
export const validateEventForm = (formData, requireImage = false) => {
  const errors = {
    title: getTitleError(formData.title),
    description: getDescriptionError(formData.description),
    location: getLocationError(formData.location),
    max_participants: getMaxParticipantsError(formData.max_participants),
    reward: getRewardError(formData.reward),
    requirements: getRequirementsError(formData.requirements),
    start_date: getDateError("start_date", formData.start_date, formData),
    end_date: getDateError("end_date", formData.end_date, formData),
    application_deadline: getDateError(
      "application_deadline",
      formData.application_deadline,
      formData
    ),
    project_submission_deadline: getDateError(
      "project_submission_deadline",
      formData.project_submission_deadline,
      formData
    ),
    img: getImageError(formData.img, requireImage),
  };

  return errors;
};

// Check if form has any errors
export const hasErrors = (errors) => {
  return Object.values(errors).some((error) => error !== null);
};

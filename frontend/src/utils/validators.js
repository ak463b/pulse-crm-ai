/**
 * Utility functions for validating form data across the CRM application.
 */

// 1. Basic check to ensure a field isn't empty
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  // For arrays (like multiple products discussed)
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return value !== null && value !== undefined;
};

// 2. Standard email regex validation (useful for HCP profiles)
export const isValidEmail = (email) => {
  if (!email) return true; // Assuming email might be optional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 3. Date validation (e.g., ensuring follow-up tasks are scheduled for the future)
export const isFutureDate = (dateString) => {
  if (!dateString) return false;
  const selectedDate = new Date(dateString);
  const today = new Date();
  
  // Strip the exact time so we are only comparing calendar days
  today.setHours(0, 0, 0, 0); 
  
  return selectedDate >= today;
};

// 4. Specific validator for your Log Interaction Screen
export const validateInteractionForm = (formData) => {
  const errors = {};

  if (!isRequired(formData.hcpName)) {
    errors.hcpName = 'HCP Name is required to log an interaction.';
  }

  if (!isRequired(formData.interactionType)) {
    errors.interactionType = 'Please select an interaction type.';
  }

  if (!isRequired(formData.date)) {
    errors.date = 'Interaction date is required.';
  }

  if (formData.followUpActions && !formData.followUpDate) {
    errors.followUpDate = 'A date is required if follow-up actions are specified.';
  } else if (formData.followUpDate && !isFutureDate(formData.followUpDate)) {
    errors.followUpDate = 'Follow-up date cannot be in the past.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
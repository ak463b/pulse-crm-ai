export const formatDateForInput = (dateObject = new Date()) => {
  // Returns YYYY-MM-DD for standard HTML5 date inputs
  return dateObject.toISOString().split('T')[0];
};

export const formatTimeForInput = (dateObject = new Date()) => {
  // Returns HH:MM for standard HTML5 time inputs
  return dateObject.toTimeString().substring(0, 5);
};
// Utility functions
export const momentformatDate = (date: Date) => {
  // Returns: '2025-06-22'
  return date.toISOString().split("T")[0];
};

export const formatDateTime = (date: Date) => {
  // Returns: '2025-06-22 14:30:00'
  return date.toISOString().replace("T", " ").split(".")[0];
};

export const formatTime = (date: Date) => {
  // Returns: '14:30'
  return date.toTimeString().split(" ")[0].substring(0, 5);
};

export function formatTime12Hour(time24: string) {
  const [hours, minutes] = time24.split(":").map(Number);
  const suffix = hours >= 12 ? "pm" : "am";
  const hours12 = ((hours + 11) % 12) + 1;
  return `${String(hours12).padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${suffix}`;
}

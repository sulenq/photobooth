// Fungsi untuk mendapatkan hours
export const getHours = (time: string | undefined | null): number => {
  if (!time) return 0;
  const [hours] = time.split(":");
  return parseInt(hours, 10) || 0;
};

// Fungsi untuk mendapatkan minutes
export const getMinutes = (time: string | undefined | null): number => {
  if (!time) return 0;
  const [, minutes] = time.split(":");
  return parseInt(minutes, 10) || 0;
};

// Fungsi untuk mendapatkan seconds
export const getSeconds = (time: string | undefined | null): number => {
  if (!time) return 0;
  const [, , seconds] = time.split(":");
  return parseInt(seconds, 10) || 0;
};

// Make Time
export const makeTime = (
  input: Date | string | number | undefined,
  format: "HH:mm:ss" | "HH:mm" | "hh:mm A" = "HH:mm:ss"
): string => {
  if (!input) return "";

  const date =
    typeof input === "string" || typeof input === "number"
      ? new Date(input)
      : input;

  if (isNaN(date.getTime())) return ""; // Handle invalid date

  const hh = date.getHours().toString().padStart(2, "0");
  const mm = date.getMinutes().toString().padStart(2, "0");
  const ss = date.getSeconds().toString().padStart(2, "0");

  switch (format) {
    case "HH:mm":
      return `${hh}:${mm}`;
    case "hh:mm A": {
      const hour12 = (parseInt(hh) % 12 || 12).toString().padStart(2, "0");
      const suffix = parseInt(hh) >= 12 ? "PM" : "AM";
      return `${hour12}:${mm} ${suffix}`;
    }
    default:
      return `${hh}:${mm}:${ss}`;
  }
};

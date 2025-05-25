const formatDuration = (
  seconds: number | undefined,
  options: "basic" | "short" | "numeric" = "basic"
): string => {
  if (seconds) {
    switch (options) {
      default:
        return formatDurationBasic(seconds);
      case "numeric":
        return formatDurationNumeric(seconds);
      case "short":
        return formatDurationShort(seconds);
    }
  } else {
    return "0 detik";
  }
};

const formatDurationBasic = (detik: number | undefined | null): string => {
  if (detik) {
    const jam = Math.floor(detik / 3600);
    const menit = Math.floor((detik % 3600) / 60);
    const sisaDetik = detik % 60;

    let result = "";
    if (jam > 0) result += `${jam} jam`;
    if (menit > 0) result += ` ${menit} menit`;
    if (sisaDetik > 0) result += ` ${sisaDetik} detik`;

    return result.trim();
  } else {
    return "";
  }
};

const formatDurationShort = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours > 0 ? `${String(hours).padStart(2, "0")}j` : "";
  const formattedMinutes =
    minutes > 0 ? `${String(minutes).padStart(2, "0")}m` : "";
  const formattedSeconds =
    remainingSeconds > 0 ? `${String(remainingSeconds).padStart(2, "0")}d` : "";

  return [formattedHours, formattedMinutes, formattedSeconds]
    .filter(Boolean)
    .join(" ");
};

const formatDurationNumeric = (seconds: number): string => {
  seconds = Math.ceil(seconds);
  const hours = Math.floor(Math.abs(seconds) / 3600);
  const minutes = Math.floor((Math.abs(seconds) % 3600) / 60);
  const remainingSeconds = Math.abs(seconds) % 60;

  const formattedTime = [hours, minutes, remainingSeconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");

  return seconds < 0 ? `-${formattedTime}` : formattedTime;
};

export default formatDuration;

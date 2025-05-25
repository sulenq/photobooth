import { Type__TimeFormat } from "@/constants/types";
import userTimeZone from "./userTimeZone";
import getTzOffsetMs from "./getTzOffsetMs";

export default function formatTime(
  time?: string,
  options: {
    showSeconds?: boolean;
    prefixTimeFormat?: Type__TimeFormat;
    prefixTimeZoneKey?: string;
    withSuffix?: boolean;
  } = {}
): string {
  if (!time) return "";

  const timeFormat =
    options.prefixTimeFormat || localStorage.getItem("timeFormat") || "24-hour";

  const timeZoneKey = options.prefixTimeZoneKey || userTimeZone().key;
  const offsetMs = getTzOffsetMs(timeZoneKey);
  const offsetHours = offsetMs / (1000 * 60 * 60);

  let [hh, mm, ss = "00"] = time.split(":").map(Number);

  hh += offsetHours;

  if (hh >= 24) hh -= 24;
  if (hh < 0) hh += 24;

  let formattedTime: string;
  if (timeFormat === "12-hour") {
    const suffix = hh >= 12 ? "PM" : "AM";
    const hour12 = hh % 12 || 12;
    formattedTime = `${hour12}:${String(mm).padStart(2, "0")}`;

    if (options.showSeconds) {
      formattedTime += `:${String(ss).padStart(2, "0")}`;
    }

    const withSuffix = options.withSuffix || true;

    if (withSuffix) {
      formattedTime += ` ${suffix}`;
    }
  } else {
    formattedTime = `${String(hh).padStart(2, "0")}:${String(mm).padStart(
      2,
      "0"
    )}`;

    if (options.showSeconds) {
      formattedTime += `:${String(ss).padStart(2, "0")}`;
    }
  }

  return formattedTime;
}

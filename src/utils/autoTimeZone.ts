import { Type__TimeZoneObject } from "@/constants/types";
import moment from "moment-timezone";

const autoTimeZone = (): Type__TimeZoneObject => {
  const timeZone = moment.tz.guess();
  const autoTimeZoneLabel = `Auto (${timeZone})`;
  const offsetMinutes = moment.tz(timeZone).utcOffset();
  const offsetHours = offsetMinutes / 60;
  const formattedOffset = `UTC${offsetHours >= 0 ? "+" : ""}${String(
    offsetHours
  ).padStart(2, "0")}:00`;
  const abbreviation = moment.tz(timeZone).format("z");

  return {
    key: timeZone,
    label: autoTimeZoneLabel,
    offset: offsetHours,
    offsetMs: offsetMinutes * 60 * 1000,
    formattedOffset,
    localAbbr: abbreviation,
  };
};

export default autoTimeZone;

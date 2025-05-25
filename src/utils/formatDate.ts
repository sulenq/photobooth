import { MONTHS } from "@/constants/months";
import { Type__DateFormat, Type__DateVariant } from "@/constants/types";
import { WEEKDAYS_0_BASED } from "@/constants/weekdays";
import moment from "moment-timezone";
import userTimeZone from "./userTimeZone";
import dateObject from "./dateObject";
import getTzOffsetMs from "./getTzOffsetMs";
import autoTimeZone from "./autoTimeZone";

const formatDate = (
  date?: Date | string | undefined,
  options: {
    variant?: Type__DateVariant;
    withTime?: boolean;
    prefixDateFormat?: Type__DateFormat;
    prefixTimeZoneKey?: string;
  } = {}
) => {
  if (!date) return "";

  let finalDate;
  const autoTzOffset = getTzOffsetMs(autoTimeZone().key);
  if (!dateObject(date)) {
    finalDate = new Date(new Date(date).getTime() - autoTzOffset);
  } else {
    finalDate = date;
  }

  const lang = localStorage.getItem("lang") || "id";
  const dateFormat =
    options.prefixDateFormat || localStorage.getItem("dateFormat") || "dmy";
  const timeZoneKey = options.prefixTimeZoneKey || userTimeZone().key;
  const localDate = moment.tz(finalDate, timeZoneKey);
  const day = localDate.date();
  const month = localDate.month();
  const year = localDate.year();
  const weekday = localDate.day();

  const monthName = MONTHS[lang][month];
  const shortMonthName = monthName.substring(0, 3);
  const weekdayName = WEEKDAYS_0_BASED[lang][weekday];
  const shortWeekdayName = weekdayName.substring(0, 3);

  const basicVariant = options.variant === "basic";

  const formatDateString = (
    day: number,
    year: number,
    monthName: string | number
  ) => {
    switch (dateFormat.toLowerCase()) {
      case "dmy":
        return `${day}${basicVariant ? "-" : " "}${monthName}${
          basicVariant ? "-" : " "
        }${year}`;
      case "mdy":
        return `${monthName}${basicVariant ? "-" : " "}${day}${
          basicVariant ? "-" : ", "
        }${year}`;
      case "ymd":
        return `${year}${basicVariant ? "-" : " "}${monthName}${
          basicVariant ? "-" : " "
        }${day}`;
      default:
        return `${day} ${monthName} ${year}`;
    }
  };

  switch (options.variant) {
    case "basic":
      return formatDateString(day, year, month);
    case "shortMonth":
      return formatDateString(day, year, shortMonthName);
    case "fullMonth":
      return formatDateString(day, year, monthName);
    case "monthYear":
      return `${monthName} ${year}`;
    case "shortMonthDay":
      return `${day} ${shortMonthName}`;
    case "fullMonthDay":
      return `${day} ${monthName}`;
    case "weekdayBasic":
      return `${shortWeekdayName}, ${formatDateString(day, year, monthName)}`;
    case "weekdayShortMonth":
      return `${shortWeekdayName}, ${formatDateString(
        day,
        year,
        shortMonthName
      )}`;
    case "weekdayFullMonth":
      return `${weekdayName}, ${formatDateString(day, year, monthName)}`;
    default:
      return formatDateString(day, year, monthName);
  }
};

export default formatDate;

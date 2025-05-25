import moment from "moment-timezone";

const getTzOffsetMs = (timeZoneKey: string): number => {
  return moment.tz(timeZoneKey).utcOffset() * 60 * 1000;
};

export default getTzOffsetMs;

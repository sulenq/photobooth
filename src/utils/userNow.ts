import autoTimeZone from "./autoTimeZone";
import getTzOffsetMs from "./getTzOffsetMs";
import userTimeZone from "./userTimeZone";

const userNow = () => {
  const userTz = userTimeZone();
  const autoTz = autoTimeZone();
  const userOffset = getTzOffsetMs(userTz.key);
  const autoOffset = getTzOffsetMs(autoTz.key);
  const now = new Date(new Date().getTime() - autoOffset + userOffset);

  return now;
};

export default userNow;

import { Type__TimeZoneObject } from "@/constants/types";
import autoTimeZone from "./autoTimeZone";

const userTimeZone = (): Type__TimeZoneObject => {
  const autoTZ = autoTimeZone();
  const storedTimeZone = localStorage.getItem("timeZone");

  if (!storedTimeZone) return autoTZ;

  try {
    const parsedTimeZone = JSON.parse(storedTimeZone) as Type__TimeZoneObject;
    if (parsedTimeZone.label.startsWith("Auto")) return autoTZ;

    return parsedTimeZone;
  } catch {
    return autoTZ;
  }
};

export default userTimeZone;

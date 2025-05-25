import { Type__TimeZoneObject } from "@/constants/types";
import autoTimeZone from "@/utils/autoTimeZone";
import { create } from "zustand";

const STORAGE_KEY = "timeZone";

interface Props {
  timeZone: Type__TimeZoneObject;
  setTimeZone: (newState: Type__TimeZoneObject) => void;
}

const useTimeZone = create<Props>((set) => {
  const getStoredTimeZone = (): Type__TimeZoneObject => {
    try {
      const rawStored = localStorage.getItem(STORAGE_KEY);
      if (rawStored) {
        const parsed = JSON.parse(rawStored) as Type__TimeZoneObject;
        return parsed.label.startsWith("Auto") ? autoTimeZone() : parsed;
      }
    } catch (error) {
      console.error("Failed to parse timezone from localStorage:", error);
    }
    return autoTimeZone();
  };

  return {
    timeZone: getStoredTimeZone(),
    setTimeZone: (newState) => {
      set((state) => {
        if (state.timeZone.key !== newState.key) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
          return { timeZone: newState };
        }
        return state;
      });
    },
  };
});

export default useTimeZone;

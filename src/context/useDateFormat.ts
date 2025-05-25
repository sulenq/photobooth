import { Type__DateFormat } from "@/constants/types";
import { create } from "zustand";

const STORAGE_KEY = "dateFormat";
const DEFAULT = "dmy";

interface Props {
  dateFormat: Type__DateFormat;
  setDateFormat: (newState: Type__DateFormat) => void;
}

const useDateFormat = create<Props>((set) => {
  const getStoredFormat = (): Type__DateFormat => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return stored as Type__DateFormat;
      localStorage.setItem(STORAGE_KEY, DEFAULT);
    } catch (error) {
      console.error("Failed to access dateFormat from localStorage:", error);
    }
    return DEFAULT;
  };

  return {
    dateFormat: getStoredFormat(),
    setDateFormat: (newState) =>
      set((state) => {
        if (state.dateFormat !== newState) {
          localStorage.setItem(STORAGE_KEY, newState);
          return { dateFormat: newState };
        }
        return state;
      }),
  };
});

export default useDateFormat;

import { create } from "zustand";

const STORAGE_KEY = "timeFormat";
const DEFAULT = "24-hour";

interface Props {
  timeFormat: string;
  setTimeFormat: (newState: string) => void;
}

const useTimeFormat = create<Props>((set) => {
  const getStoredFormat = (): string => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return stored;
      localStorage.setItem(STORAGE_KEY, DEFAULT);
    } catch (error) {
      console.error("Failed to access timeFormat from localStorage:", error);
    }
    return DEFAULT;
  };

  return {
    timeFormat: getStoredFormat(),
    setTimeFormat: (newState) =>
      set((state) => {
        if (state.timeFormat !== newState) {
          localStorage.setItem(STORAGE_KEY, newState);
          return { timeFormat: newState };
        }
        return state;
      }),
  };
});

export default useTimeFormat;

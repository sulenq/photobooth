import { create } from "zustand";

const STORAGE_KEY = "uom";
const DEFAULT = "metric";

interface Props {
  UOM: string;
  setUOM: (newState: string) => void;
}

const useUOM = create<Props>((set) => {
  const getStoredUOM = (): string => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return stored;
      localStorage.setItem(STORAGE_KEY, DEFAULT);
    } catch (error) {
      console.error("Failed to access UOM from localStorage:", error);
    }
    return DEFAULT;
  };

  return {
    UOM: getStoredUOM(),
    setUOM: (newState) =>
      set((state) => {
        if (state.UOM !== newState) {
          localStorage.setItem(STORAGE_KEY, newState);
          return { UOM: newState };
        }
        return state;
      }),
  };
});

export default useUOM;

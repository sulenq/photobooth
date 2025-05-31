// store/photoStore.ts
import { create } from "zustand";

type SlotKey = 1 | 2 | 3 | 4;

type PhotoSlots = Record<SlotKey, string | null>;

interface PhotoStore {
  resPhotos: PhotoSlots;
  setResPhotos: (
    update: PhotoSlots | ((prev: PhotoSlots) => PhotoSlots)
  ) => void;
}

const initialSlots: PhotoSlots = {
  1: null,
  2: null,
  3: null,
  4: null,
};

const useSessionResPhotos = create<PhotoStore>((set) => ({
  resPhotos: { ...initialSlots },

  setResPhotos: (update) => {
    if (typeof update === "function") {
      // if update is callback, execute it with current state first
      set((state) => ({
        resPhotos: update(state.resPhotos),
      }));
    } else {
      // else treat as direct value
      set({ resPhotos: update });
    }
  },
}));

export default useSessionResPhotos;

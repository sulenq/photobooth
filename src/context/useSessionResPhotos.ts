import { create } from "zustand";

type PhotoSlots = Record<number, string | null>;

interface PhotoStore {
  resPhotos: PhotoSlots;
  setResPhotos: (
    update: PhotoSlots | ((prev: PhotoSlots) => PhotoSlots)
  ) => void;
  clearResPhotos: () => void;
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
      set((state) => ({
        resPhotos: update(state.resPhotos),
      }));
    } else {
      set({ resPhotos: update });
    }
  },

  clearResPhotos: () => {
    set({ resPhotos: { ...initialSlots } });
  },
}));

export default useSessionResPhotos;

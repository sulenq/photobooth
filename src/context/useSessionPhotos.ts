// store/photoStore.ts
import { create } from "zustand";

interface PhotoStore {
  photos: string[]; // base64 atau blob URL
  addPhoto: (photo: string) => void;
  popPhoto: () => void;
  clearPhotos: () => void;
}

const useSessionPhotos = create<PhotoStore>((set) => ({
  photos: [],
  addPhoto: (photo) =>
    set((state) => ({
      photos: state.photos.length < 4 ? [...state.photos, photo] : state.photos,
    })),
  popPhoto: () => set((state) => ({ photos: state.photos.slice(1) })),
  clearPhotos: () => set({ photos: [] }),
}));

export default useSessionPhotos;

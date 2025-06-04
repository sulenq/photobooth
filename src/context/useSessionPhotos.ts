// store/photoStore.ts
import { dummyPhotos } from "@/constants/dummyPhotos";
import { create } from "zustand";

interface PhotoStore {
  photos: string[]; // base64 atau blob URL
  addPhoto: (photo: string) => void;
  popPhoto: () => void;
  clearPhotos: () => void;
}

const useSessionPhotos = create<PhotoStore>((set) => ({
  photos: dummyPhotos, // TODO: ganti array kosong kalo dah prod
  addPhoto: (photo) =>
    set((state) => ({
      photos: state.photos.length < 4 ? [...state.photos, photo] : state.photos,
    })),
  popPhoto: () =>
    set((state) => ({
      photos: state.photos.slice(0, -1), // remove last item
    })),
  clearPhotos: () => set({ photos: [] }),
}));

export default useSessionPhotos;

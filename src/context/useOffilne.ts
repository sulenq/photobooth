import { create } from "zustand";

interface Props {
  offline: boolean;
  setOffline: (newState: any) => void;
}

const useOffline = create<Props>((set) => {
  return {
    offline: false,
    setOffline: (newState: any) => set({ offline: newState }),
  };
});

export default useOffline;

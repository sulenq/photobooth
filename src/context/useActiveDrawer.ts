import { create } from "zustand";

interface Props {
  activeDrawerIds: string[];
  setActiveDrawerIds: (newState: string[]) => void;
}

const useActiveDrawer = create<Props>((set) => ({
  activeDrawerIds: [],
  setActiveDrawerIds: (newState: string[]) =>
    set({ activeDrawerIds: newState }),
}));

export default useActiveDrawer;

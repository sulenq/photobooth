import { FILTERS } from "@/constants/filters";
import { create } from "zustand";

interface Props {
  filter: any;
  setFilter: (newState: any) => void;
}

const useSessionFilter = create<Props>((set) => {
  return {
    filter: FILTERS[0],
    setFilter: (newState) => set({ filter: newState }),
  };
});

export default useSessionFilter;

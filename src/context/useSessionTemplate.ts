import { create } from "zustand";

interface Props {
  template: any;
  setTemplate: (newState: any) => void;
}

const useSessionTemplate = create<Props>((set) => {
  return {
    template: null,
    setTemplate: (newState) => set({ template: newState }),
  };
});

export default useSessionTemplate;

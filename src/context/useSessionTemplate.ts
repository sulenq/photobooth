import { DUMMY_TEMPLATE_OPTIONS } from "@/constants/dummyTemplateOptions";
import { create } from "zustand";

interface Props {
  template: any;
  setTemplate: (newState: any) => void;
}

const useSessionTemplate = create<Props>((set) => {
  return {
    template: DUMMY_TEMPLATE_OPTIONS[0],
    setTemplate: (newState) => set({ template: newState }),
  };
});

export default useSessionTemplate;

import { IMAGES_PATH } from "@/constants/paths";
import { create } from "zustand";

interface Props {
  template: any;
  defaultTemplate: any;
  setTemplate: (newState: any) => void;
}

const DEFAULT = {
  id: -1,
  layoutId: 3,
  production: `${IMAGES_PATH}/templates/layouts/default.png`,
};

const useSessionTemplate = create<Props>((set) => {
  return {
    template: DEFAULT,
    defaultTemplate: DEFAULT,
    setTemplate: (newState) => set({ template: newState }),
  };
});

export default useSessionTemplate;

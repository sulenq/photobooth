import { IMAGES_PATH } from "@/constants/paths";
import { create } from "zustand";

interface Props {
  template: any;
  setTemplate: (newState: any) => void;
}

const DEFAULT = {
  id: -1,
  layoutId: 5,
  production: `${IMAGES_PATH}/templates/layouts/default.png`,
};

const useSessionTemplate = create<Props>((set) => {
  return {
    template: DEFAULT,
    setTemplate: (newState) => set({ template: newState }),
  };
});

export default useSessionTemplate;

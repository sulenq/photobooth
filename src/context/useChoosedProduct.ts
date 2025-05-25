import { create } from "zustand";

interface Props {
  choosedProduct: any;
  setChoosedProduct: (newState: any) => void;
}

const useChoosedProduct = create<Props>((set) => {
  return {
    choosedProduct: null,
    setChoosedProduct: (newState) => set({ choosedProduct: newState }),
  };
});

export default useChoosedProduct;

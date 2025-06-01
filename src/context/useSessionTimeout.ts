import { create } from "zustand";

interface Props {
  sessionTimeout: boolean;
  setSessionTimeout: (newState: any) => void;
}

const useSessionTimeout = create<Props>((set) => {
  return {
    sessionTimeout: false,
    setSessionTimeout: (newState) => set({ sessionTimeout: newState }),
  };
});

export default useSessionTimeout;

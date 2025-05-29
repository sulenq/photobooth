import { create } from "zustand";

interface Props {
  sessionShutterTimer: number;
  setSessionShutterTimer: (newState: any) => void;
}

const useSessionShutterTimer = create<Props>((set) => {
  return {
    sessionShutterTimer: 3,
    setSessionShutterTimer: (newState) =>
      set({ sessionShutterTimer: newState }),
  };
});

export default useSessionShutterTimer;

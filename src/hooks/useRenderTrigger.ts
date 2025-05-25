import { create } from "zustand";

type State = {
  rt: boolean;
};

type Actions = {
  setRt: (rt: boolean) => void;
};

const useRenderTrigger = create<State & Actions>((set) => ({
  rt: false,
  setRt: (rt) => set(() => ({ rt: rt })),
}));

export default useRenderTrigger;

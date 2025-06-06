import { create } from "zustand";

let timer: NodeJS.Timeout | null = null;

interface StartTimerParams {
  initialSeconds: number;
  onFinished: () => void;
}

interface SessionTimerState {
  seconds: number;
  finished: boolean;
  startTimer: (params: StartTimerParams) => void;
  setFinished: (finished: boolean) => void;
}

const useSessionTimer = create<SessionTimerState>((set, get) => ({
  seconds: 0,
  finished: true,

  setFinished: (finished) => set({ finished }),

  startTimer: ({ initialSeconds, onFinished }) => {
    if (timer) clearInterval(timer);

    set({ seconds: initialSeconds, finished: false });

    timer = setInterval(() => {
      const { seconds } = get();

      if (seconds <= 1) {
        clearInterval(timer!);
        set({ seconds: 0, finished: true });
        onFinished();
      } else {
        set({ seconds: seconds - 1 });
      }
    }, 1000);
  },
}));

export default useSessionTimer;

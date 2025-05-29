import { useCallback, useEffect, useRef, useState } from "react";

interface UseCountdownOptions {
  initialValue: number;
  onTick?: (remaining: number) => void;
  onFinished?: () => void;
}

const useCountdown = ({
  initialValue,
  onTick,
  onFinished,
}: UseCountdownOptions) => {
  const [remaining, setRemaining] = useState(initialValue);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false); // stop running state
  }, []);

  const startCountdown = useCallback(() => {
    clear();
    setRemaining(initialValue);
    setRunning(true); // start running state

    if (onTick) onTick(initialValue);

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        if (onTick) onTick(next);

        if (next <= 0) {
          clear();
          if (onFinished) onFinished();
        }

        return next;
      });
    }, 1000);
  }, [initialValue, onTick, onFinished, clear]);

  useEffect(() => {
    return () => clear(); // cleanup on unmount
  }, [clear]);

  return {
    remaining,
    running,
    startCountdown,
  };
};

export default useCountdown;

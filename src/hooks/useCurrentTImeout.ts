import { useEffect, useRef } from "react";

const useCurrentTimeout = (callback: () => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear the timeout if it exists before setting a new one
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to execute the callback
    timeoutRef.current = setTimeout(() => {
      callback();
    }, delay);

    // Cleanup function to clear the timeout if the component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [callback, delay]);
};

export default useCurrentTimeout;

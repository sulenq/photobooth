import { useEffect, RefObject } from "react";

const useClickOutside = <T extends HTMLElement | null>(
  refs: RefObject<T> | RefObject<T>[],
  callback: () => void
): void => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent): void {
      const refArray = Array.isArray(refs) ? refs : [refs];
      const isOutside = refArray.every(
        (ref) => ref.current && !ref.current.contains(event.target as Node)
      );

      if (isOutside) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [refs, callback]);
};

export default useClickOutside;

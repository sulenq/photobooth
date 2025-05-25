import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useCallBackOnNavigate = (callback: () => void) => {
  const location = useLocation();
  const [prevPathnameState, setPrevPathnameState] = useState<string | null>(
    null
  );
  useEffect(() => {
    if (prevPathnameState !== location.pathname) {
      callback();
    }
    setPrevPathnameState(location.pathname);
  }, [callback, location]);
};

export default useCallBackOnNavigate;

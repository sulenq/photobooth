import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const useCallBackOnNavigate = (callback: () => void) => {
  const location = useLocation();
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPathname.current) {
      // Only run if actual path changed
      console.log("navigating");
      callback();
      prevPathname.current = location.pathname;
    }
  }, [location.pathname]);
};

export default useCallBackOnNavigate;

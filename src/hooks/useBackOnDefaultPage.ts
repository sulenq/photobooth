import { useLocation, useNavigate } from "react-router-dom";

const useBackOnDefaultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const onFirstNavigation = window.history.state === null;
  // const navEntries = performance.getEntriesByType(
  //   "navigation"
  // ) as PerformanceNavigationTiming[];
  // const unrefreshedYet = navEntries[0]?.type === "navigate";
  const historyIdx = window.history.state?.idx;

  const handleBackOnDefaultPage = () => {
    if (historyIdx === 0) {
      const pathWithoutParams = location.pathname;
      navigate(pathWithoutParams, { replace: true });
    } else {
      // navigate(-1);
    }
  };

  return handleBackOnDefaultPage;
};

export default useBackOnDefaultPage;

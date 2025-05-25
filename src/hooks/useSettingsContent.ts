import { useLocation } from "react-router-dom";
import useScreen from "./useScreen";

export function useSettingsContent(settingsPath: string = "/settings") {
  const location = useLocation();

  const settingsRoute = location.pathname === settingsPath;
  const { sw } = useScreen();
  const siss = sw < 1200;

  return { settingsRoute, siss };
}

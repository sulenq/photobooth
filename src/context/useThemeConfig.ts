import { IMAGES_PATH } from "@/constants/paths";
import { create } from "zustand";

const STORAGE_KEY = "themeConfig";

interface ThemeConfigProps {
  colorPalette: string;
  primaryColor: string;
  primaryColorHex: string;
  logo: string;
  radii: {
    component: string;
    container: string;
  };
}

const DEFAULT: ThemeConfigProps = {
  colorPalette: "p",
  primaryColor: "p.500",
  primaryColorHex: "#0062FF",
  logo: `${IMAGES_PATH}/logo_graphic.png`,
  radii: {
    component: "xl",
    container: "2xl",
  },
};

interface Props {
  themeConfig: ThemeConfigProps;
  setThemeConfig: (config: Partial<ThemeConfigProps>) => void;
}

export const useThemeConfig = create<Props>((set) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const initial = stored ? JSON.parse(stored) : DEFAULT;

  return {
    themeConfig: initial,
    setThemeConfig: (config) => {
      set((state) => {
        const newConfig = { ...state.themeConfig, ...config };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
        return { themeConfig: newConfig };
      });
    },
  };
});

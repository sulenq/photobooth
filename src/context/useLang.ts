import { create } from "zustand";
import en from "../locales/en";
import id from "../locales/id";

const STORAGE_KEY = "lang";
const DEFAULT: keyof typeof translations = "id";

const translations = {
  id,
  en,
};

interface Props {
  lang: keyof typeof translations;
  l: (typeof translations)[keyof typeof translations];
  setLang: (newState: keyof typeof translations) => void;
}

const useLang = create<Props>((set) => {
  const getStoredLang = (): keyof typeof translations => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && stored in translations)
        return stored as keyof typeof translations;
      localStorage.setItem(STORAGE_KEY, DEFAULT);
    } catch (error) {
      console.error("Failed to access language from localStorage:", error);
    }
    return DEFAULT;
  };

  const initialLang = getStoredLang();

  return {
    lang: initialLang,
    l: translations[initialLang],
    setLang: (newState) =>
      set((state) => {
        if (state.lang !== newState) {
          localStorage.setItem(STORAGE_KEY, newState);
          return {
            lang: newState,
            l: translations[newState],
          };
        }
        return state;
      }),
  };
});

export default useLang;

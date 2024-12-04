import React, { createContext, useCallback, useContext } from "react";
import cfg from "./localization.cfg";
import useLocalStorage from "../../hooks/useLocalStorage";

const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useLocalStorage("locale", cfg.defaultLanguage);

  const t = useCallback(
    (obj) => {
      if (!obj || typeof obj !== "object") return obj; // String
      const translation = obj[locale];
      if (translation) return translation; // Localization found
      console.warn("No localization found for: " + obj);
      return obj[cfg.defaultLanguage] || null; // Default fallback
    },
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  return useContext(LocaleContext);
};

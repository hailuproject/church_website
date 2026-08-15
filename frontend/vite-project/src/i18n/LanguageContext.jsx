import { createContext, useContext, useEffect, useState } from "react";
import enCommon from "./locales/en/common.json";
import amCommon from "./locales/am/common.json";

const LanguageContext = createContext();

const translations = {
  en: enCommon,
  am: amCommon,
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or browser preference
    const saved = localStorage.getItem("language");
    if (saved && saved in translations) return saved;

    const browserLang = navigator.language.split("-")[0];
    if (browserLang in translations) return browserLang;

    return "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "am" ? "ltr" : "ltr";
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: (key, params) => {
      const keys = key.split(".");
      let value = translations[language];

      for (const k of keys) {
        if (value && typeof value === "object") {
          value = value[k];
        } else {
          return key; // Return key if translation not found
        }
      }

      if (typeof value === "string" && params) {
        return value.replace(/\{(\w+)\}/g, (match, name) =>
          name in params ? params[name] : match
        );
      }

      return value || key;
    },
    availableLanguages: Object.keys(translations),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

export function useTranslation() {
  const { t } = useLanguage();
  return { t };
}

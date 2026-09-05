import { createContext, useContext, useEffect, useState } from "react";
import enCommon from "./locales/en/common.json";
import amCommon from "./locales/am/common.json";
import tiCommon from "./locales/ti/common.json";

const LanguageContext = createContext();

const translations = {
  en: enCommon,
  am: amCommon,
  ti: tiCommon,
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
    document.documentElement.dir = "ltr";
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: (key, params) => {
      const lookup = (dict) => {
        let current = dict;
        for (const k of key.split(".")) {
          if (current && typeof current === "object") {
            current = current[k];
          } else {
            return undefined;
          }
        }
        return typeof current === "string" ? current : undefined;
      };

      let value = lookup(translations[language]);
      if (value === undefined) {
        // Fall back to English before giving up on the key.
        value = lookup(enCommon);
      }
      if (value === undefined) {
        return key;
      }

      if (params) {
        return value.replace(/\{(\w+)\}/g, (match, name) =>
          name in params ? params[name] : match,
        );
      }

      return value;
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

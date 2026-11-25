"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeMode = "light" | "dark";
export type Language = "es" | "en";

interface SettingsContextValue {
  theme: ThemeMode;
  language: Language;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: <T>(esVal: T, enVal: T) => T;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

const DARK_MODE_CSS = `
  html[data-theme="dark"],
  html[data-theme="dark"] body,
  .dark-theme-root {
    background-color: #09090b !important;
    color: #f5f5f7 !important;
    color-scheme: dark !important;
  }

  /* White cards & main surfaces -> Apple Space Gray / Elevated Dark */
  .dark-theme-root .bg-white,
  .dark-theme-root [class*="bg-white"] {
    background-color: #141417 !important;
  }

  /* Translucent glass headers, docks & popovers */
  .dark-theme-root header,
  .dark-theme-root [class*="backdrop-blur"] {
    background-color: rgba(20, 20, 24, 0.88) !important;
    border-color: rgba(255, 255, 255, 0.12) !important;
  }

  /* Soft off-white surfaces (#fbfbfd, #fafafa) -> Deep OLED Black (#09090b / #0e0e11) */
  .dark-theme-root [class*="bg-[#fbfbfd]"],
  .dark-theme-root [class*="bg-[#fafafa]"] {
    background-color: #0c0c0f !important;
  }

  /* Pill & secondary surfaces (#f5f5f7) -> Elevated Dark Surface (#1e1e24) */
  .dark-theme-root [class*="bg-[#f5f5f7]"] {
    background-color: #1e1e24 !important;
  }

  /* Gradient stages (Avatar stage, 3D Blueprint stage, Philosophy banner) */
  .dark-theme-root [class*="bg-gradient-to-b"] {
    background-image: linear-gradient(to bottom, #16161a, #1d1d22) !important;
  }

  /* Primary Typography (#1d1d1f -> #f5f5f7) */
  .dark-theme-root [class*="text-[#1d1d1f]"],
  .dark-theme-root [class*="text-[#1D1D1F]"] {
    color: #f5f5f7 !important;
  }

  /* Secondary Typography (#86868b -> #a1a1aa) */
  .dark-theme-root [class*="text-[#86868b]"] {
    color: #a1a1aa !important;
  }

  /* Micro-thin dark borders -> Subtle white borders */
  .dark-theme-root [class*="border-black"] {
    border-color: rgba(255, 255, 255, 0.12) !important;
  }

  /* Form inputs & textareas */
  .dark-theme-root input,
  .dark-theme-root textarea {
    background-color: #18181c !important;
    color: #f5f5f7 !important;
    border-color: rgba(255, 255, 255, 0.15) !important;
  }

  .dark-theme-root input::placeholder,
  .dark-theme-root textarea::placeholder {
    color: #6e6e77 !important;
  }

  /* Primary dark buttons (#1d1d1f) become Apple Sapphire Blue (#0071e3) in Dark Mode so they pop! */
  .dark-theme-root button[class*="bg-[#1d1d1f]"],
  .dark-theme-root a[class*="bg-[#1d1d1f]"] {
    background-color: #0071e3 !important;
    color: #ffffff !important;
  }

  /* Active Spatial Dock Pill */
  .dark-theme-root .spatial-dock-active-pill {
    background-color: #0071e3 !important;
  }
`;

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [language, setLanguageState] = useState<Language>("es");

  // Sync theme attribute on <html> and <body>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark", "dark-theme-root");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark", "dark-theme-root");
      root.setAttribute("data-theme", "light");
    }
  }, [theme]);

  // Sync lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "es" ? "en" : "es"));
  };

  const t = <T,>(esVal: T, enVal: T): T => {
    return language === "en" ? enVal : esVal;
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        language,
        setTheme,
        toggleTheme,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {theme === "dark" && <style dangerouslySetInnerHTML={{ __html: DARK_MODE_CSS }} />}
      <div className={theme === "dark" ? "dark-theme-root min-h-screen" : "min-h-screen"}>
        {children}
      </div>
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextValue => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings debe usarse dentro de un SettingsProvider");
  }
  return ctx;
};

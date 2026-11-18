"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Language, UI_TRANSLATIONS } from "../data/neuravanContent";

interface LanguageContextType {
  lang: Language;
  dir: "rtl" | "ltr";
  t: typeof UI_TRANSLATIONS["en"];
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  switchPathLanguage: (targetLang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLang = "en",
}: {
  children: React.ReactNode;
  initialLang?: Language;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Detect language from URL pathname (/he/... vs /en/...) or default to 'en'
  const detectedLang: Language = pathname?.startsWith("/he") ? "he" : "en";
  const [lang, setLangState] = useState<Language>(detectedLang || initialLang);

  useEffect(() => {
    if (pathname?.startsWith("/he")) {
      setLangState("he");
    } else if (pathname?.startsWith("/en")) {
      setLangState("en");
    }
  }, [pathname]);

  const dir: "rtl" | "ltr" = lang === "he" ? "rtl" : "ltr";
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    switchPathLanguage(newLang);
  };

  const toggleLang = () => {
    const next = lang === "en" ? "he" : "en";
    setLang(next);
  };

  const switchPathLanguage = (targetLang: Language) => {
    if (!pathname) {
      router.push(`/${targetLang}`);
      return;
    }

    if (pathname.startsWith("/he")) {
      const rest = pathname.slice(3) || "";
      router.push(`/${targetLang}${rest}`);
    } else if (pathname.startsWith("/en")) {
      const rest = pathname.slice(3) || "";
      router.push(`/${targetLang}${rest}`);
    } else {
      router.push(`/${targetLang}${pathname}`);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        dir,
        t,
        setLang,
        toggleLang,
        switchPathLanguage,
      }}
    >
      <div dir={dir} lang={lang} className={dir === "rtl" ? "font-hebrew" : "font-english"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

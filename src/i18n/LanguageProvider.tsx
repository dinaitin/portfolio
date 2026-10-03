"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { defaultLocale, isLocale, type Locale, type Localized } from "./config";
import { en } from "./dictionaries/en";
import { es, type Dictionary } from "./dictionaries/es";

const dictionaries: Record<Locale, Dictionary> = { es, en };
const STORAGE_KEY = "portfolio-locale";

/*
 * Minimal external store for the active locale. It persists the choice in
 * localStorage (when available) and falls back to memory otherwise. The server
 * always renders the default locale, so there is no hydration mismatch.
 */
let memoryLocale: Locale = defaultLocale;
const listeners = new Set<() => void>();

function readLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // Storage unavailable (private mode, blocked cookies...).
  }
  return memoryLocale;
}

function writeLocale(locale: Locale) {
  memoryLocale = locale;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Ignore: the in-memory value is enough for this session.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, readLocale, () => defaultLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale: writeLocale, t: dictionaries[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return context;
}

/** Picks the value for the active locale from a `Localized` object. */
export function useLocalized() {
  const { locale } = useLanguage();
  return <T,>(value: Localized<T>) => value[locale];
}

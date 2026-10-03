"use client";

import { motion } from "framer-motion";
import { locales } from "@/i18n/config";
import { useLanguage } from "@/i18n/LanguageProvider";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={`relative inline-flex items-center rounded-full border border-line-strong bg-surface/70 p-1 font-mono text-xs ${className}`}
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={`relative z-10 min-w-9 rounded-full px-3 py-1.5 uppercase transition-colors ${
              active ? "text-bg" : "text-muted hover:text-fg"
            }`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {code}
          </button>
        );
      })}
    </div>
  );
}

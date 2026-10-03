"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

/** Keyboard shortcut past the navbar; only visible while focused. */
export function SkipLink() {
  const { t } = useLanguage();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-bg"
    >
      {t.nav.skipToContent}
    </a>
  );
}

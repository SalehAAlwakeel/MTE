"use client";

import { createContext, useContext, useLayoutEffect, type ReactNode } from "react";
import { getMessages, type Locale, type Messages } from "@/lib/i18n";

const LocaleContext = createContext<{ locale: Locale; t: Messages }>({
  locale: "en",
  t: getMessages("en"),
});

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return <LocaleContext.Provider value={{ locale, t: getMessages(locale) }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

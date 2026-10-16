"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { en, type CoolfixDict } from "@/lib/coolfix-content-en";
import { ar } from "@/lib/coolfix-content-ar";

export type CoolfixLang = "en" | "ar";

export const coolfixDict = { en, ar } as const;

type LangContextType = {
  lang: CoolfixLang;
  t: CoolfixDict;
  dir: "ltr" | "rtl";
  toggle: () => void;
  setLang: (l: CoolfixLang) => void;
};

const LangContext = createContext<LangContextType | null>(null);

const LANG_EVENT = "coolfix-lang-change";

/* localStorage as an external store — same pattern as the other demos */
function subscribe(onChange: () => void) {
  window.addEventListener(LANG_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(LANG_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): CoolfixLang {
  const saved = window.localStorage.getItem("coolfix-lang");
  return saved === "ar" ? "ar" : "en";
}

function getServerSnapshot(): CoolfixLang {
  return "en";
}

export function CoolfixProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  /* Sync <html dir/lang> — a legitimate DOM effect */
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    html.setAttribute("lang", lang);
  }, [lang]);

  const setLang = (l: CoolfixLang) => {
    try {
      window.localStorage.setItem("coolfix-lang", l);
    } catch {}
    window.dispatchEvent(new Event(LANG_EVENT));
  };

  const toggle = () => setLang(lang === "en" ? "ar" : "en");

  return (
    <LangContext.Provider
      value={{
        lang,
        t: coolfixDict[lang],
        dir: lang === "ar" ? "rtl" : "ltr",
        toggle,
        setLang,
      }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useCoolfixLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useCoolfixLang must be used within CoolfixProvider");
  return ctx;
}

/** Locale-aware day label for the booking date chips */
export function formatDayLabel(date: Date, lang: CoolfixLang) {
  return new Intl.DateTimeFormat(
    lang === "ar" ? "ar-EG" : "en-GB",
    { weekday: "short", day: "numeric", month: "short" }
  ).format(date);
}

/** Locale-aware long date for the review screen */
export function formatLongDate(date: Date, lang: CoolfixLang) {
  return new Intl.DateTimeFormat(
    lang === "ar" ? "ar-EG" : "en-GB",
    { weekday: "long", day: "numeric", month: "long" }
  ).format(date);
}

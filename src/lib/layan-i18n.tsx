"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { en, type LayanDict } from "@/lib/layan-content-en";
import { ar } from "@/lib/layan-content-ar";

export type Lang = "en" | "ar";

export const layanDict = { en, ar } as const;

/* ------------------------------------------------------------------ */
/* Context                                                            */
/* ------------------------------------------------------------------ */

type LangContextType = {
  lang: Lang;
  t: LayanDict;
  dir: "ltr" | "rtl";
  toggle: () => void;
  setLang: (l: Lang) => void;
};

const LangContext = createContext<LangContextType | null>(null);

const LANG_EVENT = "layan-lang-change";

/* localStorage as an external store — the React-blessed pattern, no setState-in-effect */
function subscribe(onChange: () => void) {
  window.addEventListener(LANG_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(LANG_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Lang {
  const saved = window.localStorage.getItem("layan-lang");
  return saved === "ar" ? "ar" : "en";
}

function getServerSnapshot(): Lang {
  return "en";
}

export function LayanProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  /* Sync <html dir/lang> — writing to the DOM is a legitimate effect */
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    html.setAttribute("lang", lang);
  }, [lang]);

  const setLang = (l: Lang) => {
    try {
      window.localStorage.setItem("layan-lang", l);
    } catch {}
    window.dispatchEvent(new Event(LANG_EVENT));
  };

  const toggle = () => setLang(lang === "en" ? "ar" : "en");

  return (
    <LangContext.Provider
      value={{
        lang,
        t: layanDict[lang] as unknown as LayanDict,
        dir: lang === "ar" ? "rtl" : "ltr",
        toggle,
        setLang,
      }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLayanLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLayanLang must be used within LayanProvider");
  return ctx;
}

"use client";

import { useEffect, useState } from "react";
import { Globe, Menu, Snowflake, X } from "lucide-react";
import { useCoolfixLang } from "@/lib/coolfix-i18n";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#services", key: "services" },
  { href: "#steps", key: "steps" },
  { href: "#plans", key: "plans" },
  { href: "#jobs", key: "jobs" },
  { href: "#reviews", key: "reviews" },
  { href: "#faq", key: "faq" },
] as const;

export function Header() {
  const { t, lang, toggle } = useCoolfixLang();
  const [open, setOpen] = useState(false);

  /* Close the mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-coolfix-line bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5" aria-label="CoolFix">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-coolfix-teal text-white shadow-sm">
            <Snowflake className="h-5 w-5" aria-hidden />
          </span>
          <span className="leading-none">
            <span className="block text-[19px] font-extrabold tracking-tight text-coolfix-ink">
              {lang === "ar" ? t.brand.name : t.brand.name}
            </span>
            <span className="mt-0.5 block text-[9.5px] font-semibold uppercase tracking-[0.18em] text-coolfix-fog">
              {lang === "ar" ? "للخدمات الفنية" : "Technical Services"}
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {LINKS.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className="text-[13.5px] font-medium text-coolfix-fog transition-colors hover:text-coolfix-teal-deep"
            >
              {t.nav[l.key]}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-coolfix-line px-3.5 text-[12.5px] font-semibold text-coolfix-ink transition-colors hover:border-coolfix-teal hover:text-coolfix-teal-deep"
            aria-label={lang === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
          >
            <Globe className="h-3.5 w-3.5" aria-hidden />
            {t.nav.switchLang}
          </button>
          <a
            href="#book"
            className="hidden h-9 items-center rounded-full bg-coolfix-teal px-5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-coolfix-teal-deep sm:inline-flex"
          >
            {t.nav.book}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-coolfix-line text-coolfix-ink lg:hidden"
            aria-expanded={open}
            aria-label={open ? t.nav.close : t.nav.menu}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <nav
        className={cn(
          "border-t border-coolfix-line bg-white lg:hidden",
          open ? "block" : "hidden"
        )}
        aria-label="Mobile"
      >
        <div className="mx-auto grid max-w-6xl gap-1 px-4 py-4 sm:px-6">
          {LINKS.map((l) => (
            <a
              key={l.key}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-[14px] font-medium text-coolfix-ink transition-colors hover:bg-coolfix-teal-mist"
            >
              {t.nav[l.key]}
            </a>
          ))}
          <a
            href="#book"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-coolfix-teal px-5 py-3 text-center text-[14px] font-semibold text-white"
          >
            {t.nav.book}
          </a>
        </div>
      </nav>
    </header>
  );
}

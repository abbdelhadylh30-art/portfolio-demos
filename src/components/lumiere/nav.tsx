"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, Languages, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { id: "treatments", key: "treatments" },
  { id: "results", key: "results" },
  { id: "doctors", key: "doctors" },
  { id: "difference", key: "about" },
  { id: "faq", key: "faq" },
  { id: "contact", key: "contact" },
] as const;

export function Nav() {
  const { t, lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/90 shadow-[0_1px_0_0_var(--border)] backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Main"
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3"
          aria-label="Lumière — home"
        >
          <span className="font-display text-2xl font-semibold tracking-wide text-primary sm:text-[1.7rem]">
            Lumière
          </span>
          <span className="hidden h-4 w-px bg-gold/50 sm:block" />
          <span className="hidden text-[0.65rem] font-medium uppercase tracking-[0.3em] text-muted-foreground sm:block">
            {lang === "ar" ? "عيادة تجميل" : "Aesthetic Clinic"}
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {t.nav[l.key]}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3.5 py-2 text-xs font-semibold text-primary backdrop-blur transition-all hover:border-gold hover:text-gold sm:px-4"
            aria-label="Switch language"
          >
            <Languages className="h-3.5 w-3.5" aria-hidden />
            <span className={lang === "en" ? "font-display text-sm" : "text-sm"}>
              {t.common.langLabel}
            </span>
          </button>

          <a
            href="tel:+97140000000"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-card/70 text-primary backdrop-blur transition-all hover:border-gold hover:text-gold md:flex"
            aria-label={t.nav.call}
          >
            <Phone className="h-4 w-4" aria-hidden />
          </a>

          {/* Book CTA */}
          <Button
            onClick={() => go("booking")}
            className="hidden rounded-full bg-primary px-6 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30 sm:inline-flex"
          >
            {t.nav.book}
          </Button>

          {/* Mobile menu */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/70 text-primary backdrop-blur lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-all duration-500 lg:hidden",
          open ? "max-h-[420px]" : "max-h-0 border-t-0"
        )}
      >
        <ul className="space-y-1 px-6 py-4">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="w-full rounded-lg px-3 py-3 text-start text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                {t.nav[l.key]}
              </button>
            </li>
          ))}
          <li className="pt-2">
            <Button
              onClick={() => go("booking")}
              className="w-full rounded-full bg-primary px-6 text-primary-foreground"
            >
              {t.nav.book}
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLayanLang } from "@/lib/layan-i18n";
import { cn } from "@/lib/utils";

export function Header() {
  const { t, lang, toggle } = useLayanLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/layan";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !isHome;

  const links = [
    { href: "/layan/work", label: t.nav.work },
    { href: "/layan/services", label: t.nav.services },
    { href: "/layan/studio", label: t.nav.studio },
    { href: "/layan/contact", label: t.nav.contact },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "border-b border-layan-stone/70 bg-layan-cream/95 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Wordmark */}
        <Link
          href="/layan"
          className="group flex items-baseline gap-2"
          aria-label="Layan — home"
        >
          <span
            className={cn(
              "font-display text-[26px] leading-none tracking-wide transition-colors",
              solid ? "text-layan-ink" : "text-white"
            )}
          >
            {lang === "ar" ? "ليان" : "Layan"}
          </span>
          <span
            className={cn(
              "text-[10px] uppercase tracking-[0.3em] transition-colors",
              solid ? "text-layan-bronze" : "text-white/70"
            )}
          >
            {lang === "ar" ? "استوديو" : "studio"}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-[13px] font-medium uppercase tracking-[0.14em] transition-colors",
                  solid
                    ? active
                      ? "text-layan-ink"
                      : "text-layan-fog hover:text-layan-ink"
                    : active
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggle}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-[12px] font-medium tracking-wide transition-all",
              solid
                ? "border-layan-stone text-layan-bronze-deep hover:border-layan-bronze hover:text-layan-ink"
                : "border-white/40 text-white/90 hover:border-white hover:text-white"
            )}
            aria-label="Switch language"
          >
            {t.common.langLabel}
          </button>

          {/* Book CTA */}
          <Link
            href="/layan/contact"
            className={cn(
              "hidden rounded-full px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] transition-all sm:inline-flex",
              solid
                ? "bg-layan-ink text-layan-cream hover:bg-layan-bronze-deep"
                : "bg-white/95 text-layan-ink hover:bg-white"
            )}
          >
            {t.nav.book}
          </Link>

          {/* Mobile menu */}
          <button
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
              solid ? "text-layan-ink" : "text-white"
            )}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-layan-stone/70 bg-layan-cream lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-4" aria-label="Mobile">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-layan-stone/50 py-4 text-[14px] font-medium uppercase tracking-[0.14em] text-layan-ink last:border-0"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/layan/contact"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-layan-ink px-5 py-3 text-center text-[12px] font-medium uppercase tracking-[0.14em] text-layan-cream"
            >
              {t.nav.book}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

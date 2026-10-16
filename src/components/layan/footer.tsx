"use client";

import Link from "next/link";
import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { useLayanLang } from "@/lib/layan-i18n";

export function Footer() {
  const { t } = useLayanLang();

  const explore = [
    { href: "/layan/work", label: t.footer.work },
    { href: "/layan/services", label: t.footer.services },
    { href: "/layan/studio", label: t.footer.studio },
    { href: "/layan/contact", label: t.footer.contact },
  ];

  return (
    <footer className="bg-layan-ink text-layan-cream">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <p className="font-display text-3xl tracking-wide">Layan</p>
            <p className="font-display mt-1 text-xl text-layan-bronze">ليان</p>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-layan-cream/70">
              {t.footer.tagline}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-layan-cream/20 text-layan-cream/80 transition-colors hover:border-layan-bronze hover:text-layan-bronze"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-layan-cream/20 text-layan-cream/80 transition-colors hover:border-layan-bronze hover:text-layan-bronze"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@layan.studio"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-layan-cream/20 text-layan-cream/80 transition-colors hover:border-layan-bronze hover:text-layan-bronze"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-layan-bronze">
              {t.footer.explore}
            </p>
            <ul className="mt-5 space-y-3">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[14px] text-layan-cream/80 transition-colors hover:text-layan-cream"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-layan-bronze">
              {t.footer.contact}
            </p>
            <ul className="mt-5 space-y-3 text-[14px] text-layan-cream/80">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-layan-bronze" aria-hidden />
                <span dir="ltr">+20 2 0000 0000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-layan-bronze" aria-hidden />
                hello@layan.studio
              </li>
              <li className="pt-2 leading-relaxed text-layan-cream/60">
                14 Hassan Sabry St., Zamalek, Cairo
                <br />
                Unit 7, Alserkal Avenue, Al Quoz 1, Dubai
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-layan-cream/10 pt-6 text-[12px] text-layan-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 Layan Interiors — {t.footer.rights}</p>
          <p className="text-layan-cream/40">{t.footer.disclaimer}</p>
          <p className="text-layan-bronze/80">{t.footer.credit}</p>
        </div>
      </div>
    </footer>
  );
}

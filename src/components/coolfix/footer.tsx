"use client";

import { Clock, MessageCircle, Phone, Snowflake } from "lucide-react";
import { useCoolfixLang } from "@/lib/coolfix-i18n";
import { services } from "@/lib/coolfix-data";
import { whatsappLink, WHATSAPP_DEFAULT, PHONE_DISPLAY } from "@/lib/coolfix-data";

export function Footer() {
  const { t, lang } = useCoolfixLang();

  return (
    <footer className="mt-auto bg-coolfix-ink text-white/70">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-coolfix-teal text-white">
                <Snowflake className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-[18px] font-extrabold tracking-tight text-white">
                {t.brand.name}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed">{t.footer.tagline}</p>
            <div className="mt-5 space-y-2.5" dir="ltr">
              <a
                href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-[13px] font-medium text-white/80 transition-colors hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 text-teal-300" aria-hidden />
                {PHONE_DISPLAY}
              </a>
              <a
                href={whatsappLink(WHATSAPP_DEFAULT[lang])}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px] font-medium text-white/80 transition-colors hover:text-white"
              >
                <MessageCircle className="h-3.5 w-3.5 text-teal-300" aria-hidden />
                WhatsApp — 24/7
              </a>
            </div>
          </div>

          {/* Services */}
          <nav aria-label={t.footer.servicesTitle}>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
              {t.footer.servicesTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.key}>
                  <a
                    href="#services"
                    className="text-[13px] transition-colors hover:text-teal-300"
                  >
                    {s.name[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Coverage */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
              {t.footer.coverageTitle}
            </h3>
            <p className="mt-4 text-[13px] leading-relaxed">{t.footer.areas}</p>
            <p className="mt-2 text-[12px] leading-relaxed text-white/45">
              {t.coverage.note}
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
              {t.footer.hoursTitle}
            </h3>
            <p className="mt-4 flex items-center gap-2 text-[13px]">
              <Clock className="h-4 w-4 text-teal-300" aria-hidden />
              {t.footer.hours}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[11.5px] text-white/40 sm:flex-row">
          <p>{t.footer.rights}</p>
          <p>{t.footer.stack}</p>
        </div>
      </div>
    </footer>
  );
}

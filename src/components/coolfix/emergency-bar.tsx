"use client";

import { Flame, MessageCircle, Phone } from "lucide-react";
import { useCoolfixLang } from "@/lib/coolfix-i18n";
import { whatsappLink, WHATSAPP_DEFAULT, PHONE_DISPLAY } from "@/lib/coolfix-data";

export function EmergencyBar() {
  const { t, lang } = useCoolfixLang();

  return (
    <div className="bg-gradient-to-r from-coolfix-heat-deep via-coolfix-heat to-coolfix-heat-deep text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 sm:px-6">
        <p className="flex min-w-0 items-center gap-2 text-[12px] font-medium sm:text-[13px]">
          <Flame className="h-4 w-4 shrink-0" aria-hidden />
          <span className="truncate">{t.emergencyBar.text}</span>
        </p>
        <div className="flex items-center gap-2" dir="ltr">
          <a
            href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11.5px] font-semibold transition-colors hover:bg-white/20"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden />
            <span className="hidden sm:inline">{t.emergencyBar.call}</span>
            <span className="tabular-nums">{PHONE_DISPLAY}</span>
          </a>
          <a
            href={whatsappLink(WHATSAPP_DEFAULT[lang])}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11.5px] font-semibold text-coolfix-heat-deep transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden />
            {t.emergencyBar.whatsapp}
          </a>
        </div>
      </div>
    </div>
  );
}

"use client";

import { ArrowRight, Check, Info } from "lucide-react";
import { useCoolfixLang } from "@/lib/coolfix-i18n";
import { services } from "@/lib/coolfix-data";
import { useCoolfixBookingStore } from "@/lib/coolfix-store";
import { ServiceIcon } from "./service-icon";
import { Reveal } from "./reveal";

export function Services() {
  const { t, lang } = useCoolfixLang();
  const preselect = useCoolfixBookingStore((s) => s.preselect);

  function book(key: string) {
    preselect(key);
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="services" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="cf-eyebrow">{t.services.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-coolfix-ink sm:text-4xl">
            {t.services.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-coolfix-fog">
            {t.services.sub}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.key} delay={(i % 3) * 0.08}>
              <article className="cf-lift flex h-full flex-col rounded-2xl border border-coolfix-line bg-white p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-coolfix-teal-mist text-coolfix-teal-deep">
                    <ServiceIcon icon={s.icon} className="h-5.5 w-5.5" />
                  </span>
                  <p className="text-end leading-tight">
                    <span className="block text-[10.5px] font-semibold uppercase tracking-wide text-coolfix-fog">
                      {t.services.from}
                    </span>
                    <span className="text-[15px] font-bold tabular-nums text-coolfix-ink" dir="ltr">
                      {t.services.egp} {s.from}
                    </span>
                    {s.perUnit ? (
                      <span className="block text-[10.5px] text-coolfix-fog">
                        {t.services.perUnit}
                      </span>
                    ) : null}
                  </p>
                </div>

                <h3 className="mt-4 text-[17px] font-bold text-coolfix-ink">
                  {s.name[lang]}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-coolfix-fog">
                  {s.desc[lang]}
                </p>

                <ul className="mt-4 space-y-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b.en}
                      className="flex items-start gap-2 text-[12.5px] leading-snug text-coolfix-fog"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-coolfix-teal" aria-hidden />
                      {b[lang]}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => book(s.key)}
                  className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-coolfix-teal/50 text-[13.5px] font-semibold text-coolfix-teal-deep transition-colors hover:bg-coolfix-teal hover:text-white"
                >
                  {t.services.book}
                  <ArrowRight
                    className="h-4 w-4 rtl:rotate-180"
                    aria-hidden
                  />
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 flex items-start justify-center gap-2 text-center text-[12.5px] text-coolfix-fog">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-coolfix-teal" aria-hidden />
            {t.services.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

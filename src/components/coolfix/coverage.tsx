"use client";

import { Globe } from "lucide-react";
import { useCoolfixLang } from "@/lib/coolfix-i18n";
import { areas } from "@/lib/coolfix-data";
import { Reveal } from "./reveal";

export function Coverage() {
  const { t, lang } = useCoolfixLang();

  const cairo = areas.filter((a) => a.city === "cairo");
  const riyadh = areas.filter((a) => a.city === "riyadh");

  return (
    <section id="coverage" className="scroll-mt-24 bg-coolfix-paper py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="cf-eyebrow">{t.coverage.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-coolfix-ink sm:text-4xl">
            {t.coverage.title}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          {[
            { label: t.coverage.cairo, list: cairo },
            { label: t.coverage.riyadh, list: riyadh },
          ].map((group, gi) => (
            <Reveal key={group.label} delay={gi * 0.1}>
              <div className="rounded-2xl border border-coolfix-line bg-white p-6 sm:p-7">
                <h3 className="text-[15px] font-bold text-coolfix-ink">
                  {group.label}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {group.list.map((a) => (
                    <li
                      key={a.name.en}
                      className="rounded-full border border-coolfix-line bg-coolfix-paper px-4 py-1.5 text-[13px] font-medium text-coolfix-ink/80 transition-colors hover:border-coolfix-teal hover:text-coolfix-teal-deep"
                    >
                      {a.name[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-8 flex items-center gap-2 text-[12.5px] text-coolfix-fog">
            <Globe className="h-4 w-4 shrink-0 text-coolfix-teal" aria-hidden />
            {t.coverage.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

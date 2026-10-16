"use client";

import { useCoolfixLang } from "@/lib/coolfix-i18n";
import { Reveal } from "./reveal";

export function Steps() {
  const { t } = useCoolfixLang();

  return (
    <section id="steps" className="scroll-mt-24 bg-coolfix-paper py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Photo */}
          <Reveal className="order-2 lg:order-1">
            <figure className="relative">
              <img
                src="/images/coolfix/technician.jpg"
                alt="CoolFix technician checking pressure gauges on an air-conditioning unit"
                className="aspect-[4/3] w-full rounded-2xl border border-coolfix-line object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-4 start-4 rounded-xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-coolfix-fog">
                  {t.hero.eyebrow}
                </p>
                <p className="mt-0.5 text-[14px] font-bold text-coolfix-ink">
                  {t.hero.chips[1]}
                </p>
              </div>
            </figure>
          </Reveal>

          {/* Steps */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="cf-eyebrow">{t.steps.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-coolfix-ink sm:text-4xl">
                {t.steps.title}
              </h2>
            </Reveal>

            <ol className="mt-10 space-y-6">
              {t.steps.items.map((item, i) => (
                <Reveal key={item.title} delay={0.1 + i * 0.08}>
                  <li className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coolfix-ink text-[13px] font-bold tabular-nums text-teal-300" dir="ltr">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-[16.5px] font-bold text-coolfix-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-coolfix-fog">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

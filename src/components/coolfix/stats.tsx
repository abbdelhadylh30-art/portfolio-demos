"use client";

import { useCoolfixLang } from "@/lib/coolfix-i18n";
import { Reveal } from "./reveal";

export function Stats() {
  const { t } = useCoolfixLang();

  return (
    <section className="bg-coolfix-ink py-10 text-white sm:py-12" aria-label="Key numbers">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-8 px-4 sm:px-6 lg:grid-cols-4">
        {t.stats.items.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center">
            <p className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-extrabold tabular-nums tracking-tight text-teal-300 sm:text-4xl">
                {s.value}
              </span>
              {s.unit ? (
                <span className="text-[13px] font-semibold text-white/55">{s.unit}</span>
              ) : null}
            </p>
            <p className="mx-auto mt-2 max-w-[180px] text-[12px] leading-snug text-white/50">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useLang } from "@/lib/i18n";
import { Reveal } from "./reveal";

export function Stats() {
  const { t } = useLang();
  return (
    <section id="stats" className="relative z-10 -mt-2 bg-primary">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {t.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="flex flex-col items-center gap-2 text-center">
                <dt className="order-2 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground/70">
                  {s.label}
                </dt>
                <dd className="font-display order-1 text-4xl font-semibold text-gold-soft sm:text-5xl">
                  {s.value}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

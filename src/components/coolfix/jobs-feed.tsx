"use client";

import { Flame, MapPin, Star } from "lucide-react";
import { useCoolfixLang } from "@/lib/coolfix-i18n";
import { jobs } from "@/lib/coolfix-data";
import { Reveal } from "./reveal";

export function JobsFeed() {
  const { t, lang } = useCoolfixLang();

  return (
    <section id="jobs" className="scroll-mt-24 bg-coolfix-ink py-16 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="cf-eyebrow text-teal-300">{t.jobs.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {t.jobs.title}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/55">{t.jobs.sub}</p>
          </div>
          <span className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-coolfix-heat">
            <span className="cf-pulse relative flex h-2 w-2">
              <span className="h-2 w-2 rounded-full bg-coolfix-heat" />
            </span>
            {t.jobs.live}
          </span>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j, i) => (
            <Reveal key={j.service.en} delay={(i % 3) * 0.08}>
              <article className="h-full rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:bg-white/[0.07]">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[15px] font-semibold leading-snug">
                    {j.service[lang]}
                  </h3>
                  {j.emergency ? (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-coolfix-heat/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-coolfix-heat">
                      <Flame className="h-3 w-3" aria-hidden />
                      {t.jobs.emergencyTag}
                    </span>
                  ) : null}
                </div>

                <p className="mt-2 flex items-center gap-1.5 text-[12.5px] text-white/50">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {j.area[lang]}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <p className="text-[12px] text-white/50">
                    {t.jobs.completed}{" "}
                    <span className="font-bold tabular-nums text-teal-300" dir="ltr">
                      {j.time[lang]}
                    </span>
                  </p>
                  <p className="flex items-center gap-1 text-[12px] text-white/70">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
                    <span className="font-semibold tabular-nums" dir="ltr">{j.rating}</span>
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { Check, Crown } from "lucide-react";
import { useCoolfixLang } from "@/lib/coolfix-i18n";
import { plans } from "@/lib/coolfix-data";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Plans() {
  const { t, lang } = useCoolfixLang();

  return (
    <section id="plans" className="scroll-mt-24 bg-coolfix-teal-mist/60 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="cf-eyebrow">{t.plans.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-coolfix-ink sm:text-4xl">
            {t.plans.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-coolfix-fog">
            {t.plans.sub}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.08} className="h-full">
              <article
                className={cn(
                  "cf-lift relative flex h-full flex-col rounded-2xl border bg-white p-7",
                  p.popular
                    ? "border-coolfix-teal shadow-lg shadow-coolfix-teal/15"
                    : "border-coolfix-line"
                )}
              >
                {p.popular ? (
                  <span className="absolute -top-3.5 start-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-coolfix-teal px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white rtl:translate-x-1/2">
                    <Crown className="h-3.5 w-3.5" aria-hidden />
                    {t.plans.popular}
                  </span>
                ) : null}

                <h3 className="text-[18px] font-extrabold tracking-tight text-coolfix-ink">
                  {p.name[lang]}
                </h3>

                <p className="mt-1 text-[13.5px] font-medium text-coolfix-teal-deep">
                  {p.tagline[lang]}
                </p>

                <p className="mt-4 flex items-baseline gap-2">
                  <span className="text-[30px] font-extrabold tracking-tight text-coolfix-ink" dir="ltr">
                    EGP {p.priceEGP.toLocaleString("en-US")}
                  </span>
                  <span className="text-[13px] font-medium text-coolfix-fog">
                    {t.plans.perYear}
                  </span>
                </p>
                <p className="mt-1 text-[12px] text-coolfix-fog" dir="ltr">
                  SAR {p.priceSAR.toLocaleString("en-US")} · Riyadh
                </p>

                <ul className="mt-6 flex-1 space-y-3 border-t border-coolfix-line pt-6">
                  {p.features.map((f) => (
                    <li key={f.en} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-coolfix-ink/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-coolfix-teal" aria-hidden />
                      {f[lang]}
                    </li>
                  ))}
                </ul>

                <a
                  href="#book"
                  className={cn(
                    "mt-7 inline-flex h-11 items-center justify-center rounded-xl text-[13.5px] font-semibold transition-colors",
                    p.popular
                      ? "bg-coolfix-teal text-white hover:bg-coolfix-teal-deep"
                      : "border border-coolfix-teal/50 text-coolfix-teal-deep hover:bg-coolfix-teal hover:text-white"
                  )}
                >
                  {t.plans.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-8 text-center text-[12.5px] text-coolfix-fog">{t.plans.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

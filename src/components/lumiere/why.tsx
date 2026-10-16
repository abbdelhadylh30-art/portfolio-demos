"use client";

import { ShieldCheck, HandHeart, DoorClosed, Languages } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./reveal";

const icons = [ShieldCheck, HandHeart, DoorClosed, Languages];

export function Why() {
  const { t } = useLang();

  return (
    <section id="difference" className="bg-background py-24 lg:py-32" aria-labelledby="why-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Image collage */}
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative">
              <img
                src="/images/interior-2.jpg"
                alt={lang2alt()}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl shadow-primary/15"
              />
              <img
                src="/images/facial-2.jpg"
                alt=""
                loading="lazy"
                className="absolute -bottom-8 -end-4 hidden w-2/5 rounded-2xl border-4 border-background object-cover shadow-xl sm:block"
              />
              <div className="absolute -top-5 -start-5 hidden rounded-2xl bg-primary px-6 py-5 text-primary-foreground shadow-xl sm:block">
                <p className="font-display text-3xl font-semibold text-gold-soft">15+</p>
                <p className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.2em] opacity-80">
                  {yearsLabel()}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow">{t.why.eyebrow}</p>
              <h2 id="why-title" className="font-display mt-4 text-4xl font-medium leading-tight text-primary sm:text-5xl">
                {t.why.title}
              </h2>
            </Reveal>
            <ul className="mt-10 space-y-7">
              {t.why.points.map((p, i) => {
                const Icon = icons[i] ?? ShieldCheck;
                return (
                  <Reveal as="li" key={p.title} delay={i * 100} className="flex gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-primary">{p.title}</h3>
                      <p className="mt-1.5 text-sm font-light leading-relaxed text-muted-foreground">
                        {p.body}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );

  function lang2alt() {
    return t.why.title;
  }
  function yearsLabel() {
    return t.stats[2].label;
  }
}

"use client";

import { useMemo, useState } from "react";
import { Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { treatments, formatPrice, formatDuration, type Category } from "@/lib/treatments";
import { useBookingStore } from "@/lib/store";
import { Reveal } from "./reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Treatments() {
  const { t, lang } = useLang();
  const [cat, setCat] = useState<Category | "all">("all");
  const preselect = useBookingStore((s) => s.preselect);

  const cats: { key: Category | "all"; label: string }[] = useMemo(
    () => [
      { key: "all" as const, label: lang === "ar" ? "الكل" : "All" },
      { key: "injectables", label: t.treatments.categories.injectables },
      { key: "laser", label: t.treatments.categories.laser },
      { key: "skin", label: t.treatments.categories.skin },
      { key: "body", label: t.treatments.categories.body },
    ],
    [lang, t]
  );

  const shown = useMemo(
    () => (cat === "all" ? treatments : treatments.filter((tr) => tr.category === cat)),
    [cat]
  );

  const book = (key: string) => {
    preselect(key);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="treatments" className="bg-background py-24 lg:py-32" aria-labelledby="treatments-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t.treatments.eyebrow}</p>
          <h2
            id="treatments-title"
            className="font-display mt-4 text-4xl font-medium leading-tight text-primary sm:text-5xl"
          >
            {t.treatments.title}
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-muted-foreground">
            {t.treatments.subtitle}
          </p>
        </Reveal>

        {/* Category filter */}
        <Reveal delay={120} className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {cats.map((c) => (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              data-active={cat === c.key}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300",
                cat === c.key
                  ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "border-border bg-card text-muted-foreground hover:border-gold hover:text-primary"
              )}
            >
              {c.label}
            </button>
          ))}
        </Reveal>

        {/* Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((tr, i) => (
            <Reveal key={tr.key} delay={(i % 3) * 100}>
              <article className="lift group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={tr.image}
                    alt={tr.name[lang]}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <span className="absolute bottom-3 start-3 rounded-full bg-background/85 px-3.5 py-1.5 text-xs font-semibold text-primary backdrop-blur">
                    {t.treatments.from} {formatPrice(tr, lang)}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl font-semibold text-primary">
                    {tr.name[lang]}
                  </h3>
                  <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-muted-foreground">
                    {tr.desc[lang]}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 text-gold" aria-hidden />
                      {formatDuration(tr.duration, lang)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => book(tr.key)}
                      className="group/btn gap-1.5 rounded-full px-4 text-primary hover:bg-accent hover:text-gold"
                    >
                      {t.treatments.book}
                      {lang === "ar" ? (
                        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover/btn:-translate-x-0.5" aria-hidden />
                      ) : (
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" aria-hidden />
                      )}
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

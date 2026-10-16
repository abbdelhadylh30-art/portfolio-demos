"use client";

import { Star } from "lucide-react";
import { useCoolfixLang } from "@/lib/coolfix-i18n";
import { reviews } from "@/lib/coolfix-data";
import { Reveal } from "./reveal";

/**
 * Reviews render in their ORIGINAL language (two Arabic, two English),
 * regardless of UI language — the way they'd appear on a real Google profile.
 */
const ORIGINAL: ("ar" | "en")[] = ["ar", "en", "ar", "en"];

export function ReviewWall() {
  const { t } = useCoolfixLang();

  return (
    <section id="reviews" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="cf-eyebrow">{t.reviews.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-coolfix-ink sm:text-4xl">
            {t.reviews.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-coolfix-fog">
            {t.reviews.sub}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => {
            const original = ORIGINAL[i] ?? "en";
            return (
              <Reveal key={r.author.en} delay={(i % 4) * 0.07} className="h-full">
                <figure className="cf-lift flex h-full flex-col rounded-2xl border border-coolfix-line bg-coolfix-paper p-6">
                  <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                        aria-hidden
                      />
                    ))}
                  </div>
                  <blockquote
                    dir="auto"
                    className="mt-4 flex-1 text-[13.5px] leading-relaxed text-coolfix-ink/85"
                  >
                    {r.text[original]}
                  </blockquote>
                  <figcaption className="mt-5 border-t border-coolfix-line pt-4">
                    <p className="text-[13px] font-bold text-coolfix-ink" dir="auto">
                      {r.author[original]}
                    </p>
                    <p className="mt-0.5 text-[12px] text-coolfix-fog" dir="auto">
                      {r.place[original]}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

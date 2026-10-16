"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

const items = [
  {
    quote: {
      en: "I flew in from Riyadh for a laser resurfacing session and it was worth every minute of the trip. The physician spent an hour with me before touching a single device — I've never had that anywhere else.",
      ar: "سافرت من الرياض لجلسة تقشير بالليزر، وكانت تستحق كل دقيقة. قضت الطبيبة ساعة كاملة معي قبل أي جهاز — لم أعش هذا في أي مكان آخر.",
    },
    name: { en: "Nouf A.", ar: "نوف ع." },
    meta: { en: "Riyadh · Laser Resurfacing", ar: "الرياض · تقشير ليزر" },
  },
  {
    quote: {
      en: "What I appreciated most: honesty. They told me one area didn't need anything and talked me out of it. Results look like me on my best day — exactly what I asked for.",
      ar: "أكثر ما قدرته: الصدق. أخبروني أن منطقة معينة لا تحتاج شيئاً وأقنعوني بعدم حقنها. النتيجة أبدو كأفضل نسخة من نفسي — تماماً كما طلبت.",
    },
    name: { en: "Mariam K.", ar: "مريم ك." },
    meta: { en: "Dubai · Injectables", ar: "دبي · حقن تجميلي" },
  },
  {
    quote: {
      en: "The clinic feels like a spa but runs like a hospital — spotless, calm, and every step explained in both Arabic and English for my mother and me. We're both patients now.",
      ar: "العيادة تشبه المنتجع وتُدار كالمستشفى — نظافة وهدوء، وكل خطوة شُرحت بالعربية والإنجليزية لي ولوالدتي. أصبحنا كلتينا من مريضاتها.",
    },
    name: { en: "Dana S.", ar: "دانة س." },
    meta: { en: "Abu Dhabi · HydraFacial", ar: "أبو ظبي · هيدرافيشل" },
  },
];

export function Testimonials() {
  const { t, lang, dir } = useLang();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((v) => (v + 1) % items.length), 6500);
    return () => clearInterval(id);
  }, [paused]);

  const next = () => setIdx((v) => (v + 1) % items.length);
  const prev = () => setIdx((v) => (v - 1 + items.length) % items.length);
  const item = items[idx];

  return (
    <section
      id="stories"
      className="bg-blush/60 py-24 lg:py-32"
      aria-labelledby="testimonials-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow">{t.testimonials.eyebrow}</p>
          <h2 id="testimonials-title" className="font-display mt-4 text-4xl font-medium text-primary sm:text-5xl">
            {t.testimonials.title}
          </h2>
        </Reveal>

        <Reveal delay={140} className="relative mt-12">
          <Quote className="mx-auto h-10 w-10 text-gold/50" aria-hidden />
          <div className="relative mt-6 min-h-[190px] sm:min-h-[150px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={idx}
                custom={dir}
                initial={{ opacity: 0, x: dir === "rtl" ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir === "rtl" ? 40 : -40 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-display text-xl font-normal italic leading-relaxed text-primary sm:text-2xl">
                  “{item.quote[lang]}”
                </p>
                <footer className="mt-6">
                  <div className="flex items-center justify-center gap-1" aria-label="5 star rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" aria-hidden />
                    ))}
                  </div>
                  <p className="mt-3 text-sm font-semibold text-primary">{item.name[lang]}</p>
                  <p className="text-xs text-muted-foreground">{item.meta[lang]}</p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-primary transition-all hover:border-gold hover:text-gold"
              aria-label="Previous testimonial"
            >
              {dir === "rtl" ? (
                <ChevronRight className="h-5 w-5" aria-hidden />
              ) : (
                <ChevronLeft className="h-5 w-5" aria-hidden />
              )}
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-400",
                    i === idx ? "w-8 bg-gold" : "w-1.5 bg-border hover:bg-gold/50"
                  )}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-primary transition-all hover:border-gold hover:text-gold"
              aria-label="Next testimonial"
            >
              {dir === "rtl" ? (
                <ChevronLeft className="h-5 w-5" aria-hidden />
              ) : (
                <ChevronRight className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

const shots = [
  { src: "/images/facial-1.jpg", span: "sm:col-span-2 sm:row-span-2", ratio: "aspect-square sm:aspect-auto" },
  { src: "/images/facial-2.jpg", span: "", ratio: "aspect-square" },
  { src: "/images/laser-2.jpg", span: "", ratio: "aspect-square" },
  { src: "/images/interior-3.jpg", span: "", ratio: "aspect-square" },
  { src: "/images/facial-3.jpg", span: "", ratio: "aspect-square" },
  { src: "/images/laser-1.jpg", span: "sm:col-span-2", ratio: "aspect-video sm:aspect-[2.05/1]" },
];

export function Gallery() {
  const { t } = useLang();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="results" className="bg-secondary/60 py-24 lg:py-32" aria-labelledby="gallery-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t.gallery.eyebrow}</p>
          <h2 id="gallery-title" className="font-display mt-4 text-4xl font-medium text-primary sm:text-5xl">
            {t.gallery.title}
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-muted-foreground">
            {t.gallery.subtitle}
          </p>
        </Reveal>

        <div className="mt-12 grid auto-rows-auto grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {shots.map((s, i) => (
            <Reveal
              key={s.src}
              delay={(i % 4) * 80}
              className={cn("group relative cursor-pointer overflow-hidden rounded-2xl", s.span)}
            >
              <button
                onClick={() => setActive(s.src)}
                className={cn("block w-full", s.ratio)}
                aria-label="View image"
              >
                <img
                  src={s.src}
                  alt={t.gallery.badge}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/20" />
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <BadgeCheck className="h-4 w-4 text-gold" aria-hidden />
          {t.gallery.badge}
        </Reveal>
      </div>

      {/* Lightbox */}
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1512]/90 p-6 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <motion.img
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            src={active}
            alt={t.gallery.badge}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t } = useLang();

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      aria-label="Welcome"
    >
      {/* Background image with slow ken-burns zoom */}
      <div className="absolute inset-0" aria-hidden>
        <img
          src="/images/hero.jpg"
          alt=""
          className="kenburns h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f1]/85 via-[#faf7f1]/60 to-[#faf7f1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf7f1]/70 via-transparent to-[#faf7f1]/40" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-28 pt-36 sm:px-8 lg:pb-36">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow flex items-center gap-2"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-5 text-5xl font-medium leading-[1.05] text-primary sm:text-6xl lg:text-7xl"
          >
            {t.hero.title1}
            <br />
            <span className="italic gold-text">{t.hero.title2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base font-light leading-relaxed text-muted-foreground sm:text-lg"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => go("booking")}
              className="h-13 rounded-full bg-primary px-8 text-base text-primary-foreground shadow-xl shadow-primary/25 transition-all hover:scale-[1.03] hover:bg-primary/90"
            >
              {t.hero.cta1}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => go("treatments")}
              className="h-13 rounded-full border-primary/30 bg-card/60 px-8 text-base text-primary backdrop-blur transition-all hover:border-gold hover:text-gold"
            >
              {t.hero.cta2}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        onClick={() => go("stats")}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-gold sm:flex"
        aria-label={t.hero.scroll}
      >
        <span className="text-[0.6rem] font-medium uppercase tracking-[0.35em]">
          {t.hero.scroll}
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" aria-hidden />
        </motion.span>
      </motion.button>
    </section>
  );
}

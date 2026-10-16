"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Clock3,
  MessageCircle,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useCoolfixLang } from "@/lib/coolfix-i18n";
import { whatsappLink, WHATSAPP_DEFAULT } from "@/lib/coolfix-data";
import { Reveal } from "./reveal";

const CHIP_ICONS = [Star, Clock3, BadgeCheck, ShieldCheck];

export function Hero() {
  const { t, lang } = useCoolfixLang();

  return (
    <section id="top" className="relative overflow-hidden bg-coolfix-paper">
      {/* faint cool glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 end-[-10%] h-[420px] w-[420px] rounded-full bg-coolfix-teal/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 start-[-8%] h-[360px] w-[360px] rounded-full bg-coolfix-heat/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-coolfix-line bg-white px-4 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-coolfix-teal-deep"
            >
              <Clock3 className="h-3.5 w-3.5" aria-hidden />
              {t.hero.eyebrow}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-coolfix-ink sm:text-5xl lg:text-[3.4rem]"
            >
              {t.hero.titleA}
              <br />
              <span className="text-coolfix-heat">{t.hero.titleB}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-coolfix-fog"
            >
              {t.hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#book"
                className="inline-flex h-12 items-center rounded-full bg-coolfix-teal px-7 text-[15px] font-semibold text-white shadow-md shadow-coolfix-teal/25 transition-all hover:bg-coolfix-teal-deep hover:shadow-lg"
              >
                {t.hero.ctaPrimary}
              </a>
              <a
                href={whatsappLink(WHATSAPP_DEFAULT[lang])}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-coolfix-line bg-white px-6 text-[15px] font-semibold text-coolfix-ink transition-colors hover:border-coolfix-teal hover:text-coolfix-teal-deep"
              >
                <MessageCircle className="h-4.5 w-4.5 text-[#1faa53]" aria-hidden />
                {t.hero.ctaSecondary}
              </a>
            </motion.div>

            {/* Trust chips */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="mt-9 grid max-w-lg grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:items-center sm:gap-x-5"
            >
              {t.hero.chips.map((chip, i) => {
                const Icon = CHIP_ICONS[i % CHIP_ICONS.length];
                return (
                  <li
                    key={chip}
                    className="flex items-center gap-2 text-[12.5px] font-medium text-coolfix-fog"
                  >
                    <Icon className="h-4 w-4 text-coolfix-teal" aria-hidden />
                    {chip}
                  </li>
                );
              })}
            </motion.ul>
          </div>

          {/* Live dispatch panel */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl bg-coolfix-ink p-6 text-white shadow-xl shadow-coolfix-ink/20 sm:p-7"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="cf-pulse relative flex h-2.5 w-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-coolfix-heat" />
                </span>
                <span className="text-[13px] font-semibold tracking-wide">
                  {t.hero.dispatch.title}
                </span>
              </div>
              <span className="rounded-full bg-coolfix-heat/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-coolfix-heat">
                {t.hero.dispatch.badge}
              </span>
            </div>

            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
              {t.hero.dispatch.now}
            </p>

            <ul className="mt-3 divide-y divide-white/[0.07]">
              {t.hero.dispatch.rows.map((row, i) => (
                <motion.li
                  key={row.area}
                  initial={{ opacity: 0, x: lang === "ar" ? 16 : -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.45 + i * 0.12 }}
                  className="flex items-center justify-between gap-4 py-3.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-medium">{row.job}</p>
                    <p className="mt-0.5 truncate text-[12px] text-white/50">{row.area}</p>
                  </div>
                  <div className="flex shrink-0 items-baseline gap-1.5 rounded-lg bg-white/[0.06] px-3 py-1.5" dir="ltr">
                    <span className="cf-ticker text-[17px] font-bold tabular-nums text-teal-300">
                      {row.eta}
                    </span>
                    <span className="text-[10.5px] text-white/45" dir={lang === "ar" ? "rtl" : "ltr"}>
                      {t.hero.dispatch.min}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>

            <p className="mt-5 border-t border-white/10 pt-4 text-[11.5px] leading-relaxed text-white/40">
              {t.hero.dispatch.footer}
            </p>
          </motion.div>
        </div>

        {/* Photo band */}
        <Reveal delay={0.1} className="mt-14">
          <figure className="relative overflow-hidden rounded-2xl">
            <img
              src="/images/coolfix/hero.jpg"
              alt="CoolFix technician servicing an outdoor air-conditioning unit with gauges and tools"
              className="h-56 w-full object-cover sm:h-72 lg:h-80"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-coolfix-ink/75 via-coolfix-ink/10 to-transparent" />
            <figcaption className="absolute bottom-4 start-5 text-[13px] font-medium text-white/90">
              {t.hero.photoCaption}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

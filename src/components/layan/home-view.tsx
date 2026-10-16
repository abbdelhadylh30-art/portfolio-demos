"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLayanLang } from "@/lib/layan-i18n";
import { projects } from "@/lib/layan-projects";
import { Reveal } from "@/components/layan/reveal";
import { ProjectCard } from "@/components/layan/project-card";

export function HomeView() {
  const { t, lang } = useLayanLang();
  const featured = [projects[0], projects[1], projects[2]];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-svh items-end overflow-hidden">
        { }
        <img
          src="/images/layan/hero.jpg"
          alt="Warm minimalist living room designed by Layan Interiors"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-layan-ink/85 via-layan-ink/35 to-layan-ink/25" />

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-40 sm:px-8">
          <p className="ly-eyebrow !text-white/75">{t.hero.eyebrow}</p>
          <h1 className="font-display mt-6 max-w-3xl text-[clamp(2.6rem,7vw,5.2rem)] leading-[1.04] text-white">
            {t.hero.title1}
            <br />
            <span className="italic text-[#d9c5a0]">{t.hero.title2}</span>
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/80">
            {t.hero.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/layan/contact"
              className="rounded-full bg-white px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.14em] text-layan-ink transition-all hover:bg-[#d9c5a0]"
            >
              {t.hero.cta1}
            </Link>
            <Link
              href="/layan/work"
              className="rounded-full border border-white/40 px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.14em] text-white transition-all hover:border-white hover:bg-white/10"
            >
              {t.hero.cta2}
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
            {t.hero.scroll}
          </span>
          <span className="h-10 w-px animate-pulse bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </section>

      {/* ============ INTRO ============ */}
      <section className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="ly-eyebrow">{t.intro.eyebrow}</p>
            <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3rem)] leading-tight text-layan-ink">
              {t.intro.title}
            </h2>
            <p className="mt-6 text-[15.5px] leading-relaxed text-layan-ink/80">
              {t.intro.body1}
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-layan-ink/80">
              {t.intro.body2}
            </p>
            <Link href="/layan/studio" className="ly-link-underline mt-8">
              {t.intro.link}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={150} className="relative">
            <div className="absolute -inset-3 rounded-2xl border border-layan-stone/70" aria-hidden />
            <div className="ly-img relative aspect-[4/5] rounded-xl sm:aspect-[5/6]">
              { }
              <img
                src="/images/layan/home-2.jpg"
                alt="Layan studio interior detail — stone and oak"
                loading="lazy"
                decoding="async"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="bg-layan-ink">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px px-5 py-16 sm:px-8 md:grid-cols-4">
          {t.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="px-2 py-4 text-center sm:py-6">
              <p className="font-display text-4xl text-[#d9c5a0] sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-layan-cream/60">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ FEATURED WORK ============ */}
      <section className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="ly-eyebrow">{t.featured.eyebrow}</p>
            <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3rem)] leading-tight">
              {t.featured.title}
            </h2>
            <p className="mt-3 max-w-lg text-[14.5px] text-layan-fog">
              {t.featured.subtitle}
            </p>
          </div>
          <Link href="/layan/work" className="ly-link-underline">
            {t.featured.viewAll}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
          </Link>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-2 md:gap-8 lg:gap-12">
          {/* First project spans full width */}
          <Reveal className="md:col-span-2">
            <ProjectCard project={featured[0]} index={0} variant="landscape" />
          </Reveal>
          <Reveal delay={100}>
            <ProjectCard project={featured[1]} index={1} variant="portrait" />
          </Reveal>
          <Reveal delay={200}>
            <ProjectCard project={featured[2]} index={2} variant="portrait" />
          </Reveal>
        </div>
      </section>

      {/* ============ SERVICES TEASER ============ */}
      <section className="bg-layan-sand/60">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal className="mb-14 text-center">
            <p className="ly-eyebrow">{t.services.eyebrow}</p>
            <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3rem)] leading-tight">
              {t.services.title}
            </h2>
            <p className="mt-3 text-[14.5px] text-layan-fog">{t.services.subtitle}</p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {t.services.packages.map((p, i) => (
              <Reveal key={p.name} delay={i * 100}>
                <Link
                  href="/layan/services"
                  className="group flex h-full flex-col rounded-2xl border border-layan-stone bg-layan-cream p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-layan-bronze hover:shadow-[0_24px_48px_-24px_rgba(27,23,18,0.35)]"
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-layan-bronze">
                    {p.tagline}
                  </p>
                  <h3 className="font-display mt-3 text-[24px] leading-tight">{p.name}</h3>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-layan-ink/75">
                    {p.desc}
                  </p>
                  <div className="mt-6 border-t border-layan-stone/70 pt-4">
                    <p className="text-[13px] font-medium text-layan-bronze-deep">{p.price}</p>
                    <p className="mt-1 text-[12px] text-layan-fog">{p.duration}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="mb-14">
          <p className="ly-eyebrow">{t.services.processTitle}</p>
        </Reveal>
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {t.services.process.map((step, i) => (
            <Reveal as="li" key={step.step} delay={i * 80} className="relative">
              <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
                <span className="font-display text-3xl text-layan-bronze/60">{step.step}</span>
                <div>
                  <h3 className="text-[15px] font-semibold text-layan-ink">{step.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-layan-fog">{step.body}</p>
                </div>
              </div>
              {i < t.services.process.length - 1 && (
                <span
                  className="absolute top-4 hidden h-px w-full bg-layan-stone ltr:left-14 rtl:right-14 lg:hidden"
                  aria-hidden
                />
              )}
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ============ TESTIMONIAL ============ */}
      <section className="border-y border-layan-stone/60 bg-layan-sand/40">
        <div className="mx-auto w-full max-w-3xl px-5 py-24 text-center sm:px-8">
          <Reveal>
            <span className="font-display text-6xl leading-none text-layan-bronze/40" aria-hidden>
              &ldquo;
            </span>
            <blockquote className="font-display mt-2 text-[clamp(1.5rem,3vw,2.1rem)] italic leading-snug text-layan-ink">
              {t.testimonial.quote}
            </blockquote>
            <p className="mt-8 text-[13px] font-medium uppercase tracking-[0.2em] text-layan-bronze-deep">
              {t.testimonial.author}
            </p>
            <p className="mt-1 text-[12.5px] text-layan-fog">{t.testimonial.meta}</p>
          </Reveal>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden">
        { }
        <img
          src="/images/layan/home-4.jpg"
          alt="Evening interior with warm lighting"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-layan-ink/70" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-28 text-center sm:px-8 sm:py-36">
          <Reveal>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-tight text-white">
              {t.cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/75">
              {t.cta.body}
            </p>
            <Link
              href="/layan/contact"
              className="mt-9 inline-flex rounded-full bg-white px-8 py-4 text-[13px] font-medium uppercase tracking-[0.14em] text-layan-ink transition-all hover:bg-[#d9c5a0]"
            >
              {t.cta.button}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

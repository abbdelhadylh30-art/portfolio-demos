"use client";

import { useLayanLang } from "@/lib/layan-i18n";
import { Reveal } from "@/components/layan/reveal";

export function StudioView() {
  const { t } = useLayanLang();

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-5 pt-36 sm:px-8 sm:pt-40">
        <Reveal>
          <p className="ly-eyebrow">{t.studio.eyebrow}</p>
          <h1 className="font-display mt-4 max-w-2xl text-[clamp(2.4rem,5vw,3.8rem)] leading-tight">
            {t.studio.title}
          </h1>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <Reveal>
            {t.studio.paragraphs.map((p, i) => (
              <p
                key={i}
                className="mt-5 text-[15.5px] leading-[1.85] text-layan-ink/85 first:mt-0 first:font-display first:text-[19px] first:leading-[1.7]"
              >
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={150} className="relative self-start">
            <div className="absolute -inset-3 rounded-2xl border border-layan-stone/70" aria-hidden />
            <div className="ly-img relative aspect-[4/3] rounded-xl">
              { }
              <img
                src="/images/layan/studio-1.jpg"
                alt="Layan studio — material library and worktables"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="ly-img mt-6 aspect-[16/10] rounded-xl">
              { }
              <img
                src="/images/layan/studio-3.jpg"
                alt="Material samples and fabric swatches"
                loading="lazy"
                decoding="async"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal className="mb-12">
          <p className="ly-eyebrow">{t.studio.valuesTitle}</p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {t.studio.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <div className="h-full rounded-2xl border border-layan-stone bg-layan-cream p-8">
                <p className="font-display text-2xl text-layan-bronze">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-display mt-3 text-[22px] leading-tight">{v.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-layan-ink/75">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats band */}
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

      {/* Locations */}
      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal className="mb-12">
          <p className="ly-eyebrow">{t.studio.locationsTitle}</p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {[t.studio.cairo, t.studio.dubai].map((loc) => (
            <Reveal key={loc.label}>
              <div className="rounded-2xl bg-layan-sand/60 p-8">
                <h3 className="font-display text-[24px]">{loc.label}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-layan-ink/80">{loc.address}</p>
                <p className="mt-2 text-[13px] text-layan-fog">{loc.hours}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="border-t border-layan-stone/60 bg-layan-sand/40">
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
    </>
  );
}

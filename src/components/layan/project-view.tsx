"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useLayanLang } from "@/lib/layan-i18n";
import type { Project } from "@/lib/layan-projects";
import { Reveal } from "@/components/layan/reveal";

export function ProjectView({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const { t, lang } = useLayanLang();

  const meta = [
    { label: t.work.meta.location, value: project.location[lang] },
    { label: t.work.meta.year, value: project.year },
    { label: t.work.meta.area, value: project.area[lang] },
    { label: t.work.meta.scope, value: project.scope[lang].join(" · ") },
  ];

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-5 pt-32 sm:px-8 sm:pt-36">
        <Reveal>
          <Link
            href="/layan/work"
            className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-layan-fog transition-colors hover:text-layan-ink"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden />
            {t.project.back}
          </Link>
          <h1 className="font-display mt-6 max-w-3xl text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.05]">
            {project.title[lang]}
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-layan-ink/75">
            {project.summary[lang]}
          </p>
        </Reveal>

        {/* Meta grid */}
        <Reveal delay={100} className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-layan-stone bg-layan-stone/60 sm:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label} className="bg-layan-cream px-6 py-5">
              <p className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-layan-bronze">
                {m.label}
              </p>
              <p className="mt-1.5 text-[14px] font-medium text-layan-ink">{m.value}</p>
            </div>
          ))}
        </Reveal>

        {/* Hero image */}
        <Reveal delay={150} className="ly-img mt-10 aspect-[16/10] rounded-2xl">
          { }
          <img
            src={project.images[0]}
            alt={`${project.title[lang]} — ${project.location[lang]}`}
            fetchPriority="high"
          />
        </Reveal>

        {/* Narrative + deliverables */}
        <div className="mt-16 grid gap-12 pb-8 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <Reveal>
            <p className="ly-eyebrow">{lang === "ar" ? "قصة المشروع" : "The story"}</p>
            {project.body[lang].map((para, i) => (
              <p
                key={i}
                className="mt-5 text-[16px] leading-[1.85] text-layan-ink/85 first-of-type:font-display first-of-type:text-[19px] first-of-type:leading-[1.7]"
              >
                {para}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl bg-layan-sand/70 p-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-layan-bronze">
                {t.project.deliverables}
              </p>
              <ul className="mt-5 space-y-3.5">
                {project.deliverables[lang].map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[14px] text-layan-ink/85">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-layan-bronze/15 text-layan-bronze-deep">
                      <Check className="h-3 w-3" aria-hidden />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Gallery */}
        <Reveal className="pb-4 pt-8">
          <p className="ly-eyebrow">{t.project.gallery}</p>
        </Reveal>
        <div className="mt-8 grid gap-6 pb-16 md:grid-cols-2">
          <Reveal className="ly-img aspect-[4/3] rounded-2xl">
            { }
            <img
              src={project.images[1]}
              alt={`${project.title[lang]} — 2`}
              loading="lazy"
              decoding="async"
            />
          </Reveal>
          <Reveal delay={120} className="ly-img aspect-[4/3] rounded-2xl md:aspect-[3/3.2]">
            { }
            <img
              src={project.images[2]}
              alt={`${project.title[lang]} — 3`}
              loading="lazy"
              decoding="async"
            />
          </Reveal>
        </div>
      </section>

      {/* Next project */}
      <Link
        href={`/layan/work/${next.slug}`}
        className="group relative block overflow-hidden"
        aria-label={`${t.project.nextProject}: ${next.title[lang]}`}
      >
        { }
        <img
          src={next.images[0]}
          alt={`${next.title[lang]} — ${next.location[lang]}`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-layan-ink/70 transition-colors group-hover:bg-layan-ink/55" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-5 py-24 text-center sm:px-8 sm:py-32">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/60">
            {t.project.nextProject}
          </p>
          <p className="font-display mt-4 text-[clamp(2rem,4.5vw,3.4rem)] leading-tight text-white">
            {next.title[lang]}
          </p>
          <span className="mt-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white transition-all group-hover:border-white group-hover:bg-white group-hover:text-layan-ink">
            <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
          </span>
        </div>
      </Link>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLayanLang } from "@/lib/layan-i18n";
import { projects } from "@/lib/layan-projects";
import { Reveal } from "@/components/layan/reveal";
import { ProjectCard } from "@/components/layan/project-card";
import { cn } from "@/lib/utils";

type Filter = "all" | "residential" | "hospitality";

export function WorkView() {
  const { t } = useLayanLang();
  const [filter, setFilter] = useState<Filter>("all");

  const shown =
    filter === "all" ? projects : projects.filter((p) => p.typology === filter);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t.work.filters.all },
    { key: "residential", label: t.work.filters.residential },
    { key: "hospitality", label: t.work.filters.hospitality },
  ];

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-5 pb-24 pt-36 sm:px-8 sm:pt-40">
        <Reveal>
          <p className="ly-eyebrow">{t.work.eyebrow}</p>
          <h1 className="font-display mt-4 text-[clamp(2.4rem,5vw,3.8rem)] leading-tight">
            {t.work.title}
          </h1>
          <p className="mt-3 text-[15px] text-layan-fog">{t.work.subtitle}</p>
        </Reveal>

        {/* Filters */}
        <Reveal delay={100} className="mt-10 flex flex-wrap items-center gap-3">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "rounded-full border px-5 py-2 text-[12.5px] font-medium uppercase tracking-[0.14em] transition-all",
                filter === f.key
                  ? "border-layan-ink bg-layan-ink text-layan-cream"
                  : "border-layan-stone text-layan-fog hover:border-layan-bronze hover:text-layan-ink"
              )}
              aria-pressed={filter === f.key}
            >
              {f.label}
            </button>
          ))}
          <span className="ms-auto text-[12.5px] text-layan-fog">
            {shown.length} {shown.length === 1 ? "project" : filter === "all" ? "projects" : ""}
          </span>
        </Reveal>

        {/* Grid */}
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8 lg:gap-12">
          {shown.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 100}>
              <ProjectCard
                project={p}
                index={projects.indexOf(p)}
                variant={i % 4 === 0 || i % 4 === 3 ? "portrait" : "landscape"}
              />
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal className="mt-24 rounded-2xl bg-layan-ink px-8 py-14 text-center sm:px-12">
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] text-white">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-white/70">
            {t.cta.body}
          </p>
          <Link
            href="/layan/contact"
            className="mt-8 inline-flex rounded-full bg-white px-7 py-3.5 text-[12.5px] font-medium uppercase tracking-[0.14em] text-layan-ink transition-all hover:bg-[#d9c5a0]"
          >
            {t.cta.button}
            <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" aria-hidden />
          </Link>
        </Reveal>
      </section>
    </>
  );
}

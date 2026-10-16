"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLayanLang } from "@/lib/layan-i18n";
import type { Project } from "@/lib/layan-projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  index,
  variant = "landscape",
}: {
  project: Project;
  index: number;
  variant?: "landscape" | "portrait" | "tall";
}) {
  const { lang, t } = useLayanLang();

  const aspect =
    variant === "portrait"
      ? "aspect-[4/5]"
      : variant === "tall"
        ? "aspect-[3/4]"
        : "aspect-[4/3]";

  return (
    <Link
      href={`/layan/work/${project.slug}`}
      className="group block"
      aria-label={`${project.title[lang]} — ${project.location[lang]}`}
    >
      <div className={cn("ly-img rounded-xl", aspect)}>
        { }
        <img
          src={project.images[0]}
          alt={`${project.title[lang]} — ${project.location[lang]}`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-layan-bronze">
            {String(index + 1).padStart(2, "0")} — {project.location[lang]}
          </p>
          <h3 className="font-display mt-1.5 text-[26px] leading-tight text-layan-ink transition-colors group-hover:text-layan-bronze-deep">
            {project.title[lang]}
          </h3>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-layan-fog">
            <span>{project.year}</span>
            <span aria-hidden>·</span>
            <span>{project.area[lang]}</span>
            <span aria-hidden>·</span>
            <span>{project.scope[lang][0]}</span>
          </div>
        </div>
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-layan-stone text-layan-bronze-deep transition-all duration-300 group-hover:border-layan-bronze group-hover:bg-layan-bronze group-hover:text-white">
          <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

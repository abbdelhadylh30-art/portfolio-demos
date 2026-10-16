"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useLayanLang } from "@/lib/layan-i18n";
import { Reveal } from "@/components/layan/reveal";
import { cn } from "@/lib/utils";

const packageImages = [
  "/images/layan/home-3.jpg",
  "/images/layan/studio-2.jpg",
  "/images/layan/home-5.jpg",
];

export function ServicesView() {
  const { t } = useLayanLang();

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-5 pt-36 sm:px-8 sm:pt-40">
        <Reveal>
          <p className="ly-eyebrow">{t.services.eyebrow}</p>
          <h1 className="font-display mt-4 text-[clamp(2.4rem,5vw,3.8rem)] leading-tight">
            {t.services.title}
          </h1>
          <p className="mt-3 max-w-lg text-[15px] text-layan-fog">{t.services.subtitle}</p>
        </Reveal>
      </section>

      {/* Packages */}
      <section className="mx-auto w-full max-w-6xl space-y-20 px-5 py-20 sm:px-8 sm:py-24">
        {t.services.packages.map((p, i) => (
          <Reveal key={p.name}>
            <div
              className={cn(
                "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
                i === 1 && "lg:[direction:ltr]"
              )}
            >
              {/* Image */}
              <div className={cn("ly-img aspect-[4/3] rounded-2xl lg:aspect-[5/4]", i === 1 && "lg:order-2")}>
                { }
                <img
                  src={packageImages[i]}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {/* Copy */}
              <div className={cn(i === 1 && "lg:order-1")}>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-layan-bronze">
                  {String(i + 1).padStart(2, "0")} — {p.tagline}
                </p>
                <h2 className="font-display mt-3 text-[clamp(1.8rem,3.5vw,2.6rem)] leading-tight">
                  {p.name}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-layan-ink/80">{p.desc}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13.5px] text-layan-ink/85">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-layan-bronze/15 text-layan-bronze-deep">
                        <Check className="h-3 w-3" aria-hidden />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-layan-stone/70 pt-5">
                  <div>
                    <p className="text-[14px] font-semibold text-layan-bronze-deep">{p.price}</p>
                    <p className="mt-0.5 text-[12px] text-layan-fog">{p.duration}</p>
                  </div>
                  <Link
                    href="/layan/contact"
                    className="ly-link-underline"
                  >
                    {t.services.cta}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Process */}
      <section className="bg-layan-ink">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
          <Reveal className="mb-14">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-layan-bronze">
              {t.services.processTitle}
            </p>
          </Reveal>
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {t.services.process.map((step, i) => (
              <Reveal as="li" key={step.step} delay={i * 80} className="relative">
                <p className="font-display text-4xl text-layan-bronze/50">{step.step}</p>
                <h3 className="mt-3 text-[15px] font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-layan-cream/60">{step.body}</p>
                {i < t.services.process.length - 1 && (
                  <span
                    className="absolute top-5 hidden h-px w-[calc(100%-2rem)] bg-layan-cream/15 ltr:left-16 rtl:right-16 lg:block"
                    aria-hidden
                  />
                )}
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-16 flex flex-col items-center gap-5 border-t border-layan-cream/10 pt-12 text-center">
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] text-white">
              {t.cta.title}
            </h2>
            <p className="max-w-md text-[14px] leading-relaxed text-white/70">{t.cta.body}</p>
            <Link
              href="/layan/contact"
              className="mt-2 inline-flex rounded-full bg-white px-7 py-3.5 text-[12.5px] font-medium uppercase tracking-[0.14em] text-layan-ink transition-all hover:bg-[#d9c5a0]"
            >
              {t.cta.button}
              <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

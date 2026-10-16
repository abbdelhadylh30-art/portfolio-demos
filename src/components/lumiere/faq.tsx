"use client";

import { useLang } from "@/lib/i18n";
import { Reveal } from "./reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  const { t } = useLang();

  return (
    <section id="faq" className="bg-background py-24 lg:py-32" aria-labelledby="faq-title">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="eyebrow">{t.faq.eyebrow}</p>
          <h2 id="faq-title" className="font-display mt-4 text-4xl font-medium text-primary sm:text-5xl">
            {t.faq.title}
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <Accordion type="single" collapsible className="space-y-4">
            {t.faq.items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-2xl border border-border bg-card px-6 transition-shadow data-[state=open]:shadow-lg data-[state=open]:shadow-primary/8"
              >
                <AccordionTrigger className="py-5 text-start font-display text-lg font-semibold text-primary hover:no-underline hover:text-gold">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm font-light leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

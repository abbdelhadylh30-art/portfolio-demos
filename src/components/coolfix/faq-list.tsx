"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCoolfixLang } from "@/lib/coolfix-i18n";
import { faqs } from "@/lib/coolfix-data";
import { Reveal } from "./reveal";

export function FaqList() {
  const { t, lang } = useCoolfixLang();

  return (
    <section id="faq" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="cf-eyebrow">{t.faq.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-coolfix-ink sm:text-4xl">
            {t.faq.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-coolfix-fog">
            {t.faq.sub}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q.en}
                value={`faq-${i}`}
                className="border-coolfix-line"
              >
                <AccordionTrigger className="text-start text-[15px] font-semibold text-coolfix-ink hover:text-coolfix-teal-deep hover:no-underline">
                  {f.q[lang]}
                </AccordionTrigger>
                <AccordionContent className="text-[14px] leading-relaxed text-coolfix-fog">
                  {f.a[lang]}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

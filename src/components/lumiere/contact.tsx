"use client";

import { MapPin, Clock, Phone, Mail, MessageCircle, Navigation } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./reveal";
import { Button } from "@/components/ui/button";

export function Contact() {
  const { t, dir } = useLang();

  return (
    <section id="contact" className="bg-background py-24 lg:py-32" aria-labelledby="contact-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 id="contact-title" className="font-display mt-4 text-4xl font-medium text-primary sm:text-5xl">
            {t.contact.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* Address card */}
          <Reveal>
            <article className="lift h-full rounded-3xl border border-border bg-card p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
                <MapPin className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-display mt-6 text-xl font-semibold text-primary">
                {t.contact.eyebrow}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                {t.contact.address}
                <br />
                <span className="text-xs">{t.contact.addressLine2}</span>
              </p>
              <a
                href="https://maps.google.com/?q=Al+Wasl+Road+Jumeirah+1+Dubai"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-primary"
              >
                <Navigation className="h-4 w-4" aria-hidden />
                {t.contact.directions}
              </a>
            </article>
          </Reveal>

          {/* Hours card */}
          <Reveal delay={100}>
            <article className="lift h-full rounded-3xl border border-border bg-card p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
                <Clock className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-display mt-6 text-xl font-semibold text-primary">
                {t.contact.hours}
              </h3>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="font-light text-muted-foreground">{t.contact.hours}</dt>
                  <dd className="font-semibold text-primary" dir="ltr">{t.contact.hoursValue}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="font-light text-muted-foreground">{t.contact.friday}</dt>
                  <dd className="font-semibold text-muted-foreground">{t.contact.fridayValue}</dd>
                </div>
              </dl>
              <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-gold" aria-hidden />
                {t.booking.step2.hint}
              </p>
            </article>
          </Reveal>

          {/* Contact card */}
          <Reveal delay={200}>
            <article className="lift h-full rounded-3xl border border-border bg-primary p-8 text-primary-foreground">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffffff14] text-gold-soft">
                <Phone className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-display mt-6 text-xl font-semibold text-background">
                {t.nav.contact}
              </h3>
              <div className="mt-4 space-y-3 text-sm">
                <a
                  href="tel:+97140000000"
                  className="flex items-center gap-3 font-light text-primary-foreground/85 transition-colors hover:text-gold-soft"
                  dir="ltr"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold-soft" aria-hidden />
                  {t.contact.phone}
                </a>
                <a
                  href="mailto:hello@lumiereclinic.ae"
                  className="flex items-center gap-3 font-light text-primary-foreground/85 transition-colors hover:text-gold-soft"
                  dir="ltr"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold-soft" aria-hidden />
                  {t.contact.email}
                </a>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-full bg-gold-soft px-6 text-primary hover:bg-gold"
                >
                  <a
                    href="https://wa.me/971400000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    {t.contact.whatsapp}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-gold-soft/40 bg-transparent text-gold-soft hover:border-gold-soft hover:bg-transparent hover:text-gold-soft"
                >
                  <a href="tel:+97140000000" dir={dir}>
                    {t.nav.call}
                  </a>
                </Button>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

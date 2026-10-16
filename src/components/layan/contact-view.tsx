"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useLayanLang } from "@/lib/layan-i18n";
import { Reveal } from "@/components/layan/reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FormState = {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  budget: string;
  timeline: string;
  date: string;
  notes: string;
};

const initial: FormState = {
  name: "",
  phone: "",
  email: "",
  city: "",
  service: "",
  budget: "",
  timeline: "",
  date: "",
  notes: "",
};

export function ContactView() {
  const { t, lang } = useLayanLang();
  const f = t.contact.form;
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [reference, setReference] = useState("");

  const set = (key: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const today = new Date().toISOString().split("T")[0];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: { name?: string; phone?: string } = {};
    if (form.name.trim().length < 2) errs.name = f.errors.name;
    if (form.phone.replace(/\D/g, "").length < 7) errs.phone = f.errors.phone;
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/layan-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale: lang }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error("failed");
      setReference(data.reference);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "h-12 rounded-xl border-layan-stone bg-layan-cream text-[14.5px] text-layan-ink placeholder:text-layan-fog/60 focus-visible:ring-layan-bronze/40 focus-visible:border-layan-bronze";

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-24 pt-36 sm:px-8 sm:pt-40">
      <Reveal>
        <p className="ly-eyebrow">{t.contact.eyebrow}</p>
        <h1 className="font-display mt-4 max-w-2xl text-[clamp(2.4rem,5vw,3.8rem)] leading-tight">
          {t.contact.title}
        </h1>
        <p className="mt-3 max-w-lg text-[15px] text-layan-fog">{t.contact.subtitle}</p>
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        {/* ---------- Form / Success ---------- */}
        <Reveal delay={100}>
          {status === "success" ? (
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-layan-stone bg-layan-sand/50 px-8 py-16 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-layan-bronze/15 text-layan-bronze-deep">
                <Check className="h-7 w-7" aria-hidden />
              </span>
              <h2 className="font-display mt-6 text-3xl">{f.success.title}</h2>
              <p className="mt-3 text-[14.5px] text-layan-ink/75">{f.success.body}</p>
              <p className="mt-2 font-mono text-2xl font-semibold tracking-wider text-layan-bronze-deep" dir="ltr">
                {reference}
              </p>
              <p className="mx-auto mt-4 max-w-md text-[13.5px] leading-relaxed text-layan-fog">
                {f.success.body2}
              </p>
              <Button
                variant="outline"
                className="mt-8 rounded-full border-layan-stone px-6 hover:bg-layan-cream"
                onClick={() => {
                  setForm(initial);
                  setStatus("idle");
                }}
              >
                {f.success.again}
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[13px] font-medium text-layan-ink">
                    {f.name} <span className="text-layan-bronze">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => set("name")(e.target.value)}
                    placeholder={f.namePh}
                    className={inputCls}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="text-[12.5px] text-red-700">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[13px] font-medium text-layan-ink">
                    {f.phone} <span className="text-layan-bronze">*</span>
                  </Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => set("phone")(e.target.value)}
                    placeholder={f.phonePh}
                    className={inputCls}
                    inputMode="tel"
                    dir="ltr"
                  />
                  {errors.phone && (
                    <p className="text-[12.5px] text-red-700">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[13px] font-medium text-layan-ink">
                  {f.email}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email")(e.target.value)}
                  placeholder={f.emailPh}
                  className={inputCls}
                  autoComplete="email"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[13px] font-medium text-layan-ink">{f.city}</Label>
                  <Select value={form.city} onValueChange={set("city")}>
                    <SelectTrigger className={inputCls + " w-full justify-between"}>
                      <SelectValue placeholder="—" />
                    </SelectTrigger>
                    <SelectContent className="bg-layan-cream border-layan-stone">
                      {f.cities.map((c) => (
                        <SelectItem key={c} value={c} className="text-[14px]">
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[13px] font-medium text-layan-ink">{f.service}</Label>
                  <Select value={form.service} onValueChange={set("service")}>
                    <SelectTrigger className={inputCls + " w-full justify-between"}>
                      <SelectValue placeholder="—" />
                    </SelectTrigger>
                    <SelectContent className="bg-layan-cream border-layan-stone">
                      {f.services.map((s) => (
                        <SelectItem key={s} value={s} className="text-[14px]">
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-[13px] font-medium text-layan-ink">{f.budget}</Label>
                  <Select value={form.budget} onValueChange={set("budget")}>
                    <SelectTrigger className={inputCls + " w-full justify-between"}>
                      <SelectValue placeholder="—" />
                    </SelectTrigger>
                    <SelectContent className="bg-layan-cream border-layan-stone">
                      {f.budgets.map((b) => (
                        <SelectItem key={b} value={b} className="text-[14px]">
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[13px] font-medium text-layan-ink">{f.timeline}</Label>
                  <Select value={form.timeline} onValueChange={set("timeline")}>
                    <SelectTrigger className={inputCls + " w-full justify-between"}>
                      <SelectValue placeholder="—" />
                    </SelectTrigger>
                    <SelectContent className="bg-layan-cream border-layan-stone">
                      {f.timelines.map((tl) => (
                        <SelectItem key={tl} value={tl} className="text-[14px]">
                          {tl}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2 text-[13px] font-medium text-layan-ink">
                  <CalendarDays className="h-4 w-4 text-layan-bronze" aria-hidden />
                  {f.date}
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  min={today}
                  onChange={(e) => set("date")(e.target.value)}
                  className={inputCls}
                />
                <p className="text-[12px] text-layan-fog">{f.dateHint}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-[13px] font-medium text-layan-ink">
                  {f.notes}
                </Label>
                <Textarea
                  id="notes"
                  value={form.notes}
                  onChange={(e) => set("notes")(e.target.value)}
                  placeholder={f.notesPh}
                  rows={4}
                  className="rounded-xl border-layan-stone bg-layan-cream text-[14.5px] text-layan-ink placeholder:text-layan-fog/60 focus-visible:ring-layan-bronze/40 focus-visible:border-layan-bronze"
                />
              </div>

              {status === "error" && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] text-red-700">
                  {f.error}
                </p>
              )}

              <Button
                type="submit"
                disabled={status === "sending"}
                className="h-14 w-full rounded-full bg-layan-ink text-[13px] font-medium uppercase tracking-[0.16em] text-layan-cream transition-all hover:bg-layan-bronze-deep sm:w-auto sm:px-10"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="me-2 h-4 w-4 animate-spin" aria-hidden />
                    {f.sending}
                  </>
                ) : (
                  <>
                    {f.submit}
                    <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" aria-hidden />
                  </>
                )}
              </Button>
            </form>
          )}
        </Reveal>

        {/* ---------- Info sidebar ---------- */}
        <Reveal delay={200}>
          <div className="rounded-2xl bg-layan-ink p-8 text-layan-cream">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-layan-bronze">
              {t.contact.eyebrow}
            </p>
            <ul className="mt-6 space-y-5 text-[14.5px]">
              <li className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-layan-cream/10 text-layan-bronze">
                  <Phone className="h-4 w-4" aria-hidden />
                </span>
                <span dir="ltr">{t.contact.info.phone}</span>
              </li>
              <li className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-layan-cream/10 text-layan-bronze">
                  <Mail className="h-4 w-4" aria-hidden />
                </span>
                {t.contact.info.email}
              </li>
              <li className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-layan-cream/10 text-layan-bronze">
                  <MessageCircle className="h-4 w-4" aria-hidden />
                </span>
                {t.contact.info.whatsapp}
              </li>
              <li className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-layan-cream/10 text-layan-bronze">
                  <Clock className="h-4 w-4" aria-hidden />
                </span>
                {t.contact.info.hours}
              </li>
            </ul>
            <p className="mt-6 border-t border-layan-cream/10 pt-5 text-[12.5px] text-layan-cream/50">
              {t.contact.info.response}
            </p>
          </div>

          <Link
            href="/layan/work"
            className="ly-link-underline mt-8"
          >
            {t.featured.viewAll}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
          </Link>
        </Reveal>
      </div>

      {/* ---------- FAQ ---------- */}
      <div className="mt-24">
        <Reveal className="mb-8">
          <p className="ly-eyebrow">{t.contact.faq.title}</p>
        </Reveal>
        <Reveal delay={100}>
          <Accordion type="single" collapsible className="rounded-2xl border border-layan-stone bg-layan-cream px-6 sm:px-8">
            {t.contact.faq.items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-layan-stone/70 data-[state=open]:border-layan-bronze/50"
              >
                <AccordionTrigger className="py-5 text-start text-[15.5px] font-medium text-layan-ink hover:text-layan-bronze-deep hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[14px] leading-relaxed text-layan-ink/75">
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

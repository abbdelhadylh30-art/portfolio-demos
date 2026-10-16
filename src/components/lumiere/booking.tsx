"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock,
  Sparkles,
  Loader2,
  PartyPopper,
} from "lucide-react";
import { useLang, formatDate } from "@/lib/i18n";
import {
  treatments,
  formatPrice,
  formatDuration,
  type Treatment,
} from "@/lib/treatments";
import { useBookingStore } from "@/lib/store";
import { Reveal } from "./reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

/* Clinic hours: Sat–Thu 10:00–20:00, Friday closed (UAE weekend) */
const SLOTS = [
  "10:30", "11:15", "12:00", "12:45",
  "14:00", "14:45", "15:30", "16:15",
  "17:00", "17:45", "18:30", "19:15",
];

/** Deterministic pseudo-random per date so "taken" slots look organic & stable. */
function takenFor(dateISO: string, seed: number) {
  let h = 0;
  const s = `${dateISO}-${seed}`;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return SLOTS.filter((_, i) => (h >> i % 28 & 1) === 1 && h % 3 === 0);
}

function friday(date: Date) {
  return date.getDay() === 5; // 0=Sun … 5=Fri
}

export function Booking() {
  const { t, lang, dir } = useLang();
  const preselected = useBookingStore((s) => s.preselected);
  const clearPreselect = useBookingStore((s) => s.clearPreselect);

  const [step, setStep] = useState(0);
  const [treatment, setTreatment] = useState<Treatment | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [apiError, setApiError] = useState(false);

  /* Preselect arriving from a treatment card */
  useEffect(() => {
    if (preselected) {
      const tr = treatments.find((x) => x.key === preselected);
      if (tr) {
        setTreatment(tr);
        setStep(1);
        setReference(null);
      }
      clearPreselect();
    }
  }, [preselected, clearPreselect]);

  const taken = useMemo(
    () => (date ? takenFor(date.toISOString().slice(0, 10), treatment?.duration ?? 0) : []),
    [date, treatment]
  );

  const dateISO = date ? date.toISOString().slice(0, 10) : "";
  const canContinue =
    (step === 0 && !!treatment) ||
    (step === 1 && !!date && !!time) ||
    (step === 2 && !errors.name && !errors.phone && name.trim().length >= 2 && phone.trim().length >= 7);

  function validate() {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = t.booking.step3.errors.name;
    if (phone.trim().length < 7 || !/[0-9]/.test(phone)) e.phone = t.booking.step3.errors.phone;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit() {
    if (!treatment || !date || !time) return;
    setSubmitting(true);
    setApiError(false);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          treatmentKey: treatment.key,
          treatmentEn: treatment.name.en,
          treatmentAr: treatment.name.ar,
          date: dateISO,
          time,
          name,
          phone,
          email,
          notes,
        }),
      });
      const data = await res.json();
      if (res.ok && data.reference) {
        setReference(data.reference);
        setStep(4);
      } else {
        setApiError(true);
      }
    } catch {
      setApiError(true);
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setStep(0);
    setTreatment(null);
    setDate(undefined);
    setTime(null);
    setName(""); setPhone(""); setEmail(""); setNotes("");
    setErrors({});
    setReference(null);
    setApiError(false);
  }

  const stepTitles = t.booking.steps;

  return (
    <section id="booking" className="relative overflow-hidden bg-secondary/50 py-24 lg:py-32" aria-labelledby="booking-title">
      {/* decorative glow */}
      <div aria-hidden className="pointer-events-none absolute -top-40 start-1/4 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 end-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t.booking.eyebrow}</p>
          <h2 id="booking-title" className="font-display mt-4 text-4xl font-medium text-primary sm:text-5xl">
            {t.booking.title}
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-muted-foreground">
            {t.booking.subtitle}
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-10">
            {/* Stepper */}
            <ol className="mb-10 flex items-center justify-between gap-1" aria-label="Progress">
              {stepTitles.map((label, i) => {
                const done = step > i || (step === 4);
                const active = step === i && step !== 4;
                return (
                  <li key={label} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center gap-2">
                      <span
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-400",
                          done
                            ? "border-primary bg-primary text-primary-foreground"
                            : active
                              ? "border-gold bg-accent text-gold shadow-md shadow-gold/20"
                              : "border-border bg-muted text-muted-foreground"
                        )}
                      >
                        {done ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
                      </span>
                      <span
                        className={cn(
                          "hidden text-[0.65rem] font-medium uppercase tracking-wide sm:block",
                          active ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {label}
                      </span>
                    </div>
                    {i < stepTitles.length - 1 && (
                      <div
                        className={cn(
                          "mx-2 mb-0 h-px flex-1 sm:mb-5",
                          step > i ? "bg-primary" : "bg-border"
                        )}
                      />
                    )}
                  </li>
                );
              })}
            </ol>

            <AnimatePresence mode="wait" custom={dir}>
              {/* STEP 0 — treatment */}
              {step === 0 && (
                <motion.div
                  key="s0"
                  initial={{ opacity: 0, x: dir === "rtl" ? -24 : 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir === "rtl" ? 24 : -24 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="font-display text-2xl font-semibold text-primary">
                    {t.booking.step1.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-light text-muted-foreground">
                    {t.booking.step1.hint}
                  </p>
                  <div className="thin-scroll mt-6 grid max-h-[380px] gap-3 overflow-y-auto pe-1 sm:grid-cols-2">
                    {treatments.map((tr) => (
                      <button
                        key={tr.key}
                        onClick={() => setTreatment(tr)}
                        data-selected={treatment?.key === tr.key}
                        className={cn(
                          "flex items-center gap-4 rounded-2xl border p-4 text-start transition-all duration-300",
                          treatment?.key === tr.key
                            ? "border-primary bg-accent shadow-md shadow-primary/10"
                            : "border-border bg-background hover:border-gold"
                        )}
                        aria-pressed={treatment?.key === tr.key}
                      >
                        <img
                          src={tr.image}
                          alt=""
                          className="h-14 w-14 shrink-0 rounded-xl object-cover"
                          loading="lazy"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-primary">
                            {tr.name[lang]}
                          </span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {formatDuration(tr.duration, lang)} · {formatPrice(tr, lang)}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all",
                            treatment?.key === tr.key
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border"
                          )}
                        >
                          {treatment?.key === tr.key && <Check className="h-3 w-3" aria-hidden />}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 1 — date & time */}
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: dir === "rtl" ? -24 : 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir === "rtl" ? 24 : -24 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="font-display text-2xl font-semibold text-primary">
                    {t.booking.step2.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-light text-muted-foreground">
                    {t.booking.step2.hint}
                  </p>
                  <div className="mt-6 grid gap-8 md:grid-cols-2">
                    <div className="flex justify-center rounded-2xl border border-border bg-background p-4">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d) => {
                          setDate(d);
                          setTime(null);
                        }}
                        disabled={(d) => friday(d) || d < new Date(new Date().setHours(0, 0, 0, 0))}
                        dir="ltr"
                        className=" [--cell-size:2.3rem]"
                      />
                    </div>
                    <div>
                      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5 text-gold" aria-hidden />
                        {date ? formatDate(date, lang) : "—"}
                      </p>
                      {date && friday(date) ? (
                        <p className="mt-6 text-sm text-muted-foreground">
                          {t.booking.step2.slotsUnavailable}
                        </p>
                      ) : date ? (
                        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3">
                          {SLOTS.map((s) => {
                            const isTaken = taken.includes(s);
                            return (
                              <button
                                key={s}
                                disabled={isTaken}
                                onClick={() => setTime(s)}
                                data-selected={time === s}
                                className="slot-chip"
                                aria-pressed={time === s}
                              >
                                <span dir="ltr">{s}</span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="mt-6 text-sm font-light text-muted-foreground">←</p>
                      )}
                      {date && !friday(date) && (
                        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 text-gold" aria-hidden />
                          {t.booking.step2.hint}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 — details */}
              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: dir === "rtl" ? -24 : 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir === "rtl" ? 24 : -24 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="font-display text-2xl font-semibold text-primary">
                    {t.booking.step3.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-light text-muted-foreground">
                    {t.booking.step3.hint}
                  </p>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="bk-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {t.booking.step3.name} *
                      </label>
                      <Input
                        id="bk-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.booking.step3.namePh}
                        className="h-12 rounded-xl"
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="bk-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {t.booking.step3.phone} *
                      </label>
                      <Input
                        id="bk-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.booking.step3.phonePh}
                        type="tel"
                        dir="ltr"
                        className="h-12 rounded-xl text-start"
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && <p className="mt-1.5 text-xs text-destructive">{errors.phone}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="bk-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {t.booking.step3.email}
                      </label>
                      <Input
                        id="bk-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.booking.step3.emailPh}
                        type="email"
                        dir="ltr"
                        className="h-12 rounded-xl text-start"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="bk-notes" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {t.booking.step3.notes}
                      </label>
                      <Textarea
                        id="bk-notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={t.booking.step3.notesPh}
                        className="min-h-[90px] rounded-xl"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 — review */}
              {step === 3 && treatment && date && time && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="font-display text-2xl font-semibold text-primary">
                    {t.booking.step4.title}
                  </h3>
                  <dl className="mt-6 space-y-4 rounded-2xl border border-border bg-background p-6">
                    {[
                      [t.booking.step4.treatment, treatment.name[lang], true],
                      [t.booking.step4.date, formatDate(date, lang), true],
                      [t.booking.step4.time, time, true],
                      [t.booking.step4.patient, name, false],
                    ].map(([k, v, strong]) => (
                      <div key={k as string} className="flex items-center justify-between gap-4 border-b border-border/60 pb-4 last:border-0 last:pb-0">
                        <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{k}</dt>
                        <dd className={cn("text-end text-sm", strong ? "font-semibold text-primary" : "text-muted-foreground")}>
                          {typeof v === "string" && v.length > 34 ? v.slice(0, 34) + "…" : v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {apiError && (
                    <p className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
                      {t.booking.success.error}
                    </p>
                  )}
                </motion.div>
              )}

              {/* STEP 4 — success */}
              {step === 4 && reference && (
                <motion.div
                  key="s4"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="py-6 text-center"
                >
                  <motion.span
                    initial={{ rotate: -12, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 14 }}
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-primary"
                  >
                    <PartyPopper className="h-7 w-7" aria-hidden />
                  </motion.span>
                  <h3 className="font-display mt-6 text-3xl font-semibold text-primary">
                    {t.booking.success.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {t.booking.success.body}{" "}
                    <span className="font-mono text-base font-bold tracking-wider text-gold" dir="ltr">
                      {reference}
                    </span>
                  </p>
                  <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
                    {t.booking.success.body2}
                  </p>
                  <Button
                    variant="outline"
                    onClick={reset}
                    className="mt-8 rounded-full border-primary/30 px-6"
                  >
                    <Sparkles className="h-4 w-4" aria-hidden />
                    {t.booking.success.again}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nav buttons */}
            {step < 4 && (
              <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
                <Button
                  variant="ghost"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="gap-1.5 rounded-full px-5 disabled:opacity-30"
                >
                  {dir === "rtl" ? (
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  ) : (
                    <ChevronLeft className="h-4 w-4" aria-hidden />
                  )}
                  {t.booking.back}
                </Button>

                {step < 3 ? (
                  <Button
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canContinue}
                    className="gap-1.5 rounded-full bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-40"
                  >
                    {t.booking.next}
                    {dir === "rtl" ? (
                      <ChevronLeft className="h-4 w-4" aria-hidden />
                    ) : (
                      <ChevronRight className="h-4 w-4" aria-hidden />
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={submit}
                    disabled={submitting}
                    className="gap-2 rounded-full bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    ) : (
                      <Check className="h-4 w-4" aria-hidden />
                    )}
                    {t.booking.step4.confirm}
                  </Button>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

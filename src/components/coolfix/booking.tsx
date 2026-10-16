"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Flame,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCoolfixLang, formatDayLabel, formatLongDate } from "@/lib/coolfix-i18n";
import {
  areas,
  services,
  WHATSAPP_NUMBER,
  whatsappLink,
  type Service,
} from "@/lib/coolfix-data";
import { useCoolfixBookingStore } from "@/lib/coolfix-store";
import { cn } from "@/lib/utils";
import { ServiceIcon } from "./service-icon";

const WINDOWS = [
  "08:00–10:00",
  "10:00–12:00",
  "12:00–14:00",
  "14:00–16:00",
  "16:00–18:00",
  "18:00–20:00",
  "20:00–22:00",
];

/** Deterministic pseudo-random "taken" windows so availability looks organic */
function takenFor(dateISO: string) {
  let h = 0;
  for (let i = 0; i < dateISO.length; i++) h = (h * 31 + dateISO.charCodeAt(i)) >>> 0;
  const matched = WINDOWS.filter((_, i) => ((h >> i) & 1) === 1 && h % 2 === 0);
  return new Set(matched.slice(0, 2));
}

function areaLabel(a: (typeof areas)[number], lang: "en" | "ar") {
  const city = a.city === "cairo" ? (lang === "ar" ? "القاهرة" : "Cairo") : lang === "ar" ? "الرياض" : "Riyadh";
  return `${a.name[lang]} · ${city}`;
}

export function Booking() {
  const { t, lang } = useCoolfixLang();
  const preselected = useCoolfixBookingStore((s) => s.preselected);
  const clearPreselect = useCoolfixBookingStore((s) => s.clearPreselect);

  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  const [serviceKey, setServiceKey] = useState<string | null>(null);
  const [urgency, setUrgency] = useState<"emergency" | "scheduled" | null>(null);
  const [dayIdx, setDayIdx] = useState(0);
  const [timeWindow, setTimeWindow] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [areaKey, setAreaKey] = useState<string | null>(null);
  const [units, setUnits] = useState("1");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [apiError, setApiError] = useState(false);

  /* Dates generated post-mount only (avoids SSR/hydration drift) */
  useEffect(() => setMounted(true), []);

  /* Preselect arriving from a service card */
  useEffect(() => {
    if (preselected) {
      if (services.some((s) => s.key === preselected)) {
        setServiceKey(preselected);
        setStep(1);
        setReference(null);
      }
      clearPreselect();
    }
  }, [preselected, clearPreselect]);

  const service: Service | null = useMemo(
    () => services.find((s) => s.key === serviceKey) ?? null,
    [serviceKey]
  );

  const days = useMemo(
    () =>
      mounted
        ? Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() + i);
            return d;
          })
        : [],
    [mounted]
  );

  const taken = useMemo(
    () => (mounted && days[dayIdx] ? takenFor(days[dayIdx].toISOString().slice(0, 10)) : new Set<string>()),
    [mounted, days, dayIdx]
  );
  const area = useMemo(() => areas.find((a) => `${a.city}:${a.name.en}` === areaKey) ?? null, [areaKey]);

  const showUnits = service?.category === "ac";
  const estimate =
    service && showUnits
      ? service.from * Math.max(1, parseInt(units, 10) || 1)
      : service?.from ?? 0;

  const detailsValid =
    name.trim().length >= 2 && phone.replace(/\D/g, "").length >= 7 && !!areaKey;

  const canContinue =
    (step === 0 && !!serviceKey) ||
    (step === 1 && !!urgency) ||
    (step === 2 && (urgency === "emergency" ? true : !!timeWindow)) ||
    (step === 3 && detailsValid) ||
    (step === 4 && !submitting);

  function next() {
    if (step === 3 && !detailsValid) {
      const e: Record<string, string> = {};
      if (name.trim().length < 2) e.name = t.booking.details.errors.name;
      if (phone.replace(/\D/g, "").length < 7) e.phone = t.booking.details.errors.phone;
      if (!areaKey) e.area = t.booking.details.errors.area;
      setErrors(e);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, 4));
  }

  async function submit() {
    if (!service || !urgency) return;
    setSubmitting(true);
    setApiError(false);
    try {
      const dateISO =
        urgency === "emergency"
          ? new Date().toISOString().slice(0, 10)
          : days[dayIdx].toISOString().slice(0, 10);
      const timeVal = urgency === "emergency" ? "ASAP" : timeWindow ?? "";
      const res = await fetch("/api/coolfix-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: service.name.en,
          serviceAr: service.name.ar,
          urgency,
          date: dateISO,
          time: timeVal,
          name,
          phone,
          area: area ? `${area.name.en}, ${area.city === "cairo" ? "Cairo" : "Riyadh"}` : null,
          units: showUnits ? Math.max(1, parseInt(units, 10) || 1) : undefined,
          notes,
          locale: lang,
        }),
      });
      const data = await res.json();
      if (res.ok && data.reference) {
        setReference(data.reference);
        setStep(5);
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
    setServiceKey(null);
    setUrgency(null);
    setDayIdx(0);
    setTimeWindow(null);
    setName("");
    setPhone("");
    setAreaKey(null);
    setUnits("1");
    setNotes("");
    setErrors({});
    setReference(null);
    setApiError(false);
  }

  /* WhatsApp confirmation message, pre-filled with booking details */
  const waHref = useMemo(() => {
    if (!reference || !service) return "#";
    const whenText =
      urgency === "emergency"
        ? lang === "ar"
          ? "طوارئ — في أقرب وقت"
          : "Emergency — ASAP"
        : `${formatLongDate(days[dayIdx], lang)}${timeWindow ? ` · ${timeWindow}` : ""}`;
    const unitsPart = showUnits ? ` (${units})` : "";
    const lines =
      lang === "ar"
        ? [
            `حجز كول فيكس ${reference}`,
            `الخدمة: ${service.name.ar}${unitsPart}`,
            `الموعد: ${whenText}`,
            `المنطقة: ${area ? areaLabel(area, "ar") : "-"}`,
            `الاسم: ${name}`,
            `التليفون: ${phone}`,
          ]
        : [
            `CoolFix booking ${reference}`,
            `Service: ${service.name.en}${unitsPart}`,
            `When: ${whenText}`,
            `Area: ${area ? areaLabel(area, "en") : "-"}`,
            `Name: ${name}`,
            `Phone: ${phone}`,
          ];
    return whatsappLink(lines.join("\n"));
  }, [reference, service, urgency, days, dayIdx, timeWindow, area, name, phone, units, showUnits, lang]);

  return (
    <section id="book" className="scroll-mt-24 bg-coolfix-teal-mist/60 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="cf-eyebrow">{t.booking.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-coolfix-ink sm:text-4xl">
            {t.booking.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-coolfix-fog">
            {t.booking.sub}
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-coolfix-line bg-white shadow-lg shadow-coolfix-ink/5">
          {/* Stepper */}
          <div className="border-b border-coolfix-line bg-coolfix-paper/70 px-5 py-4 sm:px-7">
            <ol className="flex items-center">
              {t.booking.steps.map((label, i) => (
                <li key={label} className={cn("flex items-center", i < 4 ? "flex-1" : "")}>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11.5px] font-bold transition-colors",
                        step === 5 || i < step
                          ? "border-coolfix-teal bg-coolfix-teal text-white"
                          : i === step
                            ? "border-coolfix-teal bg-white text-coolfix-teal-deep ring-2 ring-coolfix-teal/25"
                            : "border-coolfix-line bg-white text-coolfix-fog"
                      )}
                      aria-current={i === step ? "step" : undefined}
                    >
                      {step === 5 || i < step ? (
                        <Check className="h-3.5 w-3.5" aria-hidden />
                      ) : (
                        <span className="tabular-nums">{i + 1}</span>
                      )}
                    </span>
                    <span
                      className={cn(
                        "hidden text-[11.5px] font-semibold sm:block",
                        i === step ? "text-coolfix-ink" : "text-coolfix-fog"
                      )}
                    >
                      {label}
                    </span>
                  </div>
                  {i < 4 ? (
                    <span
                      className={cn(
                        "mx-2 h-px flex-1 sm:mx-3",
                        i < step || step === 5 ? "bg-coolfix-teal" : "bg-coolfix-line"
                      )}
                      aria-hidden
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-7">
            <AnimatePresence mode="wait">
              {/* STEP 0 — service */}
              {step === 0 && (
                <motion.div
                  key="s0"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  <h3 className="text-[17px] font-bold text-coolfix-ink">
                    {t.booking.service.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-coolfix-fog">{t.booking.service.sub}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {services.map((s) => (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => setServiceKey(s.key)}
                        aria-pressed={serviceKey === s.key}
                        className={cn(
                          "flex items-start gap-3 rounded-xl border p-4 text-start transition-all",
                          serviceKey === s.key
                            ? "border-coolfix-teal bg-coolfix-teal-mist/70 ring-1 ring-coolfix-teal"
                            : "border-coolfix-line hover:border-coolfix-teal/50"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                            serviceKey === s.key
                              ? "bg-coolfix-teal text-white"
                              : "bg-coolfix-teal-mist text-coolfix-teal-deep"
                          )}
                        >
                          <ServiceIcon icon={s.icon} className="h-4.5 w-4.5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[14px] font-semibold text-coolfix-ink">
                            {s.name[lang]}
                          </span>
                          <span className="mt-0.5 block text-[11.5px] text-coolfix-fog" dir="ltr">
                            {t.services.from} EGP {s.from}
                            {s.perUnit ? ` · ${t.services.perUnit}` : ""}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 1 — urgency */}
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  <h3 className="text-[17px] font-bold text-coolfix-ink">
                    {t.booking.urgency.title}
                  </h3>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setUrgency("emergency")}
                      aria-pressed={urgency === "emergency"}
                      className={cn(
                        "rounded-xl border p-5 text-start transition-all",
                        urgency === "emergency"
                          ? "border-coolfix-heat bg-coolfix-heat-soft ring-1 ring-coolfix-heat"
                          : "border-coolfix-line hover:border-coolfix-heat/60"
                      )}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-xl",
                            urgency === "emergency"
                              ? "bg-coolfix-heat text-white"
                              : "bg-coolfix-heat-soft text-coolfix-heat"
                          )}
                        >
                          <Flame className="h-5 w-5" aria-hidden />
                        </span>
                        <span
                          className={cn(
                            "rounded-full px-3 py-1 text-[10.5px] font-bold uppercase tracking-wide",
                            urgency === "emergency"
                              ? "bg-coolfix-heat text-white"
                              : "bg-coolfix-heat-soft text-coolfix-heat"
                          )}
                        >
                          {t.booking.urgency.emergency.tag}
                        </span>
                      </span>
                      <span className="mt-3 block text-[15.5px] font-bold text-coolfix-ink">
                        {t.booking.urgency.emergency.title}
                      </span>
                      <span className="mt-1 block text-[13px] leading-relaxed text-coolfix-fog">
                        {t.booking.urgency.emergency.desc}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setUrgency("scheduled")}
                      aria-pressed={urgency === "scheduled"}
                      className={cn(
                        "rounded-xl border p-5 text-start transition-all",
                        urgency === "scheduled"
                          ? "border-coolfix-teal bg-coolfix-teal-mist/70 ring-1 ring-coolfix-teal"
                          : "border-coolfix-line hover:border-coolfix-teal/60"
                      )}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-xl",
                            urgency === "scheduled"
                              ? "bg-coolfix-teal text-white"
                              : "bg-coolfix-teal-mist text-coolfix-teal-deep"
                          )}
                        >
                          <CalendarClock className="h-5 w-5" aria-hidden />
                        </span>
                        <span
                          className={cn(
                            "rounded-full px-3 py-1 text-[10.5px] font-bold uppercase tracking-wide",
                            urgency === "scheduled"
                              ? "bg-coolfix-teal text-white"
                              : "bg-coolfix-teal-mist text-coolfix-teal-deep"
                          )}
                        >
                          {t.booking.urgency.scheduled.tag}
                        </span>
                      </span>
                      <span className="mt-3 block text-[15.5px] font-bold text-coolfix-ink">
                        {t.booking.urgency.scheduled.title}
                      </span>
                      <span className="mt-1 block text-[13px] leading-relaxed text-coolfix-fog">
                        {t.booking.urgency.scheduled.desc}
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 — time */}
              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  {urgency === "emergency" ? (
                    <div className="rounded-xl border border-coolfix-heat/30 bg-coolfix-heat-soft p-6 sm:p-8">
                      <div className="flex items-center gap-3">
                        <span className="cf-pulse relative flex h-3 w-3">
                          <span className="h-3 w-3 rounded-full bg-coolfix-heat" />
                        </span>
                        <h3 className="text-[17px] font-bold text-coolfix-ink">
                          {t.booking.time.emergencyTitle}
                        </h3>
                      </div>
                      <p className="mt-3 text-[14px] leading-relaxed text-coolfix-ink/75">
                        {t.booking.time.emergencyBody}
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-[17px] font-bold text-coolfix-ink">
                        {t.booking.time.title}
                      </h3>
                      <p className="mt-1 text-[13px] text-coolfix-fog">{t.booking.time.sub}</p>

                      {/* day chips */}
                      <div className="thin-scroll mt-5 flex gap-2 overflow-x-auto pb-1">
                        {days.map((d, i) => (
                          <button
                            key={d.toISOString()}
                            type="button"
                            onClick={() => {
                              setDayIdx(i);
                              setTimeWindow(null);
                            }}
                            aria-pressed={dayIdx === i}
                            className={cn(
                              "shrink-0 rounded-xl border px-4 py-2 text-center transition-all",
                              dayIdx === i
                                ? "border-coolfix-teal bg-coolfix-teal text-white"
                                : "border-coolfix-line hover:border-coolfix-teal/50"
                            )}
                          >
                            <span className="block text-[10.5px] font-semibold uppercase tracking-wide opacity-80">
                              {i === 0
                                ? t.booking.time.today
                                : formatDayLabel(d, lang).split(" ")[0].replace(/[,،]$/, "")}
                            </span>
                            <span className="mt-0.5 block text-[13px] font-bold tabular-nums">
                              {formatDayLabel(d, lang).split(" ").slice(1).join(" ").replace(/[,،]$/, "")}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* arrival windows */}
                      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                        {WINDOWS.map((w) => {
                          const isTaken = taken.has(w);
                          return (
                            <button
                              key={w}
                              type="button"
                              disabled={isTaken}
                              onClick={() => setTimeWindow(w)}
                              aria-pressed={timeWindow === w}
                              title={isTaken ? t.booking.time.taken : undefined}
                              className={cn(
                                "rounded-xl border py-2.5 text-[13px] font-semibold tabular-nums transition-all",
                                timeWindow === w
                                  ? "border-coolfix-teal bg-coolfix-teal text-white"
                                  : "border-coolfix-line text-coolfix-ink hover:border-coolfix-teal/50",
                                isTaken &&
                                  "cursor-not-allowed text-coolfix-fog/50 line-through opacity-40"
                              )}
                              dir="ltr"
                            >
                              {w}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {/* STEP 3 — details */}
              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  <h3 className="text-[17px] font-bold text-coolfix-ink">
                    {t.booking.details.title}
                  </h3>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="cf-name" className="text-[13px] font-semibold text-coolfix-ink">
                        {t.booking.details.name}
                      </Label>
                      <div className="relative mt-1.5">
                        <User className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-coolfix-fog" aria-hidden />
                        <Input
                          id="cf-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={t.booking.details.namePh}
                          className="ps-9"
                          autoComplete="name"
                        />
                      </div>
                      {errors.name ? (
                        <p className="mt-1.5 text-[11.5px] font-medium text-coolfix-heat">{errors.name}</p>
                      ) : null}
                    </div>

                    <div>
                      <Label htmlFor="cf-phone" className="text-[13px] font-semibold text-coolfix-ink">
                        {t.booking.details.phone}
                      </Label>
                      <div className="relative mt-1.5">
                        <Phone className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-coolfix-fog" aria-hidden />
                        <Input
                          id="cf-phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={t.booking.details.phonePh}
                          className="ps-9"
                          dir="ltr"
                          inputMode="tel"
                          autoComplete="tel"
                        />
                      </div>
                      {errors.phone ? (
                        <p className="mt-1.5 text-[11.5px] font-medium text-coolfix-heat">{errors.phone}</p>
                      ) : null}
                    </div>

                    <div>
                      <Label className="text-[13px] font-semibold text-coolfix-ink">
                        {t.booking.details.area}
                      </Label>
                      <div className="relative mt-1.5">
                        <MapPin className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 z-10 text-coolfix-fog" aria-hidden />
                        <Select value={areaKey ?? ""} onValueChange={(v) => setAreaKey(v)}>
                          <SelectTrigger className="ps-9" aria-label={t.booking.details.area}>
                            <SelectValue placeholder={t.booking.details.areaPh} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>{t.coverage.cairo}</SelectLabel>
                              {areas
                                .filter((a) => a.city === "cairo")
                                .map((a) => (
                                  <SelectItem key={`cairo:${a.name.en}`} value={`cairo:${a.name.en}`}>
                                    {a.name[lang]}
                                  </SelectItem>
                                ))}
                            </SelectGroup>
                            <SelectGroup>
                              <SelectLabel>{t.coverage.riyadh}</SelectLabel>
                              {areas
                                .filter((a) => a.city === "riyadh")
                                .map((a) => (
                                  <SelectItem key={`riyadh:${a.name.en}`} value={`riyadh:${a.name.en}`}>
                                    {a.name[lang]}
                                  </SelectItem>
                                ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      {errors.area ? (
                        <p className="mt-1.5 text-[11.5px] font-medium text-coolfix-heat">{errors.area}</p>
                      ) : null}
                    </div>

                    {showUnits ? (
                      <div>
                        <Label className="text-[13px] font-semibold text-coolfix-ink">
                          {t.booking.details.units}
                        </Label>
                        <Select value={units} onValueChange={setUnits}>
                          <SelectTrigger className="mt-1.5 w-full" aria-label={t.booking.details.units}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => `${i + 1}`).map((n) => (
                              <SelectItem key={n} value={n}>
                                {n}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ) : null}

                    <div className="sm:col-span-2">
                      <Label htmlFor="cf-notes" className="text-[13px] font-semibold text-coolfix-ink">
                        {t.booking.details.notes}
                      </Label>
                      <Textarea
                        id="cf-notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={t.booking.details.notesPh}
                        className="mt-1.5 min-h-[88px] resize-none"
                        rows={3}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4 — review */}
              {step === 4 && service && (
                <motion.div
                  key="s4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  <h3 className="text-[17px] font-bold text-coolfix-ink">
                    {t.booking.review.title}
                  </h3>

                  <dl className="mt-5 overflow-hidden rounded-xl border border-coolfix-line">
                    <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                      {(
                        [
                          {
                            k: t.booking.review.service,
                            v: `${service.name[lang]}${showUnits ? ` · ${units}` : ""}`,
                          },
                          {
                            k: t.booking.review.urgency,
                            v:
                              urgency === "emergency"
                                ? t.booking.urgency.emergency.title
                                : t.booking.urgency.scheduled.title,
                            heat: urgency === "emergency",
                          },
                          {
                            k: t.booking.review.when,
                            v:
                              urgency === "emergency" || !days[dayIdx]
                                ? "ASAP"
                                : `${formatLongDate(days[dayIdx], lang)} · ${timeWindow}`,
                            ltr: urgency === "scheduled",
                          },
                          { k: t.booking.review.area, v: area ? areaLabel(area, lang) : "—" },
                          { k: t.booking.review.name, v: name },
                          { k: t.booking.review.phone, v: phone, ltr: true },
                          ...(notes.trim()
                            ? [{ k: t.booking.review.notes, v: notes.trim() }]
                            : []),
                        ] as { k: string; v: string; heat?: boolean; ltr?: boolean }[]
                      ).map((row, i) => (
                        <div
                          key={row.k}
                          className={cn(
                            "flex items-baseline justify-between gap-4 px-4 py-3",
                            i % 2 === 0 ? "bg-coolfix-paper/60" : "bg-white"
                          )}
                        >
                          <dt className="text-[12px] font-semibold uppercase tracking-wide text-coolfix-fog">
                            {row.k}
                          </dt>
                          <dd
                            className={cn(
                              "text-end text-[13.5px] font-medium text-coolfix-ink",
                              row.heat && "text-coolfix-heat",
                              row.ltr && "tabular-nums"
                            )}
                            dir={row.ltr ? "ltr" : undefined}
                          >
                            {row.v}
                          </dd>
                        </div>
                      ))}
                    </div>
                  </dl>

                  <div className="mt-5 rounded-xl bg-coolfix-teal-mist/70 p-5">
                    <p className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-[12.5px] font-semibold uppercase tracking-wide text-coolfix-teal-deep">
                        {t.booking.review.estimate}
                      </span>
                      <span className="text-[22px] font-extrabold tabular-nums text-coolfix-ink" dir="ltr">
                        EGP {estimate.toLocaleString("en-US")}
                        {urgency === "emergency" ? (
                          <span className="text-[13px] font-semibold text-coolfix-heat">
                            {"  "}{t.booking.review.emergencyFee}
                          </span>
                        ) : null}
                      </span>
                    </p>
                    <p className="mt-2 text-[11.5px] leading-relaxed text-coolfix-fog">
                      {t.booking.review.estimateNote}
                    </p>
                  </div>

                  {apiError ? (
                    <p className="mt-4 rounded-lg bg-coolfix-heat-soft px-4 py-3 text-[13px] font-medium text-coolfix-heat-deep">
                      {t.booking.success.error}
                    </p>
                  ) : null}
                </motion.div>
              )}

              {/* STEP 5 — success */}
              {step === 5 && reference && (
                <motion.div
                  key="s5"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="py-4 text-center"
                >
                  <CheckCircle2 className="mx-auto h-14 w-14 text-coolfix-teal" aria-hidden />
                  <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-coolfix-ink">
                    {t.booking.success.title}
                  </h3>
                  <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-coolfix-line bg-coolfix-paper px-4 py-1.5">
                    <span className="text-[11.5px] font-semibold uppercase tracking-wide text-coolfix-fog">
                      {t.booking.success.ref}
                    </span>
                    <span className="font-mono text-[14px] font-bold text-coolfix-teal-deep" dir="ltr">
                      {reference}
                    </span>
                  </p>
                  <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-coolfix-fog">
                    {t.booking.success.body}
                  </p>
                  <div className="mt-7 flex flex-col items-center gap-3">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center gap-2 rounded-full bg-[#22b358] px-7 text-[15px] font-semibold text-white shadow-md shadow-[#22b358]/30 transition-all hover:bg-[#1ca04e]"
                    >
                      <MessageCircle className="h-5 w-5" aria-hidden />
                      {t.booking.success.whatsapp}
                    </a>
                    <button
                      type="button"
                      onClick={reset}
                      className="text-[13px] font-semibold text-coolfix-teal-deep underline-offset-4 hover:underline"
                    >
                      {t.booking.success.bookAnother}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer nav */}
            {step < 5 ? (
              <div className="mt-7 flex items-center justify-between gap-3 border-t border-coolfix-line pt-5">
                {step > 0 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep((s) => Math.max(s - 1, 0))}
                    className="gap-1.5 border-coolfix-line text-coolfix-fog hover:border-coolfix-teal hover:text-coolfix-teal-deep"
                  >
                    <ChevronLeft className="h-4 w-4 rtl:rotate-180" aria-hidden />
                    {t.booking.back}
                  </Button>
                ) : (
                  <span />
                )}

                {step < 4 ? (
                  <Button
                    type="button"
                    onClick={next}
                    disabled={!canContinue}
                    className="gap-1.5 bg-coolfix-teal px-6 font-semibold text-white hover:bg-coolfix-teal-deep"
                  >
                    {t.booking.continue}
                    <ChevronRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={submit}
                    disabled={!canContinue}
                    className="gap-2 bg-coolfix-heat px-6 font-semibold text-white hover:bg-coolfix-heat-deep"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        {t.booking.review.submitting}
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" aria-hidden />
                        {t.booking.confirm}
                      </>
                    )}
                  </Button>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

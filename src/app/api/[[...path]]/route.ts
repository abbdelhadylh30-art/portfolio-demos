import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * All booking endpoints live in this single catch-all route handler on
 * purpose: on serverless platforms each route FILE becomes its own function
 * with isolated memory. Keeping every endpoint in one file means one shared
 * function instance, so the in-memory store (src/lib/db.ts) is visible
 * across requests — a booking made on any demo shows up in /admin immediately.
 *
 * Routes handled here (URLs unchanged from the per-brand originals):
 *   GET    /api                        → endpoint index
 *   GET    /api/all-bookings           → every booking, newest first (admin)
 *   POST   /api/bookings               → Lumière treatment booking
 *   GET    /api/bookings               → Lumière bookings
 *   PATCH  /api/bookings/:id           → status update (admin)
 *   POST   /api/layan-bookings         → Layan consultation request
 *   GET    /api/layan-bookings         → Layan bookings
 *   POST   /api/coolfix-bookings       → CoolFix dispatch request
 *   GET    /api/coolfix-bookings       → CoolFix bookings
 */

export const dynamic = "force-dynamic";

const STATUSES = ["pending", "confirmed", "closed"];

function makeReference(prefix: "LUM-" | "LY-" | "CF-") {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = prefix;
  for (let i = 0; i < 6; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return ref;
}

/* Server-side validation helpers — never trust the client */
const isStr = (v: unknown): v is string => typeof v === "string";
const clean = (v: string, max: number) => v.trim().slice(0, max);
const hasDigits = (v: string, min: number) => v.replace(/\D/g, "").length >= min;
const isIsoDate = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v);

/* ---------- Lumière: POST /api/bookings ---------- */
async function createLumiere(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { treatmentKey, treatmentEn, treatmentAr, date, time, name, phone, email, notes } =
    body ?? {};

  if (!isStr(treatmentKey) || !isStr(date) || !isStr(time) || !isStr(name) || !isStr(phone)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (name.trim().length < 2 || phone.trim().length < 7) {
    return NextResponse.json({ error: "Invalid name or phone" }, { status: 400 });
  }
  if (!isIsoDate(date)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const booking = await db.booking.create({
    data: {
      reference: makeReference("LUM-"),
      treatmentKey,
      treatmentEn: isStr(treatmentEn) ? treatmentEn : "",
      treatmentAr: isStr(treatmentAr) ? treatmentAr : "",
      date,
      time,
      name: clean(name, 120),
      phone: clean(phone, 40),
      email: isStr(email) && email ? clean(email, 160) : null,
      notes: isStr(notes) && notes ? clean(notes, 1000) : null,
    },
  });
  return NextResponse.json({ ok: true, reference: booking.reference });
}

/* ---------- Layan: POST /api/layan-bookings ---------- */
async function createLayan(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { name, phone, email, city, service, budget, timeline, date, notes, locale } = body ?? {};

  if (!isStr(name) || !isStr(phone)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (name.trim().length < 2 || !hasDigits(phone, 7)) {
    return NextResponse.json({ error: "Invalid name or phone" }, { status: 400 });
  }
  if (date && (!isStr(date) || !isIsoDate(date))) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const booking = await db.booking.create({
    data: {
      reference: makeReference("LY-"),
      brand: "layan",
      name: clean(name, 120),
      phone: clean(phone, 40),
      email: isStr(email) && email ? clean(email, 160) : null,
      city: isStr(city) ? city.slice(0, 80) : null,
      service: isStr(service) ? service.slice(0, 120) : null,
      budget: isStr(budget) ? budget.slice(0, 120) : null,
      timeline: isStr(timeline) ? timeline.slice(0, 80) : null,
      date: isStr(date) && date ? date : null,
      notes: isStr(notes) && notes ? clean(notes, 1000) : null,
      locale: locale === "ar" ? "ar" : "en",
    },
  });
  return NextResponse.json({ ok: true, reference: booking.reference });
}

/* ---------- CoolFix: POST /api/coolfix-bookings ---------- */
async function createCoolfix(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { service, serviceAr, urgency, date, time, name, phone, area, units, notes, locale } =
    body ?? {};

  if (!isStr(service) || !isStr(name) || !isStr(phone)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (service.trim().length < 2 || name.trim().length < 2) {
    return NextResponse.json({ error: "Invalid service or name" }, { status: 400 });
  }
  if (!hasDigits(phone, 7)) {
    return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
  }
  if (urgency !== "emergency" && urgency !== "scheduled") {
    return NextResponse.json({ error: "Invalid urgency" }, { status: 400 });
  }
  if (date && (!isStr(date) || !isIsoDate(date))) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }
  const safeUnits =
    typeof units === "number" && units >= 1 && units <= 20 ? Math.round(units) : null;

  const booking = await db.booking.create({
    data: {
      reference: makeReference("CF-"),
      brand: "coolfix",
      service: clean(service, 120),
      treatmentAr: isStr(serviceAr) ? serviceAr.slice(0, 120) : null,
      urgency,
      date: isStr(date) && date ? date : null,
      time: isStr(time) ? time.slice(0, 40) : null,
      name: clean(name, 120),
      phone: clean(phone, 40),
      city: isStr(area) ? area.slice(0, 80) : null,
      units: safeUnits,
      notes: isStr(notes) && notes ? clean(notes, 1000) : null,
      locale: locale === "ar" ? "ar" : "en",
    },
  });
  return NextResponse.json({ ok: true, reference: booking.reference });
}

/* ---------- GET lists ---------- */
async function listBookings(brand: "lumiere" | "layan" | "coolfix") {
  const bookings = await db.booking.findMany({
    where: { brand },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json({ ok: true, bookings });
}

const ENDPOINTS = {
  ok: true,
  service: "portfolio-demos booking API",
  endpoints: [
    "GET /api/all-bookings",
    "POST /api/bookings",
    "GET /api/bookings",
    "PATCH /api/bookings/:id",
    "POST /api/layan-bookings",
    "GET /api/layan-bookings",
    "POST /api/coolfix-bookings",
    "GET /api/coolfix-bookings",
  ],
};

export async function GET(req: NextRequest) {
  const parts = req.nextUrl.pathname
    .replace(/^\/api\/?/, "")
    .split("/")
    .filter(Boolean);

  if (parts.length === 0) return NextResponse.json(ENDPOINTS);

  switch (parts[0]) {
    case "all-bookings": {
      const bookings = await db.booking.findMany({
        orderBy: { createdAt: "desc" },
        take: 200,
      });
      return NextResponse.json({ ok: true, bookings });
    }
    case "bookings":
      return listBookings("lumiere");
    case "layan-bookings":
      return listBookings("layan");
    case "coolfix-bookings":
      return listBookings("coolfix");
    default:
      return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function POST(req: NextRequest) {
  const parts = req.nextUrl.pathname
    .replace(/^\/api\/?/, "")
    .split("/")
    .filter(Boolean);
  if (parts.length !== 1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    switch (parts[0]) {
      case "bookings":
        return await createLumiere(req);
      case "layan-bookings":
        return await createLayan(req);
      case "coolfix-bookings":
        return await createCoolfix(req);
      default:
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  } catch (err) {
    console.error("Booking creation failed:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const parts = req.nextUrl.pathname
    .replace(/^\/api\/?/, "")
    .split("/")
    .filter(Boolean);

  if (parts.length !== 2 || parts[0] !== "bookings") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const id = parts[1];
    const body = await req.json().catch(() => null);
    const { status } = body ?? {};

    if (!isStr(status) || !STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const existing = await db.booking.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const updated = await db.booking.update({ where: { id }, data: { status } });
    return NextResponse.json({ ok: true, booking: updated });
  } catch (err) {
    console.error("Booking status update failed:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

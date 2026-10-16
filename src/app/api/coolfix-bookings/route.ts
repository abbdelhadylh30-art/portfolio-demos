import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

function makeReference() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "CF-";
  for (let i = 0; i < 6; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return ref;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      service,
      serviceAr,
      urgency,
      date,
      time,
      name,
      phone,
      area,
      units,
      notes,
      locale,
    } = body ?? {};

    /* Server-side validation — never trust the client */
    if (typeof service !== "string" || typeof name !== "string" || typeof phone !== "string") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (service.trim().length < 2 || name.trim().length < 2) {
      return NextResponse.json({ error: "Invalid service or name" }, { status: 400 });
    }
    if (phone.replace(/\D/g, "").length < 7) {
      return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
    }
    if (urgency !== "emergency" && urgency !== "scheduled") {
      return NextResponse.json({ error: "Invalid urgency" }, { status: 400 });
    }
    /* Date, if provided, must be a sane ISO date */
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }
    const safeUnits =
      typeof units === "number" && units >= 1 && units <= 20 ? Math.round(units) : null;

    const reference = makeReference();
    const booking = await db.booking.create({
      data: {
        reference,
        brand: "coolfix",
        service: service.trim().slice(0, 120),
        treatmentAr: typeof serviceAr === "string" ? serviceAr.slice(0, 120) : null,
        urgency,
        date: typeof date === "string" && date ? date : null,
        time: typeof time === "string" ? time.slice(0, 40) : null,
        name: name.trim().slice(0, 120),
        phone: phone.trim().slice(0, 40),
        city: typeof area === "string" ? area.slice(0, 80) : null,
        units: safeUnits,
        notes: typeof notes === "string" && notes ? notes.trim().slice(0, 1000) : null,
        locale: locale === "ar" ? "ar" : "en",
      },
    });

    return NextResponse.json({ ok: true, reference: booking.reference });
  } catch (err) {
    console.error("CoolFix booking creation failed:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

/* Recent bookings for the owner's dashboard */
export async function GET() {
  try {
    const bookings = await db.booking.findMany({
      where: { brand: "coolfix" },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ ok: true, bookings });
  } catch (err) {
    console.error("CoolFix bookings fetch failed:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

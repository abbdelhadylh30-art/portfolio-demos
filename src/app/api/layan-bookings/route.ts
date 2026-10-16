import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

function makeReference() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "LY-";
  for (let i = 0; i < 6; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return ref;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, city, service, budget, timeline, date, notes, locale } =
      body ?? {};

    /* Server-side validation — never trust the client */
    if (typeof name !== "string" || typeof phone !== "string") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (name.trim().length < 2 || phone.replace(/\D/g, "").length < 7) {
      return NextResponse.json({ error: "Invalid name or phone" }, { status: 400 });
    }
    /* Date, if provided, must be a sane ISO date */
    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    const reference = makeReference();
    const booking = await db.booking.create({
      data: {
        reference,
        brand: "layan",
        name: name.trim().slice(0, 120),
        phone: phone.trim().slice(0, 40),
        email: typeof email === "string" && email ? email.trim().slice(0, 160) : null,
        city: typeof city === "string" ? city.slice(0, 80) : null,
        service: typeof service === "string" ? service.slice(0, 120) : null,
        budget: typeof budget === "string" ? budget.slice(0, 120) : null,
        timeline: typeof timeline === "string" ? timeline.slice(0, 80) : null,
        date: typeof date === "string" && date ? date : null,
        notes: typeof notes === "string" && notes ? notes.trim().slice(0, 1000) : null,
        locale: locale === "ar" ? "ar" : "en",
      },
    });

    return NextResponse.json({ ok: true, reference: booking.reference });
  } catch (err) {
    console.error("Layan booking creation failed:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

/* Recent bookings for the owner's dashboard */
export async function GET() {
  try {
    const bookings = await db.booking.findMany({
      where: { brand: "layan" },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ ok: true, bookings });
  } catch (err) {
    console.error("Layan bookings fetch failed:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

function makeReference() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "LUM-";
  for (let i = 0; i < 6; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return ref;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      treatmentKey,
      treatmentEn,
      treatmentAr,
      date,
      time,
      name,
      phone,
      email,
      notes,
    } = body ?? {};

    /* Server-side validation — never trust the client */
    if (
      typeof treatmentKey !== "string" ||
      typeof date !== "string" ||
      typeof time !== "string" ||
      typeof name !== "string" ||
      typeof phone !== "string"
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    if (name.trim().length < 2 || phone.trim().length < 7) {
      return NextResponse.json(
        { error: "Invalid name or phone" },
        { status: 400 }
      );
    }
    /* Basic date sanity: ISO date string */
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    const reference = makeReference();
    const booking = await db.booking.create({
      data: {
        reference,
        treatmentKey,
        treatmentEn: typeof treatmentEn === "string" ? treatmentEn : "",
        treatmentAr: typeof treatmentAr === "string" ? treatmentAr : "",
        date,
        time,
        name: name.trim().slice(0, 120),
        phone: phone.trim().slice(0, 40),
        email: typeof email === "string" && email ? email.trim().slice(0, 160) : null,
        notes: typeof notes === "string" && notes ? notes.trim().slice(0, 1000) : null,
      },
    });

    return NextResponse.json({ ok: true, reference: booking.reference });
  } catch (err) {
    console.error("Booking creation failed:", err);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}

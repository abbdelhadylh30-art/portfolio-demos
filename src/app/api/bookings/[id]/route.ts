import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const STATUSES = ["pending", "confirmed", "closed"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body ?? {};

    if (typeof status !== "string" || !STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const existing = await db.booking.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const updated = await db.booking.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ ok: true, booking: updated });
  } catch (err) {
    console.error("Booking status update failed:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

import type { Metadata } from "next";
import { db } from "@/lib/db";
import { BookingsTable, type AdminBooking } from "@/components/admin/bookings-table";

export const metadata: Metadata = {
  title: "Bookings Dashboard — Concept Demos",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let bookings: AdminBooking[] = [];
  try {
    const rows = await db.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    bookings = rows.map((r) => ({
      id: r.id,
      reference: r.reference,
      brand: r.brand,
      name: r.name,
      phone: r.phone,
      email: r.email,
      city: r.city,
      service: r.service,
      treatmentEn: r.treatmentEn,
      budget: r.budget,
      timeline: r.timeline,
      urgency: r.urgency,
      units: r.units,
      date: r.date,
      time: r.time,
      notes: r.notes,
      status: r.status,
      createdAt: r.createdAt.toISOString(),
    }));
  } catch (err) {
    console.error("Admin bookings fetch failed:", err);
  }

  return <BookingsTable initial={bookings} />;
}

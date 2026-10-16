"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { BookingsTable, type AdminBooking } from "@/components/admin/bookings-table";

/**
 * The dashboard fetches /api/all-bookings client-side. All booking endpoints
 * share one route handler (see src/app/api/[[...path]]/route.ts), so a
 * booking submitted on any demo seconds ago is already in that response.
 */
export function AdminDashboard() {
  const [bookings, setBookings] = useState<AdminBooking[] | null>(null);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [version, setVersion] = useState(0);

  const load = useCallback(async () => {
    setRefreshing(true);
    setError(false);
    try {
      const res = await fetch("/api/all-bookings", { cache: "no-store" });
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      const rows: AdminBooking[] = (data.bookings ?? []).map((r: Record<string, unknown>) => ({
        id: r.id as string,
        reference: r.reference as string,
        brand: r.brand as string,
        name: r.name as string,
        phone: r.phone as string,
        email: (r.email as string | null) ?? null,
        city: (r.city as string | null) ?? null,
        service: (r.service as string | null) ?? null,
        treatmentEn: (r.treatmentEn as string | null) ?? null,
        budget: (r.budget as string | null) ?? null,
        timeline: (r.timeline as string | null) ?? null,
        urgency: (r.urgency as string | null) ?? null,
        units: (r.units as number | null) ?? null,
        date: (r.date as string | null) ?? null,
        time: (r.time as string | null) ?? null,
        notes: (r.notes as string | null) ?? null,
        status: r.status as string,
        createdAt: r.createdAt as string,
      }));
      setBookings(rows);
      setVersion((v) => v + 1);
    } catch {
      setError(true);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (bookings === null && !error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14100c] text-[#8d8375]">
        <Loader2 className="h-5 w-5 animate-spin text-[#a98c5f]" aria-label="Loading" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#14100c] px-6 text-center text-[#8d8375]">
        <p className="text-sm">Could not load bookings.</p>
        <button
          onClick={load}
          className="rounded-full border border-[#2a241b] px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#c8ab77] transition-colors hover:border-[#a98c5f]"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* remount on each refresh so the table picks up fresh rows */}
      <BookingsTable key={version} initial={bookings ?? []} onRefresh={load} refreshing={refreshing} />
    </div>
  );
}

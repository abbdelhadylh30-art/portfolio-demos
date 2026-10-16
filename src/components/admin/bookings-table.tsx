"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type AdminBooking = {
  id: string;
  reference: string;
  brand: string;
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  service: string | null;
  treatmentEn: string | null;
  budget: string | null;
  timeline: string | null;
  urgency: string | null;
  units: number | null;
  date: string | null;
  time: string | null;
  notes: string | null;
  status: string;
  createdAt: string;
};

const statusMeta: Record<string, { label: string; cls: string }> = {
  pending: { label: "Pending", cls: "bg-amber-500/15 text-amber-300 border-amber-500/30" },
  confirmed: { label: "Confirmed", cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  closed: { label: "Closed", cls: "bg-zinc-500/15 text-zinc-300 border-zinc-500/30" },
};

const brandMeta: Record<string, { label: string; cls: string }> = {
  layan: { label: "Layan", cls: "bg-[#9a7742]/20 text-[#d9c5a0] border-[#9a7742]/40" },
  lumiere: { label: "Lumière", cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  coolfix: { label: "CoolFix", cls: "bg-teal-500/15 text-teal-300 border-teal-500/30" },
};

export function BookingsTable({ initial }: { initial: AdminBooking[] }) {
  const [rows, setRows] = useState(initial);
  const [brand, setBrand] = useState<"all" | "layan" | "lumiere" | "coolfix">("all");
  const [updating, setUpdating] = useState<string | null>(null);

  const shown = brand === "all" ? rows : rows.filter((r) => r.brand === brand);
  const counts = {
    all: rows.length,
    layan: rows.filter((r) => r.brand === "layan").length,
    lumiere: rows.filter((r) => r.brand === "lumiere").length,
    coolfix: rows.filter((r) => r.brand === "coolfix").length,
  };

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      }
    } finally {
      setUpdating(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#14100c] text-[#ece5d8]">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        {/* Head */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#8d8375] transition-colors hover:text-[#d9c5a0]"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              All demos
            </Link>
            <h1 className="font-display mt-3 text-3xl text-[#f4ede0]">Bookings dashboard</h1>
            <p className="mt-1 text-[13px] text-[#8d8375]">
              Every booking from all three concept demos, in one place.
            </p>
          </div>
          <span className="flex items-center gap-2 rounded-full border border-[#2a241b] px-4 py-2 text-[12px] text-[#a89e8d]">
            <CalendarDays className="h-4 w-4 text-[#a98c5f]" aria-hidden />
            {counts.all} total
          </span>
        </div>

        {/* Brand tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {(["all", "layan", "lumiere", "coolfix"] as const).map((b) => (
            <button
              key={b}
              onClick={() => setBrand(b)}
              className={cn(
                "rounded-full border px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] transition-all",
                brand === b
                  ? "border-[#a98c5f] bg-[#a98c5f]/15 text-[#d9c5a0]"
                  : "border-[#2a241b] text-[#8d8375] hover:border-[#a98c5f]/50 hover:text-[#c8ab77]"
              )}
            >
              {b === "all" ? "All" : brandMeta[b].label} · {counts[b]}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="thin-scroll mt-6 overflow-x-auto rounded-2xl border border-[#2a241b]">
          <table className="w-full min-w-[880px] text-start text-[13px]">
            <thead>
              <tr className="border-b border-[#2a241b] bg-[#1b1710] text-[11px] uppercase tracking-[0.14em] text-[#8d8375]">
                <th className="px-4 py-3.5 text-start font-medium">Reference</th>
                <th className="px-4 py-3.5 text-start font-medium">Brand</th>
                <th className="px-4 py-3.5 text-start font-medium">Client</th>
                <th className="px-4 py-3.5 text-start font-medium">Request</th>
                <th className="px-4 py-3.5 text-start font-medium">Budget</th>
                <th className="px-4 py-3.5 text-start font-medium">When</th>
                <th className="px-4 py-3.5 text-start font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {shown.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-[#6b6355]">
                    No bookings yet — submit the consultation form on a demo site to see it here.
                  </td>
                </tr>
              )}
              {shown.map((r) => (
                <tr key={r.id} className="border-b border-[#241f18] last:border-0 hover:bg-[#1b1710]/60">
                  <td className="px-4 py-4 font-mono text-[12px] text-[#c8ab77]" dir="ltr">
                    {r.reference}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={cn(
                        "inline-block rounded-full border px-2.5 py-1 text-[11px] font-medium",
                        brandMeta[r.brand]?.cls ?? "border-[#2a241b] text-[#8d8375]"
                      )}
                    >
                      {brandMeta[r.brand]?.label ?? r.brand}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-[#ece5d8]">{r.name}</p>
                    <p className="mt-0.5 text-[12px] text-[#8d8375]" dir="ltr">
                      {r.phone}
                      {r.city ? ` · ${r.city}` : ""}
                    </p>
                  </td>
                  <td className="max-w-[220px] px-4 py-4 text-[#b3a893]">
                    {r.service ?? r.treatmentEn ?? "—"}
                    {r.units ? (
                      <span className="ms-1.5 text-[11px] text-[#6b6355]">×{r.units}</span>
                    ) : null}
                    {r.urgency === "emergency" ? (
                      <span className="ms-2 rounded-full border border-orange-500/40 bg-orange-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-300">
                        Emergency
                      </span>
                    ) : null}
                    {r.timeline ? (
                      <p className="mt-0.5 text-[11.5px] text-[#6b6355]">{r.timeline}</p>
                    ) : null}
                  </td>
                  <td className="px-4 py-4 text-[#b3a893]">{r.budget ?? "—"}</td>
                  <td className="px-4 py-4 text-[#b3a893]" dir="ltr">
                    {r.date ?? "—"}
                    {r.time ? ` · ${r.time}` : ""}
                    <p className="mt-0.5 text-[11px] text-[#6b6355]">
                      {new Date(r.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    {updating === r.id ? (
                      <Loader2 className="h-4 w-4 animate-spin text-[#a98c5f]" aria-label="Updating" />
                    ) : (
                      <select
                        value={r.status}
                        onChange={(e) => updateStatus(r.id, e.target.value)}
                        className={cn(
                          "cursor-pointer rounded-full border bg-transparent px-3 py-1.5 text-[11.5px] font-medium outline-none transition-colors [&>option]:bg-[#1b1710] [&>option]:text-[#ece5d8]",
                          statusMeta[r.status]?.cls
                        )}
                        aria-label={`Status for ${r.reference}`}
                      >
                        {Object.entries(statusMeta).map(([k, v]) => (
                          <option key={k} value={k}>
                            {v.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-[11.5px] text-[#6b6355]">
          Demo dashboard — status changes persist to SQLite via Prisma. This is what a studio
          owner sees instead of an inbox full of screenshots.
        </p>
      </div>
    </div>
  );
}

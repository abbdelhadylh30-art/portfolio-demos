import Link from "next/link";
import { ArrowRight, CalendarCheck, Languages, LayoutDashboard, MapPin } from "lucide-react";

const demos = [
  {
    href: "/coolfix",
    name: "CoolFix Technical Services",
    nameAr: "كول فيكس",
    niche: "Home Services / HVAC & Maintenance",
    place: "Cairo · Riyadh",
    image: "/images/coolfix/hero.jpg",
    alt: "HVAC technician repairing an outdoor air-conditioning unit with gauges and tools",
    points: [
      "Bilingual AR/EN · native RTL",
      "5-step dispatch booking → WhatsApp confirmation",
      "Emergency positioning + annual care plans",
    ],
    tone: "border-teal-600/40 hover:border-teal-400",
  },
  {
    href: "/layan",
    name: "Layan Interiors",
    nameAr: "ليان",
    niche: "Interior Architecture Studio",
    place: "Cairo · Dubai",
    image: "/images/layan/hero.jpg",
    alt: "Warm minimalist luxury living room designed by Layan Interiors",
    points: [
      "Bilingual AR/EN · native RTL",
      "Multi-page with crawlable case-study URLs",
      "Consultation booking with budget pre-qualification",
    ],
    tone: "border-layan-bronze/40 hover:border-layan-bronze",
  },
  {
    href: "/lumiere",
    name: "Lumière Aesthetic Clinic",
    nameAr: "لومير",
    niche: "Med Spa / Aesthetic Clinic",
    place: "Jumeirah, Dubai",
    image: "/images/hero.jpg",
    alt: "Calm, premium aesthetic clinic interior",
    points: [
      "Bilingual AR/EN · native RTL",
      "One-page scrollytelling experience",
      "4-step treatment booking wizard + slots",
    ],
    tone: "border-emerald-900/40 hover:border-[var(--emerald-deep)]",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#14100c] text-[#ece5d8]">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-16">
        {/* Head */}
        <div className="reveal is-visible mb-14">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#a98c5f]">
            Abdelhady Gabriel — Concept Spec Demos
          </p>
          <h1 className="font-display mt-5 text-4xl leading-tight text-[#f4ede0] sm:text-5xl">
            Three niches. Three demos.
            <br />
            <span className="italic text-[#c8ab77]">One stack.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#a89e8d]">
            Spec websites for high-value local businesses in Egypt &amp; the Gulf —
            bilingual by default, booking-driven, and fast. Each is a fictional
            brand built like a real product.
          </p>
        </div>

        {/* Demo cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {demos.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className={`group flex flex-col overflow-hidden rounded-2xl border bg-[#1b1710] transition-all duration-500 ${d.tone}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                { }
                <img
                  src={d.image}
                  alt={d.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14100c]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 start-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#e8ddc7]">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {d.place}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-2xl text-[#f4ede0]">{d.name}</h2>
                  <span className="font-display text-lg text-[#a98c5f]">{d.nameAr}</span>
                </div>
                <p className="mt-1 text-[13px] uppercase tracking-[0.18em] text-[#8d8375]">
                  {d.niche}
                </p>
                <ul className="mt-5 space-y-2 text-[13.5px] leading-relaxed text-[#b3a893]">
                  {d.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#a98c5f]" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.18em] text-[#d9c5a0] transition-colors group-hover:text-[#f4ede0]">
                  Enter demo
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Strip */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[#2a241b] pt-6 text-[12px] text-[#8d8375]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-[#a98c5f]" aria-hidden />
              Bilingual AR/EN · RTL-native
            </span>
            <span className="flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-[#a98c5f]" aria-hidden />
              Booking systems backed by SQLite
            </span>
          </div>
          <Link
            href="/admin"
            className="flex items-center gap-2 uppercase tracking-[0.18em] transition-colors hover:text-[#d9c5a0]"
          >
            <LayoutDashboard className="h-4 w-4" aria-hidden />
            Bookings dashboard
          </Link>
        </div>
        <p className="mt-6 text-[11.5px] text-[#6b6355]">
          Next.js 16 · React 19 · Tailwind 4 · shadcn/ui · Prisma — all three demos share one codebase, deployable separately.
        </p>
      </main>
    </div>
  );
}

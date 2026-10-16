# Portfolio Demos — Bilingual Niche Websites

Three concept websites with working booking systems, built as spec pieces for businesses in Egypt and the Gulf. Every demo is fully bilingual (English / العربية) with native right-to-left support, and every booking form talks to a real API — server-side validation, human-readable reference codes, and a shared owner dashboard.

**Live:** <https://demos.abdelhadygabriel.me>

## The demos

| Demo | Niche | Route | What it proves |
| --- | --- | --- | --- |
| **CoolFix Technical Services** · كول فيكس | Home services / HVAC & maintenance | `/coolfix` | 5-step dispatch booking with 2-hour arrival windows, emergency fast-path (+EGP 150), live jobs board, care plans, bilingual WhatsApp deep-link confirmation |
| **Layan Interiors** · ليان | Interior architecture studio | `/layan` | Multi-page architecture with crawlable case-study URLs (`/work/[slug]`), consultation booking with budget pre-qualification |
| **Lumière Aesthetic Clinic** · لومير | Med spa / aesthetic clinic | `/lumiere` | One-page scrollytelling experience, 4-step treatment booking wizard with time slots |
| **Bookings dashboard** | — | `/admin` | Every request from all three demos in one place, with status management |

Start at `/` for the hub that links them all.

## Why these niches

High customer value, terrible incumbent websites, and work that's "too boring" for most agencies to chase — home services businesses live and die by their booking flow, interior designers need to own their portfolio instead of renting reach on Instagram, and aesthetic clinics sell trust before they sell treatments. All three markets in Egypt and the Gulf are WhatsApp-first and genuinely bilingual, which is exactly where an AR/EN site with native RTL wins.

## Tech stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS 4** · **shadcn/ui** (Radix primitives)
- **framer-motion** for reveals and booking-step transitions
- **zustand** for cross-component booking state (e.g. "book this treatment" preselect)

## Architecture notes

- **Per-brand i18n, zero route duplication** — each demo carries its own dictionary pair (`*-content-en.ts` / `*-content-ar.ts`) behind a provider built on `useSyncExternalStore` + `localStorage`. Language flips instantly, `dir="rtl"` swaps the whole document, and Arabic uses proper Arabic-script fonts (Amiri / IBM Plex Sans Arabic) instead of a Latin fallback.
- **Real booking flows** — every form POSTs to a route handler (`/api/bookings`, `/api/layan-bookings`, `/api/coolfix-bookings`) with server-side validation and returns a reference code (`LUM-`, `LY-`, `CF-` + 6 chars). The admin dashboard reads them all back.
- **One catch-all API route, one serverless function** — all booking endpoints live in `src/app/api/[[...path]]/route.ts` on purpose: serverless platforms isolate memory per route file, so a single file means a single shared store and bookings land in `/admin` in real time.
- **In-memory store by design** — `src/lib/db.ts` is a ~100-line store with a Prisma-shaped interface, so the demos deploy anywhere with zero setup. Data resets on cold start; swap in Prisma/Supabase behind the same interface for a real client build.
- **SEO as a feature** — per-page metadata, Open Graph, and JSON-LD (`MedicalClinic`, `ProfessionalService`, `HomeAndConstructionBusiness` + `FAQPage`) on every demo. The demo deployments are `noindex` (they're fictional businesses) — real client builds flip that on.
- **Performance budget** — images are pre-compressed (the whole three-site bundle ships a few MB of assets), fonts are self-hosted via `next/font`, and pages are static wherever possible.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
```

Then:

- `/` — hub
- `/coolfix` · `/layan` · `/lumiere` — the demos
- `/admin` — bookings dashboard

## Data disclaimer

All businesses, treatments, projects, reviews, phone numbers, and addresses are fictional and generated for demonstration purposes. Bookings are stored in memory and reset when the server restarts.

---

Built by [Abdelhady Gabriel](https://abdelhadygabriel.me) — bilingual (AR/EN) web experiences for businesses in Egypt and the Gulf.

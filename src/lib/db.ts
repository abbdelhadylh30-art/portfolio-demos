/**
 * Demo bookings store — in-memory by design.
 *
 * These are concept/spec sites: the booking flows need to feel real end-to-end
 * (server-side validation, reference codes, an owner dashboard), but nothing
 * here is a production business. Requests live in memory for the lifetime of
 * the server process — they survive across requests and reset on cold start —
 * which keeps the demo dependency-free: no database to provision.
 *
 * Swapping in a real client build: replace `db` with Prisma/Supabase behind
 * the same tiny interface (`create` / `findUnique` / `update` / `findMany`)
 * and every route plus the admin dashboard keeps working unchanged.
 */

export type Booking = {
  id: string;
  createdAt: Date;
  reference: string;
  brand: "lumiere" | "layan" | "coolfix";
  treatmentKey: string | null;
  treatmentEn: string | null;
  treatmentAr: string | null;
  date: string | null;
  time: string | null;
  name: string;
  phone: string;
  email: string | null;
  notes: string | null;
  city: string | null;
  service: string | null;
  budget: string | null;
  timeline: string | null;
  locale: string | null;
  urgency: string | null;
  units: number | null;
  status: string;
};

type BookingInput = Partial<Omit<Booking, "id" | "createdAt">> & {
  reference: string;
  name: string;
  phone: string;
};

type FindManyOpts = {
  where?: Record<string, unknown>;
  orderBy?: { createdAt: "asc" | "desc" };
  take?: number;
};

/* Survive warm serverless invocations */
const g = globalThis as unknown as { __demoBookings?: Booking[] };
const rows: Booking[] = g.__demoBookings ?? [];
g.__demoBookings = rows;

let seq = 0;
const makeId = () =>
  `bk${Date.now().toString(36)}${(++seq).toString(36)}${Math.random().toString(36).slice(2, 8)}`;

export const db = {
  booking: {
    async create({ data }: { data: BookingInput }): Promise<Booking> {
      const row: Booking = {
        id: makeId(),
        createdAt: new Date(),
        reference: data.reference,
        brand: data.brand ?? "lumiere",
        treatmentKey: data.treatmentKey ?? null,
        treatmentEn: data.treatmentEn ?? null,
        treatmentAr: data.treatmentAr ?? null,
        date: data.date ?? null,
        time: data.time ?? null,
        name: data.name,
        phone: data.phone,
        email: data.email ?? null,
        notes: data.notes ?? null,
        city: data.city ?? null,
        service: data.service ?? null,
        budget: data.budget ?? null,
        timeline: data.timeline ?? null,
        locale: data.locale ?? null,
        urgency: data.urgency ?? null,
        units: data.units ?? null,
        status: data.status ?? "pending",
      };
      rows.push(row);
      return row;
    },

    async findUnique({ where }: { where: { id: string } }): Promise<Booking | null> {
      return rows.find((r) => r.id === where.id) ?? null;
    },

    async update({
      where,
      data,
    }: {
      where: { id: string };
      data: Record<string, unknown>;
    }): Promise<Booking> {
      const row = rows.find((r) => r.id === where.id);
      if (!row) throw new Error("Booking not found");
      Object.assign(row, data);
      return row;
    },

    async findMany(opts: FindManyOpts = {}): Promise<Booking[]> {
      const { where, orderBy, take } = opts;
      let out = where
        ? rows.filter((r) =>
            Object.entries(where).every(
              ([k, v]) => (r as unknown as Record<string, unknown>)[k] === v
            )
          )
        : [...rows];
      out = out.sort((a, b) =>
        (orderBy?.createdAt === "asc" ? 1 : -1) *
        (a.createdAt.getTime() - b.createdAt.getTime())
      );
      return take ? out.slice(0, take) : out;
    },
  },
};

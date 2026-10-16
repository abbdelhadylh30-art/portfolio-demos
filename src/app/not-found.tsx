import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-layan-cream px-6 text-center text-layan-ink">
      <p className="ly-eyebrow">404</p>
      <h1 className="font-display mt-4 max-w-md text-4xl leading-tight">
        This room doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-sm text-[14.5px] text-layan-fog">
        The page you&apos;re looking for was never drawn — or it moved during renovation.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/layan"
          className="rounded-full bg-layan-ink px-6 py-3 text-[12.5px] font-medium uppercase tracking-[0.14em] text-layan-cream transition-colors hover:bg-layan-bronze-deep"
        >
          Back to Layan
        </Link>
        <Link
          href="/"
          className="rounded-full border border-layan-stone px-6 py-3 text-[12.5px] font-medium uppercase tracking-[0.14em] text-layan-ink transition-colors hover:border-layan-bronze"
        >
          All demos
        </Link>
      </div>
    </div>
  );
}

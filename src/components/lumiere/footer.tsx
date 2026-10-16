"use client";

import { useLang } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="mt-auto bg-[#152b25] py-14 text-[#e8e1d3]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-display text-3xl font-semibold text-[#e8e1d3]">
              Lumière
            </p>
            <p className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-[#b08d57]">
              Aesthetic Clinic · جميرا
            </p>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-[#e8e1d3]/60">
              {t.footer.tagline}
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b08d57]">
              {t.footer.quickLinks}
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              {[
                ["treatments", t.footer.treatments],
                ["results", t.nav.results],
                ["doctors", t.nav.doctors],
                ["difference", t.nav.about],
                ["faq", t.nav.faq],
                ["contact", t.footer.contactUs],
                ["booking", t.nav.book],
              ].map(([id, label]) => (
                <li key={id}>
                  <button
                    onClick={() => go(id)}
                    className="text-[#e8e1d3]/70 transition-colors hover:text-[#d9c5a0]"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Meta */}
          <div className="text-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b08d57]">
              {t.nav.contact}
            </p>
            <p className="mt-4 font-light leading-relaxed text-[#e8e1d3]/70">
              {t.contact.address}
            </p>
            <p className="mt-3" dir="ltr">
              <a href="tel:+97140000000" className="text-[#e8e1d3]/70 transition-colors hover:text-[#d9c5a0]">
                {t.contact.phone}
              </a>
              {" · "}
              <a href="mailto:hello@lumiereclinic.ae" className="text-[#e8e1d3]/70 transition-colors hover:text-[#d9c5a0]">
                {t.contact.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-[#ffffff12] pt-6 text-center">
          <p className="text-xs font-light text-[#e8e1d3]/45">
            © {year} Lumière Aesthetic Clinic · {t.footer.rights}
          </p>
          <p className="mx-auto mt-2 max-w-md text-[0.65rem] font-light leading-relaxed text-[#e8e1d3]/35">
            {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}

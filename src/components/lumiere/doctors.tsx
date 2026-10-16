"use client";

import { GraduationCap } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useBookingStore } from "@/lib/store";
import { Reveal } from "./reveal";
import { Button } from "@/components/ui/button";

const doctors = [
  {
    img: "/images/doctor-1.jpg",
    name: { en: "Dr. Layla Al Mansouri", ar: "د. ليلى المنصوري" },
    role: { en: "Medical Director · Dermatologist", ar: "المديرة الطبية · استشارية جلدية" },
    creds: {
      en: "MBBS, Dermatology Board (EDIC) — 14 years across Paris and Dubai",
      ar: "بكالوريوس طب وجراحة، البورد الفرنسي للأمراض الجلدية — 14 عاماً بين باريس ودبي",
    },
    key: "botulinum",
  },
  {
    img: "/images/doctor-2.jpg",
    name: { en: "Dr. Huda Khalil", ar: "د. هدى خليل" },
    role: { en: "Aesthetic Physician", ar: "طبيبة تجميل" },
    creds: {
      en: "MD, Aesthetic Medicine Diploma (AAAM) — laser & injectables specialist",
      ar: "دكتوراه طب، دبلوم الطب التجميلي — أخصائية ليزر وحقن",
    },
    key: "dermal-fillers",
  },
  {
    img: "/images/doctor-3.jpg",
    name: { en: "Dr. Farida Hassan", ar: "د. فريدة حسن" },
    role: { en: "Skin & Laser Specialist", ar: "أخصائية بشرة وليزر" },
    creds: {
      en: "MSc Dermatology — published research on MENA skin protocols",
      ar: "ماجستير جلدية — أبحاث منشورة عن بروتوكولات بشرة الشرق الأوسط",
    },
    key: "hydrafacial",
  },
];

export function Doctors() {
  const { t, lang } = useLang();
  const preselect = useBookingStore((s) => s.preselect);

  const book = (key: string) => {
    preselect(key);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="doctors" className="bg-primary py-24 text-primary-foreground lg:py-32" aria-labelledby="doctors-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-soft">{t.doctors.eyebrow}</p>
          <h2 id="doctors-title" className="font-display mt-4 text-4xl font-medium text-background sm:text-5xl">
            {t.doctors.title}
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-primary-foreground/75">
            {t.doctors.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d, i) => (
            <Reveal key={d.img} delay={i * 120}>
              <article className="group h-full rounded-3xl bg-[#ffffff08] p-6 backdrop-blur transition-all duration-500 hover:bg-[#ffffff12] hover:shadow-2xl hover:shadow-black/20">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={d.img}
                    alt={d.name[lang]}
                    loading="lazy"
                    className="aspect-[4/4.4] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display mt-6 text-2xl font-semibold text-background">
                  {d.name[lang]}
                </h3>
                <p className="mt-1 text-sm font-medium text-gold-soft">{d.role[lang]}</p>
                <p className="mt-3 flex items-start gap-2 text-xs font-light leading-relaxed text-primary-foreground/70">
                  <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" aria-hidden />
                  {d.creds[lang]}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => book(d.key)}
                  className="mt-5 w-full rounded-full border-gold-soft/40 bg-transparent text-gold-soft backdrop-blur transition-all hover:border-gold-soft hover:bg-gold-soft hover:text-primary"
                >
                  {t.doctors.consult} {d.name[lang].split(" ")[0]}
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Lang = "en" | "ar";

/* ------------------------------------------------------------------ */
/* Dictionary                                                          */
/* ------------------------------------------------------------------ */

export const dict = {
  en: {
    nav: {
      treatments: "Treatments",
      results: "Results",
      doctors: "Doctors",
      about: "About",
      faq: "FAQ",
      contact: "Contact",
      book: "Book Consultation",
      call: "Call us",
    },
    hero: {
      eyebrow: "Jumeirah · Dubai",
      title1: "Where science",
      title2: "meets serenity",
      subtitle:
        "Physician-led aesthetic care tailored to your skin, your features, your story. Advanced treatments in a calm, private setting.",
      cta1: "Book a Consultation",
      cta2: "Explore Treatments",
      scroll: "Scroll",
    },
    stats: [
      { value: "12k+", label: "Treatments delivered" },
      { value: "98%", label: "Patient satisfaction" },
      { value: "15+", label: "Years of expertise" },
      { value: "4.9", label: "Average rating" },
    ],
    treatments: {
      eyebrow: "Our Treatments",
      title: "Precision care, artfully delivered",
      subtitle:
        "Every protocol begins with a physician consultation — never a sales pitch. Choose what your skin actually needs.",
      book: "Book this treatment",
      from: "From",
      duration: "Duration",
      categories: {
        injectables: "Injectables",
        laser: "Laser & Energy",
        skin: "Skin & Facials",
        body: "Body & Wellness",
      },
    },
    gallery: {
      eyebrow: "Real Results",
      title: "Natural, never overdone",
      subtitle:
        "Results from actual patients, published with consent. Individual outcomes vary — your consultation covers what's realistic for you.",
      badge: "Actual patient · Individual results vary",
    },
    why: {
      eyebrow: "The Lumière Difference",
      title: "A clinic built around how you feel",
      points: [
        {
          title: "Physician-led, always",
          body: "Every treatment is planned and performed or supervised by a licensed dermatologist — no delegation to sales staff.",
        },
        {
          title: "Honest recommendations",
          body: "If a treatment isn't right for you, we'll say so. Our consultation ends with a plan, not a pitch.",
        },
        {
          title: "Private and unhurried",
          body: "Single-patient suites, generous appointment times, and a discreet entrance for our guests' comfort.",
        },
        {
          title: "Arabic & English care",
          body: "Full consultations in either language, with aftercare instructions you'll actually understand.",
        },
      ],
    },
    doctors: {
      eyebrow: "Our Physicians",
      title: "Meet your specialists",
      subtitle:
        "Board-certified dermatologists and aesthetic physicians trained in Europe and the Gulf.",
      consult: "Book with",
    },
    testimonials: {
      eyebrow: "Patient Stories",
      title: "In their own words",
    },
    booking: {
      eyebrow: "Reserve Your Visit",
      title: "Book your consultation",
      subtitle:
        "Choose a treatment, pick a time that suits you, and we'll confirm within one hour during clinic hours.",
      steps: ["Treatment", "Date & Time", "Your Details", "Confirm"],
      step1: {
        title: "Choose a treatment",
        hint: "Prices are starting points — your physician confirms the exact plan at consultation.",
      },
      step2: {
        title: "Pick a date & time",
        hint: "Reservations are held for 24 hours. We confirm by phone or WhatsApp.",
        slotsUnavailable: "No slots on this day — please choose another date",
      },
      step3: {
        title: "Your details",
        hint: "We only use these to confirm your appointment. No marketing, ever.",
        name: "Full name",
        namePh: "e.g. Sara Al Mansouri",
        phone: "Mobile number",
        phonePh: "+971 5X XXX XXXX",
        email: "Email (optional)",
        emailPh: "you@example.com",
        notes: "Anything we should know? (optional)",
        notesPh: "Allergies, previous treatments, questions…",
        errors: {
          name: "Please enter your name",
          phone: "Please enter a valid phone number",
        },
      },
      step4: {
        title: "Review & confirm",
        treatment: "Treatment",
        date: "Date",
        time: "Time",
        patient: "Patient",
        confirm: "Confirm Booking",
        edit: "Edit",
      },
      success: {
        title: "You're booked",
        body: "Your reference is",
        body2:
          "We'll confirm within the hour during clinic hours (Sat–Thu, 10:00–20:00). Please arrive 10 minutes early — and bring no makeup if it's a facial treatment.",
        again: "Book another visit",
        error: "Something went wrong — please try again or call us directly.",
      },
      back: "Back",
      next: "Continue",
      minutes: "min",
    },
    faq: {
      eyebrow: "Common Questions",
      title: "Everything you might wonder",
      items: [
        {
          q: "Is the consultation really free?",
          a: "Yes — your first consultation with a physician is complimentary, with no obligation to book a treatment. It includes a skin assessment and an honest written plan.",
        },
        {
          q: "Will I look 'done'?",
          a: "Our philosophy is refreshment, not transformation. We plan conservatively, review together, and always leave room to adjust. Most patients' friends say they look rested — not 'treated'.",
        },
        {
          q: "Do treatments hurt?",
          a: "Comfort is engineered into everything we do: numbing protocols, cooled lasers, and pacing that suits your tolerance. Most patients describe treatments as a warm sensation, not pain.",
        },
        {
          q: "Can I be treated the same day?",
          a: "Many treatments can follow immediately after your consultation if the physician agrees and your schedule allows. Injectables and most laser sessions are often same-day.",
        },
        {
          q: "Do you serve international patients?",
          a: "Yes. We regularly care for patients from across the GCC and Europe, with concierge support for travel, translation, and aftercare follow-up by video.",
        },
        {
          q: "What about privacy?",
          a: "Discretion is part of the design: private suites, a separate exit, and strict data confidentiality. We never publish photos without written consent.",
        },
      ],
    },
    contact: {
      eyebrow: "Visit Us",
      title: "Find your way to calm",
      address: "Villa 12, Al Wasl Road, Jumeirah 1, Dubai, UAE",
      addressLine2: "Private parking available · Valet on request",
      hours: "Saturday – Thursday",
      hoursValue: "10:00 – 20:00",
      friday: "Friday",
      fridayValue: "Closed",
      phone: "+971 4 000 0000",
      whatsapp: "WhatsApp",
      email: "hello@lumiereclinic.ae",
      directions: "Get directions",
    },
    footer: {
      tagline: "Physician-led aesthetic medicine in the heart of Jumeirah.",
      rights: "All rights reserved.",
      disclaimer:
        "Lumière Aesthetic Clinic is a demonstration website created to showcase bilingual web design and booking systems.",
      quickLinks: "Explore",
      treatments: "Treatments",
      contactUs: "Contact",
    },
    common: {
      langLabel: "العربية",
      madeWith: "Demo site · Bilingual AR/EN · RTL-native",
    },
  },

  ar: {
    nav: {
      treatments: "الخدمات",
      results: "النتائج",
      doctors: "الأطباء",
      about: "من نحن",
      faq: "الأسئلة",
      contact: "تواصل",
      book: "احجزي استشارة",
      call: "اتصلي بنا",
    },
    hero: {
      eyebrow: "جميرا · دبي",
      title1: "حيث يلتقي العلم",
      title2: "بالهدوء والجمال",
      subtitle:
        "علاجات تجميلية بإشراف طبي، مصممة لبشرتك وملامحك وقصتك. علاجات متقدمة في أجواء هادئة وخاصة.",
      cta1: "احجزي استشارة",
      cta2: "تصفحي الخدمات",
      scroll: "اسحبي",
    },
    stats: [
      { value: "+12k", label: "علاج تم تقديمه" },
      { value: "98%", label: "رضا المريضات" },
      { value: "+15", label: "سنة من الخبرة" },
      { value: "4.9", label: "متوسط التقييم" },
    ],
    treatments: {
      eyebrow: "خدماتنا",
      title: "عناية دقيقة بلمسة فنية",
      subtitle:
        "كل خطة علاج تبدأ باستشارة طبية حقيقية — لا عرض بيع. اختاري ما تحتاجه بشرتك فعلاً.",
      book: "احجزي هذه الخدمة",
      from: "ابتداءً من",
      duration: "المدة",
      categories: {
        injectables: "الحقن التجميلي",
        laser: "الليزر والطاقة",
        skin: "البشرة والعناية",
        body: "الجسم والاسترخاء",
      },
    },
    gallery: {
      eyebrow: "نتائج حقيقية",
      title: "طبيعية، دون مبالغة",
      subtitle:
        "نتائج لمريضات فعليات، نُشرت بموافقتهن. النتائج تختلف من شخص لآخر — واستشارتك تغطي ما هو واقعي لبشرتك.",
      badge: "مريضة فعلية · النتائج تختلف",
    },
    why: {
      eyebrow: "لماذا لومير",
      title: "عيادة صُممت حول راحتك",
      points: [
        {
          title: "بإشراف طبي دائماً",
          body: "كل علاج يخطط له طبيب جلدية مرخص ويُنفذ أو يشرف عليه شخصياً — بلا تفويض لموظفي المبيعات.",
        },
        {
          title: "توصيات صادقة",
          body: "إن لم يكن العلاج مناسباً لك، سنقول ذلك بصراحة. استشارتك تنتهي بخطة علاج، لا بعرض بيع.",
        },
        {
          title: "خصوصية ودون استعجال",
          body: "أجنحة خاصة لمريضة واحدة، مواعيد مريحة، ومدخل منفصل حفاظاً على راحة ضيفاتنا.",
        },
        {
          title: "رعاية بالعربية والإنجليزية",
          body: "استشارات كاملة بأي من اللغتين، مع تعليمات عناية لاحقة تفهمينها فعلاً.",
        },
      ],
    },
    doctors: {
      eyebrow: "أطباؤنا",
      title: "تعرّفي على نخبة الأطباء",
      subtitle:
        "أطباء جلدية معتمدون وأطباء تجميل تلقوا تدريبهم في أوروبا والخليج.",
      consult: "احجزي مع",
    },
    testimonials: {
      eyebrow: "قصص مريضاتنا",
      title: "بكلماتهن",
    },
    booking: {
      eyebrow: "احجزي زيارتك",
      title: "احجزي استشارتك",
      subtitle:
        "اختاري العلاج، ووقتاً يناسبك، وسنؤكد الحجز خلال ساعة واحدة أثناء ساعات العمل.",
      steps: ["العلاج", "التاريخ والوقت", "بياناتك", "التأكيد"],
      step1: {
        title: "اختاري العلاج",
        hint: "الأسعار تُعد نقطة بداية — وطبيبك يؤكد الخطة الدقيقة عند الاستشارة.",
      },
      step2: {
        title: "اختاري التاريخ والوقت",
        hint: "يُحفظ الحجز لمدة 24 ساعة. نؤكد عبر الهاتف أو واتساب.",
        slotsUnavailable: "لا توجد مواعيد في هذا اليوم — اختاري تاريخاً آخر",
      },
      step3: {
        title: "بياناتك",
        hint: "نستخدمها فقط لتأكيد موعدك. لا رسائل تسويقية، أبداً.",
        name: "الاسم الكامل",
        namePh: "مثال: سارة المنصوري",
        phone: "رقم الجوال",
        phonePh: "+971 5X XXX XXXX",
        email: "البريد الإلكتروني (اختياري)",
        emailPh: "you@example.com",
        notes: "أي شيء يجب أن نعرفه؟ (اختياري)",
        notesPh: "حساسية، علاجات سابقة، أسئلة…",
        errors: {
          name: "فضلاً أدخلي اسمك",
          phone: "فضلاً أدخلي رقم هاتف صحيح",
        },
      },
      step4: {
        title: "راجعي وأكدي",
        treatment: "العلاج",
        date: "التاريخ",
        time: "الوقت",
        patient: "المريضة",
        confirm: "تأكيد الحجز",
        edit: "تعديل",
      },
      success: {
        title: "تم الحجز",
        body: "رقم مرجعك هو",
        body2:
          "سنؤكد خلال ساعة أثناء ساعات العمل (السبت–الخميس، 10:00–20:00). يرجى الحضور قبل الموعد بعشر دقائق — ودون مكياج إن كان العلاج للبشرة.",
        again: "احجزي زيارة أخرى",
        error: "حدث خطأ ما — حاولي مجدداً أو اتصلي بنا مباشرة.",
      },
      back: "رجوع",
      next: "متابعة",
      minutes: "دقيقة",
    },
    faq: {
      eyebrow: "أسئلة شائعة",
      title: "كل ما قد يخطر ببالك",
      items: [
        {
          q: "هل الاستشارة مجانية فعلاً؟",
          a: "نعم — استشارتك الأولى مع الطبيبة مجانية تماماً، دون أي التزام بعلاج. تشمل تقييم البشرة وخطة مكتوبة صادقة.",
        },
        {
          q: "هل سيظهر عليّ أثر المبالغة؟",
          a: "فلسفتنا هي التجديد لا التحول. نخطط بشكل متحفظ، ونتشارك القرار، ونترك دائماً مجالاً للتعديل. معظم صديقات المريضات يقلن إنها تبدو مرتاحة — لا «معالجة».",
        },
        {
          q: "هل العلاجات مؤلمة؟",
          a: "الراحة مضمّنة في كل ما نفعله: بروتوكولات تخدير، ليزر مبرد، وإيقاع يناسب تحمّلك. معظم المريضات يصفن العلاج بإحساس دافئ لا ألم.",
        },
        {
          q: "هل يمكن العلاج في نفس اليوم؟",
          a: "كثير من العلاجات يمكن أن تتبع الاستشارة مباشرة إذا وافقت الطبيبة وسمح وقتك. الحقن وجلسات الليزر غالباً تكون في نفس اليوم.",
        },
        {
          q: "هل تستقبلون مريضات من خارج الدولة؟",
          a: "نعم. نعتني بانتظام بمريضات من دول الخليج وأوروبا، مع دعم كامل للسفر والترجمة والمتابعة بالفيديو.",
        },
        {
          q: "ماذا عن الخصوصية؟",
          a: "السرية جزء من التصميم: أجنحة خاصة، مخرج منفصل، وسرية صارمة للبيانات. لا ننشر صوراً دون موافقة كتابية.",
        },
      ],
    },
    contact: {
      eyebrow: "زورونا",
      title: "طريقك إلى الهدوء",
      address: "فيلا 12، شارع الوصل، جميرا 1، دبي، الإمارات",
      addressLine2: "مواقف خاصة متاحة · خدمة صف السيارات عند الطلب",
      hours: "السبت – الخميس",
      hoursValue: "10:00 – 20:00",
      friday: "الجمعة",
      fridayValue: "مغلق",
      phone: "+971 4 000 0000",
      whatsapp: "واتساب",
      email: "hello@lumiereclinic.ae",
      directions: "احصلي على الاتجاهات",
    },
    footer: {
      tagline: "طب تجميلي بإشراف طبي في قلب جميرا.",
      rights: "جميع الحقوق محفوظة.",
      disclaimer:
        "عيادة لومير موقع توضيحي أُنشئ لعرض تصميم المواقع ثنائية اللغة وأنظمة الحجوزات.",
      quickLinks: "تصفحي",
      treatments: "الخدمات",
      contactUs: "تواصلي معنا",
    },
    common: {
      langLabel: "English",
      madeWith: "موقع توضيحي · ثنائي اللغة · يدعم العربية أصلياً",
    },
  },
} as const;

export type Dict = (typeof dict)["en"];

/* ------------------------------------------------------------------ */
/* Context                                                            */
/* ------------------------------------------------------------------ */

type LangContextType = {
  lang: Lang;
  t: Dict;
  dir: "ltr" | "rtl";
  toggle: () => void;
  setLang: (l: Lang) => void;
};

const LangContext = createContext<LangContextType | null>(null);

const LANG_EVENT = "lumiere-lang-change";

/* localStorage as an external store — the React-blessed pattern, no setState-in-effect */
function subscribe(onChange: () => void) {
  window.addEventListener(LANG_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(LANG_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Lang {
  const saved = window.localStorage.getItem("lumiere-lang");
  return saved === "ar" ? "ar" : "en";
}

function getServerSnapshot(): Lang {
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  /* Sync <html dir/lang> — writing to the DOM is a legitimate effect */
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    html.setAttribute("lang", lang);
  }, [lang]);

  const setLang = (l: Lang) => {
    try {
      window.localStorage.setItem("lumiere-lang", l);
    } catch {}
    window.dispatchEvent(new Event(LANG_EVENT));
  };

  const toggle = () => setLang(lang === "en" ? "ar" : "en");

  return (
    <LangContext.Provider
      value={{
        lang,
        t: dict[lang] as unknown as Dict,
        dir: lang === "ar" ? "rtl" : "ltr",
        toggle,
        setLang,
      }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

/* Locale-aware date formatting used across the booking flow */
export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-AE" : "en-AE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

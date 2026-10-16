import type { Lang } from "./i18n";

export type Category = "injectables" | "laser" | "skin" | "body";

export type Treatment = {
  key: string;
  category: Category;
  name: { en: string; ar: string };
  desc: { en: string; ar: string };
  duration: number; // minutes
  price: number; // AED
  image: string;
};

export const treatments: Treatment[] = [
  {
    key: "consultation",
    category: "skin",
    name: { en: "Physician Consultation", ar: "استشارة طبية" },
    desc: {
      en: "Complimentary skin assessment with a board-certified dermatologist and an honest written plan.",
      ar: "تقييم مجاني للبشرة مع طبيبة جلدية معتمدة، وخطة مكتوبة بكل صراحة.",
    },
    duration: 30,
    price: 0,
    image: "/images/facial-2.jpg",
  },
  {
    key: "botulinum",
    category: "injectables",
    name: { en: "Botulinum Refinement", ar: "حقن البوتوكس التصحيحية" },
    desc: {
      en: "Softening of expression lines with a light hand — rested, never frozen.",
      ar: "تنعيم خطوط التعبير بلمسة خفيفة — مظهر مرتاح، أبداً متجمد.",
    },
    duration: 30,
    price: 1200,
    image: "/images/facial-1.jpg",
  },
  {
    key: "dermal-fillers",
    category: "injectables",
    name: { en: "Dermal Fillers", ar: "الفيلر الجلدي" },
    desc: {
      en: "Hyaluronic volume and contouring for lips, cheeks, and jawline — planned millimetre by millimetre.",
      ar: "حجم وتحديد بحمض الهيالورونيك للشفاه والخدود وخط الفك — تخطيط ملليمتر بملليمتر.",
    },
    duration: 45,
    price: 1800,
    image: "/images/doctor-3.jpg",
  },
  {
    key: "laser-resurfacing",
    category: "laser",
    name: { en: "Laser Resurfacing", ar: "تقشير الليزر" },
    desc: {
      en: "Fractional CO₂ resurfacing for texture, scarring, and sun damage with cooled-laser comfort.",
      ar: "تقشير كربوني جزئي لتحسين الملمس والآثار وأضرار الشمس، براحة الليزر المبرد.",
    },
    duration: 60,
    price: 2500,
    image: "/images/laser-1.jpg",
  },
  {
    key: "laser-hair",
    category: "laser",
    name: { en: "Laser Hair Removal", ar: "إزالة الشعر بالليزر" },
    desc: {
      en: "Full-body diode laser with dynamic cooling — safe for all skin types common in the region.",
      ar: "ليزر دايود للجسم بالكامل مع تبريد متقدم — آمن لكل درجات البشرة الشائعة في المنطقة.",
    },
    duration: 45,
    price: 600,
    image: "/images/laser-2.jpg",
  },
  {
    key: "hydrafacial",
    category: "skin",
    name: { en: "Luxury HydraFacial", ar: "هيدرافيشل الفاخرة" },
    desc: {
      en: "Deep cleanse, gentle exfoliation, and infusion of bespoke serums — the signature 60-minute reset.",
      ar: "تنظيف عميق وتقشير لطيف وحقن سيروم مخصص — إعادة ضبط لمدة 60 دقيقة.",
    },
    duration: 60,
    price: 750,
    image: "/images/facial-3.jpg",
  },
  {
    key: "mesotherapy",
    category: "skin",
    name: { en: "Skin Boosters & Mesotherapy", ar: "معززات البشرة والميزوثيرابي" },
    desc: {
      en: "Micro-injections of vitamins and hyaluronic acid for deep hydration and glow.",
      ar: "حقن دقيقة بالفيتامينات وحمض الهيالورونيك لترطيب عميق وإشراقة حقيقية.",
    },
    duration: 45,
    price: 1500,
    image: "/images/facial-2.jpg",
  },
  {
    key: "body-contouring",
    category: "body",
    name: { en: "Body Contouring", ar: "نحت الجسم" },
    desc: {
      en: "Non-invasive radiofrequency and ultrasound sculpting for abdomen, arms, and thighs.",
      ar: "نحت غير جرائي بترددات راديوية وألتراساوند للبطن والذراعين والفخذين.",
    },
    duration: 75,
    price: 2000,
    image: "/images/interior-2.jpg",
  },
  {
    key: "lymphatic",
    category: "body",
    name: { en: "Lymphatic Ritual", ar: "طقس التصريف اللمفاوي" },
    desc: {
      en: "A therapeutic massage ritual that de-puffs, detoxifies, and deeply relaxes.",
      ar: "طقس تدليك علاجي يخفف الانتفاخ ويساعد على التخلص من السموم ويمنح استرخاء عميقاً.",
    },
    duration: 90,
    price: 900,
    image: "/images/interior-3.jpg",
  },
];

export function treatmentName(t: Treatment, lang: Lang) {
  return t.name[lang];
}

export function formatPrice(t: Treatment, lang: Lang) {
  if (t.price === 0) return lang === "ar" ? "مجاناً" : "Complimentary";
  return new Intl.NumberFormat(lang === "ar" ? "ar-AE" : "en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(t.price);
}

export function formatDuration(mins: number, lang: Lang) {
  return lang === "ar" ? `${mins} دقيقة` : `${mins} min`;
}

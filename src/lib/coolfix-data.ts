/* CoolFix — bilingual entity data (services, plans, areas, jobs, reviews, FAQs) */

export type Bi = { en: string; ar: string };

export type Service = {
  key: string;
  icon: "ac" | "clean" | "install" | "plumbing" | "electrical" | "handyman";
  category: "ac" | "home";
  name: Bi;
  desc: Bi;
  from: number; // EGP starting price
  perUnit?: boolean;
  bullets: Bi[];
};

export type Plan = {
  key: string;
  name: Bi;
  priceEGP: number;
  priceSAR: number;
  popular?: boolean;
  tagline: Bi;
  features: Bi[];
};

export type Area = { name: Bi; city: "cairo" | "riyadh" };

export type Job = {
  service: Bi;
  area: Bi;
  time: Bi;
  rating: string;
  emergency?: boolean;
};

export type Review = { text: Bi; author: Bi; place: Bi };

export type Faq = { q: Bi; a: Bi };

export const WHATSAPP_NUMBER = "201000000000"; // +20 100 000 0000 (demo)
export const PHONE_DISPLAY = "+20 100 000 0000";
export const PHONE_RIYADH_DISPLAY = "+966 55 000 0000";
export const EMERGENCY_FEE = 150;

/** Build a wa.me deep link with a pre-filled message */
export function whatsappLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const WHATSAPP_DEFAULT = {
  en: "Hi CoolFix — I need a technician.",
  ar: "أهلًا كول فيكس — محتاج فني.",
} as const;

export const services: Service[] = [
  {
    key: "ac-repair",
    icon: "ac",
    category: "ac",
    name: { en: "AC Repair & Gas Refill", ar: "تصليح تكييف وشحن فريون" },
    desc: {
      en: "No cooling, leaks, tripping breakers, strange noises — diagnosed and fixed in the same visit.",
      ar: "مفيش تبريد، تسريب، قاطع بيفصل، صوت غريب — تشخيص وتصليح في نفس الزيارة.",
    },
    from: 350,
    bullets: [
      { en: "All brands: split, window, cassette", ar: "كل الماركات: سبليت، شباك، كاسيت" },
      { en: "Genuine parts, warranty-backed", ar: "قطع أصلية وبضمان" },
      { en: "Full system test before we leave", ar: "اختبار كامل للنظام قبل ما نمشي" },
    ],
  },
  {
    key: "ac-clean",
    icon: "clean",
    category: "ac",
    name: { en: "AC Deep Clean", ar: "تنظيف تكييف عميق" },
    desc: {
      en: "Front, coils, blower and drain — stripped, washed, sanitized and reassembled.",
      ar: "الواجهة والمكثف والمروحة والصرف — تفكيك وغسيل وتعقيم وتركيب.",
    },
    from: 250,
    perUnit: true,
    bullets: [
      { en: "Up to 20% better airflow", ar: "تحسن تدفق الهواء لحد ٢٠٪" },
      { en: "Kills mould and odours", ar: "بيقضي على العفن والروايح" },
      { en: "Recommended every 6 months", ar: "موصى بيه كل ٦ شهور" },
    ],
  },
  {
    key: "ac-install",
    icon: "install",
    category: "ac",
    name: { en: "AC Installation", ar: "تركيب تكييف" },
    desc: {
      en: "Split, window or cassette — mounted, piped, vacuumed and gassed properly.",
      ar: "سبليت أو شباك أو كاسيت — تركيب وتمديد وتفريغ وشحن فريون صح.",
    },
    from: 900,
    bullets: [
      { en: "Brackets and copper piping included", ar: "الحوامل ومواسير النحاس مشمولة" },
      { en: "Same-day installation slots", ar: "مواعيد تركيب في نفس اليوم" },
      { en: "Old unit removal available", ar: "فك الوحدة القديمة متاح" },
    ],
  },
  {
    key: "plumbing",
    icon: "plumbing",
    category: "home",
    name: { en: "Plumbing", ar: "سباكة وصحي" },
    desc: {
      en: "Leaks, blockages, water heaters, mixers and full bathroom rough-ins.",
      ar: "تسريبات، انسدادات، سخانات، خلاطات، وسباكة حمامات كاملة.",
    },
    from: 200,
    bullets: [
      { en: "Leak detection without demolition", ar: "كشف التسريب من غير تكسير" },
      { en: "Water heater service", ar: "صيانة السخانات" },
      { en: "Camera drain inspection", ar: "فحص الصرف بالكاميرا" },
    ],
  },
  {
    key: "electrical",
    icon: "electrical",
    category: "home",
    name: { en: "Electrical", ar: "كهرباء" },
    desc: {
      en: "Breakers, wiring faults, lighting, sockets and distribution boards — done safely.",
      ar: "مفاتيح، أعطال، إضاءة، بريزز ولوحات توزيع — بأمان.",
    },
    from: 200,
    bullets: [
      { en: "Certified electricians", ar: "كهربائيون معتمدون" },
      { en: "Short-circuit fault finding", ar: "تتبع أعطال القصر" },
      { en: "DB panel upgrades", ar: "تطوير لوحات التوزيع" },
    ],
  },
  {
    key: "handyman",
    icon: "handyman",
    category: "home",
    name: { en: "Handyman & Painting", ar: "معلم ودهانات" },
    desc: {
      en: "Mounting, locks, door adjustments, patches and full repaints.",
      ar: "تركيبات، أقفال، ضبط الأبواب، معجون ودهان كامل.",
    },
    from: 300,
    bullets: [
      { en: "TV and fixture mounting", ar: "تركيب تلفزيونات وثريّات" },
      { en: "Door locks and handles", ar: "أقفال ومقاود أبواب" },
      { en: "Patch, prep and repaint", ar: "معجون وتجهيز ودهان" },
    ],
  },
];

export const plans: Plan[] = [
  {
    key: "essential",
    name: { en: "Essential", ar: "الأساسية" },
    priceEGP: 2400,
    priceSAR: 300,
    tagline: { en: "Twice-a-year peace of mind", ar: "راحة بال مرتين في السنة" },
    features: [
      { en: "2 maintenance visits / year", ar: "زيارتا صيانة في السنة" },
      { en: "Up to 3 AC units", ar: "لحد ٣ وحدات تكييف" },
      { en: "10% off all repairs", ar: "خصم ١٠٪ على كل التصليحات" },
      { en: "Standard response", ar: "استجابة عادية" },
    ],
  },
  {
    key: "comfort",
    name: { en: "Comfort", ar: "الكومفورت" },
    priceEGP: 4800,
    priceSAR: 600,
    popular: true,
    tagline: { en: "The summer-proof plan", ar: "الباقة المضادة للصيف" },
    features: [
      { en: "4 maintenance visits / year", ar: "٤ زيارات صيانة في السنة" },
      { en: "Up to 6 AC units", ar: "لحد ٦ وحدات تكييف" },
      { en: "Priority booking & response", ar: "أولوية في الحجز والاستجابة" },
      { en: "15% off all repairs", ar: "خصم ١٥٪ على كل التصليحات" },
    ],
  },
  {
    key: "total",
    name: { en: "Total Care", ar: "توتال كير" },
    priceEGP: 8400,
    priceSAR: 1050,
    tagline: { en: "We handle everything", ar: "إحنا بنتكفل بكل حاجة" },
    features: [
      { en: "Unlimited callouts, zero dispatch fees", ar: "زيارات غير محدودة ومن غير رسوم إرسال" },
      { en: "All units + plumbing & electrical checks", ar: "كل الوحدات + فحص سباكة وكهرباء" },
      { en: "Emergency dispatch included", ar: "إرسال الطوارئ مشمول" },
      { en: "20% off all repairs", ar: "خصم ٢٠٪ على كل التصليحات" },
    ],
  },
];

export const areas: Area[] = [
  { name: { en: "Nasr City", ar: "مدينة نصر" }, city: "cairo" },
  { name: { en: "Heliopolis", ar: "مصر الجديدة" }, city: "cairo" },
  { name: { en: "New Cairo", ar: "القاهرة الجديدة" }, city: "cairo" },
  { name: { en: "Maadi", ar: "المعادي" }, city: "cairo" },
  { name: { en: "Zamalek", ar: "الزمالك" }, city: "cairo" },
  { name: { en: "Downtown", ar: "وسط البلد" }, city: "cairo" },
  { name: { en: "6th of October", ar: "٦ أكتوبر" }, city: "cairo" },
  { name: { en: "Sheikh Zayed", ar: "الشيخ زايد" }, city: "cairo" },
  { name: { en: "Olaya", ar: "العليا" }, city: "riyadh" },
  { name: { en: "Al Malqa", ar: "الملقا" }, city: "riyadh" },
  { name: { en: "Al Nakheel", ar: "النخيل" }, city: "riyadh" },
  { name: { en: "Hittin", ar: "حطين" }, city: "riyadh" },
  { name: { en: "Al Rabwah", ar: "الروضة" }, city: "riyadh" },
  { name: { en: "Al Mohammadiyyah", ar: "المحمدية" }, city: "riyadh" },
];

export const jobs: Job[] = [
  {
    service: { en: "AC deep clean ×3", ar: "تنظيف تكييف ×٣" },
    area: { en: "Nasr City", ar: "مدينة نصر" },
    time: { en: "2h 15m", ar: "٢ س ١٥ د" },
    rating: "5.0",
  },
  {
    service: { en: "Emergency AC repair", ar: "طوارئ تكييف" },
    area: { en: "New Cairo", ar: "القاهرة الجديدة" },
    time: { en: "55 min", ar: "٥٥ د" },
    rating: "5.0",
    emergency: true,
  },
  {
    service: { en: "Water heater leak", ar: "تسريب سخان" },
    area: { en: "Maadi", ar: "المعادي" },
    time: { en: "1h 40m", ar: "١ س ٤٠ د" },
    rating: "4.9",
  },
  {
    service: { en: "Drain unblocking", ar: "فتح انسداد صرف" },
    area: { en: "Heliopolis", ar: "مصر الجديدة" },
    time: { en: "1h 10m", ar: "١ س ١٠ د" },
    rating: "5.0",
  },
  {
    service: { en: "Split installation ×2", ar: "تركيب سبليت ×٢" },
    area: { en: "Al Malqa, Riyadh", ar: "الملقا، الرياض" },
    time: { en: "3h 30m", ar: "٣ س ٣٠ د" },
    rating: "5.0",
  },
  {
    service: { en: "DB panel rewiring", ar: "إعادة توصيل لوحة كهرباء" },
    area: { en: "Olaya, Riyadh", ar: "العليا، الرياض" },
    time: { en: "4h 05m", ar: "٤ س ٠٥ د" },
    rating: "4.8",
  },
];

export const reviews: Review[] = [
  {
    text: {
      en: "The AC died at 3 AM. One WhatsApp message and the technician was at my door in under an hour — and the price was exactly what they quoted.",
      ar: "التكييف وقف ٣ الفجر. رسالة واتساب واحدة والفني كان عند الباب في أقل من ساعة — والسعر كان زي ما اتفقنا بالظبط.",
    },
    author: { en: "Mohamed A.", ar: "محمد ع." },
    place: { en: "Nasr City", ar: "مدينة نصر" },
  },
  {
    text: {
      en: "Booked a deep clean at 11 PM for the next morning. The technician arrived on the minute and showed me before/after photos of the coils. Zero drama.",
      ar: "حجزت تنظيف عميق الساعة ١١ بالليل لصباح اليوم التالي. الفني وصل على الميعاد بالثاني ووراني صور المكثف قبل وبعد. من غير أي وجع دماغ.",
    },
    author: { en: "Sarah K.", ar: "سارة ك." },
    place: { en: "New Cairo", ar: "القاهرة الجديدة" },
  },
  {
    text: {
      en: "Their prices are written and published. Nobody tried to inflate the bill — a first, in my experience with trades.",
      ar: "أسعارهم مكتوبة ومعلنة. محدش حاول يزوّد الحساب — أول مرة تحصل معايا مع حد بيتصلح.",
    },
    author: { en: "Am Ahmed", ar: "أم أحمد" },
    place: { en: "Maadi", ar: "المعادي" },
  },
  {
    text: {
      en: "They maintain all 14 units in our villa. One WhatsApp message and the entire year is scheduled.",
      ar: "بيتولوا صيانة كل الـ ١٤ وحدة في الفيلا. رسالة واتساب واحدة والسنة كلها بتتحدد.",
    },
    author: { en: "Faisal A.", ar: "فيصل ع." },
    place: { en: "Al Malqa, Riyadh", ar: "الملقا، الرياض" },
  },
];

export const faqs: Faq[] = [
  {
    q: {
      en: "How fast can a technician actually arrive?",
      ar: "الفني ممكن يوصل بالظبط قد إيه بسرعة؟",
    },
    a: {
      en: "Emergency dispatch targets a 90-minute arrival across all covered areas of Cairo and Riyadh — 24/7, including Fridays and holidays. Scheduled jobs arrive inside the two-hour window you pick.",
      ar: "طوارئ الإرسال بتحاول توصل خلال ٩٠ دقيقة في كل مناطق القاهرة والرياض المشمولة — ٢٤ ساعة، حتى أيام الجمعة والأعياد. والشغل بالميعاد بيوصل خلال فترة الساعتين اللي بتختارها.",
    },
  },
  {
    q: { en: "Are your prices really fixed?", ar: "أسعاركم فعلًا ثابتة؟" },
    a: {
      en: "Yes. You get the full quote on WhatsApp before anyone starts work, and that number does not move. If we open the unit and find something extra, we call you first — you decide whether to proceed.",
      ar: "أيوه. بيوصلك عرض السعر كامل على واتساب قبل ما أي حد يبدأ شغل، والرقم ده مش بيتحرك. ولو فتحنا الوحدة ولقينا حاجة زيادة، بنكلمك الأول — والقرار قرارك.",
    },
  },
  {
    q: { en: "What does the 12-month warranty cover?", ar: "ضمان الـ ١٢ شهر بيغطي إيه؟" },
    a: {
      en: "Workmanship — the repair or installation itself. If the same fault comes back within 12 months, we return and fix it free. Parts carry the manufacturer's own warranty on top.",
      ar: "الشغل نفسه — التصليح أو التركيب. لو نفس العطل رجع خلال ١٢ شهر، بنرجع نصلحه ببلاش. والقطع عليها ضمان الوكيل كمان من فوق كده.",
    },
  },
  {
    q: { en: "How do I pay?", ar: "بدفع إزاي؟" },
    a: {
      en: "After the job is done and tested: cash, card on the technician's POS machine, or InstaPay / Apple Pay. Your invoice arrives on WhatsApp before the technician leaves your door.",
      ar: "بعد ما الشغل يخلص ويتختبر: كاش، أو كارت على ماكينة الفني، أو InstaPay / Apple Pay. والفاتورة بتوصلك على واتساب قبل ما الفني يمشي.",
    },
  },
  {
    q: { en: "Do you work with landlords and property managers?", ar: "بتشتغلوا مع ملاك وعقارات؟" },
    a: {
      en: "Yes — maintenance contracts for villas, offices and retail units, priced per property. The care plans above are the starting point; WhatsApp us for a multi-property quote.",
      ar: "أيوه — عقود صيانة للفلل والمكاتب والوحده التجارية، بتتسعّر على حسب العقار. الباقات فوق هي نقطة البداية؛ ابعتلنا واتساب لعرض لأكتر من عقار.",
    },
  },
  {
    q: { en: "Can I book same-day, non-emergency work?", ar: "أقدر أحجز في نفس يوم من غير طوارئ؟" },
    a: {
      en: "Yes. Arrival windows run 8:00–22:00 every day, and you can book up to 7 days ahead. Same-day slots usually go fast in summer — morning bookings get priority.",
      ar: "أيوه. فترات الوصول من ٨ الصبح لـ ١٠ بالليل كل يوم، وتقدر تحجز قبلها بأسبوع. أماكن نفس اليوم بتخلص بسرعة في الصيف — وحجوز الصبح ليها أولوية.",
    },
  },
];

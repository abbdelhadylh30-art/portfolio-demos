/* Layan Interiors — project case-study data (bilingual EN/AR) */

export type Project = {
  slug: string;
  title: { en: string; ar: string };
  location: { en: string; ar: string };
  year: string;
  area: { en: string; ar: string };
  typology: "residential" | "hospitality";
  scope: { en: string[]; ar: string[] };
  summary: { en: string; ar: string };
  body: { en: string[]; ar: string[] };
  deliverables: { en: string[]; ar: string[] };
  images: string[]; // [hero, ...gallery]
};

export const projects: Project[] = [
  {
    slug: "zamalek-apartment",
    title: { en: "The Zamalek Apartment", ar: "شقة الزمالك" },
    location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
    year: "2024",
    area: { en: "240 m²", ar: "240 م²" },
    typology: "residential",
    scope: {
      en: ["Full renovation", "Custom joinery", "Lighting design"],
      ar: ["تجديد شامل", "نجارة مخصصة", "تصميم الإضاءة"],
    },
    summary: {
      en: "A 1940s Nile-side apartment stripped back to its original bones and re-dressed for calm.",
      ar: "شقة من الأربعينيات تطل على النيل، أعادها الاستوديو إلى هيكلها الأصلي وكساها بالهدوء.",
    },
    body: {
      en: [
        "We stripped back fifty years of makeovers to find the apartment's original bones — plaster mouldings restored ring by ring, herringbone oak laid where the old parquet stood, and a kitchen quiet enough to disappear. The Nile light does the rest.",
        "Every intervention was subtractive: fewer walls, fewer colours, fewer things. What remains is a home that behaves like a gallery but still knows how to make coffee at six in the morning.",
      ],
      ar: [
        "أزلنا خمسين عامًا من الترميمات المتلاحقة لنصل إلى عظام الشقة الأصلية — زخارف الجبس رُمِّمت حلقةً حلقة، ووُضع باركيه البلوط المتراص حيث كان القديم يقف، ومطبخ هادئ حتى ليكاد يختفي. نور النيل يتولى الباقي.",
        "كان كل تدخل طرحًا لا إضافة: جدران أقل، ألوان أقل، أشياء أقل. ما تبقّى بيتٌ يتصرف كمعرض، لكنه يعرف كيف يصنع قهوة السادسة صباحًا.",
      ],
    },
    deliverables: {
      en: [
        "Space planning",
        "Joinery drawings",
        "Material & lighting specs",
        "Delivery-day styling",
      ],
      ar: [
        "تخطيط المساحات",
        "رسومات النجارة",
        "مواصفات الخامات والإضاءة",
        "التنسيق يوم التسليم",
      ],
    },
    images: ["/images/layan/zamalek-1.jpg", "/images/layan/zamalek-2.jpg", "/images/layan/zamalek-3.jpg"],
  },
  {
    slug: "al-reem-majlis",
    title: { en: "Al Reem Majlis", ar: "مجلس الريم" },
    location: { en: "Abu Dhabi, UAE", ar: "أبوظبي، الإمارات" },
    year: "2025",
    area: { en: "95 m²", ar: "95 م²" },
    typology: "residential",
    scope: {
      en: ["Majlis design", "Custom upholstery", "Bronze joinery"],
      ar: ["تصميم مجلس", "تنجيد مخصص", "نجارة برونزية"],
    },
    summary: {
      en: "A contemporary majlis for a family that hosts weekly — tradition kept, fuss removed.",
      ar: "مجلس عصري لعائلة تستضيف كل أسبوع — التقاليد باقية، والتكلف رحل.",
    },
    body: {
      en: [
        "A contemporary majlis for a family that hosts every Thursday. Sadu-inspired upholstery in undyed wool, bronze shelving measured to the millimetre, and a coffee ritual that stays at the centre of the plan — because some traditions design themselves.",
        "Acoustic drapes let the room hold forty guests or four. The palette is taken from the desert after rain: sand, dusk, and a little green.",
      ],
      ar: [
        "مجلس معاصر لعائلة تستضيف كل خميس. تنجيد مستوحى من السدو بصوفٍ غير مصبوغ، وأرفف برونزية مقيسة على المليمتر، وطقوس القهوة باقية في مركز المخطط — لأن بعض التقاليد تصمم نفسها.",
        "ستائر عازلة للصوت تسمح للغرفة أن تستضيف أربعين ضيفًا أو أربعة. اللوحة اللونية مأخوذة من الصحراء بعد المطر: رمل، وغسق، وقليل من الأخضر.",
      ],
    },
    deliverables: {
      en: [
        "Majlis layout",
        "Upholstery & textile schedule",
        "Bronze millwork",
        "Thursday-ready install",
      ],
      ar: [
        "مخطط المجلس",
        "جدول التنجيد والمنسوجات",
        "أعمال البرونز",
        "تركيب جاهز ليوم الخميس",
      ],
    },
    images: ["/images/layan/majlis-1.jpg", "/images/layan/majlis-2.jpg", "/images/layan/majlis-3.jpg"],
  },
  {
    slug: "jumeirah-penthouse",
    title: { en: "Jumeirah Penthouse", ar: "بنتهاوس جميرا" },
    location: { en: "Dubai, UAE", ar: "دبي، الإمارات" },
    year: "2024",
    area: { en: "310 m²", ar: "310 م²" },
    typology: "residential",
    scope: {
      en: ["Turnkey delivery", "Stone & millwork", "FF&E"],
      ar: ["تسليم بالمفتاح", "حجر ونجارة", "أثاث وتجهيزات"],
    },
    summary: {
      en: "A sea-facing floor where the horizon is the artwork and everything else stays out of its way.",
      ar: "طابق يواجه البحر؛ الأفق فيه هو العمل الفني، وكل ما عداه يبتعد عن طريقه.",
    },
    body: {
      en: [
        "Travertine floors that continue out to the terrace, linen sheers instead of walls, and a palette pulled from the Gulf at six in the evening. The sea is the artwork; everything else stays out of its way.",
        "Delivered turnkey in thirty-one weeks — drawings, procurement, installation, and a handover book that lists every finish by room, so maintenance never needs a phone call.",
      ],
      ar: [
        "أرضيات من الترافرتين تمتد إلى الشرفة، وستائر كتانية بدل الجدران، ولوحة ألوان مأخوذة من الخليج في السادسة مساءً. البحر هو العمل الفني؛ وكل ما عداه يبقى خارج طريقه.",
        "سُلِّم بالمفتاح في واحد وثلاثين أسبوعًا — رسومات وتوريدًا وتركيبًا ودفتر تسليم يفهرس كل تشطيب حسب الغرفة، فلا تحتاج الصيانة إلى مكالمة واحدة.",
      ],
    },
    deliverables: {
      en: [
        "Full drawing set",
        "Procurement & logistics",
        "Installation management",
        "Handover maintenance book",
      ],
      ar: [
        "حزمة رسومات كاملة",
        "التوريد واللوجستيات",
        "إدارة التركيب",
        "دفتر صيانة التسليم",
      ],
    },
    images: ["/images/layan/penthouse-1.jpg", "/images/layan/penthouse-2.jpg", "/images/layan/penthouse-3.jpg"],
  },
  {
    slug: "siwa-retreat",
    title: { en: "Siwa Retreat", ar: "منتجع سيوة" },
    location: { en: "Siwa Oasis, Egypt", ar: "واحة سيوة، مصر" },
    year: "2023",
    area: { en: "11 guest keys", ar: "11 غرفة ضيوف" },
    typology: "hospitality",
    scope: {
      en: ["New build", "Kershef construction", "FF&E"],
      ar: ["بناء جديد", "بناء بالكرشف", "أثاث وتجهيزات"],
    },
    summary: {
      en: "Eleven rooms built the Siwan way — mud walls that breathe, geometry borrowed from the old town.",
      ar: "إحدى عشرة غرفة بُنيت على طريقة سيوة — جدران طينية تتنفس، وهندسة مستعارة من البلد القديم.",
    },
    body: {
      en: [
        "Eleven rooms built the Siwan way: kershef mud-brick walls, palm-trunk ceilings, and salt plaster that breathes with the desert. The geometry is borrowed from the old town's lanes — irregular on purpose.",
        "Modern comfort arrived quietly: solar hot water, filtered pools, and lighting tuned to firelight temperatures. The result cools itself by four degrees in summer, without a single compressor.",
      ],
      ar: [
        "إحدى عشرة غرفة بُنيت على طريقة سيوة: جدران الكرشف من الطوب الطيني، وأسقف من جذوع النخل، وجصٌّ ملحي يتنفس مع الصحراء. الهندسة مستعارة من أزقة البلد القديم — غير منتظمة عن قصد.",
        "دخل الراحة الحديثة بهدوء: ماء ساخن بالطاقة الشمسية، ومسابح مرشحة، وإضاءة مضبوطة على درجات حرارة ضوء الشعلة. النتيجة تبرّد نفسها أربع درجات صيفًا، دون ضاغط واحد.",
      ],
    },
    deliverables: {
      en: [
        "Site master plan",
        "Kershef build supervision",
        "Guest-room interiors",
        "Landscape & lighting",
      ],
      ar: [
        "المخطط العام للموقع",
        "إشراف على البناء بالكرشف",
        "تصميم غرف الضيوف",
        "التنسيق والإضاءة",
      ],
    },
    images: ["/images/layan/siwa-1.jpg", "/images/layan/siwa-2.jpg", "/images/layan/siwa-3.jpg"],
  },
  {
    slug: "kattameya-villa",
    title: { en: "Kattameya Villa", ar: "فيلا القطامية" },
    location: { en: "New Cairo, Egypt", ar: "القاهرة الجديدة، مصر" },
    year: "2025",
    area: { en: "540 m²", ar: "540 م²" },
    typology: "residential",
    scope: {
      en: ["Re-planning", "Family villa", "Garden-facing"],
      ar: ["إعادة تخطيط", "فيلا عائلية", "إطلالة حديقة"],
    },
    summary: {
      en: "A family villa re-planned around its own garden — and around four children's worth of clutter.",
      ar: "فيلا عائلية أُعيد تخطيطها حول حديقتها — وحول فوضى أربعة أطفال.",
    },
    body: {
      en: [
        "The kitchen moved to face the morning, a dark stair hall became a double-height light well, and the living spaces turned to face the garden instead of the street. Storage appeared wherever walls used to be.",
        "The brief said warm minimal, but real. So the pale oak wears a hard-wearing lacquer, the benches lift for toys, and the one sofa everyone fights over is deep enough to nap on.",
      ],
      ar: [
        "انتقل المطبخ ليواجه الصباح، وتحوّل بيت السلم المظلم إلى بئر ضوء بارتفاع طابقين، واتجهت مساحات المعيشة نحو الحديقة بدل الشارع. وظهرت وحدات التخزين حيث كانت الجدران.",
        "قال أصحاب البيت: «دافئ وبسيط، لكن حقيقي». هكذا جاء البلوط الفاتح بطلاءٍ يصمد، والمقاعد ترتفع لإخفاء الألعاب، والأريكة التي يتصارع عليها الجميع عميقة بما يكفي للقيلولة.",
      ],
    },
    deliverables: {
      en: [
        "Re-planned layouts",
        "Light-well engineering",
        "Storage strategy",
        "Garden elevations",
      ],
      ar: [
        "إعادة تخطيط المساحات",
        "هندسة بئر الضوء",
        "استراتيجية التخزين",
        "واجهات الحديقة",
      ],
    },
    images: ["/images/layan/kattameya-1.jpg", "/images/layan/kattameya-2.jpg", "/images/layan/kattameya-3.jpg"],
  },
  {
    slug: "sidi-chalet",
    title: { en: "Sidi Chalet", ar: "شاليه سيدي" },
    location: { en: "North Coast, Egypt", ar: "الساحل الشمالي، مصر" },
    year: "2023",
    area: { en: "140 m²", ar: "140 م²" },
    typology: "residential",
    scope: {
      en: ["Weekend home", "Whitewash & rattan", "Outdoor living"],
      ar: ["بيت نهاية الأسبوع", "جير ورتان", "معيشة خارجية"],
    },
    summary: {
      en: "A salt-air chalet tuned for slow weekends — every surface chosen to look better in year ten.",
      ar: "شاليه يواجه هواء الملح، مضبوط لعطلات بطيئة — كل سطح اختير ليبدو أجمل في السنة العاشرة.",
    },
    body: {
      en: [
        "Whitewash, rattan, and shutters that actually shut. A compact chalet tuned for salt air and slow weekends — lime-washed walls that forgive wet towels, terrazzo that forgives sand.",
        "The terrace gained a pergola and an outdoor kitchen, turning forty square metres of balcony into the room the family actually lives in from May to October.",
      ],
      ar: [
        "جير أبيض، ورتان، ومصاريع تُغلق فعلًا. شاليه مضغوط مضبوط لهواء الملح وعطلات بطيئة — جدران مجصصة بالجير تسامح المناشف المبللة، وترازو يسامح الرمل.",
        "أضافت الشرفة مظلةً ومطبخًا خارجيًا، فتحوّلت أربعون مترًا من البلكونة إلى الغرفة التي تعيش فيها العائلة فعلًا من مايو إلى أكتوبر.",
      ],
    },
    deliverables: {
      en: [
        "Layout & flow plan",
        "Pergola & outdoor kitchen",
        "Salt-air material palette",
        "Summer styling kit",
      ],
      ar: [
        "مخطط الحركة والتوزيع",
        "المظلة والمطبخ الخارجي",
        "لوحة خامات مقاومة للملح",
        "تنسيق صيفي كامل",
      ],
    },
    images: ["/images/layan/chalet-1.jpg", "/images/layan/chalet-2.jpg", "/images/layan/chalet-3.jpg"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

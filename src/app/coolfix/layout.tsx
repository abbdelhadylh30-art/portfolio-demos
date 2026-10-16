import type { Metadata } from "next";
import { CoolfixProvider } from "@/lib/coolfix-i18n";
import { faqs } from "@/lib/coolfix-data";
import { EmergencyBar } from "@/components/coolfix/emergency-bar";
import { Header } from "@/components/coolfix/header";
import { Footer } from "@/components/coolfix/footer";

export const metadata: Metadata = {
  title: {
    default:
      "CoolFix — AC Repair & Home Maintenance, Cairo · Riyadh | 90-Minute Emergency Response · كول فيكس",
    template: "%s — CoolFix",
  },
  description:
    "24/7 AC repair, installation, deep cleaning, plumbing and electrical technicians across Cairo and Riyadh. Fixed prices, 90-minute emergency response, 12-month warranty. Book online in 60 seconds — confirmed on WhatsApp. تصليح تكييف وصيانة منزلية في القاهرة والرياض.",
  keywords: [
    "AC repair Cairo",
    "AC maintenance Egypt",
    "home maintenance Egypt",
    "emergency AC repair Riyadh",
    "AC cleaning Cairo",
    "plumber Cairo",
    "electrician Riyadh",
    "home services booking Egypt",
    "تصليح تكييف القاهرة",
    "صيانة تكييف الرياض",
    "سباكة القاهرة",
    "كهربائي الرياض",
    "كول فيكس",
  ],
  openGraph: {
    title: "CoolFix — AC & Home Maintenance, Cairo · Riyadh",
    description:
      "Technician at your door in ~90 minutes. Fixed prices, 12-month warranty, booking confirmed on WhatsApp. Bilingual AR/EN.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_EG"],
    images: [{ url: "/images/coolfix/hero.jpg", width: 1200, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoolFix — AC & Home Maintenance, Cairo · Riyadh",
    description: "Technician at your door in ~90 minutes. Fixed prices, 12-month warranty.",
  },
  robots: { index: false, follow: false },
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "CoolFix Technical Services",
  alternateName: "كول فيكس للخدمات الفنية",
  description:
    "24/7 AC repair, installation, deep cleaning, plumbing and electrical services across Cairo and Riyadh, with 90-minute emergency response and fixed prices.",
  url: "https://coolfix.tech",
  telephone: "+201000000000",
  priceRange: "EGP 200–8,400",
  areaServed: [
    { "@type": "City", name: "Cairo" },
    { "@type": "City", name: "Riyadh" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  availableLanguage: ["en", "ar"],
  knowsAbout: [
    "Air conditioner repair",
    "AC installation",
    "AC deep cleaning",
    "Refrigerant refill",
    "Plumbing",
    "Electrical maintenance",
    "Home maintenance contracts",
  ],
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "14 Road 9, Maadi",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Olaya Main Street",
      addressLocality: "Riyadh",
      addressCountry: "SA",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q.en,
    acceptedAnswer: { "@type": "Answer", text: f.a.en },
  })),
};

export default function CoolfixLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CoolfixProvider>
      <div className="flex min-h-screen flex-col bg-coolfix-paper text-coolfix-ink">
        <EmergencyBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </CoolfixProvider>
  );
}

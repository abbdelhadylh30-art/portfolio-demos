import type { Metadata } from "next";
import { LayanProvider } from "@/lib/layan-i18n";
import { Header } from "@/components/layan/header";
import { Footer } from "@/components/layan/footer";

export const metadata: Metadata = {
  title: {
    default: "Layan Interiors — Interior Architecture Studio, Cairo · Dubai | ليان",
    template: "%s — Layan Interiors",
  },
  description:
    "Interior architecture studio designing residential and hospitality spaces across Egypt and the Gulf. Bilingual AR/EN. Book a free 60-minute consultation. استوديو ليان للعمارة الداخلية — القاهرة ودبي.",
  keywords: [
    "interior design Cairo",
    "interior architecture Egypt",
    "interior design studio Dubai",
    "luxury home renovation Egypt",
    "residential interior design Gulf",
    "turnkey interior Egypt",
    "تصميم داخلي القاهرة",
    "ديكور مصر",
    "استوديو تصميم داخلي دبي",
  ],
  openGraph: {
    title: "Layan Interiors — Interior Architecture Studio",
    description:
      "Residential & hospitality interiors across Egypt and the Gulf. Bilingual AR/EN — book a free consultation.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_EG"],
    images: [{ url: "/images/layan/hero.jpg", width: 1440, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Layan Interiors — Interior Architecture Studio",
    description: "Residential & hospitality interiors across Egypt and the Gulf.",
  },
  robots: { index: false, follow: false },
};

const studioJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Layan Interiors",
  alternateName: "استوديو ليان للعمارة الداخلية",
  description:
    "Interior architecture studio designing residential and hospitality spaces across Egypt and the Gulf.",
  url: "https://layan.studio",
  telephone: "+20200000000",
  email: "hello@layan.studio",
  priceRange: "$$$",
  areaServed: ["EG", "AE", "SA", "QA", "KW", "BH", "OM"],
  availableLanguage: ["en", "ar"],
  knowsAbout: [
    "Interior architecture",
    "Residential interior design",
    "Hospitality design",
    "Turnkey fit-out",
    "Custom joinery",
  ],
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "14 Hassan Sabry St.",
      addressLocality: "Zamalek, Cairo",
      addressCountry: "EG",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Unit 7, Alserkal Avenue, Al Quoz 1",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  ],
};

export default function LayanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayanProvider>
      <div className="flex min-h-screen flex-col bg-layan-cream text-layan-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(studioJsonLd) }}
      />
    </LayanProvider>
  );
}

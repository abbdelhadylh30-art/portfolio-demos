import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/i18n";
import { Nav } from "@/components/lumiere/nav";
import { Footer } from "@/components/lumiere/footer";

export const metadata: Metadata = {
  title: "Lumière Aesthetic Clinic — Jumeirah, Dubai | لومير للتجميل",
  description:
    "Physician-led aesthetic clinic in Jumeirah, Dubai. Injectables, laser, skin & body treatments in Arabic and English. Book your complimentary consultation. عيادة لومير للتجميل بجميرا، دبي.",
  keywords: [
    "aesthetic clinic Dubai",
    "med spa Jumeirah",
    "dermatologist Dubai",
    "botox Dubai",
    "laser hair removal Dubai",
    "عيادة تجميل دبي",
    "ليزر دبي",
    "بوتوكس دبي",
    "best med spa Dubai",
    "skin clinic Jumeirah",
  ],
  openGraph: {
    title: "Lumière Aesthetic Clinic — Jumeirah, Dubai",
    description:
      "Physician-led aesthetic care in Arabic & English. Book your complimentary consultation.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_AE"],
    images: [{ url: "/images/hero.jpg", width: 1248, height: 832 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumière Aesthetic Clinic — Jumeirah, Dubai",
    description: "Physician-led aesthetic care in Arabic & English.",
  },
  robots: { index: false, follow: false },
};

const clinicJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Lumière Aesthetic Clinic",
  alternateName: "عيادة لومير للتجميل",
  description:
    "Physician-led aesthetic clinic offering injectables, laser, skin and body treatments in Jumeirah, Dubai.",
  url: "https://lumiereclinic.ae",
  telephone: "+97140000000",
  email: "hello@lumiereclinic.ae",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Villa 12, Al Wasl Road, Jumeirah 1",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  geo: { "@type": "GeoCoordinates", latitude: 25.2138, longitude: 55.2555 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "10:00",
      closes: "20:00",
    },
  ],
  priceRange: "$$$",
  availableLanguage: ["en", "ar"],
  medicalSpecialty: "Dermatology",
};

export default function LumiereLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }}
      />
    </LanguageProvider>
  );
}

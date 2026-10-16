import { LanguageProvider } from "@/lib/i18n";
import { Nav } from "@/components/lumiere/nav";
import { Footer } from "@/components/lumiere/footer";
import { Hero } from "@/components/lumiere/hero";
import { Stats } from "@/components/lumiere/stats";
import { Treatments } from "@/components/lumiere/treatments";
import { Gallery } from "@/components/lumiere/gallery";
import { Why } from "@/components/lumiere/why";
import { Doctors } from "@/components/lumiere/doctors";
import { Testimonials } from "@/components/lumiere/testimonials";
import { Booking } from "@/components/lumiere/booking";
import { Faq } from "@/components/lumiere/faq";
import { Contact } from "@/components/lumiere/contact";

export default function LumierePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Treatments />
      <Gallery />
      <Why />
      <Doctors />
      <Testimonials />
      <Booking />
      <Faq />
      <Contact />
    </>
  );
}

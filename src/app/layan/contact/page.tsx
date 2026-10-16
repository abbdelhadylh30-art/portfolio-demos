import type { Metadata } from "next";
import { ContactView } from "@/components/layan/contact-view";

export const metadata: Metadata = {
  title: "Book a Consultation — Free 60 Minutes, AR/EN",
  description:
    "Book a free 60-minute interior design consultation with Layan — in Arabic or English, in Cairo, Dubai or across the Gulf. We reply within one business day.",
  alternates: { canonical: "/layan/contact" },
};

export default function ContactPage() {
  return <ContactView />;
}

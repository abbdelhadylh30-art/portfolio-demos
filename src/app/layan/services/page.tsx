import type { Metadata } from "next";
import { ServicesView } from "@/components/layan/services-view";

export const metadata: Metadata = {
  title: "Services — Interior Architecture, Styling, Turnkey",
  description:
    "Three ways to work with Layan Interiors: full interior architecture, furnishing & styling, and turnkey design-build delivery across Egypt and the Gulf.",
  alternates: { canonical: "/layan/services" },
};

export default function ServicesPage() {
  return <ServicesView />;
}

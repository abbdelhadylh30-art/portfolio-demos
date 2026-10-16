import type { Metadata } from "next";
import { StudioView } from "@/components/layan/studio-view";

export const metadata: Metadata = {
  title: "Studio — A Small Studio, On Purpose",
  description:
    "Layan Interiors: fourteen people across Cairo and Dubai studios, founded 2016. Deliberately small, personally on site every week.",
  alternates: { canonical: "/layan/studio" },
};

export default function StudioPage() {
  return <StudioView />;
}

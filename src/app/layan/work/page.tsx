import type { Metadata } from "next";
import { WorkView } from "@/components/layan/work-view";

export const metadata: Metadata = {
  title: "Work — Selected Projects",
  description:
    "Residential and hospitality interiors by Layan: Cairo apartments, Gulf majlis, penthouses, Siwa retreats. Browse the portfolio.",
  alternates: { canonical: "/layan/work" },
};

export default function WorkPage() {
  return <WorkView />;
}

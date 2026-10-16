import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Jost,
  Amiri,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const body = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const displayAr = Amiri({
  variable: "--font-display-ar",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const bodyAr = IBM_Plex_Sans_Arabic({
  variable: "--font-body-ar",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://demos.abdelhadygabriel.me"),
  title: "Concept Spec Demos — Abdelhady Gabriel",
  description:
    "Bilingual AR/EN concept websites with working booking systems, built to showcase niche-targeted web design for businesses in Egypt and the Gulf.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${display.variable} ${body.variable} ${displayAr.variable} ${bodyAr.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

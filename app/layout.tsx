import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import { Cairo, IBM_Plex_Serif, Manrope } from "next/font/google";
import { company } from "@/lib/data";
import { getMessages, isLocale } from "@/lib/i18n";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: "500",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const arabic = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
});

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const raw = headerList.get("x-locale") ?? "en";
  const locale = isLocale(raw) ? raw : "en";
  const t = getMessages(locale);
  return {
    title: {
      default: t.metaTitle,
      template: "%s | MTE",
    },
    description: t.metaDescription || company.tagline,
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headerList = await headers();
  const raw = headerList.get("x-locale") ?? "en";
  const locale = isLocale(raw) ? raw : "en";

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={`${sans.variable} ${serif.variable} ${arabic.variable}`}>
      <body className={locale === "ar" ? arabic.className : sans.className}>{children}</body>
    </html>
  );
}

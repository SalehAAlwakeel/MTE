import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LocaleProvider } from "@/components/LocaleContext";
import { OfficeMap } from "@/components/OfficeMap";
import { ShutterTransition } from "@/components/ShutterTransition";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { isLocale, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  return (
    <LocaleProvider locale={locale}>
      <ShutterTransition />
      <div dir={locale === "ar" ? "rtl" : "ltr"}>
        <Header />
        <main>{children}</main>
        <OfficeMap />
        <Footer />
        <WhatsAppFloat locale={locale} />
      </div>
    </LocaleProvider>
  );
}

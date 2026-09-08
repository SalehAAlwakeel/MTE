"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/components/LocaleContext";
import { WhatsAppIcon } from "@/components/illustrations";
import { company, getDisplayPhones, getNavServices, getNavSolutions, getWhatsappHref } from "@/lib/data";
import { localizeDigits, lp } from "@/lib/i18n";

export function Footer() {
  const { locale, t } = useLocale();
  const services = getNavServices(locale);
  const solutions = getNavSolutions(locale);

  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/logo.png?v=7" alt={t.company.name} width={200} height={72} className="mb-4 h-14 w-auto object-contain" unoptimized />
          <p className="max-w-xs text-sm leading-6 text-muted">{t.metaDescription}</p>
          <div className="mt-5 flex gap-3">
            <a
              href={getWhatsappHref(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full bg-whatsapp text-white"
              aria-label={t.footer.whatsapp}
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a href={company.instagram} className="grid h-10 w-10 place-items-center rounded-full bg-chip" aria-label={t.footer.instagram}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="4" y="4" width="16" height="16" rx="5" />
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" />
              </svg>
            </a>
            <a href={company.linkedin} className="grid h-10 w-10 place-items-center rounded-full bg-chip" aria-label={t.footer.linkedin}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M6.5 9H4V20h2.5V9ZM5.2 4A1.6 1.6 0 1 0 5.2 7.2 1.6 1.6 0 0 0 5.2 4ZM20 20h-2.5v-5.6c0-1.6-.6-2.6-2-2.6s-1.7 1-2 2c0 .2 0 .4 0 .6V20H11V9h2.4v1.5c.6-1 1.7-1.8 3.5-1.8 2.5 0 4.1 1.6 4.1 5.1V20Z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">{t.footer.services}</h4>
          <ul className="space-y-2 text-sm text-soft">
            {services.map((item) => (
              <li key={item.href}>
                <Link href={lp(locale, item.href)}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">{t.footer.solutions}</h4>
          <ul className="space-y-2 text-sm text-soft">
            {solutions.map((item) => (
              <li key={item.href}>
                <Link href={lp(locale, item.href)}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="mb-4 font-semibold">{t.footer.company}</h4>
            <ul className="space-y-2 text-sm text-soft">
              <li>{t.company.name}</li>
              {t.company.addressLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">{t.footer.contact}</h4>
            <ul className="space-y-2 text-sm text-soft">
              {getDisplayPhones(locale).map((phone) => (
                <li key={phone.href}>
                  <a href={phone.href}>{phone.display}</a>
                </li>
              ))}
              <li>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 text-whatsapp"
                  href={getWhatsappHref(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {t.footer.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container-page flex flex-wrap items-center justify-between gap-3 border-t border-black/5 py-6 text-sm text-faint">
        <p>
          © {localizeDigits(new Date().getFullYear(), locale)} {company.shortName}. {t.footer.rights}
        </p>
        <Link href={lp(locale, "/privacy")}>{t.footer.privacy}</Link>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleContext";
import { WhatsAppIcon } from "@/components/illustrations";
import { company, getDisplayPhones, getWhatsappHref } from "@/lib/data";
import { lp } from "@/lib/i18n";

export function ContactCTA() {
  const { locale, t } = useLocale();

  return (
    <section className="container-page py-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="serif mb-3 text-lg text-muted">{t.contact.label}</p>
          <h2 className="max-w-xl text-4xl font-semibold tracking-tight md:text-5xl">{t.contact.title}</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-soft">{t.contact.text}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={lp(locale, "/contact")} className="btn-blue">
              {t.home.ctaStrategy}
            </Link>
            <Link href={lp(locale, "/contact?intent=quote")} className="btn-black">
              {t.home.ctaQuote}
            </Link>
          </div>
        </div>
        <div className="card space-y-2 p-7 text-[15px] shadow-sm">
          {getDisplayPhones(locale).map((phone) => (
            <a key={phone.href} className="block font-medium" href={phone.href}>
              {phone.display}
            </a>
          ))}
          <a className="block font-medium" href={`mailto:${company.email}`}>
            {company.email}
          </a>
          <a
            className="inline-flex items-center gap-2 font-medium text-whatsapp"
            href={getWhatsappHref(locale)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {t.contact.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}

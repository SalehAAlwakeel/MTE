"use client";

import { useLocale } from "@/components/LocaleContext";
import { company } from "@/lib/data";

export function OfficeMap() {
  const { t } = useLocale();

  return (
    <section className="border-t border-black/5 bg-white">
      <div className="container-page py-16 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="serif text-lg text-muted">{t.contact.mapLabel}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{t.contact.mapTitle}</h2>
            <div className="mt-4 space-y-1 text-soft">
              {t.company.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <a
            href={company.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-black"
          >
            {t.contact.mapOpen}
          </a>
        </div>
        <div className="overflow-hidden rounded-[28px] border border-black/5 shadow-sm" dir="ltr">
          <iframe
            title={t.contact.mapTitle}
            src={company.mapsEmbed}
            className="block h-[360px] w-full border-0 md:h-[460px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

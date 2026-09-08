import { ContactForm } from "@/components/ContactForm";
import { WhatsAppIcon } from "@/components/illustrations";
import { company, getDisplayPhones, getWhatsappHref } from "@/lib/data";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const t = getMessages(isLocale(raw) ? raw : "en");
  return { title: t.contact.pageTitle };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const t = getMessages(locale);

  return (
    <section className="container-page grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="serif text-lg text-muted">{t.contact.label}</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight">{t.contact.pageTitle}</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-soft">{t.contact.pageText}</p>

        <div className="card mt-8 space-y-2 p-6 shadow-sm">
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

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">{t.contact.company}</h2>
            <p className="mt-2 leading-7 text-soft">{t.company.name}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{t.contact.studio}</h2>
            {t.company.addressLines.map((line) => (
              <p key={line} className="text-soft">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
      <ContactForm />
    </section>
  );
}

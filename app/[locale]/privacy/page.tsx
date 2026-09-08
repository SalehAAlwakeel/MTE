import { company } from "@/lib/data";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  return { title: getMessages(isLocale(raw) ? raw : "en").privacy.title };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const t = getMessages(locale);

  return (
    <article className="container-page max-w-3xl py-16">
      <h1 className="text-5xl font-semibold tracking-tight">{t.privacy.title}</h1>
      <div className="mt-8 space-y-5 leading-8 text-soft">
        <p>
          {t.company.name} {t.privacy.p1}
        </p>
        <p>
          {t.privacy.p2} {company.email}.
        </p>
        <p>{t.privacy.p3}</p>
      </div>
    </article>
  );
}

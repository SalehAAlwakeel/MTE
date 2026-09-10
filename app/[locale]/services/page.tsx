import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { SolutionImage, Spark } from "@/components/illustrations";
import { getServices } from "@/lib/data";
import { getMessages, isLocale, lp, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  return { title: getMessages(isLocale(raw) ? raw : "en").nav.services };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const t = getMessages(locale);
  const [lead, ...rest] = getServices(locale);

  return (
    <>
      <section className="container-page py-16 md:py-20">
        <p className="serif text-lg text-muted">{t.nav.services}</p>
        <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-tight md:text-6xl">{t.servicesPage.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-soft">{t.servicesPage.text}</p>
      </section>

      <section className="container-page pb-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight">{lead.title}</h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-soft">{lead.summary}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={lp(locale, "/contact")} className="btn-blue">
                <Spark className="h-4 w-4" /> {t.nav.book}
              </Link>
              <Link href={lp(locale, `/services/${lead.slug}`)} className="btn-ghost">
                {t.servicesPage.learn}
              </Link>
            </div>
          </div>
          <SolutionImage src={lead.image} alt={lead.imageAlt} outline={false} />
        </div>
      </section>

      <section className="container-page grid gap-6 pb-20 md:grid-cols-2">
        {rest.map((item) => (
          <Link key={item.slug} href={lp(locale, `/services/${item.slug}`)} className="card grid items-center gap-6 p-6 shadow-sm md:grid-cols-[180px_1fr]">
            <div className="w-[180px]">
              <SolutionImage src={item.image} alt={item.imageAlt} outline={false} className="aspect-square w-full" sizes="180px" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-soft">{item.hero}</p>
              <span className="mt-4 inline-block font-semibold">{t.servicesPage.learn}</span>
            </div>
          </Link>
        ))}
      </section>
      <ContactCTA />
    </>
  );
}

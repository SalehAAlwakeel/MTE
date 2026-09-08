import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactCTA } from "@/components/ContactCTA";
import { FAQ } from "@/components/FAQ";
import { Process } from "@/components/Process";
import { SolutionImage, Spark } from "@/components/illustrations";
import { getService, services } from "@/lib/data";
import { getMessages, isLocale, lp, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return services.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "en";
  return { title: getService(slug, locale)?.title ?? getMessages(locale).nav.services };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const t = getMessages(locale);
  const service = getService(slug, locale);
  if (!service) notFound();

  return (
    <>
      <section className="container-page grid items-center gap-10 py-16 lg:grid-cols-2">
        <div>
          <nav className="mb-4 text-sm text-muted">
            <Link href={lp(locale, "/services")}>{t.nav.services}</Link> <span className="mx-1">›</span> {service.title}
          </nav>
          <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">{service.title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-soft">{service.summary}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link href={lp(locale, "/contact")} className="btn-blue">
              <Spark className="h-4 w-4" /> {t.nav.book}
            </Link>
          </div>
        </div>
        <SolutionImage src={service.image} alt={service.imageAlt} />
      </section>

      <section className="container-page py-10">
        <p className="serif text-lg text-muted">{t.servicesPage.get}</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight">{service.benefitsTitle}</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {service.benefits.map((item) => (
            <article key={item.title}>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 leading-7 text-soft">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <p className="serif text-lg text-muted">{t.servicesPage.why}</p>
        <h2 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight">{service.whenTitle}</h2>
        <p className="mt-5 max-w-3xl leading-8 text-soft">{service.whenText}</p>
        <p className="mt-6 text-lg font-medium">{t.servicesPage.invent}</p>
        <Link href={lp(locale, "/contact")} className="btn-blue mt-6">
          <Spark className="h-4 w-4" /> {t.nav.book}
        </Link>
      </section>

      <Process />
      <FAQ items={service.faqs} />
      <ContactCTA />
    </>
  );
}

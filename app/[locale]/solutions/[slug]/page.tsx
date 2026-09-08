import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactCTA } from "@/components/ContactCTA";
import { Process } from "@/components/Process";
import { SolutionImage, Spark } from "@/components/illustrations";
import { getSolution, solutions } from "@/lib/data";
import { getMessages, isLocale, lp, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return solutions.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "en";
  return { title: getSolution(slug, locale)?.title ?? getMessages(locale).nav.solutions };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const t = getMessages(locale);
  const solution = getSolution(slug, locale);
  if (!solution) notFound();

  return (
    <>
      <section className="container-page grid items-center gap-10 py-16 lg:grid-cols-2">
        <div>
          <nav className="mb-4 text-sm text-muted">
            <Link href={lp(locale, "/solutions")}>{t.nav.solutions}</Link> <span className="mx-1">›</span> {solution.title}
          </nav>
          <h1 className="text-5xl font-semibold tracking-tight">{solution.title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-soft">{solution.long}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {solution.points.map((point) => (
              <span key={point} className="chip">
                {point}
              </span>
            ))}
          </div>
          <Link href={lp(locale, "/contact")} className="btn-blue mt-8">
            <Spark className="h-4 w-4" /> {t.nav.book}
          </Link>
        </div>
        <SolutionImage src={solution.image} alt={solution.imageAlt} />
      </section>

      <Process />
      <ContactCTA />
    </>
  );
}

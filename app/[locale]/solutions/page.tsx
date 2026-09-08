import { ContactCTA } from "@/components/ContactCTA";
import { SolutionsSlider } from "@/components/SolutionsSlider";
import { getSolutions } from "@/lib/data";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  return { title: getMessages(isLocale(raw) ? raw : "en").nav.solutions };
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const t = getMessages(locale);

  return (
    <>
      <section className="container-page py-16">
        <p className="serif text-lg text-muted">{t.nav.solutions}</p>
        <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-tight md:text-6xl">{t.solutionsPage.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-soft">{t.solutionsPage.text}</p>
      </section>
      <SolutionsSlider items={getSolutions(locale)} />
      <ContactCTA />
    </>
  );
}

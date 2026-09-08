import Link from "next/link";
import { ContactCTA } from "@/components/ContactCTA";
import { ExpandedWork } from "@/components/ExpandedWork";
import { HeroIllustration, Spark } from "@/components/illustrations";
import { Process } from "@/components/Process";
import { CounterFX } from "@/components/CounterFX";
import { Logo3DCarousel } from "@/components/Logo3DCarousel";
import { SolutionsSlider } from "@/components/SolutionsSlider";
import { getCapabilityTags, getCustomers, getFeaturedOffers, getNavSolutions, getPartners, getSolutions, services } from "@/lib/data";
import { getMessages, isLocale, lp, type Locale } from "@/lib/i18n";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const t = getMessages(locale);
  const industrySolutions = getNavSolutions(locale);

  return (
    <>
      <section className="container-page grid items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="fade-up">
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-[64px]">
            {t.home.headlineBefore} <span className="serif">{t.home.headlineAccent}</span>
            <span className="mt-2 block">{t.home.headlineAfter}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-soft">{t.home.subhead}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={lp(locale, "/contact")} className="btn-blue">
              <Spark className="h-4 w-4" />
              {t.home.ctaStrategy}
            </Link>
            <Link href={lp(locale, "/contact?intent=quote")} className="btn-black">
              {t.home.ctaQuote}
            </Link>
          </div>
        </div>
        <HeroIllustration locale={locale} />
      </section>

      <section className="container-page py-16">
        <p className="serif text-lg text-muted">{t.home.hookLabel}</p>
        <h2 className="mt-2 max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl">{t.home.hookTitle}</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <p className="text-lg leading-8 text-soft">{t.home.hookP1}</p>
          <p className="text-lg leading-8 text-soft">{t.home.hookP2}</p>
        </div>
      </section>

      <section className="container-page py-12">
        <p className="serif text-lg text-muted">{t.home.unifyLabel}</p>
        <h2 className="mt-2 max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl">{t.home.unifyTitle}</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-soft">{t.home.unifyText}</p>
      </section>

      <section className="container-page py-16">
        <p className="serif text-lg text-muted">{t.home.capabilitiesLabel}</p>
        <h2 className="mt-2 max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl">{t.home.capabilitiesTitle}</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-soft">{t.home.capabilitiesText}</p>
        <p className="serif mt-12 text-lg text-muted">{t.home.ecoLabel}</p>
        <h2 className="mt-2 max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl">{t.home.ecoTitle}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {t.ecosystem.map((item) => (
            <Link key={item.slug} href={lp(locale, `/services/${item.slug}`)} className="card p-7 shadow-sm transition hover:-translate-y-1">
              <div className="text-xl font-semibold">{item.title}</div>
              <p className="mt-3 leading-7 text-soft">{item.text}</p>
              <span className="mt-5 inline-block font-semibold">{t.servicesPage.learn}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <p className="serif text-lg text-muted">{t.home.speedLabel}</p>
        <h2 className="mt-2 max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl">{t.home.speedTitle}</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-soft">{t.home.speedText}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={lp(locale, "/contact")} className="btn-blue">
            <Spark className="h-4 w-4" />
            {t.home.ctaStrategy}
          </Link>
          <Link href={lp(locale, "/contact?intent=quote")} className="btn-ghost">
            {t.home.ctaQuote}
          </Link>
        </div>
      </section>

      <section className="container-page py-12">
        <p className="serif text-lg text-muted">{t.home.workLabel}</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{t.home.workTitle}</h2>
        <ExpandedWork items={getFeaturedOffers(locale)} />
        <div className="mt-10">
          <Link href={lp(locale, "/services")} className="btn-ghost">
            {t.home.allCases}
          </Link>
        </div>
        <div className="mt-16 grid gap-8 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: getFeaturedOffers(locale).length, label: t.home.statCases },
            { to: services.length, label: t.home.statLines },
            { to: industrySolutions.length, label: t.home.statIndustries },
            { to: 1000, suffix: "+", label: t.home.statSpecialists },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-5xl font-semibold tracking-tight md:text-6xl">
                <CounterFX to={stat.to} suffix={stat.suffix ?? ""} duration={1.8} thousands />
              </div>
              <div className="mt-2 text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="solutions" className="py-20">
        <div className="container-page">
          <p className="serif text-lg text-muted">{t.home.solutionsLabel}</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{t.home.solutionsTitle}</h2>
        </div>
        <div className="mt-10">
          <SolutionsSlider items={getSolutions(locale)} />
        </div>
        <div className="container-page">
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {getCapabilityTags(locale).map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-8 text-center text-lg">{t.home.notFound}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href={lp(locale, "/contact")} className="btn-black">
              {t.nav.book}
            </Link>
            <Link href="#process" className="btn-ghost">
              {t.home.moreProcess}
            </Link>
          </div>
        </div>
      </section>

      <section className="overflow-hidden py-16">
        <div className="container-page grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="serif text-lg text-muted">{t.home.partnersLabel}</p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{t.home.partnersTitle}</h2>
          </div>
          <p className="max-w-2xl leading-8 text-soft">{t.home.partnersText}</p>
        </div>
        <div className="mt-14 py-10">
          <Logo3DCarousel logos={getPartners(locale)} label={t.home.partnersLabel} />
        </div>
      </section>

      <section className="overflow-hidden py-16">
        <div className="container-page grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="serif text-lg text-muted">{t.home.customersLabel}</p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{t.home.customersTitle}</h2>
          </div>
          <p className="max-w-2xl leading-8 text-soft">{t.home.customersText}</p>
        </div>
        <div className="mt-14 py-10">
          <Logo3DCarousel logos={getCustomers(locale)} label={t.home.customersLabel} direction="right" />
        </div>
      </section>

      <Process />
      <ContactCTA />
    </>
  );
}

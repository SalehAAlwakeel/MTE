"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLocale } from "@/components/LocaleContext";
import { getNavServices, getNavSolutions } from "@/lib/data";
import { lp, switchLocalePath } from "@/lib/i18n";

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg className={`h-3 w-3 transition ${open ? "rotate-180" : ""}`} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2 4.5 6 8l4-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Header() {
  const { locale, t } = useLocale();
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const services = getNavServices(locale);
  const solutions = getNavSolutions(locale);
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/92 backdrop-blur">
      <div className="container-page flex h-[76px] items-center justify-between gap-6">
        <Link href={lp(locale, "/")} className="flex shrink-0 items-center" onClick={() => setOpen(false)} aria-label={t.nav.home}>
          <Image src="/logo.png?v=7" alt={t.company.name} width={220} height={80} className="h-14 w-auto object-contain" priority unoptimized />
        </Link>

        <nav className="hidden items-center gap-8 text-[15px] font-medium lg:flex">
          <div className="group relative">
            <Link href={lp(locale, "/services")} className="inline-flex items-center gap-1.5 py-3">
              {t.nav.services} <Chevron />
            </Link>
            <div className="invisible absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="card grid overflow-hidden p-2 shadow-xl md:grid-cols-2">
                {services.map((item) => (
                  <Link key={item.href} href={lp(locale, item.href)} className="block rounded-2xl px-4 py-3 hover:bg-chip">
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm text-muted">{item.desc}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative">
            <Link href={lp(locale, "/solutions")} className="inline-flex items-center gap-1.5 py-3">
              {t.nav.solutions} <Chevron />
            </Link>
            <div className="invisible absolute left-1/2 top-full w-[320px] -translate-x-1/2 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="card overflow-hidden p-2 shadow-xl">
                {solutions.map((item) => (
                  <Link key={item.href} href={lp(locale, item.href)} className="block rounded-2xl px-4 py-3 hover:bg-chip">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <div dir="ltr" className="hidden items-center gap-2 text-sm font-semibold sm:inline-flex">
            <Link
              href={switchLocalePath(pathname, "en")}
              className={locale === "en" ? "text-ink" : "text-soft"}
              aria-current={locale === "en" ? "page" : undefined}
            >
              EN
            </Link>
            <span className="text-faint">|</span>
            <Link
              href={switchLocalePath(pathname, "ar")}
              className={locale === "ar" ? "text-ink" : "text-soft"}
              aria-current={locale === "ar" ? "page" : undefined}
            >
              العربية
            </Link>
          </div>
          <Link href={lp(locale, "/contact")} className="btn-black hidden sm:inline-flex">
            {t.nav.book}
          </Link>
          <button className="rounded-full p-2 lg:hidden" aria-label={t.nav.openMenu} onClick={() => setOpen((value) => !value)}>
            <span className="mb-1.5 block h-0.5 w-6 bg-ink" />
            <span className="mb-1.5 block h-0.5 w-6 bg-ink" />
            <span className="block h-0.5 w-6 bg-ink" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-white lg:hidden">
          <div className="container-page flex flex-col gap-2 py-4">
            <button className="flex items-center justify-between py-2 text-start font-medium" onClick={() => setMobileSection(mobileSection === "s" ? null : "s")}>
              {t.nav.services} <Chevron open={mobileSection === "s"} />
            </button>
            {mobileSection === "s" &&
              services.map((item) => (
                <Link key={item.href} href={lp(locale, item.href)} className="ps-3 text-muted" onClick={() => setOpen(false)}>
                  {item.title}
                </Link>
              ))}
            <Link href={lp(locale, "/solutions")} onClick={() => setOpen(false)} className="py-2 font-medium">
              {t.nav.solutions}
            </Link>
            <div dir="ltr" className="flex items-center gap-2 py-2 text-sm font-semibold">
              <Link href={switchLocalePath(pathname, "en")} onClick={() => setOpen(false)} className={locale === "en" ? "text-ink" : "text-soft"}>
                EN
              </Link>
              <span className="text-faint">|</span>
              <Link href={switchLocalePath(pathname, "ar")} onClick={() => setOpen(false)} className={locale === "ar" ? "text-ink" : "text-soft"}>
                العربية
              </Link>
            </div>
            <Link href={lp(locale, "/contact")} onClick={() => setOpen(false)} className="btn-black mt-2">
              {t.nav.book}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

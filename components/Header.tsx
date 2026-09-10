"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/LocaleContext";
import { getNavServices, getNavSolutions } from "@/lib/data";
import { lp, switchLocalePath } from "@/lib/i18n";

const menuEase: [number, number, number, number] = [0.44, 0, 0.56, 1];

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: menuEase } },
};

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
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.34;

  useEffect(() => {
    setOpen(false);
    setMobileSection(null);
  }, [pathname]);
  const solutions = getNavSolutions(locale);
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/92 backdrop-blur">
      <div className="container-page flex h-[76px] items-center justify-between gap-6">
        <Link href={lp(locale, "/")} className="flex shrink-0 items-center" onClick={() => setOpen(false)} aria-label={t.nav.home}>
          <Image src="/logo.png?v=7" alt={t.company.name} width={220} height={80} className="h-10 w-auto object-contain sm:h-14" priority unoptimized />
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

        <div className="flex items-center gap-2 sm:gap-3">
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
          <Link href={lp(locale, "/contact")} className="btn-black btn-header">
            <span className="sm:hidden">{t.nav.bookShort}</span>
            <span className="hidden sm:inline">{t.nav.book}</span>
          </Link>
          <button
            className="relative grid h-10 w-10 place-items-center rounded-full lg:hidden"
            aria-label={t.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={`absolute start-0 top-0 h-0.5 w-6 origin-center bg-ink transition-transform duration-300 ease-[cubic-bezier(0.44,0,0.56,1)] ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute start-0 top-[5px] h-0.5 w-6 bg-ink transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute start-0 top-[10px] h-0.5 w-6 origin-center bg-ink transition-transform duration-300 ease-[cubic-bezier(0.44,0,0.56,1)] ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration, ease: menuEase }}
            className="overflow-hidden border-t border-black/5 bg-white lg:hidden"
          >
            <motion.div
              className="container-page flex flex-col gap-2 py-4"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: reduceMotion ? 0 : 0.045, delayChildren: reduceMotion ? 0 : 0.05 } },
              }}
            >
              <motion.button
                variants={itemVariants}
                className="flex items-center justify-between py-2 text-start font-medium"
                onClick={() => setMobileSection(mobileSection === "s" ? null : "s")}
              >
                {t.nav.services} <Chevron open={mobileSection === "s"} />
              </motion.button>
              <AnimatePresence initial={false}>
                {mobileSection === "s" && (
                  <motion.div
                    key="services"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration, ease: menuEase }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-2 pb-1">
                      {services.map((item) => (
                        <Link key={item.href} href={lp(locale, item.href)} className="ps-3 text-muted" onClick={() => setOpen(false)}>
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div variants={itemVariants}>
                <Link href={lp(locale, "/solutions")} onClick={() => setOpen(false)} className="block py-2 font-medium">
                  {t.nav.solutions}
                </Link>
              </motion.div>
              <motion.div variants={itemVariants} dir="ltr" className="flex items-center gap-2 py-2 text-sm font-semibold">
                <Link href={switchLocalePath(pathname, "en")} onClick={() => setOpen(false)} className={locale === "en" ? "text-ink" : "text-soft"}>
                  EN
                </Link>
                <span className="text-faint">|</span>
                <Link href={switchLocalePath(pathname, "ar")} onClick={() => setOpen(false)} className={locale === "ar" ? "text-ink" : "text-soft"}>
                  العربية
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link href={lp(locale, "/contact")} onClick={() => setOpen(false)} className="btn-black mt-2">
                  {t.nav.book}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

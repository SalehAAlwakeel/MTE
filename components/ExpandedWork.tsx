"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CounterFX } from "@/components/CounterFX";
import { useLocale } from "@/components/LocaleContext";
import type { FeaturedOffer } from "@/lib/data";
import { lp } from "@/lib/i18n";

const spring = { type: "spring" as const, stiffness: 160, damping: 30, mass: 1 };

function useWide() {
  const [wide, setWide] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const sync = () => setWide(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return wide;
}

export function ExpandedWork({ items }: { items: FeaturedOffer[] }) {
  const featured = items.find((item) => item.featured)?.slug ?? items[0]?.slug;
  const [active, setActive] = useState(featured);
  const wide = useWide();
  const { locale, t } = useLocale();

  return (
    <LayoutGroup>
      <div className="mt-10 flex h-auto flex-col gap-2.5 md:h-[480px] md:flex-row">
        {items.map((item, index) => {
          const isActive = item.slug === active;
          return (
            <motion.div
              key={item.slug}
              role="button"
              tabIndex={0}
              layout
              transition={spring}
              onClick={() => setActive(item.slug)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActive(item.slug);
                }
              }}
              animate={
                wide
                  ? { flexGrow: isActive ? 4.4 : 0.9, flexBasis: 0, height: 480 }
                  : { flexGrow: 0, height: isActive ? 420 : 96 }
              }
              className={`relative min-w-0 cursor-pointer overflow-hidden rounded-[28px] text-start text-white outline-none focus-visible:ring-2 focus-visible:ring-white ${
                isActive ? "ring-4 ring-accent" : "ring-0"
              }`}
              style={{ flexShrink: 1 }}
              aria-expanded={isActive}
              aria-label={`${item.title}${isActive ? t.home.expanded : t.home.collapsed}`}
            >
              <motion.div layout="position" className="absolute inset-0">
                <Image src={item.image} alt={item.imageAlt} fill className="object-cover" sizes="80vw" />
                <div
                  className={`absolute inset-0 transition-colors duration-500 ${
                    isActive ? "bg-gradient-to-t from-black/80 via-black/25 to-black/10" : "bg-black/35"
                  }`}
                />
              </motion.div>

              <AnimatePresence initial={false} mode="popLayout">
                {isActive ? (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ ...spring, delay: 0.08 }}
                    className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 md:p-8"
                  >
                    <div className="mb-3 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-3xl font-semibold md:text-4xl">{item.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/85 md:text-[15px]">{item.text}</p>
                    <div className="mt-5 flex flex-wrap items-center justify-end gap-4">
                      <Link
                        href={lp(locale, item.href)}
                        onClick={(event) => event.stopPropagation()}
                        onPointerDown={(event) => event.stopPropagation()}
                        className="relative z-10 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink"
                      >
                        {t.home.viewOffer}
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="shut"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-end justify-between p-5 md:flex-col md:items-center md:justify-between"
                  >
                    <span className="hidden text-sm font-semibold tracking-[0.16em] md:inline [writing-mode:vertical-rl] rotate-180">
                      {item.title}
                    </span>
                    <span className="text-sm font-semibold md:hidden">{item.title}</span>
                    <span className="text-sm font-semibold tracking-[0.18em] text-white/80">
                      <CounterFX to={index + 1} pad={2} duration={1.1} />
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

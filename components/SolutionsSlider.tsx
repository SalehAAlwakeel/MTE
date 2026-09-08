"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { useLocale } from "@/components/LocaleContext";
import { SolutionImage, Spark } from "@/components/illustrations";
import type { Solution } from "@/lib/data";
import { lp } from "@/lib/i18n";

const GAP = 24;

export function SolutionsSlider({ items }: { items: Solution[] }) {
  const { locale, t } = useLocale();
  const count = items.length;
  const rtl = locale === "ar";
  const viewportRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTRef = useRef(0);
  const velocityRef = useRef(0);
  const hoverRef = useRef(false);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);
  const offset = useMotionValue(0);
  const trackTransform = useTransform(offset, (value) => `translate3d(${value}px, 0, 0)`);
  const stride = slideWidth ? slideWidth + GAP : 0;
  const inset = viewWidth && slideWidth ? (viewWidth - slideWidth) / 2 : 0;

  const goTo = useCallback(
    (next: number, instant = false) => {
      if (!count || !stride) return;
      const wrapped = ((next % count) + count) % count;
      indexRef.current = wrapped;
      setIndex(wrapped);
      const target = inset - wrapped * stride;
      if (instant) {
        offset.set(target);
        return;
      }
      animate(offset, target, { type: "spring", stiffness: 260, damping: 32, mass: 0.9 });
    },
    [count, inset, offset, stride],
  );

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const measure = () => {
      const width = viewport.clientWidth;
      const nextSlide = width * (width < 768 ? 0.86 : 0.74);
      const nextStride = nextSlide + GAP;
      const nextInset = (width - nextSlide) / 2;
      setViewWidth(width);
      setSlideWidth(nextSlide);
      offset.set(nextInset - indexRef.current * nextStride);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [offset]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goTo(index + 1);
      if (event.key === "ArrowLeft") goTo(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || count < 2) return;
    const timer = window.setInterval(() => {
      if (draggingRef.current || hoverRef.current) return;
      goTo(index + 1);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [count, goTo, index]);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("a,button")) return;
    draggingRef.current = true;
    startXRef.current = event.clientX;
    startOffsetRef.current = offset.get();
    lastXRef.current = event.clientX;
    lastTRef.current = performance.now();
    velocityRef.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    const now = performance.now();
    const dx = event.clientX - lastXRef.current;
    const dt = Math.max(8, now - lastTRef.current);
    lastXRef.current = event.clientX;
    lastTRef.current = now;
    velocityRef.current = dx / dt;
    offset.set(startOffsetRef.current + (event.clientX - startXRef.current));
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
    const dragged = offset.get() - startOffsetRef.current;
    const flick = velocityRef.current * 180;
    const delta = dragged + flick;
    const threshold = Math.max(60, stride * 0.18);
    if (delta < -threshold) goTo(index + 1);
    else if (delta > threshold) goTo(index - 1);
    else goTo(index);
  }

  return (
    <section
      className="relative pb-20"
      onMouseEnter={() => {
        hoverRef.current = true;
      }}
      onMouseLeave={() => {
        hoverRef.current = false;
      }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-page to-transparent md:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-page to-transparent md:w-20" />

      <div
        ref={viewportRef}
        className="solutions-slider-viewport cursor-grab overflow-hidden active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <motion.div className="solutions-slider-track flex" style={{ transform: trackTransform }}>
          {items.map((item, itemIndex) => {
            const active = itemIndex === index;
            return (
              <article
                key={item.slug}
                className="shrink-0"
                style={{ width: slideWidth || "74%" }}
                onClick={() => {
                  if (!active && !draggingRef.current) goTo(itemIndex);
                }}
              >
                <div
                  dir={rtl ? "rtl" : "ltr"}
                  className="card h-full p-6 shadow-sm transition-[opacity,transform] duration-300 md:p-8"
                  style={{
                    opacity: active ? 1 : 0.55,
                    transform: `scale(${active ? 1 : 0.94})`,
                  }}
                >
                  <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="mx-auto w-full max-w-[320px]">
                      <SolutionImage src={item.image} alt={item.imageAlt} outline={false} />
                    </div>
                    <div>
                      <p className="serif text-lg text-muted">{t.nav.solutions}</p>
                      <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{item.title}</h2>
                      <p className="mt-4 max-w-xl leading-8 text-soft">{item.long}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.points.map((point) => (
                          <span key={point} className="chip">
                            {point}
                          </span>
                        ))}
                      </div>
                      <div className="mt-8 flex flex-wrap gap-4" onPointerDown={(event) => event.stopPropagation()}>
                        <Link href={lp(locale, "/contact")} className="btn-blue">
                          <Spark className="h-4 w-4" /> {t.nav.book}
                        </Link>
                        <Link href={lp(locale, `/solutions/${item.slug}`)} className="btn-ghost">
                          {t.servicesPage.learn}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </motion.div>
      </div>

      <div className="container-page mt-8 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {items.map((item, itemIndex) => (
            <button
              key={item.slug}
              type="button"
              aria-label={item.title}
              aria-current={itemIndex === index ? "true" : undefined}
              onClick={() => goTo(itemIndex)}
              className={`h-2 rounded-full transition-all ${
                itemIndex === index ? "w-8 bg-accent" : "w-2 bg-line hover:bg-faint"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2" dir="ltr">
          <button type="button" className="btn-ghost px-4 py-3" aria-label={t.solutionsPage.prev} onClick={() => goTo(index - 1)}>
            ←
          </button>
          <button type="button" className="btn-ghost px-4 py-3" aria-label={t.solutionsPage.next} onClick={() => goTo(index + 1)}>
            →
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useLocale } from "@/components/LocaleContext";
import { SolutionImage } from "@/components/illustrations";

export type SolutionCard = {
  slug: string;
  title: string;
  summary: string;
  points: string[];
  image: string;
  imageAlt: string;
};

export function SolutionsArc({ items }: { items: SolutionCard[] }) {
  const { locale } = useLocale();
  const rootRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTRef = useRef(0);
  const reducedRef = useRef(false);
  const [rotation, setRotation] = useState(0);
  const [wide, setWide] = useState(true);

  const count = items.length;
  const step = 360 / count;

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setWide(media.matches);
      reducedRef.current = motion.matches;
    };
    sync();
    media.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    let previous = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.048, (now - previous) / 1000);
      previous = now;

      if (!draggingRef.current && !reducedRef.current) {
        velocityRef.current *= 0.94;
        rotationRef.current += 10 * dt + velocityRef.current * dt;
      }

      setRotation(rotationRef.current);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    lastXRef.current = event.clientX;
    lastTRef.current = performance.now();
    velocityRef.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    const now = performance.now();
    const dx = event.clientX - lastXRef.current;
    const dt = Math.max(0.008, (now - lastTRef.current) / 1000);
    lastXRef.current = event.clientX;
    lastTRef.current = now;
    const delta = (-dx / (wide ? 4.2 : 3.2)) * (locale === "ar" ? -1 : 1);
    rotationRef.current += delta;
    velocityRef.current = delta / dt / 12;
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    draggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  const radius = wide ? 520 : 280;
  const cardWidth = wide ? 280 : 220;

  return (
    <div
      ref={rootRef}
      className="relative mt-10 h-[700px] cursor-grab touch-pan-y select-none overflow-visible active:cursor-grabbing md:h-[820px]"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        className="absolute inset-0"
        style={{
          perspective: wide ? "1600px" : "1100px",
          perspectiveOrigin: "50% 36%",
        }}
      >
        <div
          className="absolute left-1/2 top-[36%] h-0 w-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(${-radius}px) rotateY(${-rotation}deg)`,
          }}
        >
          {items.map((item, index) => {
            const angle = index * step;
            const relative = ((angle - rotation + 540) % 360) - 180;
            const facing = Math.cos((relative * Math.PI) / 180);
            const opacity = Math.max(0.18, 0.22 + facing * 0.78);
            const blur = facing > 0.35 ? 0 : Math.min(6, (0.35 - facing) * 10);

            return (
              <article
                key={item.slug}
                className="absolute left-0 top-0 card p-6 shadow-sm"
                style={{
                  width: cardWidth,
                  transform: `rotateY(${angle}deg) translateZ(${radius}px) translate(-50%, -50%)`,
                  opacity,
                  filter: blur ? `blur(${blur}px)` : undefined,
                  pointerEvents: facing > 0.15 ? "auto" : "none",
                  backfaceVisibility: "hidden",
                }}
              >
                <SolutionImage src={item.image} alt={item.imageAlt} className="mb-4 aspect-[4/3] w-full rounded-2xl" sizes="280px" />
                <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-soft">{item.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.points.map((point) => (
                    <span key={point} className="chip text-xs">
                      {point}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-page to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-page to-transparent md:w-28" />
    </div>
  );
}

"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const STRIPS = 7;
const DURATION = 0.4;
const STAGGER = 0.03;
const PAINT_MS = 40;
const FAILSAFE_MS = 2500;
const EASE: [number, number, number, number] = [0.44, 0, 0.56, 1];

type Phase = "idle" | "covering" | "holding" | "revealing";

function coverMs() {
  return (DURATION + STAGGER * (STRIPS - 1)) * 1000;
}

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

function destinationOf(anchor: HTMLAnchorElement) {
  if (anchor.target && anchor.target !== "_self") return null;
  if (anchor.hasAttribute("download")) return null;
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return null;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  if (url.pathname === window.location.pathname && url.search === window.location.search) return null;
  return `${url.pathname}${url.search}${url.hash}`;
}

function pageFingerprint() {
  const main = document.querySelector("main");
  if (!main) return "";
  return `${window.location.pathname}${window.location.search}::${main.innerText.slice(0, 240)}`;
}

function barY(phase: Phase) {
  if (phase === "covering" || phase === "holding") return "0%";
  if (phase === "revealing") return "105%";
  return "-105%";
}

export function ShutterTransition() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const busy = useRef(false);
  const timers = useRef<number[]>([]);
  const frame = useRef(0);

  function clearWaits() {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    if (frame.current) window.cancelAnimationFrame(frame.current);
    frame.current = 0;
  }

  function later(fn: () => void, ms: number) {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
  }

  function reveal() {
    window.scrollTo(0, 0);
    setPhase("revealing");
    later(() => {
      setPhase("idle");
      busy.current = false;
    }, coverMs());
  }

  function revealAfterPaint() {
    later(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(reveal);
      });
    }, PAINT_MS);
  }

  function waitForSwap(previous: string) {
    const started = performance.now();
    const tick = () => {
      if (pageFingerprint() !== previous || performance.now() - started > FAILSAFE_MS) {
        revealAfterPaint();
        return;
      }
      frame.current = window.requestAnimationFrame(tick);
    };
    frame.current = window.requestAnimationFrame(tick);
  }

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (busy.current || event.defaultPrevented || isModifiedClick(event)) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const next = destinationOf(anchor);
      if (!next) return;

      event.preventDefault();
      event.stopPropagation();
      busy.current = true;
      clearWaits();
      setPhase("covering");

      later(() => {
        const previous = pageFingerprint();
        setPhase("holding");
        router.push(next);
        waitForSwap(previous);
      }, coverMs());
    }

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearWaits();
    };
  }, [router]);

  const active = phase !== "idle";

  return (
    <div
      className={`fixed inset-0 z-[110] flex flex-col ${active ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden
      style={{ visibility: active ? "visible" : "hidden" }}
    >
      {Array.from({ length: STRIPS }, (_, index) => (
        <div key={index} className="relative min-h-0 flex-1 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-accent"
            initial={false}
            animate={{ y: barY(phase) }}
            transition={{
              duration: phase === "idle" ? 0 : DURATION,
              ease: EASE,
              delay: phase === "idle" ? 0 : index * STAGGER,
            }}
          />
        </div>
      ))}
    </div>
  );
}

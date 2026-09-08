"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocale } from "@/components/LocaleContext";
import { localizeDigits, type Locale } from "@/lib/i18n";

type EasingName = "linear" | "smooth" | "spring" | "bounce";

const EASING: Record<EasingName, [number, number, number, number] | "linear"> = {
  linear: "linear",
  smooth: [0, 0, 0.2, 1],
  spring: [0.34, 1.56, 0.64, 1],
  bounce: [0.22, 1.8, 0.5, 1],
};

export function CounterFX({
  to,
  from = 0,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  pad,
  thousands = false,
  delay = 0,
  className = "",
}: {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  pad?: number;
  thousands?: boolean;
  delay?: number;
  className?: string;
}) {
  const { locale } = useLocale();
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const countingUp = to >= from;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const start = () => {
      requestAnimationFrame(() => setStarted(true));
    };

    const inView = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    };

    if (inView()) start();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "80px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [from, to]);

  const layout = useMemo(() => buildLayout(from, to, decimals, thousands, pad), [from, to, decimals, thousands, pad]);

  return (
    <span
      ref={ref}
      dir="ltr"
      className={`inline-flex items-baseline align-baseline tabular-nums leading-none ${className}`}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {prefix ? <span className="mr-[0.08em] leading-none">{prefix}</span> : null}
      <span className="inline-flex items-baseline">
        {layout.map((entry, index) =>
          entry.type === "sep" ? (
            <span key={`s${index}`} className={entry.char === "," ? "opacity-40" : undefined}>
              {entry.char}
            </span>
          ) : (
            <Wheel
              key={`d${index}`}
              fromDigit={entry.fromDigit}
              toDigit={entry.toDigit}
              countingUp={countingUp}
              started={started}
              duration={duration}
              delay={delay}
              locale={locale}
            />
          ),
        )}
      </span>
      {suffix ? <span className="ml-[0.08em]">{suffix}</span> : null}
    </span>
  );
}

function Wheel({
  fromDigit,
  toDigit,
  countingUp,
  started,
  duration,
  delay,
  locale,
}: {
  fromDigit: number;
  toDigit: number;
  countingUp: boolean;
  started: boolean;
  duration: number;
  delay: number;
  locale: Locale;
}) {
  const sequence = getDigitSequence(fromDigit, toDigit, countingUp);
  const endY = `-${(sequence.length - 1) * 1}em`;

  return (
    <span
      className="relative inline-block overflow-hidden align-baseline"
      style={{
        height: "1em",
        width: "0.62em",
        verticalAlign: "baseline",
        maskImage: sequence.length > 1 ? "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)" : undefined,
        WebkitMaskImage: sequence.length > 1 ? "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)" : undefined,
      }}
    >
      <motion.span
        className="absolute inset-x-0 top-0"
        animate={{ y: started ? endY : 0 }}
        transition={started ? { delay, duration, ease: EASING.smooth } : { duration: 0 }}
      >
        {sequence.map((digit, index) => (
          <span key={`${digit}-${index}`} className="flex h-[1em] items-center justify-center leading-none">
            {localizeDigits(digit, locale)}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function getDigitSequence(fromDigit: number, toDigit: number, countingUp: boolean) {
  if (fromDigit === toDigit) return [fromDigit];
  const seq: number[] = [];
  if (countingUp) {
    if (toDigit >= fromDigit) {
      for (let i = fromDigit; i <= toDigit; i += 1) seq.push(i);
    } else {
      for (let i = fromDigit; i <= 9; i += 1) seq.push(i);
      for (let i = 0; i <= toDigit; i += 1) seq.push(i);
    }
  } else if (toDigit <= fromDigit) {
    for (let i = fromDigit; i >= toDigit; i -= 1) seq.push(i);
  } else {
    for (let i = fromDigit; i >= 0; i -= 1) seq.push(i);
    for (let i = 9; i >= toDigit; i -= 1) seq.push(i);
  }
  return seq;
}

function buildLayout(from: number, to: number, decimals: number, thousands: boolean, pad?: number) {
  const fromAbs = Math.abs(from);
  const toAbs = Math.abs(to);
  const fromStr = decimals > 0 ? fromAbs.toFixed(decimals) : Math.round(fromAbs).toString();
  const toStr = decimals > 0 ? toAbs.toFixed(decimals) : Math.round(toAbs).toString();
  const [fromIntRaw, fromDec] = fromStr.split(".");
  const [toIntRaw, toDec] = toStr.split(".");
  const maxLen = Math.max(fromIntRaw.length, toIntRaw.length, pad ?? 0);
  const fromPad = fromIntRaw.padStart(maxLen, "0");
  const toPad = toIntRaw.padStart(maxLen, "0");
  const result: Array<{ type: "digit"; fromDigit: number; toDigit: number } | { type: "sep"; char: string }> = [];

  if (thousands) {
    const template = toPad.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let di = 0;
    for (const ch of template) {
      if (ch === ",") result.push({ type: "sep", char: "," });
      else {
        result.push({ type: "digit", fromDigit: +fromPad[di], toDigit: +toPad[di] });
        di += 1;
      }
    }
  } else {
    for (let i = 0; i < maxLen; i += 1) {
      result.push({ type: "digit", fromDigit: +fromPad[i], toDigit: +toPad[i] });
    }
  }

  if (fromDec && toDec) {
    result.push({ type: "sep", char: "." });
    for (let i = 0; i < fromDec.length; i += 1) {
      result.push({ type: "digit", fromDigit: +fromDec[i], toDigit: +toDec[i] });
    }
  }

  return result;
}

const NUMBER_RE = /(\$?)(\d{1,3}(?:,\d{3})+|\d+)([a-zA-Z%]*)/g;

export function CountText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const { locale } = useLocale();
  const parts: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(NUMBER_RE.source, "g");

  while ((match = re.exec(text))) {
    const [full, prefix, raw, suffix] = match;
    if (match.index > last) parts.push(localizeDigits(text.slice(last, match.index), locale));
    if (/^(19|20)\d{2}$/.test(raw.replace(/,/g, ""))) {
      parts.push(localizeDigits(full, locale));
    } else {
      parts.push(
        <CounterFX
          key={`${match.index}-${full}`}
          to={Number(raw.replace(/,/g, ""))}
          prefix={prefix}
          suffix={suffix}
          thousands={raw.includes(",")}
          pad={raw.startsWith("0") ? raw.replace(/,/g, "").length : undefined}
        />,
      );
    }
    last = match.index + full.length;
  }

  if (last < text.length) parts.push(localizeDigits(text.slice(last), locale));
  return <span className={`align-baseline ${className}`}>{parts}</span>;
}

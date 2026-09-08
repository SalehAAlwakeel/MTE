"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleContext";

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const { t } = useLocale();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-page py-20">
      <p className="serif mb-3 text-lg text-muted">{t.faq.label}</p>
      <h2 className="text-4xl font-semibold tracking-tight">{t.faq.title}</h2>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {items.map((item, index) => {
          const isOpen = open === index;
          return (
            <div key={item.q}>
              <button
                className="flex w-full items-center justify-between gap-6 py-5 text-start text-lg font-semibold"
                onClick={() => setOpen(isOpen ? null : index)}
              >
                {item.q}
                <span className="text-2xl text-faint">{isOpen ? "–" : "+"}</span>
              </button>
              {isOpen && <p className="pb-5 leading-7 text-soft">{item.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

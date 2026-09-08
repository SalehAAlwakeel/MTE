"use client";

import { CounterFX } from "@/components/CounterFX";
import { useLocale } from "@/components/LocaleContext";

export function Process() {
  const { t } = useLocale();
  const steps = t.process.steps;

  return (
    <section id="process" className="container-page py-24">
      <p className="serif mb-3 text-lg text-muted">{t.process.label}</p>
      <h2 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">{t.process.title}</h2>

      <div className="mt-10 grid gap-x-10 gap-y-0 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto_auto]">
        {steps.map((step, index) => (
          <article key={step.title} className="grid grid-rows-[auto_auto_auto_auto] lg:row-span-4 lg:grid-rows-subgrid">
            <div className="mb-5 flex min-h-18 flex-wrap content-start gap-2 lg:min-h-0">
              {step.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mb-3 text-5xl font-semibold tracking-tight text-ink">
              <CounterFX to={index + 1} pad={2} duration={1.2} delay={index * 0.08} />
            </div>
            <h3 className="text-2xl font-semibold">{step.title}</h3>
            <p className="mt-3 mb-10 leading-7 text-soft lg:mb-0">{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

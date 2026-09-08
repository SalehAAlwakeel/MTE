"use client";

import { FormEvent, useState } from "react";
import { useLocale } from "@/components/LocaleContext";
import { lp } from "@/lib/i18n";

export function ContactForm() {
  const { locale, t } = useLocale();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6 shadow-sm md:p-8">
      <label className="block">
        <span className="mb-2 block text-sm font-medium">{t.contact.name}</span>
        <input required name="name" className="w-full rounded-2xl border border-line bg-page px-4 py-3 outline-none focus:border-accent" />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium">{t.contact.email}</span>
        <input required type="email" name="email" className="w-full rounded-2xl border border-line bg-page px-4 py-3 outline-none focus:border-accent" />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium">
          {t.contact.phone} <span className="text-faint">{t.contact.optional}</span>
        </span>
        <input name="phone" className="w-full rounded-2xl border border-line bg-page px-4 py-3 outline-none focus:border-accent" />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium">{t.contact.help}</span>
        <textarea required name="message" rows={5} className="w-full resize-y rounded-2xl border border-line bg-page px-4 py-3 outline-none focus:border-accent" />
      </label>
      <label className="flex items-start gap-3 text-sm text-soft">
        <input required type="checkbox" name="consent" className="mt-1" />
        <span>
          {t.contact.consent}{" "}
          <a href={lp(locale, "/privacy")} className="underline">
            {t.contact.privacy}
          </a>
          .
        </span>
      </label>
      <button className="btn-blue w-full" disabled={status === "sending"}>
        {status === "sending" ? t.contact.sending : t.contact.send}
      </button>
      {status === "ok" && <p className="text-sm text-accent">{t.contact.thanks}</p>}
      {status === "error" && <p className="text-sm text-red-600">{t.contact.error}</p>}
    </form>
  );
}

import Link from "next/link";
import { headers } from "next/headers";
import { getMessages, isLocale, lp } from "@/lib/i18n";

export default async function NotFound() {
  const headerList = await headers();
  const raw = headerList.get("x-locale") ?? "en";
  const locale = isLocale(raw) ? raw : "en";
  const t = getMessages(locale);

  return (
    <section className="container-page py-28 text-center">
      <h1 className="text-5xl font-semibold">{t.notFound.title}</h1>
      <p className="mt-4 text-soft">{t.notFound.text}</p>
      <Link href={lp(locale, "/")} className="btn-black mt-8">
        {t.notFound.back}
      </Link>
    </section>
  );
}

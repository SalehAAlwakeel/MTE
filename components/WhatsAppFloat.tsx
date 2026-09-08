import { WhatsAppIcon } from "@/components/illustrations";
import { getWhatsappHref } from "@/lib/data";
import { getMessages, type Locale } from "@/lib/i18n";

export function WhatsAppFloat({ locale }: { locale: Locale }) {
  const t = getMessages(locale);

  return (
    <a
      href={getWhatsappHref(locale)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.contact.whatsapp}
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_10px_28px_rgba(37,211,102,0.45)] transition hover:scale-105 hover:brightness-110"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

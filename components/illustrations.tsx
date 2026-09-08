import type { ReactNode } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";

const illustrationAlts: Record<Locale, Record<string, string>> = {
  en: {
    hero: "MTE AI",
    print: "3D printing and CNC",
    maintenance: "Industrial maintenance",
    cad: "CAD design and engineering",
    "team-scaling": "Team scaling",
    mvp: "MVP development",
    consulting: "Technology consulting",
    "smart-ecosystems": "Smart ecosystems",
    "digital-transformation": "Digital transformation",
    "custom-software": "Custom software",
  },
  ar: {
    hero: "ذكاء MTE الاصطناعي",
    print: "الطباعة ثلاثية الأبعاد وCNC",
    maintenance: "الصيانة الصناعية",
    cad: "تصميم CAD والهندسة",
    "team-scaling": "توسيع الفريق",
    mvp: "تطوير النسخة الأولى",
    consulting: "الاستشارات التقنية",
    "smart-ecosystems": "المنظومات الذكية",
    "digital-transformation": "التحول الرقمي",
    "custom-software": "البرمجيات المخصصة",
  },
};

const transformLabels: Record<Locale, string[]> = {
  en: ["Plan", "Build", "Ship", "Run"],
  ar: ["خطط", "ابنِ", "سلّم", "شغّل"],
};

type IllustrationName =
  | "ai"
  | "software"
  | "transform"
  | "print"
  | "design"
  | "manufacturing"
  | "industrial"
  | "maintenance"
  | "cad"
  | "team-scaling"
  | "mvp"
  | "consulting"
  | "smart-ecosystems"
  | "digital-transformation"
  | "custom-software"
  | "healthcare";

export function Spark({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.2 13.4 9 20 10.5 13.4 12 12 18.8 10.6 12 4 10.5 10.6 9 12 2.2Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.7 13.5c-.3-.1-1.6-.8-1.8-.9-.3-.1-.4-.1-.6.1s-.7.9-.9 1.1c-.2.2-.3.2-.6.1-1.6-.7-2.7-1.5-3.7-3.3-.2-.3 0-.4.1-.6l.5-.6c.1-.2.2-.3.2-.5s0-.4-.1-.5l-.8-2c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.6.6-1 1.4-1 2.4 0 1.4 1 2.9 1.1 3.1.2.3 2 3.1 4.8 4.3 1.8.7 2.5.8 3.4.7.5 0 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3 0-.1-.3-.2-.6-.3ZM12 2.1C6.5 2.1 2.1 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4A9.9 9.9 0 0 0 12 21.9C17.5 21.9 21.9 17.5 22 12S17.5 2.1 12 2.1Zm0 18c-1.6 0-3.2-.4-4.6-1.3l-.3-.2-3.1.8.8-3-.2-.3A8.1 8.1 0 0 1 3.9 12C4 7.5 7.6 3.9 12 3.9S20 7.5 20.1 12 16.5 20.1 12 20.1Z" />
    </svg>
  );
}

function Scene({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      <div className="absolute inset-[8%] rounded-full bg-[#dbe4ff]" />
      <div className="absolute inset-[18%] rounded-full bg-gradient-to-b from-[#7ea0ff] to-[#093cff] shadow-[0_30px_80px_rgba(9,60,255,0.28)]" />
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

export function HeroIllustration({ locale = "en" }: { locale?: Locale }) {
  return (
    <div className="float relative mx-auto flex h-[460px] w-full max-w-[520px] items-center justify-center">
      <div className="relative h-[78%] w-[78%]">
        <Image src="/ai-robot.png?v=5" alt={illustrationAlts[locale].hero} fill className="object-contain" sizes="(min-width: 1024px) 400px, 70vw" priority />
      </div>
    </div>
  );
}

export function SoftwareIllustration() {
  return (
    <Scene>
      <div className="relative w-56">
        <div className="rounded-[1.6rem] bg-[#0b1b4a] p-3 shadow-2xl">
          <div className="rounded-2xl bg-[#eef2ff] p-4">
            <div className="mb-3 text-2xl font-semibold text-accent">&lt;/&gt;</div>
            <div className="space-y-2">
              <div className="h-2 w-4/5 rounded bg-[#093cff]/30" />
              <div className="h-2 w-3/5 rounded bg-[#093cff]/20" />
              <div className="h-2 w-2/3 rounded bg-[#093cff]/15" />
            </div>
          </div>
        </div>
        <div className="absolute -left-8 top-6 rounded-full bg-white px-3 py-2 text-xs font-bold shadow-lg">TS</div>
        <div className="absolute -right-6 bottom-8 rounded-full bg-white px-3 py-2 text-xs font-bold text-sky-600 shadow-lg">
          React
        </div>
      </div>
    </Scene>
  );
}

export function AiIllustration({ locale = "en" }: { locale?: Locale }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      <div className="absolute inset-[12%]">
        <Image src="/ai-robot.png?v=5" alt={illustrationAlts[locale].hero} fill className="object-contain" sizes="360px" />
      </div>
    </div>
  );
}

export function TransformIllustration({ locale = "en" }: { locale?: Locale }) {
  return (
    <Scene>
      <div className="grid w-52 grid-cols-2 gap-3">
        {transformLabels[locale].map((label, i) => (
          <div key={label} className="rounded-2xl bg-white p-4 shadow-xl" style={{ transform: `translateY(${i % 2 ? 12 : 0}px)` }}>
            <div className="mb-3 h-8 w-8 rounded-full bg-accent/15" />
            <div className="text-sm font-semibold">{label}</div>
          </div>
        ))}
      </div>
    </Scene>
  );
}

export function PrintIllustration({ locale = "en" }: { locale?: Locale }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      <div className="absolute inset-[6%]">
        <Image src="/3d-printing.png?v=1" alt={illustrationAlts[locale].print} fill className="object-contain" sizes="(min-width: 1024px) 400px, 70vw" />
      </div>
    </div>
  );
}

export function DesignIllustration() {
  return (
    <Scene>
      <div className="w-52 rounded-[1.8rem] bg-white p-5 shadow-2xl">
        <div className="mb-4 flex gap-2">
          <span className="h-3 w-3 rounded-full bg-accent" />
          <span className="h-3 w-3 rounded-full bg-[#dbe4ff]" />
          <span className="h-3 w-3 rounded-full bg-line" />
        </div>
        <div className="mb-3 h-20 rounded-2xl bg-gradient-to-br from-[#dbe4ff] to-accent" />
        <div className="space-y-2">
          <div className="h-2 rounded bg-chip" />
          <div className="h-2 w-2/3 rounded bg-chip" />
        </div>
      </div>
    </Scene>
  );
}

export function ManufacturingIllustration() {
  return (
    <Scene>
      <div className="relative h-40 w-52">
        <div className="absolute bottom-0 h-16 w-full rounded-2xl bg-white shadow-xl" />
        <div className="absolute bottom-12 left-6 h-24 w-6 rounded-full bg-[#0b1b4a]" />
        <div className="absolute bottom-20 left-4 h-4 w-28 rounded-full bg-accent" />
        <div className="absolute bottom-16 right-6 h-20 w-16 rounded-xl bg-white shadow-lg" />
      </div>
    </Scene>
  );
}

export function IndustrialIllustration() {
  return (
    <Scene>
      <div className="relative w-56">
        <div className="h-20 rounded-2xl bg-white shadow-xl" />
        <div className="mx-auto -mt-3 h-16 w-40 rounded-xl bg-[#0b1b4a]" />
        <div className="mx-auto mt-2 h-6 w-28 rounded-full bg-accent" />
      </div>
    </Scene>
  );
}

export function MaintenanceIllustration({ locale = "en" }: { locale?: Locale }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      <div className="absolute inset-[8%]">
        <Image src="/industrial-maintenance.png?v=1" alt={illustrationAlts[locale].maintenance} fill className="object-contain" sizes="(min-width: 1024px) 400px, 70vw" />
      </div>
    </div>
  );
}

export function CadIllustration({ locale = "en" }: { locale?: Locale }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div className="absolute inset-[2%]">
        <Image src="/cad-design.png?v=1" alt={illustrationAlts[locale].cad} fill className="object-contain" sizes="(min-width: 1024px) 480px, 80vw" />
      </div>
    </div>
  );
}

export function TeamScalingIllustration({ locale = "en" }: { locale?: Locale }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      <div className="absolute inset-[6%]">
        <Image src="/team-scaling.png?v=1" alt={illustrationAlts[locale]["team-scaling"]} fill className="object-contain" sizes="(min-width: 1024px) 400px, 70vw" />
      </div>
    </div>
  );
}

export function MvpIllustration({ locale = "en" }: { locale?: Locale }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div className="absolute inset-[2%]">
        <Image src="/mvp-development.png?v=1" alt={illustrationAlts[locale].mvp} fill className="object-contain" sizes="(min-width: 1024px) 480px, 80vw" />
      </div>
    </div>
  );
}

export function ConsultingIllustration({ locale = "en" }: { locale?: Locale }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]">
      <div className="absolute inset-[4%]">
        <Image src="/technology-consulting.png?v=1" alt={illustrationAlts[locale].consulting} fill className="object-contain" sizes="(min-width: 1024px) 420px, 75vw" />
      </div>
    </div>
  );
}

export function SmartEcosystemsIllustration({ locale = "en" }: { locale?: Locale }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]">
      <div className="absolute inset-[4%]">
        <Image src="/smart-ecosystems.png?v=1" alt={illustrationAlts[locale]["smart-ecosystems"]} fill className="object-contain" sizes="(min-width: 1024px) 420px, 75vw" />
      </div>
    </div>
  );
}

export function DigitalTransformationIllustration({ locale = "en" }: { locale?: Locale }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div className="absolute inset-[2%]">
        <Image src="/digital-transformation.png?v=1" alt={illustrationAlts[locale]["digital-transformation"]} fill className="object-contain" sizes="(min-width: 1024px) 480px, 80vw" />
      </div>
    </div>
  );
}

export function CustomSoftwareIllustration({ locale = "en" }: { locale?: Locale }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div className="absolute inset-[2%]">
        <Image src="/custom-software.png?v=1" alt={illustrationAlts[locale]["custom-software"]} fill className="object-contain" sizes="(min-width: 1024px) 480px, 80vw" />
      </div>
    </div>
  );
}

export function HealthcareIllustration() {
  return (
    <Scene>
      <div className="flex h-40 w-40 items-center justify-center rounded-[2rem] bg-white shadow-2xl">
        <div className="relative h-20 w-20">
          <div className="absolute left-1/2 top-0 h-20 w-7 -translate-x-1/2 rounded-full bg-accent" />
          <div className="absolute left-0 top-1/2 h-7 w-20 -translate-y-1/2 rounded-full bg-accent" />
        </div>
      </div>
    </Scene>
  );
}

export function SolutionImage({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 420px, 75vw",
  outline = true,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  outline?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] bg-white ${outline ? "border-[3px] border-ink" : ""} ${
        className || "mx-auto aspect-square w-full max-w-[460px]"
      }`}
    >
      <Image src={src} alt={alt} fill className="object-contain p-3" sizes={sizes} />
    </div>
  );
}

export function ServiceIllustration({ name, locale = "en" }: { name: IllustrationName; locale?: Locale }) {
  const map: Record<IllustrationName, ReactNode> = {
    ai: <AiIllustration locale={locale} />,
    software: <SoftwareIllustration />,
    transform: <TransformIllustration locale={locale} />,
    print: <PrintIllustration locale={locale} />,
    design: <DesignIllustration />,
    manufacturing: <ManufacturingIllustration />,
    industrial: <IndustrialIllustration />,
    maintenance: <MaintenanceIllustration locale={locale} />,
    cad: <CadIllustration locale={locale} />,
    "team-scaling": <TeamScalingIllustration locale={locale} />,
    mvp: <MvpIllustration locale={locale} />,
    consulting: <ConsultingIllustration locale={locale} />,
    "smart-ecosystems": <SmartEcosystemsIllustration locale={locale} />,
    "digital-transformation": <DigitalTransformationIllustration locale={locale} />,
    "custom-software": <CustomSoftwareIllustration locale={locale} />,
    healthcare: <HealthcareIllustration />,
  };
  return map[name];
}

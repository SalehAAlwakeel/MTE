export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localeFromPath(pathname: string): Locale {
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
}

export function stripLocale(pathname: string) {
  if (pathname === "/ar" || pathname === "/en") return "/";
  if (pathname.startsWith("/ar/")) return pathname.slice(3);
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}

export function lp(locale: Locale, href: string) {
  const path = href.startsWith("/") ? href : `/${href}`;
  if (locale === "en") return path;
  return path === "/" ? "/ar" : `/ar${path}`;
}

export function switchLocalePath(pathname: string, next: Locale) {
  return lp(next, stripLocale(pathname));
}

const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
const SKIP_DIGIT_KEYS = new Set([
  "slug",
  "href",
  "image",
  "src",
  "email",
  "whatsapp",
  "whatsappEn",
  "whatsappAr",
  "instagram",
  "linkedin",
  "mapsEmbed",
  "mapsUrl",
  "mapsQuery",
  "phoneHref",
  "relatedService",
  "illustration",
]);

// Arabic-Indic digits still read left to right, but the separators inside a phone
// number, range, or grouped figure are bidi-neutral, so the groups flip inside an
// RTL line. Isolate each compound number and force left-to-right order within it.
const COMPOUND_NUMBER = /\+?\d+(?:(?:[.,:/×–—-]|\s(?=\d))\d+)*\+?/g;
const LTR_OPEN = "\u2066\u202d";
const LTR_CLOSE = "\u202c\u2069";

export function toArabicDigits(value: string | number): string {
  return String(value)
    .replace(COMPOUND_NUMBER, (run) => (/\D/.test(run) ? `${LTR_OPEN}${run}${LTR_CLOSE}` : run))
    .replace(/[0-9]/g, (digit) => ARABIC_DIGITS[Number(digit)]);
}

export function localizeDigits(value: string | number, locale: Locale): string {
  return locale === "ar" ? toArabicDigits(value) : String(value);
}

export function arabicDisplayText<T>(value: T): T {
  if (typeof value === "string") return toArabicDigits(value) as T;
  if (Array.isArray(value)) return value.map((item) => arabicDisplayText(item)) as T;
  if (value && typeof value === "object") {
    const next: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      next[key] = SKIP_DIGIT_KEYS.has(key) ? child : arabicDisplayText(child);
    }
    return next as T;
  }
  return value;
}

export type Messages = typeof en;

const en = {
  metaTitle: "MTE — From AI algorithms to precision CNC",
  metaDescription:
    "MTE builds custom software, AI, digital transformation, smart ecosystems, and team capacity — plus industrial 3D printing, CNC, CAD, and carbon fiber.",
  nav: {
    services: "Services",
    solutions: "Solutions",
    work: "Work",
    blog: "Blog",
    book: "Book a strategy call",
    quote: "Request a manufacturing quote",
    openMenu: "Open menu",
    language: "العربية",
    languageEn: "EN",
    home: "MTE home",
  },
  footer: {
    services: "Services",
    solutions: "Solutions",
    company: "Company",
    contact: "Contact",
    whatsapp: "Message us on WhatsApp",
    privacy: "Privacy",
    rights: "All rights reserved.",
    instagram: "Instagram",
    linkedin: "LinkedIn",
  },
  home: {
    headlineBefore: "From AI Algorithms to",
    headlineAccent: "Precision CNC",
    headlineAfter: "We Engineer Your Reality",
    subhead:
      "Eliminate the friction of disconnected vendors. MTE is your integrated technology partner: custom software, AI, digital transformation, and smart ecosystems — plus industrial 3D printing, CNC machining, and carbon fiber. One team from the first line of code to the finished part.",
    ctaStrategy: "Book your free strategy call",
    ctaQuote: "Request a manufacturing quote",
    hookLabel: "The gap",
    hookTitle: "Stop losing time to fragmented supply chains",
    hookP1:
      "When software, CAD, and manufacturing sit with different vendors, work stalls between the drawing and the floor — delays, mix-ups, weaker parts.",
    hookP2:
      "MTE is one ecosystem: AI and code through to CNC. We own the full product lifecycle.",
    unifyLabel: "One partner",
    unifyTitle: "Digital intelligence and physical power, under one roof",
    unifyText:
      "Software, staffed teams, managed platforms, and the shop that makes the part. Prototypes scale without switching vendors.",
    ecoLabel: "What we do",
    ecoTitle: "Our integrated solutions ecosystem",
    capabilitiesLabel: "How we deliver",
    capabilitiesTitle: "The software practice — plus the shop floor",
    capabilitiesText:
      "We can staff your squad, ship an MVP, modernize a system, or print the first units — machines and software on one picture.",
    speedLabel: "Why MTE",
    speedTitle: "Built for speed, scalability, and absolute precision",
    speedText:
      "Partnering with MTE gives you an agile, in-house tech and manufacturing division without the overhead. We focus on your bottom line by reducing time-to-market, optimizing workflows, and delivering flawless components that meet the strictest industry standards.",
    workLabel: "What we offer",
    workTitle: "Software, smart ecosystems, and the shop that makes the part",
    allCases: "All services →",
    viewOffer: "Learn more →",
    expanded: ", expanded",
    collapsed: ", collapsed. Activate to expand",
    statCases: "Core offers",
    statLines: "Service lines",
    statIndustries: "Industries",
    statSpecialists: "Specialists",
    solutionsLabel: "Solutions",
    solutionsTitle: "Ready for your kind of business",
    notFound: "Did not find yourself? We will invent the system with you, from zero.",
    moreProcess: "More about our process →",
    partnersLabel: "Strategic partners",
    partnersTitle: "Companies we build with",
    partnersText:
      "We design and ship both small tools and complex systems. Proven patterns get adapted to your company, or we invent the product with you — side by side.",
    customersLabel: "Our customers",
    customersTitle: "We shipped for",
    customersText:
      "From academies and operators to universities and public institutions — we build the systems they run on every day.",
    tags: [
      "Artificial intelligence",
      "Custom software",
      "Digital transformation",
      "Smart ecosystems",
      "Team scaling",
      "Managed services",
      "MVP development",
      "Technology consulting",
      "SaaS & cloud",
      "IoT",
      "Fintech",
      "E-commerce",
      "EdTech",
      "3D printing",
      "CNC machining",
      "Carbon fiber",
      "CAD design",
      "Industrial maintenance",
    ],
  },
  company: {
    name: "Mechatronics Tech Engineering",
    addressLines: ["Imam Saud bin Abdulaziz Rd.", "Al-Mursalat", "Riyadh 12463, Saudi Arabia"],
  },
  faq: {
    label: "Questions",
    title: "What companies ask first",
  },
  casePage: {
    about: "About the project",
    results: "Results",
    goal: "Goal",
    challenge: "Challenge",
    solution: "Solution",
    industrySolution: "Industry solution",
    seeRelatedSolution: "See related solution →",
    service: "Service",
    seeRelatedService: "See related service →",
    work: "Work",
  },
  ecosystem: [
    {
      slug: "software",
      title: "Custom software",
      text: "Web, mobile, SaaS, and internal platforms built around your process — including cloud delivery and a path off software that can no longer move.",
    },
    {
      slug: "team-scaling",
      title: "Team scaling",
      text: "Add vetted engineers, designers, and AI specialists to your squad when you need capacity. You keep the product; we add the seats.",
    },
    {
      slug: "managed-services",
      title: "Managed services",
      text: "We run, monitor, and improve the applications and platforms you already depend on, so your team can leave firefighting behind.",
    },
    {
      slug: "mvp",
      title: "MVP development",
      text: "A market-ready first version in weeks: enough product to learn from real users, without building the entire platform first.",
    },
    {
      slug: "consulting",
      title: "Technology consulting",
      text: "Audits, architecture, and a sequenced roadmap. We will tell you what to keep, what to retire, and what is worth building.",
    },
    {
      slug: "digital-transformation",
      title: "Digital transformation",
      text: "Modernize legacy systems and manual handoffs with software people will actually use — without freezing the business.",
    },
    {
      slug: "smart-ecosystems",
      title: "Smart ecosystems",
      text: "Connected products, IoT, and plant-floor networks that turn machines, sensors, and software into one operational picture.",
    },
    {
      slug: "3d-printing",
      title: "3D printing & CNC",
      text: "Rapid additive manufacturing, custom carbon fiber, and precision CNC for aerospace, automotive, and industrial work.",
    },
  ],
  offers: [
    {
      slug: "software",
      title: "Custom software",
      text: "Web, mobile, SaaS, and internal platforms built around your process — from the first screen to a system you can keep growing.",
      tags: ["Web", "Mobile", "SaaS"],
    },
    {
      slug: "smart-ecosystems",
      title: "Smart ecosystems",
      text: "Connected products, IoT, and plant-floor networks so machines, sensors, and software share one operational picture.",
      tags: ["IoT", "Connected products", "Plant networks"],
    },
    {
      slug: "3d-printing",
      title: "3D printing & CNC",
      text: "Industrial additive, precision machining, and carbon fiber — from a CAD file to a part you can inspect, install, or sell.",
      tags: ["3D printing", "CNC", "Carbon fiber"],
    },
    {
      slug: "digital-transformation",
      title: "Digital transformation",
      text: "Replace fragile, manual operations with software people will actually use — without freezing the business.",
      tags: ["Legacy", "Process", "Cloud"],
    },
  ],
  process: {
    label: "Our process",
    title: "We design a smart solution with you, end to end",
    you: "You",
    youText: "We need AI, CAD, CNC parts, or a full production cell…",
    mteText: "Understood. Shall we map the process and pick the first slice?",
    steps: [
      {
        title: "Consultation",
        text: "We start by understanding your goals and how the work actually happens on the floor, in the clinic, or inside the product team. Experience from similar projects helps us propose a direction quickly.",
        tags: ["Requirements", "Goals", "Strategy"],
      },
      {
        title: "Design",
        text: "We turn the problem into a technical plan and a manufacturing-ready design. You see architecture, CAD, and the path to a complete solution before we cut metal or write production code.",
        tags: ["Needs", "Architecture", "CAD", "Complete solution"],
      },
      {
        title: "Delivery",
        text: "Development and machining stay visible. You get a durable product you can run, extend, and hand to your team — software, AI, printed parts, or CNC components from the same process.",
        tags: [],
      },
    ],
  },
  contact: {
    label: "Contact",
    title: "Ready to turn concepts into market-ready solutions?",
    text: "Stop managing multiple vendors and start building with an integrated partner. Book a free strategy call or request a manufacturing quote.",
    pageTitle: "Book a strategy call",
    pageText:
      "Starting a project, or still deciding what to build? Write to us. Inquiries are read by the team that would do the work.",
    whatsapp: "Message us on WhatsApp",
    company: "Company",
    studio: "Studio",
    name: "Name",
    email: "Email",
    phone: "Phone",
    optional: "(optional)",
    help: "How can we help?",
    consent: "I agree to the processing of my details so you can handle this inquiry. See how we use data in",
    privacy: "privacy",
    send: "Send inquiry",
    sending: "Sending…",
    thanks: "Thank you. We will get back to you shortly.",
    error: "Something went wrong. Email us directly instead.",
    mapLabel: "Visit us",
    mapTitle: "Our office in Riyadh",
    mapOpen: "Open in Google Maps",
  },
  servicesPage: {
    title: "What we build with you",
    text: "Custom software, staffed pods, managed platforms, smart ecosystems, and the shop that prints or machines the part. Companies call us when a boxed tool cannot follow their process — and when digital and physical work should not live in two vendors.",
    learn: "Learn more →",
    get: "What you get",
    why: "Why it matters",
    invent: "We will invent the rest with you, from zero.",
    seeWork: "See the work →",
  },
  solutionsPage: {
    title: "Ready for your kind of business",
    text: "From plants and industrial fleets to fintech, commerce, education, clinics, and early-stage products — we adapt the same integrated process to your floor.",
    prev: "Previous solution",
    next: "Next solution",
  },
  workPage: {
    title: "Selected work",
    text: "Systems we designed and shipped with operators who needed more than a boxed tool.",
    selected: "Selected case studies",
    consultation: "Free consultation",
    consultationText: "Take the first step on the idea. Book a meeting and we will map the first slice with you.",
    bookMeeting: "Book a meeting →",
    projectDetail: "Project detail",
    whatClientsSay: "What clients say about the work",
  },
  blogPage: {
    title: "Notes from the studio",
    text: "How we think about software, manufacturing, and the gap between a drawing and a running cell.",
    writing: "Our writing",
    writingText: "Notes, examples, and ideas from building software, AI, and additive systems.",
    read: "read",
    back: "← Blog",
  },
  privacy: {
    title: "Privacy",
    text: "We use inquiry details only to respond to your request. We do not sell contact data.",
    p1: "uses the details you send through the contact form only to reply to your inquiry and, if we work together, to deliver the project.",
    p2: "We store name, email, phone if you provide it, and the message. We do not sell this information. You can ask us to delete it at",
    p3: "This page is a working draft for the website. Replace it with counsel-reviewed language before public launch.",
  },
  notFound: {
    title: "Page not found",
    text: "That URL is not part of the MTE site.",
    back: "Back home",
  },
  common: {
    book: "Book a strategy call",
  },
};

const ar: Messages = {
  metaTitle: "MTE — من خوارزميات الذكاء الاصطناعي إلى CNC الدقيق",
  metaDescription:
    "MTE تبني البرمجيات المخصصة، والذكاء الاصطناعي، والتحول الرقمي، والمنظومات الذكية، وتوسيع الفرق — إضافة إلى الطباعة ثلاثية الأبعاد وCNC وتصميم CAD وألياف الكربون.",
  nav: {
    services: "الخدمات",
    solutions: "الحلول",
    work: "أعمالنا",
    blog: "المدونة",
    book: "احجز جلسة استراتيجية",
    quote: "اطلب عرض تصنيع",
    openMenu: "فتح القائمة",
    language: "EN",
    languageEn: "EN",
    home: "الرئيسية",
  },
  footer: {
    services: "الخدمات",
    solutions: "الحلول",
    company: "الشركة",
    contact: "تواصل",
    whatsapp: "راسلنا على واتساب",
    privacy: "الخصوصية",
    rights: "جميع الحقوق محفوظة.",
    instagram: "إنستغرام",
    linkedin: "لينكدإن",
  },
  home: {
    headlineBefore: "من خوارزميات الذكاء الاصطناعي إلى",
    headlineAccent: "CNC الدقيق",
    headlineAfter: "نحن نصمّم واقعك",
    subhead:
      "أزل احتكاك المورّدين المنفصلين. MTE شريكك التقني المتكامل: برمجيات مخصصة، وذكاء اصطناعي، وتحول رقمي، ومنظومات ذكية — إضافة إلى الطباعة الصناعية ثلاثية الأبعاد وCNC وألياف الكربون. فريق واحد من أول سطر كود إلى القطعة النهائية.",
    ctaStrategy: "احجز جلستك الاستراتيجية مجاناً",
    ctaQuote: "اطلب عرض تصنيع",
    hookLabel: "الفجوة",
    hookTitle: "توقّف عن إضاعة الوقت في سلاسل توريد مجزأة",
    hookP1:
      "عندما تنفصل البرمجيات وCAD والتصنيع على مورّدين مختلفين، يتوقف العمل بين الرسم والأرض — تأخير، ولبس، وقطع أضعف.",
    hookP2: "MTE منظومة واحدة: من الذكاء الاصطناعي والكود إلى CNC. نملك دورة حياة المنتج كاملة.",
    unifyLabel: "شريك واحد",
    unifyTitle: "الذكاء الرقمي والقوة المادية تحت سقف واحد",
    unifyText:
      "برمجيات، وفرق مدمجة، ومنصات مُدارة، والورشة التي تصنع القطعة. تنتقل النماذج إلى الإنتاج دون تبديل مورّد.",
    ecoLabel: "ماذا نفعل",
    ecoTitle: "منظومة الحلول المتكاملة",
    capabilitiesLabel: "كيف نسلّم",
    capabilitiesTitle: "ممارسة البرمجيات — ومعها أرض المصنع",
    capabilitiesText:
      "ندعم فريقك، أو نسلّم MVP، أو نحدّث نظاماً، أو نطبع الوحدات الأولى — الآلات والبرمجيات على صورة واحدة.",
    speedLabel: "لماذا MTE",
    speedTitle: "بُنيت للسرعة وقابلية التوسع والدقة المطلقة",
    speedText:
      "الشراكة مع MTE تمنحك قسم تقنية وتصنيع داخلي مرن دون أعبائه. نركّز على ربحيتك عبر تقليص زمن الوصول إلى السوق، وتحسين سير العمل، وتسليم مكوّنات دقيقة وفق أصرم المعايير الصناعية.",
    workLabel: "ماذا نقدّم",
    workTitle: "برمجيات، ومنظومات ذكية، والورشة التي تصنع القطعة",
    allCases: "كل الخدمات ←",
    viewOffer: "اعرف المزيد ←",
    expanded: "، موسّع",
    collapsed: "، مطوي. اضغط للتوسيع",
    statCases: "عروض أساسية",
    statLines: "خطوط الخدمة",
    statIndustries: "قطاعات",
    statSpecialists: "متخصصون",
    solutionsLabel: "الحلول",
    solutionsTitle: "جاهزون لنوع عملك",
    notFound: "لم تجد نفسك؟ سنبتكر النظام معك من الصفر.",
    moreProcess: "المزيد عن أسلوبنا ←",
    partnersLabel: "شركاء استراتيجيون",
    partnersTitle: "شركات نبني معها",
    partnersText: "نصمّم ونسلّم أدواتاً صغيرة وأنظمة معقّدة. نكيّف الأنماط المجرّبة لشركتك، أو نبتكر المنتج معك جنباً إلى جنب.",
    customersLabel: "عملاؤنا",
    customersTitle: "سلّمنا لهم",
    customersText: "من الأكاديميات والمشغّلين إلى الجامعات والمؤسسات العامة — نبني الأنظمة التي يعملون عليها كل يوم.",
    tags: [
      "الذكاء الاصطناعي",
      "البرمجيات المخصصة",
      "التحول الرقمي",
      "المنظومات الذكية",
      "توسيع الفريق",
      "الخدمات المُدارة",
      "تطوير MVP",
      "الاستشارات التقنية",
      "SaaS والسحابة",
      "إنترنت الأشياء",
      "التقنية المالية",
      "التجارة الإلكترونية",
      "تقنية التعليم",
      "الطباعة ثلاثية الأبعاد",
      "تشغيل CNC",
      "ألياف الكربون",
      "تصميم CAD",
      "الصيانة الصناعية",
    ],
  },
  company: {
    name: "ميكاترونكس تك للهندسة",
    addressLines: ["طريق الإمام سعود بن عبدالعزيز", "المرسلات", "الرياض 12463، المملكة العربية السعودية"],
  },
  faq: {
    label: "أسئلة",
    title: "ما تسأله الشركات أولاً",
  },
  casePage: {
    about: "عن المشروع",
    results: "النتائج",
    goal: "الهدف",
    challenge: "التحدي",
    solution: "الحل",
    industrySolution: "حل القطاع",
    seeRelatedSolution: "شاهد الحل المرتبط ←",
    service: "الخدمة",
    seeRelatedService: "شاهد الخدمة المرتبطة ←",
    work: "أعمالنا",
  },
  ecosystem: [
    {
      slug: "software",
      title: "البرمجيات المخصصة",
      text: "منصات ويب وموبايل وسحابة وأنظمة داخلية تُبنى حول عمليتك — بما في ذلك التسليم السحابي ومسار للخروج من برمجيات لم تعد تتحرك.",
    },
    {
      slug: "team-scaling",
      title: "توسيع الفريق",
      text: "أضف مهندسين ومصممين ومتخصصي ذكاء اصطناعي معتمدين إلى فريقك عندما تحتاج سعة. المنتج يبقى لك؛ نحن نضيف المقاعد.",
    },
    {
      slug: "managed-services",
      title: "الخدمات المُدارة",
      text: "نشغّل ونراقب ونحسّن التطبيقات والمنصات التي تعتمد عليها، كي يترك فريقك إطفاء الحرائق.",
    },
    {
      slug: "mvp",
      title: "تطوير MVP",
      text: "نسخة أولى جاهزة للسوق في أسابيع: منتج كافٍ للتعلم من مستخدمين حقيقيين، دون بناء المنصة كاملة أولاً.",
    },
    {
      slug: "consulting",
      title: "الاستشارات التقنية",
      text: "تدقيق ومعمارية وخارطة طريق متسلسلة. نقول لك ماذا تبقي، وماذا تُخرج، وماذا يستحق البناء.",
    },
    {
      slug: "digital-transformation",
      title: "التحول الرقمي",
      text: "حدّث الأنظمة القديمة والتسليم اليدوي ببرمجيات يستخدمها الناس فعلاً — دون تجميد العمل.",
    },
    {
      slug: "smart-ecosystems",
      title: "المنظومات الذكية",
      text: "منتجات متصلة وإنترنت أشياء وشبكات المصنع تحوّل الآلات والمستشعرات والبرمجيات إلى صورة تشغيل واحدة.",
    },
    {
      slug: "3d-printing",
      title: "الطباعة ثلاثية الأبعاد وCNC",
      text: "تصنيع إضافي سريع، وألياف كربون حسب الطلب، وCNC دقيق لقطاعات الفضاء والسيارات والصناعة.",
    },
  ],
  offers: [
    {
      slug: "software",
      title: "البرمجيات المخصصة",
      text: "منصات ويب وموبايل وسحابة وأنظمة داخلية تُبنى حول عمليتك — من أول شاشة إلى نظام يمكنك الاستمرار في توسيعه.",
      tags: ["ويب", "موبايل", "سحابة"],
    },
    {
      slug: "smart-ecosystems",
      title: "المنظومات الذكية",
      text: "منتجات متصلة وإنترنت أشياء وشبكات المصنع كي تتشارك الآلات والمستشعرات والبرمجيات صورة تشغيل واحدة.",
      tags: ["إنترنت أشياء", "منتجات متصلة", "شبكات المصنع"],
    },
    {
      slug: "3d-printing",
      title: "الطباعة ثلاثية الأبعاد وCNC",
      text: "تصنيع إضافي صناعي، وتشغيل دقيق، وألياف كربون — من ملف CAD إلى قطعة يمكن فحصها أو تركيبها أو بيعها.",
      tags: ["طباعة ثلاثية الأبعاد", "CNC", "ألياف الكربون"],
    },
    {
      slug: "digital-transformation",
      title: "التحول الرقمي",
      text: "استبدل العمليات اليدوية الهشة ببرمجيات يستخدمها الناس فعلاً — دون تجميد العمل.",
      tags: ["أنظمة قديمة", "العمليات", "السحابة"],
    },
  ],
  process: {
    label: "أسلوبنا",
    title: "نصمّم حلاً ذكياً معك من البداية إلى النهاية",
    you: "أنت",
    youText: "نحتاج ذكاءً اصطناعياً، أو CAD، أو قطع CNC، أو خلية إنتاج كاملة…",
    mteText: "مفهوم. هل نرسم العملية ونختار الشريحة الأولى؟",
    steps: [
      {
        title: "الاستشارة",
        text: "نبدأ بفهم أهدافك وكيف يجري العمل فعلاً في الورشة أو العيادة أو فريق المنتج. خبرة مشاريع مشابهة تساعدنا على اقتراح اتجاه بسرعة.",
        tags: ["المتطلبات", "الأهداف", "الاستراتيجية"],
      },
      {
        title: "التصميم",
        text: "نحوّل المشكلة إلى خطة تقنية وتصميم جاهز للتصنيع. ترى المعمارية وملفات CAD ومسار الحل الكامل قبل قطع المعدن أو كتابة كود الإنتاج.",
        tags: ["الاحتياج", "المعمارية", "CAD", "حل مكتمل"],
      },
      {
        title: "التسليم",
        text: "التطوير والتشغيل يبقيان مرئيين. تحصل على منتج متين يمكنك تشغيله وتوسيعه وتسليمه لفريقك — برمجيات أو ذكاء اصطناعي أو قطع مطبوعة أو مكوّنات CNC من العملية نفسها.",
        tags: [],
      },
    ],
  },
  contact: {
    label: "تواصل",
    title: "جاهز لتحويل الأفكار إلى حلول جاهزة للسوق؟",
    text: "توقّف عن إدارة مورّدين متعددين وابدأ البناء مع شريك متكامل. احجز جلسة استراتيجية مجانية أو اطلب عرض تصنيع.",
    pageTitle: "احجز جلسة استراتيجية",
    pageText: "تبدأ مشروعاً، أو ما زلت تقرر ماذا تبني؟ اكتب لنا. يقرأ الاستفسارات الفريق الذي سينفّذ العمل.",
    whatsapp: "راسلنا على واتساب",
    company: "الشركة",
    studio: "الاستوديو",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    optional: "(اختياري)",
    help: "كيف يمكننا المساعدة؟",
    consent: "أوافق على معالجة بياناتي للتعامل مع هذا الاستفسار. راجع كيفية استخدام البيانات في",
    privacy: "الخصوصية",
    send: "إرسال الاستفسار",
    sending: "جارٍ الإرسال…",
    thanks: "شكراً لك. سنعود إليك قريباً.",
    error: "حدث خطأ. راسلنا بالبريد مباشرة.",
    mapLabel: "زورونا",
    mapTitle: "مكتبنا في الرياض",
    mapOpen: "افتح في خرائط جوجل",
  },
  servicesPage: {
    title: "ما نبنيه معك",
    text: "برمجيات مخصصة، وفرق مدمجة، ومنصات مُدارة، ومنظومات ذكية، والورشة التي تطبع القطعة أو تشغّلها. تتصل بنا الشركات عندما تعجز الأداة الجاهزة عن مواكبة العملية — وعندما لا ينبغي أن يعيش العمل الرقمي والمادي عند مورّدين اثنين.",
    learn: "اعرف المزيد ←",
    get: "ماذا تحصل",
    why: "لماذا يهم",
    invent: "سنبتكر الباقي معك من الصفر.",
    seeWork: "شاهد الأعمال ←",
  },
  solutionsPage: {
    title: "جاهزون لنوع عملك",
    text: "من المصانع والأساطيل إلى التقنية المالية والتجارة والتعليم والعيادات والمنتجات المبكرة — نكيّف العملية المتكاملة نفسها لأرض عملك.",
    prev: "الحل السابق",
    next: "الحل التالي",
  },
  workPage: {
    title: "أعمال مختارة",
    text: "أنظمة صمّمناها وسلّمناها مع مشغّلين احتاجوا أكثر من أداة جاهزة.",
    selected: "دراسات حالة مختارة",
    consultation: "استشارة مجانية",
    consultationText: "اتخذ الخطوة الأولى. احجز اجتماعاً وسنرسم معك الشريحة الأولى.",
    bookMeeting: "احجز اجتماعاً ←",
    projectDetail: "تفاصيل المشروع",
    whatClientsSay: "ماذا يقول العملاء عن العمل",
  },
  blogPage: {
    title: "ملاحظات من الاستوديو",
    text: "كيف نفكّر في البرمجيات والتصنيع والفجوة بين الرسم وخلية تعمل.",
    writing: "كتاباتنا",
    writingText: "ملاحظات وأمثلة وأفكار من بناء البرمجيات والذكاء الاصطناعي وأنظمة التصنيع الإضافي.",
    read: "قراءة",
    back: "→ المدونة",
  },
  privacy: {
    title: "الخصوصية",
    text: "نستخدم بيانات الاستفسار فقط للرد على طلبك. لا نبيع بيانات التواصل.",
    p1: "تستخدم التفاصيل التي ترسلها عبر نموذج التواصل فقط للرد على استفسارك، وإن عملنا معاً، لتسليم المشروع.",
    p2: "نحتفظ بالاسم والبريد والهاتف إن ذكرته، والرسالة. لا نبيع هذه المعلومات. يمكنك طلب حذفها عبر",
    p3: "هذه صفحة عمل للموقع. استبدلها بصياغة يراجعها مستشار قانوني قبل الإطلاق العام.",
  },
  notFound: {
    title: "الصفحة غير موجودة",
    text: "هذا الرابط ليس جزءاً من موقع MTE.",
    back: "العودة للرئيسية",
  },
  common: {
    book: "احجز جلسة استراتيجية",
  },
};

export const messages: Record<Locale, Messages> = { en, ar };

let arabicMessages: Messages | undefined;

export function getMessages(locale: Locale): Messages {
  if (locale !== "ar") return messages[locale] ?? en;
  return (arabicMessages ??= arabicDisplayText(ar));
}

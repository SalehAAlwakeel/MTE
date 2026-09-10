import { arCases, arPosts, arServices, arSolutions } from "@/lib/ar-content";
import { arabicDisplayText, getMessages, localizeDigits, toArabicDigits, type Locale } from "@/lib/i18n";

export const company = {
  name: "Mechatronics Tech Engineering",
  shortName: "MTE",
  tagline: "From AI algorithms to precision CNC: we engineer your reality.",
  email: "sales@mteksa.com",
  phones: [
    { display: "+966 59 266 2000", href: "tel:+966592662000" },
    { display: "+966 55 252 2913", href: "tel:+966552522913" },
  ],
  phone: "+966 59 266 2000",
  phoneHref: "tel:+966592662000",
  whatsapp: "https://wa.me/966592662000",
  whatsappEn: "https://wa.me/966592662000",
  whatsappAr: "https://wa.me/966552522913",
  instagram: "https://www.instagram.com/",
  linkedin: "https://www.linkedin.com/",
  addressLines: [
    "RHMA2523, 2523 Al Imam Saud Ibn Abdul Aziz Branch Rd, 8027",
    "Al Mursalat",
    "Riyadh 12463, Saudi Arabia",
  ],
  mapsQuery: "RHMA2523, 2523 Al Imam Saud Ibn Abdul Aziz Branch Rd, 8027, Al Mursalat, Riyadh 12463",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=RHMA2523%2C+2523+Al+Imam+Saud+Ibn+Abdul+Aziz+Branch+Rd%2C+8027%2C+Al+Mursalat%2C+Riyadh+12463",
  mapsEmbed:
    "https://maps.google.com/maps?q=24.7550449,46.6818997&z=17&output=embed",
};

export const navServices = [
  { href: "/services/ai", title: "Digital & AI innovation", desc: "AI software, automation, and intelligent products" },
  { href: "/services/software", title: "Custom software", desc: "Web, mobile, SaaS, and internal platforms" },
  { href: "/services/smart-ecosystems", title: "Smart ecosystems", desc: "IoT, connected products, and plant-floor networks" },
  { href: "/services/digital-transformation", title: "Digital transformation", desc: "Legacy modernization and process software" },
  { href: "/services/team-scaling", title: "Team scaling", desc: "Vetted engineers inside your squad" },
  { href: "/services/managed-services", title: "Managed services", desc: "Run and improve live platforms" },
  { href: "/services/mvp", title: "MVP development", desc: "A first version in weeks, not a year" },
  { href: "/services/consulting", title: "Technology consulting", desc: "Audits, architecture, and roadmaps" },
  { href: "/services/3d-printing", title: "3D printing & CNC", desc: "Additive, machining, and carbon fiber" },
  { href: "/services/cad", title: "CAD design & engineering", desc: "Manufacturing-ready models and precise tolerances" },
  { href: "/services/maintenance", title: "Industrial maintenance", desc: "Repair and uptime for printers and CNC cells" },
];

export const navSolutions = [
  { href: "/solutions/manufacturing", title: "Manufacturing systems" },
  { href: "/solutions/industrial", title: "Industrial operations" },
  { href: "/solutions/fintech", title: "Fintech" },
  { href: "/solutions/ecommerce", title: "E-commerce" },
  { href: "/solutions/edtech", title: "EdTech" },
  { href: "/solutions/retail", title: "Retail" },
  { href: "/solutions/healthcare", title: "Healthcare & pharma" },
  { href: "/solutions/startups", title: "Startups" },
  { href: "/solutions/enterprise-ai", title: "Enterprise AI" },
];

export type FeaturedOffer = {
  slug: string;
  href: string;
  title: string;
  text: string;
  tags: string[];
  image: string;
  imageAlt: string;
  featured?: boolean;
};

const featuredOfferMedia = [
  {
    slug: "software",
    featured: true,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Engineers building custom software",
  },
  {
    slug: "smart-ecosystems",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Connected machines on a production floor",
  },
  {
    slug: "3d-printing",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Industrial 3D printing and CNC cell",
  },
  {
    slug: "digital-transformation",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Operations team running a digital workflow",
  },
] as const;

const arOfferAlts: Record<string, string> = {
  software: "مهندسون يبنون برمجيات مخصصة",
  "smart-ecosystems": "آلات متصلة في أرض الإنتاج",
  "3d-printing": "خلية طباعة ثلاثية الأبعاد وتشغيل CNC",
  "digital-transformation": "فريق عمليات يدير تدفقاً رقمياً",
};

export function getFeaturedOffers(locale: Locale): FeaturedOffer[] {
  const copy = getMessages(locale).offers;
  return featuredOfferMedia.map((item) => {
    const text = copy.find((entry) => entry.slug === item.slug);
    return {
      slug: item.slug,
      href: `/services/${item.slug}`,
      title: text?.title ?? item.slug,
      text: text?.text ?? "",
      tags: text?.tags ?? [],
      image: item.image,
      imageAlt: locale === "ar" ? toArabicDigits(arOfferAlts[item.slug] ?? item.imageAlt) : item.imageAlt,
      featured: "featured" in item ? item.featured : false,
    };
  });
}

export const capabilityTags = [
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
];

export const team = [
  { name: "Alex Rahman", role: "Founder, CTO", initials: "AR", color: "#093cff" },
  { name: "Maya Chen", role: "Founder, Head of Product", initials: "MC", color: "#1d4ed8" },
  { name: "Omar Khalil", role: "Lead Engineer", initials: "OK", color: "#2563eb" },
  { name: "Sofia Alvarez", role: "AI Lead", initials: "SA", color: "#3b82f6" },
  { name: "James Okoye", role: "Additive Manufacturing", initials: "JO", color: "#0ea5e9" },
  { name: "Priya Nair", role: "Product Designer", initials: "PN", color: "#0284c7" },
];

export const contactPerson = team[0];

export type Partner = {
  name: string;
  src: string;
  scale?: number;
};

export const partners: Partner[] = [
  { name: "Brain Station 23", src: "/partners/brain-station-23.png" },
  { name: "Avenue", src: "/partners/avenue.png" },
  { name: "Bait Al-Minhaj", src: "/partners/bait-al-minhaj.png" },
];

export const customers: Partner[] = [
  { name: "The CX Academy", src: "/customers/cx-academy.png", scale: 0.34 },
  { name: "Mekaaz", src: "/customers/mekaaz.png" },
  { name: "King Saud University", src: "/customers/king-saud-university.png" },
  { name: "Ministry of Education", src: "/customers/ministry-of-education.png" },
  { name: "Partner mark", src: "/customers/navy-monogram.png" },
  { name: "Emirate of Al-Jouf", src: "/customers/al-jouf-emirate.png" },
];

const arCustomerNames: Record<string, string> = {
  "The CX Academy": "أكاديمية تجربة العميل",
  "King Saud University": "جامعة الملك سعود",
  "Ministry of Education": "وزارة التعليم",
  "Partner mark": "علامة شريك",
  "Emirate of Al-Jouf": "إمارة الجوف",
};

export function getCustomers(locale: Locale) {
  if (locale !== "ar") return customers;
  return customers.map((item) => ({ ...item, name: toArabicDigits(arCustomerNames[item.name] ?? item.name) }));
}

const arPartnerNames: Record<string, string> = {
  "Bait Al-Minhaj": "بيت المنهاج",
};

export function getPartners(locale: Locale) {
  if (locale !== "ar") return partners;
  return partners.map((item) => ({ ...item, name: toArabicDigits(arPartnerNames[item.name] ?? item.name) }));
}

export const processSteps = [
  {
    title: "1. Consultation",
    text: "We start by understanding your goals and how the work actually happens on the floor, in the clinic, or inside the product team. Experience from similar projects helps us propose a direction quickly.",
    tags: ["Requirements", "Goals", "Strategy"],
  },
  {
    title: "2. Design",
    text: "We turn the problem into a technical plan and a clear product design. You see architecture, interfaces, and the path to a complete solution before we write production code.",
    tags: ["Needs", "Architecture", "Design", "Complete solution"],
  },
  {
    title: "3. Delivery",
    text: "Development is agile and visible. You get a durable product you can run, extend, and hand to your team — software, AI, or physical parts from the same process.",
    tags: [],
  },
];

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  quote: string;
  person: string;
  role: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  about: string;
  results: { title: string; text: string }[];
  goal: string;
  challenge: string;
  solution: string;
  relatedService: string;
  relatedSolution: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "helixforge",
    title: "HelixForge",
    subtitle: "Production planning for a precision manufacturer",
    tags: ["Manufacturing", "Internal app", "AI"],
    quote:
      "MTE replaced a stack of spreadsheets with one planning board. Our cell leads see capacity in the morning and adjust the same day, not the next week.",
    person: "Elena Voss",
    role: "Operations Director",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Engineers reviewing a manufacturing line",
    featured: true,
    about:
      "HelixForge machines precision housings for industrial clients. We built an internal planning application and an AI assistant that reads shop-floor data, then a customer portal so buyers can see the same order status as production.",
    results: [
      { title: "Planning without paper", text: "Cell leads build the day on one screen instead of whiteboards and shared files." },
      { title: "Faster response to change", text: "A rush order lands in the plan immediately, without retyping across tools." },
      { title: "More output, same team", text: "Better use of machines and people covered a higher volume without extra headcount." },
    ],
    goal: "Get the entire production day onto one screen. Plans lived in spreadsheets, changes moved by chat, and nobody shared a single source of truth.",
    challenge:
      "The plant could not stop. We mapped how planners already worked, then digitized that flow so the first day with the new system felt familiar, not like a month of training.",
    solution:
      "A planning board with capacity, jobs, and exceptions, plus an AI brief that flags late materials. Customer requests from the portal drop straight into the same plan.",
    relatedService: "/services/software",
    relatedSolution: "/solutions/manufacturing",
  },
  {
    slug: "northline",
    title: "Northline",
    subtitle: "Digital operations for a regional carrier",
    tags: ["Industrial", "Internal app", "Digital transformation"],
    quote:
      "MTE understood the messy reality of dispatch. The new system let us take more jobs with less effort and far fewer evening phone calls.",
    person: "Marcus Hale",
    role: "Managing Director",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Warehouse and logistics operations",
    about:
      "Northline moves industrial freight across three regions. We replaced radio notes and Excel routes with a live operations console and a customer status page.",
    results: [
      { title: "One dispatch screen", text: "Routes, drivers, and exceptions sit together instead of across phones and files." },
      { title: "Customers see the same truth", text: "Status updates publish themselves, so the office stops answering the same question." },
      { title: "Measurable utilization", text: "Planners finally see empty miles and unused windows before the day starts." },
    ],
    goal: "Take dispatch off paper and informal chat. Every change used to require a call, and the customer never saw the same picture as the yard.",
    challenge:
      "Drivers already knew their routes by heart. The product had to respect that knowledge and still give planners a live map they could trust on day one.",
    solution:
      "An operations console, mobile job cards, and a thin customer portal on one data model. New jobs appear in the plan without retyping.",
    relatedService: "/services/digital-transformation",
    relatedSolution: "/solutions/industrial",
  },
  {
    slug: "aether-clinics",
    title: "Aether Clinics",
    subtitle: "Clinic software and patient flow",
    tags: ["Healthcare", "CRM", "Booking"],
    quote:
      "The clinic finally runs as one system. Booking, follow-up, and the front desk stopped fighting each other, and patients notice the difference.",
    person: "Dr. Amira Sen",
    role: "Clinical Director",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Modern clinic reception and care team",
    about:
      "Aether Clinics needed booking, CRM, and treatment notes that matched how clinicians actually work. We delivered a tailored clinic system instead of forcing a generic package.",
    results: [
      { title: "Fewer no-shows", text: "Reminders and a simple reschedule path cut empty chairs without extra staff time." },
      { title: "One patient record", text: "Front desk and clinicians see the same history, consents, and next steps." },
      { title: "Calmer days", text: "The schedule is no longer rebuilt by hand every morning." },
    ],
    goal: "Give the clinic a single operational day: bookings, records, and follow-up without copying between tools.",
    challenge:
      "Clinicians would not adopt a system that added clicks. We designed around their existing sequence, then automated the parts that were only ever busywork.",
    solution:
      "A booking CRM with role-aware views, automated reminders, and a lightweight patient portal. Integrations keep billing and imaging in the loop.",
    relatedService: "/services/software",
    relatedSolution: "/solutions/healthcare",
  },
  {
    slug: "vertex-additive",
    title: "Vertex Additive",
    subtitle: "Production cell for industrial 3D printing",
    tags: ["3D printing", "Software", "Manufacturing"],
    quote:
      "MTE connected our printers, QA, and job queue. We quote faster, waste less material, and can finally treat additive as a real production line.",
    person: "Noah Park",
    role: "Plant Manager",
    image:
      "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Additive manufacturing equipment in a production setting",
    about:
      "Vertex Additive runs industrial polymer and metal printers. We designed print fixtures, then built the job-queue software that schedules machines, tracks powder, and packages QA with every part.",
    results: [
      { title: "Quote to print in hours", text: "Intake, nesting hints, and machine assignment no longer wait on a shared inbox." },
      { title: "Traceable parts", text: "Each serial carries material lot, machine, and inspection without a paper traveler." },
      { title: "Less scrap", text: "Orientation rules and fixture designs we printed in-house cut failed builds." },
    ],
    goal: "Treat additive like a production cell, not a collection of isolated printers and folders of STL files.",
    challenge:
      "Hardware, CAM, and people already had habits. The software had to sit on top of existing machines and still make the floor feel faster on week one.",
    solution:
      "A production console, printed jigs for finishing, and a customer portal for repeat SKUs. AI assists with intake checks before a job reaches a machine.",
    relatedService: "/services/3d-printing",
    relatedSolution: "/solutions/manufacturing",
  },
];

export type Service = {
  slug: string;
  title: string;
  navTitle: string;
  eyebrow: string;
  summary: string;
  hero: string;
  benefitsTitle: string;
  benefits: { title: string; text: string }[];
  whenTitle: string;
  whenText: string;
  faqs: { q: string; a: string }[];
  illustration: "ai" | "software" | "transform" | "print" | "design" | "industrial" | "maintenance" | "cad" | "team-scaling" | "mvp" | "consulting" | "smart-ecosystems" | "digital-transformation" | "custom-software";
  image: string;
  imageAlt: string;
};

const arServiceNav: Record<string, { title: string; desc: string }> = {
  ai: { title: "الابتكار الرقمي والذكاء الاصطناعي", desc: "برمجيات ذكاء اصطناعي وأتمتة ومنتجات ذكية" },
  software: { title: "البرمجيات المخصصة", desc: "منصات ويب وموبايل وسحابة وأنظمة داخلية" },
  "smart-ecosystems": { title: "المنظومات الذكية", desc: "إنترنت أشياء ومنتجات متصلة وشبكات المصنع" },
  "digital-transformation": { title: "التحول الرقمي", desc: "تحديث الأنظمة القديمة وبرمجيات العمليات" },
  "team-scaling": { title: "توسيع الفريق", desc: "مهندسون معتمدون داخل فريقك" },
  "managed-services": { title: "الخدمات المُدارة", desc: "تشغيل وتحسين تطبيقاتك ومنصاتك" },
  mvp: { title: "تطوير MVP", desc: "نسخة أولى جاهزة للسوق في أسابيع" },
  consulting: { title: "الاستشارات التقنية", desc: "تدقيق ومعمارية وخارطة طريق" },
  cad: { title: "تصميم CAD والهندسة", desc: "نماذج جاهزة للتصنيع وتسامحات دقيقة" },
  "3d-printing": { title: "الطباعة ثلاثية الأبعاد وCNC", desc: "تصنيع إضافي وتشغيل وألياف الكربون" },
  maintenance: { title: "الصيانة الصناعية", desc: "إصلاح وتشغيل مستمر للطابعات وCNC" },
};

const arSolutionNav: Record<string, string> = {
  manufacturing: "أنظمة التصنيع",
  industrial: "العمليات الصناعية",
  fintech: "التقنية المالية",
  ecommerce: "التجارة الإلكترونية",
  edtech: "تقنية التعليم",
  retail: "التجزئة",
  healthcare: "الرعاية الصحية والصيدلة",
  startups: "الشركات الناشئة",
  "enterprise-ai": "الذكاء الاصطناعي للمؤسسات",
};

export function getNavServices(locale: Locale) {
  if (locale !== "ar") return navServices;
  return navServices.map((item) => {
    const slug = item.href.split("/").pop() ?? "";
    const ar = arServiceNav[slug];
    return ar
      ? { ...item, title: toArabicDigits(ar.title), desc: toArabicDigits(ar.desc) }
      : { ...item, title: toArabicDigits(item.title), desc: toArabicDigits(item.desc) };
  });
}

export function getNavSolutions(locale: Locale) {
  if (locale !== "ar") return navSolutions;
  return navSolutions.map((item) => {
    const slug = item.href.split("/").pop() ?? "";
    return { ...item, title: toArabicDigits(arSolutionNav[slug] ?? item.title) };
  });
}

export function getProcessSteps(locale: Locale) {
  return getMessages(locale).process.steps;
}

export const services: Service[] = [
  {
    slug: "ai",
    title: "Digital & AI innovation",
    navTitle: "Digital & AI innovation",
    eyebrow: "Services",
    summary: "We future-proof your business through digital transformation, custom AI-powered software, and smart IoT ecosystems that automate complex operations.",
    hero: "We connect AI to your processes so it works with real data, not as a demo on the side.",
    benefitsTitle: "What AI implementation brings you",
    benefits: [
      { title: "AI audit and use cases", text: "We find the places AI will save time or raise quality, not just where it could be used." },
      { title: "Internal assistants", text: "Teams get answers from your own systems without hunting through folders and threads." },
      { title: "Customer and staff chat", text: "Routine questions resolve themselves. The hard cases reach your people with context." },
      { title: "Document automation", text: "Invoices, forms, and contracts move without someone retyping every field." },
      { title: "Wired into your stack", text: "CRM, databases, and shop-floor tools become the source of truth the model uses." },
      { title: "Iterate where it pays", text: "We tune in production and expand only where the numbers justify it." },
    ],
    whenTitle: "When AI integration makes sense",
    whenText:
      "People keep processing the same documents and emails. Support answers the same questions. The company has data but cannot use it. Search is slow. If routine work is eating the week, a focused AI system can give that time back.",
    faqs: [
      { q: "Where will AI actually help?", a: "We start with repeated documents, internal search, and support. We will also tell you where it does not belong." },
      { q: "What will you connect it to?", a: "Your real systems: CRM, files, databases, and internal tools, so answers are specific instead of generic." },
      { q: "How do we know it paid off?", a: "Each rollout has a job it must take over. You see the saved work in the process, not in a slide." },
      { q: "How do we start?", a: "A consultation. We pick the highest-value slice, ship that first, then grow from the result." },
    ],
    illustration: "ai",
    image: "/services/service-ai.png",
    imageAlt: "AI models and a robot connected to live data",
  },
  {
    slug: "software",
    title: "Custom software",
    navTitle: "Custom software",
    eyebrow: "Services",
    summary: "Web, mobile, SaaS, and internal platforms — plus cloud builds, legacy modernization, and the integrations that make them one system.",
    hero: "We take you through the full build: analysis, design, development, cloud deployment, and the years after go-live.",
    benefitsTitle: "What custom software brings you",
    benefits: [
      { title: "Built around your process", text: "The application matches how the company really works, not a generic template." },
      { title: "Web, mobile, and SaaS", text: "Customer products, staff tools, and multi-tenant platforms from the same engineering bench." },
      { title: "Cloud and modernization", text: "New systems on AWS, Azure, or GCP — or a path off a monolith that can no longer move." },
      { title: "Connected to existing tools", text: "ERP, CRM, payments, and shop-floor software talk to each other. Nobody copies rows." },
      { title: "Stable in production", text: "The product is built to run for years, not just to demo well." },
      { title: "Room to grow", text: "The architecture can take new products, sites, and teams as you expand." },
    ],
    whenTitle: "When a custom build makes sense",
    whenText:
      "Off-the-shelf tools are getting in the way. Critical work still lives in Excel and email. You need systems to talk, or you need a portal that does not exist yet. Custom software is for teams that want a system they can keep growing.",
    faqs: [
      { q: "What does a custom build cost?", a: "Price follows scope: processes, integrations, and users. After the first consultation you get a staged proposal." },
      { q: "How long does it take?", a: "We ship in short iterations. You see a working slice early. The schedule is part of the technical design." },
      { q: "Will you connect our current systems?", a: "Yes. Integrations are a normal part of the work. Analysis covers what you use today and what must talk." },
      { q: "What happens after launch?", a: "We stay for maintenance, improvements, and the next set of needs as the company changes." },
    ],
    illustration: "custom-software",
    image: "/services/service-software.png",
    imageAlt: "Laptop and tools for a custom software build",
  },
  {
    slug: "digital-transformation",
    title: "Digital transformation",
    navTitle: "Digital transformation",
    eyebrow: "Services",
    summary: "We replace fragile, manual operations with software people will actually use — without freezing the business.",
    hero: "Digitization is not a new logo on old chaos. We map the work, then put it on one screen.",
    benefitsTitle: "What transformation brings you",
    benefits: [
      { title: "A single operational picture", text: "Orders, jobs, and status stop living in five places at once." },
      { title: "Process before product", text: "We describe how the team works today, then digitize that, instead of forcing a foreign workflow." },
      { title: "Adoption on week one", text: "The first version has to be usable immediately. Training is measured in hours, not months." },
      { title: "Less retyping", text: "Data entered once shows up everywhere it is needed." },
      { title: "Visible metrics", text: "Lead time, utilization, and exceptions become numbers you can act on." },
      { title: "A path, not a big bang", text: "We cut the change into stages the business can absorb while it keeps running." },
    ],
    whenTitle: "When transformation is the right move",
    whenText:
      "Growth is limited by coordination, not by demand. People are the integration layer. A new tool was bought and quietly abandoned. If the constraint is how work moves between people, we rebuild that path in software.",
    faqs: [
      { q: "Do we have to replace everything?", a: "No. We keep what works and replace the joints that break: handoffs, status, and duplicate entry." },
      { q: "Will the team accept it?", a: "We design with the people who do the work. The product follows their day, then removes the waste." },
      { q: "How disruptive is the rollout?", a: "We deploy beside the current process, then cut over when the new path is already faster." },
      { q: "What do you deliver first?", a: "The pain that costs the most time — usually planning, status, or customer communication." },
    ],
    illustration: "digital-transformation",
    image: "/services/service-digital-transformation.png",
    imageAlt: "Laptop, cloud, and a continuous digital process",
  },
  {
    slug: "smart-ecosystems",
    title: "Smart ecosystems",
    navTitle: "Smart ecosystems",
    eyebrow: "Services",
    summary: "Connected products, IoT, and plant-floor networks that turn machines, sensors, and software into one operational picture.",
    hero: "A smart ecosystem is not a pile of devices. It is the data path from the sensor to the decision.",
    benefitsTitle: "What a smart ecosystem brings you",
    benefits: [
      { title: "Devices that report in", text: "Printers, mills, sensors, and field hardware publish status instead of waiting for a walk-by." },
      { title: "One operational picture", text: "Dashboards, alerts, and history sit on the same model your software already uses." },
      { title: "Automation between layers", text: "A reading can open a ticket, hold a job, or notify the cell — without a person in the middle." },
      { title: "Product plus plant", text: "The same team can ship a connected product and the cell that builds or services it." },
      { title: "Secure by default", text: "Identity, networks, and update paths are part of the design, not an afterthought." },
      { title: "Room to add nodes", text: "New lines, sites, or product SKUs join the same fabric instead of starting a second stack." },
    ],
    whenTitle: "When a smart ecosystem is the right build",
    whenText:
      "You have machines, a product, or a building that already generates signal — and nobody can see it in one place. Spreadsheets and vendor portals are the integration layer. We connect the physical side to software you can run.",
    faqs: [
      { q: "Is this only factory IoT?", a: "No. We also build connected products, campus networks, and the software that sits on top of both." },
      { q: "Do you supply the hardware?", a: "When the brief needs it. Many projects start with the machines you already own." },
      { q: "How does this meet 3D printing?", a: "Print farms and CNC cells are a natural first ecosystem: queue, material, uptime, and QA on one screen." },
      { q: "How do we start?", a: "We map the devices and the decisions they should trigger, then ship one live loop before we scale the network." },
    ],
    illustration: "smart-ecosystems",
    image: "/services/service-smart-ecosystems.png",
    imageAlt: "Connected home and plant devices in one network",
  },
  {
    slug: "team-scaling",
    title: "Team scaling",
    navTitle: "Team scaling",
    eyebrow: "Services",
    summary: "Add vetted engineers, designers, and AI specialists to your squad when you need capacity — without a permanent hire.",
    hero: "You keep the product and the roadmap. We add people who can ship inside your stack in weeks, not quarters.",
    benefitsTitle: "What team scaling brings you",
    benefits: [
      { title: "Capacity on your terms", text: "Staff a sprint, a launch, or a modernization wave. Stop when the work is done." },
      { title: "People who match the stack", text: "We place engineers against the languages, clouds, and domains you already run." },
      { title: "Embedded, not sidelined", text: "They join your standups, repos, and review culture instead of throwing work over a wall." },
      { title: "AI and cloud specialists", text: "Use cases that need a scarce skill can borrow it without opening a new department." },
      { title: "A lead you can call", text: "A delivery owner sits with the pod so you are not managing a loose list of contractors." },
      { title: "A path to a longer team", text: "If the work becomes standing, the same people can stay as a managed squad." },
    ],
    whenTitle: "When to scale the team instead of buying a project",
    whenText:
      "You already know what to build. The constraint is seats, not ideas. Hiring is too slow, and a full outsource would take the product away from the people who own it.",
    faqs: [
      { q: "How fast can someone start?", a: "Typical placements begin after we match skills and run a short working session. Timing depends on the stack." },
      { q: "Who manages them?", a: "They work inside your process. We provide a delivery lead so quality and communication stay tight." },
      { q: "Can this become a full project later?", a: "Yes. Many clients start with a pod, then ask us to own a workstream end to end." },
      { q: "What roles do you staff?", a: "Software engineers, AI specialists, QA, designers, and technical project leads." },
    ],
    illustration: "team-scaling",
    image: "/services/service-team-scaling.png",
    imageAlt: "A growing product team added to a squad",
  },
  {
    slug: "managed-services",
    title: "Managed services",
    navTitle: "Managed services",
    eyebrow: "Services",
    summary: "End-to-end care for the applications, infrastructure, and digital platforms you already run — so your team can move from firefighting to the next product.",
    hero: "After launch, software still needs owners. We monitor, patch, test, and improve the systems your business cannot pause.",
    benefitsTitle: "What managed services bring you",
    benefits: [
      { title: "Applications kept healthy", text: "Incidents, releases, and small changes have a named team instead of a ticket void." },
      { title: "Infrastructure you do not babysit", text: "Cloud, environments, and backups stay current while you stay on the product." },
      { title: "QA that does not reset", text: "Regression suites and release checks run as a habit, not as a scramble before go-live." },
      { title: "Clear reporting", text: "You see uptime, work completed, and what is next — without chasing status." },
      { title: "Flexible capacity", text: "Scale the retainer when a launch or an incident wave needs more hands." },
      { title: "The same people who can build", text: "When the next feature is approved, you are not briefing a new vendor from zero." },
    ],
    whenTitle: "When managed services are the right contract",
    whenText:
      "The product is live and still changing. Internal IT is already full. You need someone accountable for the next twelve months, not a one-off build that goes quiet after handover.",
    faqs: [
      { q: "Do you only manage what you built?", a: "No. We also take on systems another team shipped, after a short health and access review." },
      { q: "What is in a typical retainer?", a: "Monitoring, incident response, planned improvements, and a monthly plan you approve." },
      { q: "Can this include shop-floor software?", a: "Yes. Production consoles and printer-farm tools are part of the same offer." },
      { q: "How do we start?", a: "A handover workshop, then a 90-day operating plan with named owners on both sides." },
    ],
    illustration: "transform",
    image: "/services/service-managed-services.png",
    imageAlt: "Servers, monitoring, and ongoing platform care",
  },
  {
    slug: "mvp",
    title: "MVP development",
    navTitle: "MVP development",
    eyebrow: "Services",
    summary: "A market-ready first version in weeks: enough product to learn from real users, without building the entire platform first.",
    hero: "We cut the idea to the job that must work, ship that slice, and keep the architecture honest for what comes next.",
    benefitsTitle: "What an MVP brings you",
    benefits: [
      { title: "A real product, not a slide", text: "Users can complete the core job. Stakeholders stop arguing from mockups." },
      { title: "Weeks, not a year", text: "Scope is ruthless. The first release answers demand before you staff a standing team." },
      { title: "AI where it shortens the loop", text: "We use it to draft, test, and iterate faster — and we still review what ships." },
      { title: "A foundation you can keep", text: "The MVP is not throwaway theatre. The next features land on the same code." },
      { title: "Clear kill / grow gates", text: "You decide to stop, pivot, or scale with evidence from the field." },
      { title: "Hardware when the idea needs it", text: "If the product is a part or a cell, we can print or machine the first units beside the software." },
    ],
    whenTitle: "When an MVP is the right first contract",
    whenText:
      "You need to test a market, unlock a round, or replace a painful manual process — and a full platform would be a guess. We build the smallest system that can tell you the truth.",
    faqs: [
      { q: "How long does an MVP take?", a: "Most software slices land in 8–12 weeks. Physical prototypes can sit beside that on a shorter print cycle." },
      { q: "What if we already have a design?", a: "We start from it, strip what is not needed for the first job, and build that." },
      { q: "Will we own the code?", a: "Yes. The repository and the accounts are yours." },
      { q: "What happens after the MVP?", a: "You can pause, take it in-house, or keep us for the next slices and a managed run." },
    ],
    illustration: "mvp",
    image: "/services/service-mvp.png",
    imageAlt: "A first product launching from a laptop",
  },
  {
    slug: "consulting",
    title: "Technology consulting",
    navTitle: "Technology consulting",
    eyebrow: "Services",
    summary: "Audits, architecture, and a roadmap that line your tools up with the work — so you stop paying for software that does not move the needle.",
    hero: "Before we write a line of production code, we will tell you what to keep, what to retire, and what is worth building.",
    benefitsTitle: "What consulting brings you",
    benefits: [
      { title: "A map of the real stack", text: "Systems, vendors, and shadow spreadsheets in one picture — including the plant and the office." },
      { title: "Waste you can name", text: "Duplicate tools, unused licenses, and handoffs that only exist because two systems do not talk." },
      { title: "A sequenced roadmap", text: "What to do this quarter versus next year, with effort and risk attached." },
      { title: "Architecture that can ship", text: "Cloud, data, and integration choices written so an engineering team can execute them." },
      { title: "Build, buy, or blend", text: "We will recommend a product when a product is enough. Custom is not the default." },
      { title: "A door into delivery", text: "If you want the same team to implement the first slice, the brief is already written." },
    ],
    whenTitle: "When to start with consulting",
    whenText:
      "There are too many tools and no shared plan. A transformation was announced without a sequence. Leadership wants a second opinion before a large build or a vendor lock-in.",
    faqs: [
      { q: "How long is an engagement?", a: "Most roadmaps complete in a few weeks of workshops and review, then a written plan." },
      { q: "Do you only advise?", a: "We can stop at the plan. Most clients ask us to take the first build so the advice does not sit on a shelf." },
      { q: "Will you look at the factory as well as IT?", a: "Yes. CAD, printers, CNC, and operations software are part of the same map." },
      { q: "What do we receive?", a: "Findings, a target architecture, a phased backlog, and a costed first slice if you want one." },
    ],
    illustration: "consulting",
    image: "/services/service-consulting.png",
    imageAlt: "A roadmap, compass, and architecture review",
  },
  {
    slug: "3d-printing",
    title: "3D printing & CNC",
    navTitle: "3D printing & CNC",
    eyebrow: "Services",
    summary: "Industrial 3D printing, high-performance custom carbon fiber layups, and precision CNC milling and engraving for aerospace, automotive, and industrial applications.",
    hero: "From a CAD file to a part you can inspect, install, or sell. We print, machine, lay up carbon fiber, and instrument the process.",
    benefitsTitle: "What additive manufacturing brings you",
    benefits: [
      { title: "Functional prototypes", text: "Hold the part in days, test fit and assembly, and change the model before tooling." },
      { title: "Jigs and fixtures", text: "Shop-aids printed to the job, not adapted from catalog leftovers." },
      { title: "Short-run production", text: "Brackets, housings, and ducts without waiting on a mold." },
      { title: "Design for additive", text: "Orientation, lattices, and assemblies that only make sense when you print them." },
      { title: "Production software", text: "Queues, material lots, and QA travel with the part." },
      { title: "Mechatronics fit", text: "Printed parts designed to live next to motors, sensors, and wiring — not just on a render." },
    ],
    whenTitle: "When 3D printing makes sense",
    whenText:
      "Tooling lead time is blocking a decision. You need a fixture next week. A spare is obsolete. A housing must exist around electronics that already shipped. Additive is the right move when waiting on conventional manufacturing costs more than the part.",
    faqs: [
      { q: "What materials do you work with?", a: "Engineering polymers for fixtures and housings, plus partners for metal when the spec requires it. We choose from the job, not from a catalog first." },
      { q: "Is this only prototyping?", a: "No. We also run short production and the software that makes a print farm behave like a cell." },
      { q: "Can you design the part as well?", a: "Yes. Many engagements start with a sketch or a broken sample and end with a printable, inspectable design." },
      { q: "How do software and printing connect?", a: "The same team can build the queue, traceability, and customer portal that sit on top of the machines." },
    ],
    illustration: "print",
    image: "/services/service-3d-printing.png",
    imageAlt: "Industrial 3D printing and CNC machining",
  },
  {
    slug: "design",
    title: "Product design",
    navTitle: "Product design",
    eyebrow: "Services",
    summary: "Visual identity, UX, and interface design that make complex systems feel simple to the people who use them every day.",
    hero: "Software only pays off if people can move through it quickly. We design for that, not for a slide.",
    benefitsTitle: "What design brings you",
    benefits: [
      { title: "Identity that holds", text: "A visual system that works on a product, a machine HMI, and a proposal deck." },
      { title: "Flows before screens", text: "We map the job to be done, then draw the fewest screens that complete it." },
      { title: "Interfaces for operators", text: "Factory, clinic, and field tools designed for gloves, noise, and short attention." },
      { title: "Design with engineering", text: "The same team that draws the UI also knows what the stack can ship." },
      { title: "Accessible by default", text: "Contrast, type, and structure that hold up outside a designer's laptop." },
      { title: "A system, not a one-off", text: "Components you can keep using as the product grows." },
    ],
    whenTitle: "When to bring design in",
    whenText:
      "The product works and still feels hard. Two tools look like they came from different companies. Operators invented their own shortcuts because the official path is too slow. That is a design problem, and it is cheaper to fix before the next build.",
    faqs: [
      { q: "Do you only design, or also build?", a: "Both. Design-only is available, but most clients keep us through implementation so the intent survives." },
      { q: "Can you refresh an existing product?", a: "Yes. We often start with a usability pass on what you already run." },
      { q: "What do we get as files?", a: "A working design system, flows, and handoff the engineers can implement without guessing." },
      { q: "How involved is our team?", a: "We need access to real users for a few sessions. After that, reviews are short and regular." },
    ],
    illustration: "design",
    image: "/services/service-design.png",
    imageAlt: "Interface design tools and a product canvas",
  },
  {
    slug: "cad",
    title: "CAD design & engineering",
    navTitle: "CAD design & engineering",
    eyebrow: "Services",
    summary: "Our engineers translate your concepts into mathematically perfect, manufacturing-ready designs, ensuring structural integrity and precise tolerances before a single machine spins up.",
    hero: "Draw once. Machine, print, or lay up carbon fiber from the same model.",
    benefitsTitle: "What CAD and engineering bring you",
    benefits: [
      { title: "Manufacturing-ready models", text: "Tolerances, stock, and toolpaths considered before anyone cuts." },
      { title: "Structural integrity", text: "Loads, fasteners, and assemblies checked before the first prototype." },
      { title: "From sketch to CAM", text: "A path from concept to CNC, print, or carbon fiber — not a pretty render only." },
      { title: "Change without chaos", text: "Revisions stay linked to the next machine program." },
      { title: "Fit to the cell", text: "Parts designed to live next to fixtures, sensors, and the people who assemble them." },
      { title: "One team with the shop", text: "The same engineers who model also talk to the mill and the printer." },
    ],
    whenTitle: "When CAD engineering is the right first step",
    whenText:
      "You have a concept, a broken sample, or a drawing that cannot be manufactured as-is. We lock the geometry before the cell starts, so software, print, and CNC share one source of truth.",
    faqs: [
      { q: "Do you only model, or also make the part?", a: "Both. Most briefs continue into print, CNC, or carbon fiber with the same team." },
      { q: "What files do we receive?", a: "Native CAD, STEP, drawings, and CAM-ready exports agreed in the brief." },
      { q: "Can you reverse-engineer a sample?", a: "Yes. Many maintenance and spare-part jobs start from a worn original." },
      { q: "How do you work with our plant?", a: "We match machines, materials, and fixtures you already run, or we machine it here." },
    ],
    illustration: "cad",
    image: "/services/service-cad.png",
    imageAlt: "A manufacturing-ready CAD model and calipers",
  },
  {
    slug: "maintenance",
    title: "Industrial maintenance",
    navTitle: "Industrial maintenance",
    eyebrow: "Services",
    summary: "Rapid repair and ongoing maintenance for 3D printers and CNC machines so production does not stop.",
    hero: "We protect continuous production: diagnosis, spare parts, and scheduled care for the cell.",
    benefitsTitle: "What maintenance brings you",
    benefits: [
      { title: "Faster return to cut", text: "Technicians who already know printers and mills, not a generalist queue." },
      { title: "Scheduled care", text: "Calibration, lubrication, and wear parts before they become downtime." },
      { title: "Spares that fit", text: "Printed or machined replacements when the OEM part is months away." },
      { title: "One number to call", text: "Software, CAD, and the shop already sit in the same company." },
      { title: "Less tribal knowledge", text: "Logs and checklists so the next shift can continue the job." },
      { title: "Uptime as the metric", text: "We measure hours the cell ran, not tickets closed." },
    ],
    whenTitle: "When to bring us onto the floor",
    whenText:
      "A printer farm or CNC cell is the constraint. OEM service is slow. You need someone who can print a jig this week and rebuild a spindle path the next. That is industrial maintenance as we run it.",
    faqs: [
      { q: "Which machines do you cover?", a: "Industrial polymer printers and 3-axis to 5-axis CNC mills. We confirm the make during the first visit." },
      { q: "Do you stock parts?", a: "Common wear items plus the ability to print or machine a temporary spare." },
      { q: "Is this only emergency repair?", a: "No. Most contracts are scheduled maintenance with emergency cover." },
      { q: "Can you train our operators?", a: "Yes. Handover includes the checks your team should run between our visits." },
    ],
    illustration: "maintenance",
    image: "/services/service-maintenance.png",
    imageAlt: "Industrial maintenance tools beside a CNC cell",
  },
];

export type Solution = {
  slug: string;
  title: string;
  summary: string;
  points: string[];
  long: string;
  image: string;
  imageAlt: string;
};

export const solutions: Solution[] = [
  {
    slug: "manufacturing",
    title: "Manufacturing systems",
    summary: "Planning, traceability, and additive cells for plants that have outgrown spreadsheets.",
    points: ["Production planning", "Job traceability", "Additive cells"],
    long: "We build the systems manufacturers use to see capacity, release work, and know what happened to each part. When additive is in the mix, the same product can schedule printers and conventional machines together.",
    image: "/solutions/solution-manufacturing.png",
    imageAlt: "Manufacturing floor with CNC and a precision part",
  },
  {
    slug: "industrial",
    title: "Industrial operations",
    summary: "Software that runs more jobs with the same fleet, people, and floor space.",
    points: ["Dispatch", "Field apps", "Customer status"],
    long: "Industrial firms lose hours in coordination. We put routes, jobs, and exceptions on one screen and give customers the same status the yard already has.",
    image: "/solutions/solution-industrial.png",
    imageAlt: "Industrial fleet and dispatch operations",
  },
  {
    slug: "fintech",
    title: "Fintech",
    summary: "Payments, wallets, lending operations, and compliance-minded platforms built for banks and financial products.",
    points: ["Payments", "Digital wallets", "Lending ops"],
    long: "Financial products need software that is careful with money, identity, and audit. We build payment flows, wallet and transfer experiences, and the operations consoles that sit behind them — then connect them to the partners you already use.",
    image: "/solutions/solution-fintech.png",
    imageAlt: "Payments, digital wallet, and financial operations",
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    summary: "Storefronts, catalogs, and fulfillment software that keep pace with orders instead of fighting them.",
    points: ["Storefronts", "Catalogs", "Fulfillment"],
    long: "Retail on the web fails when the catalog, the warehouse, and the customer each have a different story. We build the store, the order path, and the integrations that keep stock and shipping honest.",
    image: "/solutions/solution-ecommerce.png",
    imageAlt: "Online storefront, shopping bag, and fulfillment",
  },
  {
    slug: "edtech",
    title: "EdTech",
    summary: "Learning platforms, assessments, and reporting that institutions can actually run.",
    points: ["Learning platforms", "Assessments", "Reporting"],
    long: "Schools and academies need more than a video page. We build learning systems with live sessions, assignments, integrity checks, and the reports administrators have to file.",
    image: "/solutions/solution-edtech.png",
    imageAlt: "Learning platform, books, and classroom tools",
  },
  {
    slug: "retail",
    title: "Retail",
    summary: "Inventory, customer journeys, and omnichannel sales on one operational picture.",
    points: ["Inventory", "Journeys", "Omnichannel"],
    long: "Stores and digital channels drift apart. We put inventory, promotions, and the customer path on software that both the floor and the site can trust.",
    image: "/solutions/solution-retail.png",
    imageAlt: "Retail storefront, basket, and in-store checkout",
  },
  {
    slug: "healthcare",
    title: "Healthcare & pharma",
    summary: "Clinic operations, HCP programs, and regulated content platforms designed around the people who run the day.",
    points: ["Scheduling", "Clinic CRM", "Compliant portals"],
    long: "Clinics and life-science teams need software that respects how a day of care or education actually runs. We build booking, records, follow-up, and content portals with the integrations billing, imaging, and compliance already require.",
    image: "/solutions/solution-healthcare.png",
    imageAlt: "Clinic care, medical tools, and patient scheduling",
  },
  {
    slug: "startups",
    title: "Startups",
    summary: "Lean first products and a stack you can still grow when the market answers.",
    points: ["MVP", "Product-market fit", "Scale-ready foundations"],
    long: "Early teams need a first version that is real enough to learn from, and a foundation that will not have to be thrown away at the next hire. We ship the slice that tests the idea — software, a connected prototype, or both.",
    image: "/solutions/solution-startups.png",
    imageAlt: "Startup launch pad and first product build",
  },
  {
    slug: "enterprise-ai",
    title: "Enterprise AI",
    summary: "Assistants and automation wired into the systems you already trust.",
    points: ["Internal search", "Document flow", "Support"],
    long: "AI is useful when it reads your contracts, tickets, and machines. We attach models to those sources and measure the hours they return.",
    image: "/solutions/solution-enterprise-ai.png",
    imageAlt: "Enterprise AI models connected to company systems",
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  read: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "anatomy-of-a-custom-system",
    title: "Anatomy of a project: how a custom system is actually built",
    excerpt: "Five phases, four places you can still turn back, and one manufacturing brief as the example.",
    date: "1 Sep 2026",
    author: "Alex Rahman",
    read: "8 min",
    body: [
      "Most custom software fails in the gap between the workshop and the backlog. Someone writes a wish list, a vendor estimates screens, and nobody agrees what “done” means on the floor.",
      "We split the work into five phases: discovery, a thin technical design, a first vertical slice, a hardening pass, and a handover that includes the people who will live in the product.",
      "The useful part is the exits. After discovery you can stop. After the design you can stop. After the first slice you can stop and still have something running. Budget conversations stay honest because each gate has a concrete artifact.",
      "On a recent manufacturing brief the first slice was a planning board with three cells and no AI. The assistant came later, once the board was already the source of truth. That order matters more than the stack.",
    ],
  },
  {
    slug: "ai-that-earns-a-place",
    title: "AI that earns a place on the floor",
    excerpt: "If the model cannot name the job it took over, it is a demo. Here is how we choose the first use case.",
    date: "6 Aug 2026",
    author: "Sofia Alvarez",
    read: "6 min",
    body: [
      "Companies ask for AI the way they used to ask for an app: as a category, not as a job. The first meeting should end with one sentence: which repeated task disappears.",
      "Good first cases are boring. Invoice fields. Warranty emails. “Where is job 4821?” Those have answers in systems you already own.",
      "We refuse projects where the only success metric is “we have AI.” The metric is hours returned or errors removed, measured on the same process two weeks apart.",
      "The model is the easy part. Permissions, evaluation, and a human path for the cases it should not touch are the product.",
    ],
  },
  {
    slug: "additive-as-a-cell",
    title: "Treat 3D printing like a production cell",
    excerpt: "Printers, powder, and folders of STL files are not a factory. The missing layer is operations software.",
    date: "17 Jul 2026",
    author: "James Okoye",
    read: "7 min",
    body: [
      "A printer farm without a queue is a very expensive prototype shop. Jobs arrive as email attachments. Material lots live in someone’s head. QA is a photo in a chat.",
      "The fix is not a more expensive machine. It is the same discipline you already use on CNC: a job, a traveler, a sign-off.",
      "We print fixtures in-house because the finishing step is where most additive programs stall. Software that only tracks the print and ignores support removal is lying about cycle time.",
      "When the cell is instrumented, quoting becomes a known lead time instead of a negotiation. That is when additive starts to replace waiting, not just impress visitors.",
    ],
  },
  {
    slug: "digitize-the-work-not-the-org-chart",
    title: "Digitize the work, not the org chart",
    excerpt: "Transformation projects die when they model departments. Model the job that crosses them.",
    date: "30 Jun 2026",
    author: "Maya Chen",
    read: "5 min",
    body: [
      "A common failure: buy a module per department, then hire people to copy data between the modules. That is the old process with better logos.",
      "We start with a single job — “release a production order,” “book a follow-up,” “answer where the shipment is” — and make that job possible on one screen.",
      "Departments still exist. They just stop being the integration layer. Status is published once and read many times.",
      "If a workshop already has a ritual that works, we keep the ritual and remove the paper. People adopt tools that feel like a faster version of Tuesday.",
    ],
  },
  {
    slug: "prototype-in-forty-eight-hours",
    title: "A working prototype in 48 hours",
    excerpt: "AI shortened the distance from a workshop sketch to a clickable flow. Here is what we still refuse to fake.",
    date: "9 Jun 2026",
    author: "Omar Khalil",
    read: "6 min",
    body: [
      "We can put a believable interface in front of a client in two days. That is useful for deciding scope. It is dangerous if anyone confuses it with a production system.",
      "The prototype answers navigation, language, and whether the job is even the right job. It does not answer load, permissions, or what happens when a machine is offline.",
      "We label the artifact clearly. Stakeholders get to click. Engineers get a list of the lies the prototype is allowed to tell.",
      "Used this way, speed creates better briefs. Used as a substitute for engineering, it creates a second project: rebuilding everything properly.",
    ],
  },
  {
    slug: "why-software-and-hardware-together",
    title: "Why software and 3D printing belong in the same brief",
    excerpt: "Mechatronics problems do not respect the line between a repo and a print bed.",
    date: "19 May 2026",
    author: "Alex Rahman",
    read: "5 min",
    body: [
      "A bracket designed without the sensor it holds will be reprinted. A portal designed without the fixture the operator uses will be ignored. These are the same product.",
      "MTE exists because clients were splitting that work across vendors who never sat in the same review. The CAD changed. The software did not. The floor invented a workaround.",
      "When one team owns the interface and the physical aid, iteration is a day, not a change order between companies.",
      "That is the point of mechatronics as a service line: the part, the program, and the process are designed as one system.",
    ],
  },
];

export function localizeService(item: Service, locale: Locale): Service {
  if (locale !== "ar") return item;
  const copy = arServices[item.slug];
  return arabicDisplayText(copy ? { ...item, ...copy } : item);
}

export function localizeSolution(item: Solution, locale: Locale): Solution {
  if (locale !== "ar") return item;
  const copy = arSolutions[item.slug];
  return arabicDisplayText(copy ? { ...item, ...copy } : item);
}

export function localizeCase(item: CaseStudy, locale: Locale): CaseStudy {
  if (locale !== "ar") return item;
  const copy = arCases[item.slug];
  return arabicDisplayText(copy ? { ...item, ...copy } : item);
}

export function localizePost(item: Post, locale: Locale): Post {
  if (locale !== "ar") return item;
  const copy = arPosts[item.slug];
  return arabicDisplayText(copy ? { ...item, ...copy } : item);
}

export function getDisplayPhones(locale: Locale) {
  return company.phones.map((phone) => ({
    ...phone,
    display: localizeDigits(phone.display, locale),
  }));
}

export function getWhatsappHref(locale: Locale) {
  return locale === "ar" ? company.whatsappAr : company.whatsappEn;
}

export function getServices(locale: Locale = "en") {
  return services.map((item) => localizeService(item, locale));
}

export function getSolutions(locale: Locale = "en") {
  return solutions.map((item) => localizeSolution(item, locale));
}

export function getCaseStudies(locale: Locale = "en") {
  return caseStudies.map((item) => localizeCase(item, locale));
}

export function getPosts(locale: Locale = "en") {
  return posts.map((item) => localizePost(item, locale));
}

export function getService(slug: string, locale: Locale = "en") {
  const item = services.find((entry) => entry.slug === slug);
  return item ? localizeService(item, locale) : undefined;
}

export function getSolution(slug: string, locale: Locale = "en") {
  const item = solutions.find((entry) => entry.slug === slug);
  return item ? localizeSolution(item, locale) : undefined;
}

export function getCase(slug: string, locale: Locale = "en") {
  const item = caseStudies.find((entry) => entry.slug === slug);
  return item ? localizeCase(item, locale) : undefined;
}

export function getPost(slug: string, locale: Locale = "en") {
  const item = posts.find((entry) => entry.slug === slug);
  return item ? localizePost(item, locale) : undefined;
}

export function getCapabilityTags(locale: Locale) {
  return getMessages(locale).home.tags;
}

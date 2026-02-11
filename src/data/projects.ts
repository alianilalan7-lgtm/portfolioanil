export interface ProjectFeature {
  titleKey: string;
  descriptionKey: string;
  icon: string;
}

export interface Project {
  slug: string;
  title: string;
  descriptionKey: string;
  longDescriptionKey: string;
  image: string;
  status: "live" | "beta" | "mvp" | "in-progress" | "paused" | "completed";
  category: string;
  techStack: string[];
  featured: boolean;
  overviewKey: string;
  problemKey: string;
  solutionKey: string;
  features: ProjectFeature[];
  team: { name: string; role: string }[];
  timeline: { duration: string; phase: string; role: string };
  progress: number;
  codeSnippet?: { language: string; title: string; code: string };
  gallery?: string[];
  liveUrl?: string;
  sourceUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "pulse",
    title: "Pulse",
    descriptionKey: "Projects.pulse.description",
    longDescriptionKey: "Projects.pulse.longDescription",
    image: "/images/pulse.jpg",
    status: "paused",
    category: "AI Labs",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Supabase",
      "Tailwind CSS v4",
      "Gemini AI",
      "SST v3 / AWS",
    ],
    featured: true,
    progress: 65,
    overviewKey: "Projects.pulse.overview",
    problemKey: "Projects.pulse.problem",
    solutionKey: "Projects.pulse.solution",
    features: [
      {
        titleKey: "Projects.pulse.features.aiEditorial.title",
        descriptionKey: "Projects.pulse.features.aiEditorial.description",
        icon: "auto_awesome",
      },
      {
        titleKey: "Projects.pulse.features.prediction.title",
        descriptionKey: "Projects.pulse.features.prediction.description",
        icon: "trending_up",
      },
      {
        titleKey: "Projects.pulse.features.ingest.title",
        descriptionKey: "Projects.pulse.features.ingest.description",
        icon: "rss_feed",
      },
      {
        titleKey: "Projects.pulse.features.evidence.title",
        descriptionKey: "Projects.pulse.features.evidence.description",
        icon: "fact_check",
      },
    ],
    codeSnippet: {
      language: "typescript",
      title: "AI Editorial Pipeline - Gemini Integration",
      code: `// Editorial render pipeline with fact verification
async function renderEditorial(article: Article) {
  const factTable = await gemini.extract({
    model: "gemini-2.5-flash",
    prompt: buildFactExtractionPrompt(article),
    schema: FactTableSchema,
  });

  const rewrites = await Promise.all(
    EDITORIAL_STYLES.map((style) =>
      gemini.generate({
        prompt: buildRewritePrompt(article, style),
        facts: factTable, // deterministic verification
      })
    )
  );

  return { factTable, rewrites };
}`,
    },
    team: [{ name: "Ali Anil Alan", role: "AI Product Builder" }],
    timeline: {
      duration: "Completed",
      phase: "Paused",
      role: "Solo Developer",
    },
    liveUrl: "https://pulse-phi-topaz.vercel.app",
  },
  {
    slug: "smart-planning",
    title: "Smart Planning",
    descriptionKey: "Projects.smart-planning.description",
    longDescriptionKey: "Projects.smart-planning.longDescription",
    image: "/images/smart-planning.jpg",
    gallery: ["/images/smart-planning-2.jpg", "/images/smart-planning-3.jpg"],
    status: "in-progress",
    category: "SaaS",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Supabase",
    ],
    featured: true,
    progress: 90,
    overviewKey: "Projects.smart-planning.overview",
    problemKey: "Projects.smart-planning.problem",
    solutionKey: "Projects.smart-planning.solution",
    features: [
      {
        titleKey: "Projects.smart-planning.features.autoScheduling.title",
        descriptionKey:
          "Projects.smart-planning.features.autoScheduling.description",
        icon: "smart_toy",
      },
      {
        titleKey: "Projects.smart-planning.features.budget.title",
        descriptionKey:
          "Projects.smart-planning.features.budget.description",
        icon: "account_balance_wallet",
      },
      {
        titleKey: "Projects.smart-planning.features.employee.title",
        descriptionKey:
          "Projects.smart-planning.features.employee.description",
        icon: "groups",
      },
      {
        titleKey: "Projects.smart-planning.features.timeline.title",
        descriptionKey:
          "Projects.smart-planning.features.timeline.description",
        icon: "view_timeline",
      },
    ],
    team: [{ name: "Ali Anil Alan", role: "AI Product Builder" }],
    timeline: {
      duration: "Ongoing",
      phase: "In Development",
      role: "Solo Developer",
    },
    liveUrl: "https://smart-planing-next.vercel.app",
  },
  {
    slug: "gozcu",
    title: "Gözcü",
    descriptionKey: "Projects.gozcu.description",
    longDescriptionKey: "Projects.gozcu.longDescription",
    image: "/images/gozcu.jpg",
    status: "completed",
    category: "SaaS",
    techStack: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Prisma",
    ],
    featured: true,
    progress: 85,
    overviewKey: "Projects.gozcu.overview",
    problemKey: "Projects.gozcu.problem",
    solutionKey: "Projects.gozcu.solution",
    features: [
      {
        titleKey: "Projects.gozcu.features.machine.title",
        descriptionKey: "Projects.gozcu.features.machine.description",
        icon: "precision_manufacturing",
      },
      {
        titleKey: "Projects.gozcu.features.failure.title",
        descriptionKey: "Projects.gozcu.features.failure.description",
        icon: "report_problem",
      },
      {
        titleKey: "Projects.gozcu.features.maintenance.title",
        descriptionKey: "Projects.gozcu.features.maintenance.description",
        icon: "build_circle",
      },
      {
        titleKey: "Projects.gozcu.features.rbac.title",
        descriptionKey: "Projects.gozcu.features.rbac.description",
        icon: "admin_panel_settings",
      },
    ],
    team: [{ name: "Ali Anil Alan", role: "AI Product Builder" }],
    timeline: {
      duration: "Completed",
      phase: "Completed",
      role: "Solo Developer",
    },
    liveUrl: "https://mizan-flax-seven.vercel.app",
  },
  {
    slug: "academy360",
    title: "Academy360",
    descriptionKey: "Projects.academy360.description",
    longDescriptionKey: "Projects.academy360.longDescription",
    image: "/images/academy360.jpg",
    status: "live",
    category: "SaaS",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Supabase",
      "Zod",
    ],
    featured: true,
    progress: 75,
    overviewKey: "Projects.academy360.overview",
    problemKey: "Projects.academy360.problem",
    solutionKey: "Projects.academy360.solution",
    features: [
      {
        titleKey: "Projects.academy360.features.dashboards.title",
        descriptionKey:
          "Projects.academy360.features.dashboards.description",
        icon: "dashboard",
      },
      {
        titleKey: "Projects.academy360.features.training.title",
        descriptionKey:
          "Projects.academy360.features.training.description",
        icon: "fitness_center",
      },
      {
        titleKey: "Projects.academy360.features.skill.title",
        descriptionKey:
          "Projects.academy360.features.skill.description",
        icon: "insights",
      },
      {
        titleKey: "Projects.academy360.features.multiTenant.title",
        descriptionKey:
          "Projects.academy360.features.multiTenant.description",
        icon: "security",
      },
    ],
    team: [{ name: "Ali Anil Alan", role: "AI Product Builder" }],
    timeline: {
      duration: "Ongoing",
      phase: "Phase 2.5 Complete",
      role: "Solo Developer",
    },
    liveUrl: "https://academy360-one.vercel.app",
    sourceUrl: "https://github.com/alianilalan7-lgtm/academy360",
  },
  {
    slug: "iro-beautyzone",
    title: "IRO Beautyzone",
    descriptionKey: "Projects.iro-beautyzone.description",
    longDescriptionKey: "Projects.iro-beautyzone.longDescription",
    image: "/images/iro-beautyzone-logo.jpg",
    gallery: ["/images/iro-beautyzone.jpg"],
    status: "live",
    category: "Web App",
    techStack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Material Icons",
      "Vercel",
    ],
    featured: true,
    progress: 100,
    overviewKey: "Projects.iro-beautyzone.overview",
    problemKey: "Projects.iro-beautyzone.problem",
    solutionKey: "Projects.iro-beautyzone.solution",
    features: [
      {
        titleKey: "Projects.iro-beautyzone.features.booking.title",
        descriptionKey:
          "Projects.iro-beautyzone.features.booking.description",
        icon: "calendar_today",
      },
      {
        titleKey: "Projects.iro-beautyzone.features.gallery.title",
        descriptionKey:
          "Projects.iro-beautyzone.features.gallery.description",
        icon: "photo_library",
      },
      {
        titleKey: "Projects.iro-beautyzone.features.reviews.title",
        descriptionKey:
          "Projects.iro-beautyzone.features.reviews.description",
        icon: "reviews",
      },
      {
        titleKey: "Projects.iro-beautyzone.features.whatsapp.title",
        descriptionKey:
          "Projects.iro-beautyzone.features.whatsapp.description",
        icon: "chat",
      },
    ],
    team: [{ name: "Ali Anil Alan", role: "AI Product Builder" }],
    timeline: {
      duration: "Ongoing",
      phase: "Final Stage",
      role: "Solo Developer",
    },
    liveUrl: "https://iro-beautyzone.vercel.app",
    sourceUrl: "https://github.com/alianilalan7-lgtm/-robeautyzone",
  },
];

export const categories = ["All Works", "AI Labs", "SaaS", "Web App"];

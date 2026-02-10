export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  status: "live" | "beta" | "mvp" | "in-progress";
  category: string;
  techStack: string[];
  featured: boolean;
  overview: string;
  problem: string;
  solution: string;
  features: { title: string; description: string; icon: string }[];
  team: { name: string; role: string }[];
  timeline: { duration: string; phase: string; role: string };
  liveUrl?: string;
  sourceUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "pulse",
    title: "Pulse",
    description:
      "AI-powered news intelligence platform with multi-perspective analysis and real-time verification.",
    longDescription:
      "Pulse is a modern, high-performance news aggregation platform that uses AI to extract, summarize, and verify news content from various sources. It delivers a clean, clutter-free reading experience with multi-perspective editorial analysis, prediction markets integration, and fact-checking capabilities.",
    image: "/images/pulse.jpg",
    status: "beta",
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
    overview:
      "Pulse redefines how people consume news by combining AI-driven editorial analysis with real-time fact verification. The platform ingests content from multiple RSS sources, groups semantically similar stories, and generates editorial rewrites in five distinct styles \u2014 from deep analytical breakdowns to quick TL;DR summaries. Six specialized AI experts provide unique perspectives across politics, economics, science, sports, culture, and health.",
    problem:
      "Traditional news platforms deliver single-voice reporting that often lacks depth and verification. Users are overwhelmed by information pollution, with no easy way to cross-reference claims, understand multiple perspectives, or verify facts in real-time.",
    solution:
      "Pulse\u2019s editorial render pipeline uses Gemini 2.5 Flash to extract structured fact tables from articles, generate rewrites in 5 editorial styles, and deterministically verify numbers and dates to prevent hallucinations. Combined with Polymarket prediction integration and smart bookmarking, users get a complete intelligence toolkit.",
    features: [
      {
        title: "AI Editorial Pipeline",
        description:
          "Generates rewrites in 5 styles (Analytic, TL;DR, Fact Only, Simple, Humor) with fact extraction using Gemini AI.",
        icon: "auto_awesome",
      },
      {
        title: "Prediction Markets",
        description:
          "Real-time Polymarket integration with AI-powered probability analysis by Dr. Marcus Chen.",
        icon: "trending_up",
      },
      {
        title: "Smart Ingest System",
        description:
          "Automatic RSS/Atom discovery, full-text extraction with Readability, content hashing, and 15-min fetch intervals.",
        icon: "rss_feed",
      },
      {
        title: "Evidence Highlighting",
        description:
          "Links claims directly to primary sources with deterministic verification of numbers and dates.",
        icon: "fact_check",
      },
    ],
    team: [{ name: "Ali Anil Alan", role: "Full-Stack Developer" }],
    timeline: {
      duration: "Ongoing",
      phase: "Beta \u2014 Sprint 3 Completed",
      role: "Solo Developer",
    },
    liveUrl: "https://pulse-phi-topaz.vercel.app",
    sourceUrl: "https://github.com/alianilalan7-lgtm/Pulse",
  },
  {
    slug: "smart-planning",
    title: "Smart Planning",
    description:
      "AI-powered workforce scheduling and shift planning system for retail stores and businesses.",
    longDescription:
      "Smart Planning is an intelligent shift planning and employee management system designed for retail stores. It automatically generates optimal weekly schedules based on business rules, employee availability, skills, and budget constraints \u2014 with drag-and-drop manual editing support.",
    image: "/images/smart-planning.jpg",
    status: "live",
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
    overview:
      "Smart Planning transforms workforce management with an AI-driven scheduling engine that considers employee skills, availability, labor laws, and budget constraints. Managers can view timeline-based daily plans, lock approved shifts, and switch between Protective, Balanced, and Aggressive planning modes to optimize staffing levels.",
    problem:
      "Retail managers spend hours manually creating weekly shift schedules, juggling employee preferences, skill requirements, labor regulations, and budget limits. Mistakes lead to understaffing, overtime costs, and employee dissatisfaction.",
    solution:
      "An auto-scheduling engine that generates optimal plans with one click, respecting all constraints. Managers can fine-tune with drag-and-drop, lock approved shifts, track budget in real-time, and get instant validation against business rules.",
    features: [
      {
        title: "Auto Scheduling",
        description:
          "One-click optimal schedule generation based on rules, skills, availability, and budget constraints.",
        icon: "smart_toy",
      },
      {
        title: "Budget Management",
        description:
          "Real-time weekly hour budget tracking with distribution across departments and planning modes.",
        icon: "account_balance_wallet",
      },
      {
        title: "Employee Management",
        description:
          "Complete personnel management with skills, departments, availability, and leave tracking.",
        icon: "groups",
      },
      {
        title: "Timeline View",
        description:
          "Daily detailed shift visualization with drag-and-drop editing and shift locking.",
        icon: "view_timeline",
      },
    ],
    team: [{ name: "Ali Anil Alan", role: "Full-Stack Developer" }],
    timeline: {
      duration: "Ongoing",
      phase: "Production",
      role: "Solo Developer",
    },
    liveUrl: "https://smart-planing-next.vercel.app",
    sourceUrl: "https://github.com/alianilalan7-lgtm/Smartplaning",
  },
  {
    slug: "gozcu",
    title: "G\u00f6zc\u00fc",
    description:
      "Enterprise-grade inventory, equipment failure, and maintenance management system (mini-CMMS).",
    longDescription:
      "G\u00f6zc\u00fc is a corporate-level Asset Management / mini-CMMS web application for managing company inventory, tracking equipment failures and downtime, and planning preventive maintenance with checklists, notifications, and detailed audit logging.",
    image: "/images/gozcu.jpg",
    status: "live",
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
    overview:
      "G\u00f6zc\u00fc provides a complete asset management solution for industrial and manufacturing environments. It covers the full lifecycle from machine registration and inventory tracking to failure reporting, downtime analysis, cost tracking, and preventive maintenance scheduling \u2014 all with role-based access control and full audit logging.",
    problem:
      "Manufacturing and industrial companies often rely on spreadsheets or outdated systems to track equipment, failures, and maintenance schedules. This leads to missed maintenance windows, unexpected downtime, and inability to analyze failure patterns.",
    solution:
      "A modern web-based CMMS with intuitive dashboards showing critical machines and overdue maintenance, automated notification system for upcoming tasks, comprehensive failure tracking with cost analysis, and Excel export for all reports.",
    features: [
      {
        title: "Machine & Inventory",
        description:
          "Detailed machine registry with filtering, search, and complete equipment lifecycle tracking.",
        icon: "precision_manufacturing",
      },
      {
        title: "Failure Management",
        description:
          "Failure records with downtime tracking, cost analysis, and pattern detection across equipment.",
        icon: "report_problem",
      },
      {
        title: "Maintenance Planning",
        description:
          "Weekly/monthly preventive maintenance scheduling with checklist support and overdue alerts.",
        icon: "build_circle",
      },
      {
        title: "RBAC & Audit Log",
        description:
          "Admin, Technician, and Observer roles with complete audit logging of all critical operations.",
        icon: "admin_panel_settings",
      },
    ],
    team: [{ name: "Ali Anil Alan", role: "Full-Stack Developer" }],
    timeline: {
      duration: "Ongoing",
      phase: "Production",
      role: "Solo Developer",
    },
    liveUrl: "https://mizan-flax-seven.vercel.app",
    sourceUrl: "https://github.com/alianilalan7-lgtm/mizan",
  },
  {
    slug: "academy360",
    title: "Academy360",
    description:
      "Modern online learning platform with course management, progress tracking, and interactive education tools.",
    longDescription:
      "Academy360 is a comprehensive e-learning platform built with Next.js that provides course management, student progress tracking, and interactive learning experiences for educational institutions and independent instructors.",
    image: "/images/academy360.jpg",
    status: "live",
    category: "Web App",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Vercel",
    ],
    featured: true,
    overview:
      "Academy360 delivers a complete learning management experience with a modern, responsive interface. Students can browse courses, track their progress, and engage with interactive content. Instructors get tools to create and manage courses, monitor student performance, and deliver educational content effectively.",
    problem:
      "Many educational platforms are outdated, slow, and offer poor user experiences. Instructors need modern tools to deliver engaging content, while students need intuitive interfaces that make learning enjoyable and trackable.",
    solution:
      "A fast, modern LMS built with Next.js that prioritizes user experience. Server-side rendering ensures quick page loads, while a clean design with Tailwind CSS keeps the interface intuitive. Supabase handles authentication, data storage, and real-time features.",
    features: [
      {
        title: "Course Management",
        description:
          "Create, organize, and publish courses with rich content, modules, and assessments.",
        icon: "school",
      },
      {
        title: "Progress Tracking",
        description:
          "Visual progress indicators and completion tracking for students across all enrolled courses.",
        icon: "trending_up",
      },
      {
        title: "Interactive Learning",
        description:
          "Engaging content delivery with quizzes, assignments, and interactive educational tools.",
        icon: "quiz",
      },
      {
        title: "Analytics Dashboard",
        description:
          "Detailed analytics for instructors to monitor student engagement and course performance.",
        icon: "analytics",
      },
    ],
    team: [{ name: "Ali Anil Alan", role: "Full-Stack Developer" }],
    timeline: {
      duration: "Ongoing",
      phase: "Production",
      role: "Solo Developer",
    },
    liveUrl: "https://academy360-one.vercel.app",
    sourceUrl: "https://github.com/alianilalan7-lgtm/academy360",
  },
  {
    slug: "iro-beautyzone",
    title: "IRO Beautyzone",
    description:
      "Premium nail art studio website with online appointment booking, service gallery, and client reviews.",
    longDescription:
      "IRO Beautyzone is a sleek, mobile-first website for a premium nail art studio in Istanbul. It features online appointment booking, a service showcase, client testimonials, and a gallery \u2014 designed to convert visitors into booked clients.",
    image: "/images/iro-beautyzone.jpg",
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
    overview:
      "IRO Beautyzone\u2019s website serves as the digital storefront for a premium nail art studio in Suadiye, Kad\u0131k\u00f6y, Istanbul. With a 4.9/5 customer satisfaction rating prominently displayed, the site builds trust through client testimonials and showcases the studio\u2019s work through a curated gallery. The 24/7 online booking system converts visitors into appointments.",
    problem:
      "Beauty studios often rely on phone calls and Instagram DMs for bookings, leading to missed appointments and lost revenue. They need a professional online presence that showcases their work and makes booking effortless.",
    solution:
      "A mobile-first website with prominent call-to-action buttons for booking, WhatsApp integration for instant communication, a visual gallery showcasing work quality, and client testimonials that build trust \u2014 all wrapped in a premium design that reflects the studio\u2019s brand.",
    features: [
      {
        title: "Online Booking",
        description:
          "24/7 appointment booking system allowing clients to schedule visits anytime, anywhere.",
        icon: "calendar_today",
      },
      {
        title: "Service Gallery",
        description:
          "Visual showcase of nail art services with detailed descriptions and pricing information.",
        icon: "photo_library",
      },
      {
        title: "Client Reviews",
        description:
          "Testimonial carousel featuring verified client reviews highlighting team members by name.",
        icon: "reviews",
      },
      {
        title: "WhatsApp Integration",
        description:
          "Direct WhatsApp contact for instant communication and quick booking inquiries.",
        icon: "chat",
      },
    ],
    team: [{ name: "Ali Anil Alan", role: "Full-Stack Developer" }],
    timeline: {
      duration: "Ongoing",
      phase: "Production",
      role: "Solo Developer",
    },
    liveUrl: "https://iro-beautyzone.vercel.app",
    sourceUrl: "https://github.com/alianilalan7-lgtm/-robeautyzone",
  },
];

export const categories = ["All Works", "AI Labs", "SaaS", "Web App"];

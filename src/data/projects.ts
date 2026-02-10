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
    slug: "eco-tracker",
    title: "EcoTracker",
    description: "AI-powered carbon footprint monitoring platform for sustainable businesses.",
    longDescription: "A comprehensive sustainability analytics platform that uses machine learning to track, predict, and optimize carbon emissions across supply chains.",
    image: "/images/project-1.jpg",
    status: "live",
    category: "AI Labs",
    techStack: ["Next.js", "Python", "TensorFlow", "PostgreSQL", "Tailwind CSS"],
    featured: true,
    overview: "EcoTracker is a full-stack sustainability platform designed to help businesses monitor and reduce their environmental impact. It combines real-time data ingestion with machine learning models to provide actionable insights.",
    problem: "Businesses struggle to accurately measure and track their carbon footprint across complex supply chains. Existing tools are either too expensive or too complex for mid-sized companies.",
    solution: "We built an intuitive dashboard that automatically ingests data from various business operations, applies ML models to calculate emissions, and provides clear recommendations for reduction strategies.",
    features: [
      { title: "Real-time Monitoring", description: "Live dashboard tracking emissions across all operations with instant alerts.", icon: "monitoring" },
      { title: "AI Predictions", description: "Machine learning models that forecast future emissions based on historical patterns.", icon: "psychology" },
      { title: "Supply Chain Mapping", description: "Visual mapping of emission sources throughout the entire supply chain.", icon: "account_tree" },
      { title: "Compliance Reports", description: "Auto-generated reports that meet regulatory standards for sustainability.", icon: "description" },
    ],
    team: [
      { name: "Ali Anil Alan", role: "Full-Stack Developer" },
      { name: "Sarah Chen", role: "ML Engineer" },
    ],
    timeline: { duration: "6 months", phase: "Production", role: "Lead Developer" },
    liveUrl: "https://eco-tracker.demo",
    sourceUrl: "https://github.com/alianilalan/eco-tracker",
  },
  {
    slug: "neural-garden",
    title: "Neural Garden",
    description: "Generative art platform creating organic, nature-inspired visuals using neural networks.",
    longDescription: "An experimental creative coding platform that uses generative adversarial networks to create unique, nature-inspired digital artworks.",
    image: "/images/project-2.jpg",
    status: "beta",
    category: "AI Labs",
    techStack: ["React", "Three.js", "WebGL", "Python", "PyTorch"],
    featured: true,
    overview: "Neural Garden explores the intersection of artificial intelligence and natural aesthetics. Users can guide AI models to generate unique organic patterns and landscapes.",
    problem: "Creating generative art typically requires deep technical knowledge of both art and programming, making it inaccessible to most creative professionals.",
    solution: "An intuitive web interface that allows artists to guide AI generation through natural language prompts and interactive parameter controls, with real-time WebGL rendering.",
    features: [
      { title: "Interactive Canvas", description: "Real-time WebGL canvas with gesture controls for guiding generation.", icon: "brush" },
      { title: "Style Transfer", description: "Apply artistic styles from famous nature paintings to generated outputs.", icon: "palette" },
      { title: "Export Pipeline", description: "High-resolution export in multiple formats including print-ready files.", icon: "download" },
      { title: "Community Gallery", description: "Share and discover creations from other artists in the community.", icon: "collections" },
    ],
    team: [
      { name: "Ali Anil Alan", role: "Frontend Developer" },
      { name: "Maya Rivera", role: "Creative Director" },
    ],
    timeline: { duration: "4 months", phase: "Beta Testing", role: "Frontend Lead" },
    liveUrl: "https://neural-garden.demo",
    sourceUrl: "https://github.com/alianilalan/neural-garden",
  },
  {
    slug: "watershed-monitor",
    title: "Watershed Monitor",
    description: "Real-time water quality monitoring system for natural watersheds and ecosystems.",
    longDescription: "IoT-powered environmental monitoring platform that tracks water quality metrics across natural watersheds using distributed sensor networks.",
    image: "/images/project-3.jpg",
    status: "mvp",
    category: "Natural Systems",
    techStack: ["Next.js", "Supabase", "Raspberry Pi", "D3.js", "Mapbox"],
    featured: true,
    overview: "Watershed Monitor combines IoT sensors with cloud analytics to provide real-time water quality data for environmental researchers and conservation organizations.",
    problem: "Environmental researchers lack affordable, real-time monitoring tools to track water quality changes across large natural watersheds.",
    solution: "A network of low-cost Raspberry Pi-based sensors connected to a cloud platform that provides real-time dashboards, historical analysis, and automated alerting.",
    features: [
      { title: "Sensor Network", description: "Distributed IoT sensors measuring pH, turbidity, dissolved oxygen, and temperature.", icon: "sensors" },
      { title: "Interactive Maps", description: "Mapbox-powered visualization showing sensor locations and data overlays.", icon: "map" },
      { title: "Alert System", description: "Automated alerts when water quality parameters exceed safe thresholds.", icon: "notifications" },
      { title: "Data Export", description: "CSV and API access for researchers to integrate data into their workflows.", icon: "cloud_download" },
    ],
    team: [
      { name: "Ali Anil Alan", role: "Full-Stack Developer" },
      { name: "Dr. James Park", role: "Environmental Scientist" },
    ],
    timeline: { duration: "8 months", phase: "MVP", role: "Technical Lead" },
    sourceUrl: "https://github.com/alianilalan/watershed-monitor",
  },
  {
    slug: "bloom-commerce",
    title: "Bloom Commerce",
    description: "Sustainable e-commerce platform connecting eco-conscious consumers with local artisans.",
    longDescription: "A marketplace platform built with a focus on sustainability, supporting local artisans and small businesses with transparent supply chains.",
    image: "/images/project-4.jpg",
    status: "live",
    category: "Web Eco",
    techStack: ["Next.js", "Stripe", "Supabase", "Tailwind CSS", "Vercel"],
    featured: false,
    overview: "Bloom Commerce is a modern e-commerce platform that prioritizes sustainability and supports local artisans by providing them with tools to reach eco-conscious consumers.",
    problem: "Small artisans and sustainable producers struggle to compete with large e-commerce platforms that prioritize speed and price over sustainability.",
    solution: "A curated marketplace that highlights the story behind each product, provides transparent supply chain information, and rewards sustainable shopping habits.",
    features: [
      { title: "Artisan Profiles", description: "Rich storytelling pages for each artisan showcasing their craft and values.", icon: "storefront" },
      { title: "Impact Tracking", description: "Track the environmental impact of purchases with carbon offset integration.", icon: "eco" },
      { title: "Local Discovery", description: "Location-based search to find artisans and products near you.", icon: "location_on" },
      { title: "Secure Payments", description: "Stripe-powered payments with support for multiple currencies.", icon: "payments" },
    ],
    team: [
      { name: "Ali Anil Alan", role: "Full-Stack Developer" },
      { name: "Emma Wilson", role: "UX Designer" },
      { name: "Liam Brown", role: "Backend Developer" },
    ],
    timeline: { duration: "5 months", phase: "Production", role: "Lead Developer" },
    liveUrl: "https://bloom-commerce.demo",
    sourceUrl: "https://github.com/alianilalan/bloom-commerce",
  },
  {
    slug: "myco-network",
    title: "Myco Network",
    description: "Decentralized research collaboration platform inspired by mycorrhizal networks.",
    longDescription: "A peer-to-peer collaboration platform for researchers that mimics the information-sharing patterns of fungal networks in forests.",
    image: "/images/project-5.jpg",
    status: "in-progress",
    category: "Natural Systems",
    techStack: ["React", "Node.js", "WebRTC", "D3.js", "MongoDB"],
    featured: false,
    overview: "Myco Network reimagines academic collaboration by creating decentralized knowledge-sharing networks inspired by the mutualistic relationships found in mycorrhizal fungi.",
    problem: "Academic research collaboration is often siloed within institutions, leading to duplicated efforts and slow knowledge transfer across disciplines.",
    solution: "A decentralized platform using WebRTC for peer-to-peer connections, allowing researchers to form organic collaboration networks that share resources and insights.",
    features: [
      { title: "P2P Connections", description: "WebRTC-powered direct connections between researchers without central servers.", icon: "hub" },
      { title: "Knowledge Graph", description: "D3.js visualization of research connections and shared knowledge.", icon: "scatter_plot" },
      { title: "Resource Sharing", description: "Secure sharing of datasets, papers, and research tools.", icon: "share" },
      { title: "Discovery Engine", description: "AI-powered recommendations for potential collaborators and related research.", icon: "explore" },
    ],
    team: [
      { name: "Ali Anil Alan", role: "Full-Stack Developer" },
    ],
    timeline: { duration: "3 months", phase: "Development", role: "Solo Developer" },
    sourceUrl: "https://github.com/alianilalan/myco-network",
  },
  {
    slug: "terra-analytics",
    title: "Terra Analytics",
    description: "Geospatial analytics dashboard for tracking land use changes and deforestation.",
    longDescription: "A satellite data processing platform that uses computer vision to detect and analyze land use changes, deforestation patterns, and urban expansion.",
    image: "/images/project-6.jpg",
    status: "beta",
    category: "AI Labs",
    techStack: ["Next.js", "OpenAI", "Mapbox", "Python", "FastAPI"],
    featured: false,
    overview: "Terra Analytics processes satellite imagery to provide actionable insights about environmental changes, helping NGOs and governments make informed conservation decisions.",
    problem: "Processing and analyzing satellite imagery for environmental monitoring requires specialized expertise and expensive software that most organizations cannot afford.",
    solution: "An accessible web platform that automates satellite image analysis using AI, presenting results through intuitive dashboards and interactive maps.",
    features: [
      { title: "Satellite Processing", description: "Automated ingestion and processing of multi-spectral satellite imagery.", icon: "satellite_alt" },
      { title: "Change Detection", description: "AI-powered detection of deforestation, urbanization, and land use changes.", icon: "compare" },
      { title: "Time Series", description: "Historical analysis showing environmental changes over time.", icon: "timeline" },
      { title: "Custom Reports", description: "Generate detailed reports for specific regions and time periods.", icon: "assessment" },
    ],
    team: [
      { name: "Ali Anil Alan", role: "Full-Stack Developer" },
      { name: "Dr. Lisa Tanaka", role: "Remote Sensing Specialist" },
    ],
    timeline: { duration: "7 months", phase: "Beta", role: "Technical Lead" },
    liveUrl: "https://terra-analytics.demo",
  },
];

export const categories = ["All Works", "AI Labs", "Natural Systems", "Web Eco"];

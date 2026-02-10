export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  pdfUrl: string;
  tags: string[];
}

export const certificates: Certificate[] = [
  {
    id: "uretken-yapay-zeka",
    title: "Üretken Yapay Zekaya Giriş",
    issuer: "Google Cloud",
    date: "3 Şubat 2026",
    credentialUrl: "https://coursera.org/verify/8R1U6O20V97Z",
    pdfUrl: "/certificates/uretken-yapay-zeka.pdf",
    tags: ["AI", "Generative AI", "Google Cloud"],
  },
  {
    id: "buyuk-dil-modelleri",
    title: "Büyük Dil Modellerine Giriş",
    issuer: "Google Cloud",
    date: "3 Şubat 2026",
    credentialUrl: "https://coursera.org/verify/SLO23HRI9S9S",
    pdfUrl: "/certificates/buyuk-dil-modelleri.pdf",
    tags: ["AI", "LLM", "Google Cloud"],
  },
  {
    id: "sorumlu-yapay-zeka",
    title: "Sorumlu Yapay Zeka'ya Giriş",
    issuer: "Google Cloud",
    date: "4 Şubat 2026",
    credentialUrl: "https://coursera.org/verify/DQLSV9WI9JLW",
    pdfUrl: "/certificates/sorumlu-yapay-zeka.pdf",
    tags: ["AI", "Responsible AI", "Google Cloud"],
  },
];

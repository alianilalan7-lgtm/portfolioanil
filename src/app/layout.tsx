import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ali Anil Alan | Portfolio",
  description:
    "Full-stack developer crafting digital experiences with modern web technologies.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${lexend.variable} font-display antialiased bg-forest text-sage`}
      >
        {/* Organic glow orbs */}
        <div className="orb-sage" style={{ top: "-200px", left: "-100px" }} />
        <div className="orb-sand" style={{ top: "400px", right: "-150px" }} />
        <div className="orb-sage" style={{ bottom: "200px", left: "30%" }} />

        <Navbar />
        <main className="relative z-10 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

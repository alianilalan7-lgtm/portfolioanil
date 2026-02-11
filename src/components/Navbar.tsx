"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export default function Navbar() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/" as const, label: t("home") },
    { href: "/certificates" as const, label: t("certificates") },
    { href: "/projects" as const, label: t("projects") },
    { href: "/contact" as const, label: t("contact") },
  ];

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as "en" | "tr" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-forest/80 border-b border-glass-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-colors">
            <span className="text-primary font-heading font-bold text-sm">A</span>
          </div>
          <span className="font-heading font-semibold text-sage">
            alianil<span className="text-primary">.com</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-primary ${
                pathname === link.href
                  ? "text-primary font-medium"
                  : "text-sage/70"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Language Switcher */}
          <div className="flex items-center border border-glass-border rounded-lg overflow-hidden">
            <button
              onClick={() => switchLocale("en")}
              className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                locale === "en"
                  ? "bg-primary text-forest"
                  : "text-sage/60 hover:text-sage hover:bg-forest-lighter"
              }`}
            >
              EN
            </button>
            <div className="w-px h-4 bg-glass-border" />
            <button
              onClick={() => switchLocale("tr")}
              className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                locale === "tr"
                  ? "bg-primary text-forest"
                  : "text-sage/60 hover:text-sage hover:bg-forest-lighter"
              }`}
            >
              TR
            </button>
          </div>

          <a
            href="https://github.com/alianilalan7-lgtm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sage/70 hover:text-primary transition-colors"
          >
            <span className="material-icons text-xl">code</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-sage/70 hover:text-primary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-icons">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-glass-border bg-forest/95 backdrop-blur-xl">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm transition-colors hover:text-primary ${
                  pathname === link.href
                    ? "text-primary font-medium"
                    : "text-sage/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-2 pt-2 border-t border-glass-border">
              <button
                onClick={() => {
                  switchLocale("en");
                  setMobileOpen(false);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  locale === "en"
                    ? "bg-primary text-forest"
                    : "text-sage/60 border border-glass-border hover:text-sage"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => {
                  switchLocale("tr");
                  setMobileOpen(false);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  locale === "tr"
                    ? "bg-primary text-forest"
                    : "text-sage/60 border border-glass-border hover:text-sage"
                }`}
              >
                TR
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export default function Navbar() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const primaryLinks = [
    { href: "/services" as const, label: t("services") },
    { href: "/projects" as const, label: t("projects") },
    { href: "/case-studies" as const, label: t("caseStudies") },
    { href: "/blog" as const, label: t("blog") },
    { href: "/contact" as const, label: t("contact") },
  ];

  const secondaryLinks = [
    { href: "/process" as const, label: t("process") },
    { href: "/faq" as const, label: t("faq") },
    { href: "/certificates" as const, label: t("certificates") },
  ];

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as "en" | "tr" });
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-forest/80 border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-colors">
            <span className="text-primary font-heading font-bold text-sm">A</span>
          </div>
          <span className="font-heading font-semibold text-sage">
            alianil<span className="text-primary">.com</span>
          </span>
        </Link>

        {/* Desktop Primary Links */}
        <div className="hidden md:flex items-center gap-7">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-primary ${
                isActive(link.href)
                  ? "text-primary font-medium"
                  : "text-sage/70"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-forest text-sm font-semibold hover:bg-primary-light transition-colors"
          >
            {t("bookCall")}
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
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

          <div ref={moreMenuRef} className="relative">
            <button
              onClick={() => setMoreOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-glass-border text-sage/80 hover:text-primary hover:border-primary/30 transition-colors text-sm"
              aria-expanded={moreOpen}
              aria-haspopup="menu"
            >
              {t("more")}
              <span className="material-icons text-base">
                {moreOpen ? "expand_less" : "expand_more"}
              </span>
            </button>

            {moreOpen && (
              <div className="absolute top-12 right-0 w-56 rounded-xl border border-glass-border bg-forest/95 backdrop-blur-xl p-2 shadow-xl">
                {secondaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive(link.href)
                        ? "text-primary bg-primary/10"
                        : "text-sage/70 hover:text-primary hover:bg-primary/10"
                    }`}
                    onClick={() => setMoreOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                <a
                  href="https://github.com/alianilalan7-lgtm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block rounded-lg px-3 py-2 text-sm text-sage/70 hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  GitHub
                </a>
              </div>
            )}
          </div>
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
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm transition-colors hover:text-primary ${
                  isActive(link.href)
                    ? "text-primary font-medium"
                    : "text-sage/70"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-glass-border pt-3">
              <p className="text-xs uppercase tracking-wide text-sage/40 mb-2">
                {t("more")}
              </p>
              <div className="flex flex-col gap-2">
                {secondaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm transition-colors hover:text-primary ${
                      isActive(link.href)
                        ? "text-primary font-medium"
                        : "text-sage/70"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="inline-flex justify-center items-center px-4 py-2 rounded-lg bg-primary text-forest text-sm font-semibold"
            >
              {t("bookCall")}
            </Link>

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

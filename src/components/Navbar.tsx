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

  const linkCls = (href: string) =>
    `font-mono text-xs uppercase tracking-[0.16em] transition-colors hover:text-lime ${
      isActive(href) ? "text-lime" : "text-muted"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-ink/85 border-b border-line">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping-slow absolute inline-flex h-full w-full bg-lime opacity-70" />
            <span className="relative inline-flex h-2 w-2 bg-lime" />
          </span>
          <span className="font-mono font-bold text-sm tracking-wide text-paper">
            ALI<span className="text-lime">_</span>ANIL<span className="text-lime">_</span>ALAN
          </span>
        </Link>

        {/* Desktop primary links */}
        <div className="hidden md:flex items-center gap-6">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkCls(link.href)}>
              [{link.label}]
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center border border-line">
            <button
              onClick={() => switchLocale("en")}
              className={`px-2.5 py-1.5 font-mono text-[11px] font-medium transition-colors ${
                locale === "en" ? "bg-lime text-ink" : "text-muted hover:text-paper"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => switchLocale("tr")}
              className={`px-2.5 py-1.5 font-mono text-[11px] font-medium transition-colors border-l border-line ${
                locale === "tr" ? "bg-lime text-ink" : "text-muted hover:text-paper"
              }`}
            >
              TR
            </button>
          </div>

          <div ref={moreMenuRef} className="relative">
            <button
              onClick={() => setMoreOpen((prev) => !prev)}
              className="font-mono text-xs uppercase tracking-[0.16em] px-3 py-1.5 border border-line text-muted hover:text-lime hover:border-line-strong transition-colors"
              aria-expanded={moreOpen}
              aria-haspopup="menu"
            >
              {t("more")} {moreOpen ? "[-]" : "[+]"}
            </button>

            {moreOpen && (
              <div className="absolute top-11 right-0 w-56 border border-line bg-surface/98 backdrop-blur-md p-1">
                {secondaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMoreOpen(false)}
                    className={`block font-mono text-xs uppercase tracking-[0.14em] px-3 py-2.5 transition-colors ${
                      isActive(link.href) ? "text-lime bg-lime/5" : "text-muted hover:text-lime hover:bg-lime/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="https://github.com/alianilalan7-lgtm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-mono text-xs uppercase tracking-[0.14em] px-3 py-2.5 text-muted hover:text-lime hover:bg-lime/5 transition-colors"
                >
                  GitHub ↗
                </a>
              </div>
            )}
          </div>

          <Link href="/contact" className="btn-term btn-term--solid !py-2 !px-4 !text-[11px]">
            &gt; {t("bookCall")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden font-mono text-paper hover:text-lime transition-colors text-lg leading-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "≡"}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-line bg-ink/98 backdrop-blur-md">
          <div className="px-6 py-5 flex flex-col gap-4">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={linkCls(link.href)}
              >
                [{link.label}]
              </Link>
            ))}

            <div className="border-t border-line pt-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint mb-3">// {t("more")}</p>
              <div className="flex flex-col gap-3">
                {secondaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={linkCls(link.href)}
                  >
                    [{link.label}]
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn-term btn-term--solid justify-center"
            >
              &gt; {t("bookCall")}
            </Link>

            <div className="flex items-center gap-2 pt-2 border-t border-line">
              <button
                onClick={() => {
                  switchLocale("en");
                  setMobileOpen(false);
                }}
                className={`px-3 py-1.5 font-mono text-[11px] font-medium border border-line transition-colors ${
                  locale === "en" ? "bg-lime text-ink border-lime" : "text-muted hover:text-paper"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => {
                  switchLocale("tr");
                  setMobileOpen(false);
                }}
                className={`px-3 py-1.5 font-mono text-[11px] font-medium border border-line transition-colors ${
                  locale === "tr" ? "bg-lime text-ink border-lime" : "text-muted hover:text-paper"
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

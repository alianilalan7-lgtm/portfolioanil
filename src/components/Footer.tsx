import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");

  const quickLinks = [
    { href: "/" as const, label: tNav("home") },
    { href: "/services" as const, label: tNav("services") },
    { href: "/process" as const, label: tNav("process") },
    { href: "/case-studies" as const, label: tNav("caseStudies") },
    { href: "/faq" as const, label: tNav("faq") },
    { href: "/blog" as const, label: tNav("blog") },
    { href: "/certificates" as const, label: tNav("certificates") },
    { href: "/projects" as const, label: tNav("projects") },
    { href: "/contact" as const, label: tNav("contact") },
  ];

  const socials = [
    { href: "https://github.com/alianilalan7-lgtm", label: "GITHUB" },
    { href: "https://www.linkedin.com/in/ali-an%C4%B1l-alan-a77a7468/", label: "LINKEDIN" },
    { href: "https://x.com/alianilalan", label: "X" },
  ];

  return (
    <footer className="relative z-10 border-t border-line bg-ink">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="font-mono font-bold text-sm tracking-wide text-paper">
              ALI<span className="text-lime">_</span>ANIL<span className="text-lime">_</span>ALAN
            </Link>
            <p className="text-muted text-sm leading-relaxed mt-4 max-w-xs">{t("description")}</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint mt-5">
              <span className="text-lime">●</span> STATUS: AVAILABLE
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint mb-4">
              // {t("quickLinks")}
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-[0.1em] text-muted hover:text-lime transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint mb-4">
              // {t("connect")}
            </h4>
            <div className="flex flex-col gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.1em] text-muted hover:text-lime transition-colors w-fit"
                >
                  {social.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-line mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            © {new Date().getFullYear()} {t("copyright")}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            // ALL_RIGHTS_RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import DecryptText from "@/components/fx/DecryptText";
import Reveal from "@/components/fx/Reveal";

const SYSTEM_INFO: [string, React.ReactNode][] = [
  ["STACK", "NEXT.JS / REACT"],
  ["LANG", "TS / PYTHON"],
  ["DATA", "SUPABASE / PG"],
  ["LOCATION", "TR / REMOTE"],
  ["STATUS", <span key="s" className="text-lime">● AVAILABLE</span>],
  ["RESPONSE", "< 24H"],
];

export default function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-28 pb-16 md:pt-32">
      <div className="section-label mb-12">
        <span>
          <span className="idx">[01]</span> // HERO
        </span>
        <span className="rule" />
        <span className="text-faint">SECTION_START</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16 items-start">
        {/* Left — content */}
        <div>
          <p className="eyebrow mb-7">// FREELANCE AI &amp; SAAS DEVELOPER</p>

          <DecryptText
            as="h1"
            text={`${t("heading1")} ${t("heading2")}`}
            cursor
            className="font-display uppercase font-bold text-paper leading-[1.04] tracking-tight text-[2rem] sm:text-[2.75rem] md:text-[3.5rem] xl:text-[4.25rem] mb-7"
          />

          <p className="text-muted text-base md:text-lg max-w-2xl leading-relaxed mb-4">
            {t("description")}
          </p>
          <p className="font-mono text-sm text-faint max-w-2xl leading-relaxed mb-10">
            Operasyonel deneyimi mühendislikle birleştirerek gerçekten işe yarayan ürünler kuruyorum.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/projects" className="btn-term btn-term--solid">
              &gt; {t("viewProjects")}
            </Link>
            <Link href="/contact" className="btn-term">
              &gt; {t("getInTouch")}
            </Link>
          </div>
        </div>

        {/* Right — system info terminal box */}
        <Reveal as="aside" className="border border-line bg-surface/60 p-6 hidden lg:block" y={16}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint pb-4 mb-4 border-b border-line">
            // SYSTEM_INFO
          </p>
          <dl className="flex flex-col gap-3.5">
            {SYSTEM_INFO.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4 font-mono text-xs">
                <dt className="text-faint uppercase tracking-wider">{k}</dt>
                <dd className="text-paper">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="font-mono text-xs text-muted mt-5 pt-4 border-t border-line">
            SHELL <span className="text-lime float-right">~/ready _</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

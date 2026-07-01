import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Shared Brutalist Terminal OG template (1200×630). Used by the site-wide
// opengraph-image and the per-blog-post opengraph-image so every share card
// speaks the same visual language as the site (ink / lime / grid / mono).

export const OG_SIZE = { width: 1200, height: 630 };

const INK = "#0A0A0A";
const LINE = "#242424";
const PAPER = "#EDEDED";
const MUTED = "#8A8A8A";
const FAINT = "#5A5A5A";
const LIME = "#D4FF50";

async function loadFonts() {
  const dir = join(process.cwd(), "src", "assets", "fonts");
  const [grotesk, mono] = await Promise.all([
    readFile(join(dir, "SpaceGrotesk-Bold.ttf")),
    readFile(join(dir, "JetBrainsMono-Medium.ttf")),
  ]);
  return [
    { name: "Space Grotesk", data: grotesk, weight: 700, style: "normal" },
    { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
  ] as const;
}

/** Scale the headline down as it gets longer so it always fits the card. */
function titleFontSize(title: string): number {
  if (title.length > 140) return 40;
  if (title.length > 90) return 46;
  return 54;
}

export interface OgCardProps {
  /** Badge text, top right (rendered uppercase), e.g. "PERAKENDE". */
  badge: string;
  /** Mono eyebrow above the title; "//" prefix is added in lime. */
  eyebrow: string;
  title: string;
  /** Optional muted line under the title (used by the site-wide card). */
  subtitle?: string;
  /** Footer left: lime-highlighted path appended to "alianil.com". */
  footerPath?: string;
  /** Footer right, e.g. "7 MIN" or "NEXT.JS • SAAS • AI". */
  footerRight: string;
}

export async function ogCard({
  badge,
  eyebrow,
  title,
  subtitle,
  footerPath = "",
  footerRight,
}: OgCardProps): Promise<ImageResponse> {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          background: INK,
          color: PAPER,
          padding: "50px 56px",
          fontFamily: "JetBrains Mono",
        }}
      >
        {/* engineering grid */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
            opacity: 0.35,
          }}
        />
        {/* lime corner glow (linear — satori renders radials with banding) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(225deg, rgba(212,255,80,0.09) 0%, rgba(212,255,80,0.03) 18%, transparent 38%)",
          }}
        />

        {/* top: brand + badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                background: LIME,
                color: INK,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Space Grotesk",
                fontWeight: 700,
                fontSize: "34px",
              }}
            >
              A
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ fontSize: "20px", letterSpacing: "0.16em", color: PAPER }}>
                ALİ ANIL ALAN
              </div>
              <div style={{ fontSize: "15px", letterSpacing: "0.1em", color: FAINT }}>
                AI &amp; SAAS DEVELOPER
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: "18px",
              letterSpacing: "0.18em",
              color: LIME,
              border: "1px solid rgba(212,255,80,0.35)",
              background: "rgba(212,255,80,0.06)",
              padding: "10px 19px",
            }}
          >
            {badge.toUpperCase()}
          </div>
        </div>

        {/* middle: eyebrow + title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "1020px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              fontSize: "18px",
              letterSpacing: "0.2em",
              color: FAINT,
            }}
          >
            <span style={{ color: LIME }}>{"//"}</span>
            <span>{eyebrow.toUpperCase()}</span>
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk",
              fontWeight: 700,
              fontSize: `${titleFontSize(title)}px`,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: PAPER,
              textWrap: "balance",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontSize: "24px",
                lineHeight: 1.4,
                color: MUTED,
                maxWidth: "900px",
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        {/* bottom: url + meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "18px",
            letterSpacing: "0.08em",
            color: MUTED,
          }}
        >
          <div style={{ display: "flex", color: PAPER }}>
            alianil.com
            {footerPath ? <span style={{ color: LIME }}>{footerPath}</span> : null}
          </div>
          <div style={{ display: "flex" }}>{footerRight.toUpperCase()}</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: fonts.map((f) => ({
        name: f.name,
        data: f.data,
        weight: f.weight,
        style: f.style,
      })),
    }
  );
}

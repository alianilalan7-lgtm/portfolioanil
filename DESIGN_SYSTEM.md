# Brutalist Terminal — Design System Contract

The site is being rebuilt in a **Brutalist / Tech Terminal** language. Every component and
page MUST follow this contract. Visual reference: `design-explorations/02-brutalist.html`
(open it; match that look & feel). The gold-standard React example is
`src/components/HeroSection.tsx`.

## Character
Raw, engineered, confident. Black surfaces, refined acid-lime accent, monospace detail +
bold grotesk headlines. Sharp corners (radius 0), visible hairline borders, high contrast.
Lime is an ACCENT only (~10% of the page): links/active/CTA/counters/flashes. Never decorative.

## Color tokens (Tailwind utilities — already defined in globals.css)
- `bg-ink` #0A0A0A (page bg) · `bg-surface` #0E0E0E · `bg-surface-2` #141414
- `border-line` #242424 · `border-line-strong` #333
- `text-paper` #EDEDED (primary) · `text-muted` #8A8A8A (secondary) · `text-faint` #5A5A5A (labels)
- `text-lime` / `bg-lime` #D4FF50 · `bg-lime-dim` #A8CC3F (pressed)
- Opacity modifiers OK: `text-lime/50`, `bg-lime/5`, `border-line`, etc.
- On lime backgrounds, text is `text-ink` (#0A0A0A).
- Legacy tokens (bg-forest/text-sage/text-primary) still resolve to brutalist values, but in
  NEW code prefer the tokens above.

## Typography
- Body / labels / tags / code / numbers → mono. It's the default body font; or add `font-mono`.
- Big headlines / display → `font-display` (Space Grotesk). UPPERCASE for hero/section titles,
  tight tracking (`tracking-tight` / `-tracking-[0.02em]`).
- Section eyebrows & technical labels: mono, uppercase, `tracking-[0.18em]`, often with `//`.

## Utility classes (in globals.css @layer components)
- `.btn-term` → terminal button (border). `.btn-term.btn-term--solid` → lime fill, dark text.
  Use with `>` prefix in label, e.g. `<a className="btn-term btn-term--solid">&gt; PROJELERİ_GÖR</a>`
- `.tag-term` → mono uppercase chip with border (for tech/stack tags).
- `.term-card` → surface + hairline border, hover strengthens border.
- `.section-label` → flex row label; or just use the `<SectionHeader/>` component below.
- `.eyebrow` → lime mono uppercase eyebrow.

## FX / primitive components (src/components/fx/) — REUSE these, don't reinvent
All are `"use client"` except SectionHeader & Grain.
- `SectionHeader` — `import SectionHeader from "@/components/fx/SectionHeader"`
  `<SectionHeader index="07" label="HİZMETLER" meta="4 MODÜL" />` → renders `[07] // HİZMETLER ──── 4 MODÜL`
- `DecryptText` — `<DecryptText text="..." as="h1" className="font-display ..." cursor />`
  Scrambles → resolves on view. Use for the hero H1 and big section titles.
- `Reveal` — `<Reveal as="div" className="..." y={24} delay={0}>...</Reveal>`
  Scroll reveal wrapper (snap up+in). Wrap rows/cards/blocks. Stagger via `delay`.
- `Counter` — `<Counter value={10} suffix="+" className="font-display text-lime ..." />`
  Counts up with glitch-settle when scrolled into view.
- `Marquee` — `<Marquee items={["NEXT.JS","REACT",...]} duration={24} className="..." />`
  Velocity-reactive scrolling strip. Use for the tech bar.
- `Counter`/`Reveal`/`Marquee` all handle `prefers-reduced-motion` internally.

## Layout
- Container: `max-w-7xl mx-auto px-6` (matches Navbar/Footer). Sections: generous vertical
  padding `py-24 md:py-32`. Left-aligned spine; avoid centering long text.
- Section pattern:
  ```tsx
  <section id="..." className="max-w-7xl mx-auto px-6 py-24 md:py-32">
    <SectionHeader index="03" label="ÖNE ÇIKAN PROJELER" meta="5 PROJE" />
    <Reveal className="mt-12"> ...content... </Reveal>
  </section>
  ```
- Cards/rows: `.term-card` or explicit `bg-surface border border-line`. Hover: border → line-strong,
  optional lime flash on title. Images: `grayscale` → color on hover is a nice brutalist touch
  (`grayscale transition-all duration-500 group-hover:grayscale-0`).

## i18n
- Server components use `useTranslations("Namespace")` from `next-intl`.
- Client components ("use client") that need locale text use `useTranslations`/`useLocale` from `next-intl`.
- Keep ALL existing translation keys & namespaces. Content is bilingual (tr/en) — both message
  files (`src/messages/tr.json`, `en.json`) already have the keys; don't hardcode unless the
  existing component already did (e.g. Testimonials uses isTr ternary — keep that pattern).
- Links: `import { Link } from "@/i18n/navigation"`.

## Data
- Projects: `import { projects } from "@/data/projects"`. Featured = `projects.filter(p => p.featured)`.
  Project shape: { slug, title, image (e.g. "/images/pulse.jpg"), status, category, techStack[], featured, descriptionKey, ... }.
- Project descriptions are i18n: a project card shows `title` + `t(descriptionKey)` style — follow how the
  current `ProjectCard.tsx` / `FeaturedProjects.tsx` already read them.

## Rules
- Sharp corners (no rounded-* beyond 0). Single spacing scale (4/8/12/16/24/32/48/64 → Tailwind steps).
- Only animate transform/opacity/filter. No layout-property animation.
- Keep `"use client"` only where hooks/interactivity require it; prefer server components.
- TypeScript strict: no `any` unless unavoidable; keep `npx tsc --noEmit` clean.
- Don't touch shared files (globals.css, layout.tsx, fx/*) — they're the foundation. Only edit
  the component/page files you're assigned.

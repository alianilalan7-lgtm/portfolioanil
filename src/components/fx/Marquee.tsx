"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

/**
 * Velocity-reactive marquee. Loops continuously; scroll speed bumps the
 * timeScale and adds a kinetic skew, then it eases back to base.
 */
export default function Marquee({
  items,
  separator = "·",
  duration = 24,
  className = "",
}: {
  items: string[];
  separator?: string;
  duration?: number;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const tl = gsap.to(el, {
        xPercent: -50,
        duration,
        ease: "none",
        repeat: -1,
      });

      if (reduce) {
        tl.pause();
        return;
      }

      let last = window.scrollY;
      let target = 1;
      const skewTo = gsap.quickTo(el, "skewX", { duration: 0.4, ease: "power3.out" });

      const onScroll = () => {
        const y = window.scrollY;
        const v = y - last;
        last = y;
        const dir = v >= 0 ? 1 : -1;
        target = dir * Math.min(6, 1 + Math.abs(v) * 0.12);
        skewTo(gsap.utils.clamp(-8, 8, -v * 0.25));
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      const ticker = () => {
        const cur = tl.timeScale();
        tl.timeScale(cur + (target - cur) * 0.08);
        target += (1 - target) * 0.04; // decay toward base
      };
      gsap.ticker.add(ticker);

      return () => {
        window.removeEventListener("scroll", onScroll);
        gsap.ticker.remove(ticker);
        tl.kill();
      };
    },
    { scope: wrap }
  );

  const row = (key: string) => (
    <div className="flex shrink-0 items-center" key={key}>
      {items.map((it, i) => (
        <span key={`${key}-${i}`} className="flex items-center">
          <span className="px-6">{it}</span>
          <span className="text-lime/50">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div ref={wrap} className={`overflow-hidden ${className}`}>
      <div ref={track} className="flex w-max will-change-transform">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

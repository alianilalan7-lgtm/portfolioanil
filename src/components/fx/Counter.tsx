"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const CHARS = "0123456789";

/** Counts up from 0 to `value` with a brief glyph glitch on settle. */
export default function Counter({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        el.textContent = `${prefix}${value}${suffix}`;
        return;
      }
      const obj = { n: 0 };
      gsap.to(obj, {
        n: value,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.n)}${suffix}`;
        },
        onComplete: () => {
          // short glitch then settle
          let i = 0;
          const id = setInterval(() => {
            if (i > 3) {
              clearInterval(id);
              el.textContent = `${prefix}${value}${suffix}`;
              return;
            }
            const g = CHARS[Math.floor(Math.random() * CHARS.length)];
            el.textContent = `${prefix}${value}${suffix}`.replace(/\d(?=\D*$)/, g);
            i++;
          }, 55);
        },
      });
    },
    { scope: ref }
  );

  return <span ref={ref} className={className}>{`${prefix}0${suffix}`}</span>;
}

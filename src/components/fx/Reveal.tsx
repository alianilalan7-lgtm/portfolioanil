"use client";

import { createElement, useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * Scroll-reveal wrapper: snaps content up + in when it enters the viewport.
 * Reduced-motion users get the content immediately (handled in CSS).
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  y = 24,
  delay = 0,
  duration = 0.7,
}: {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const el = ref.current;
      if (!el) return;
      if (reduce) {
        gsap.set(el, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.set(el, { autoAlpha: 0, y });
      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
      });
    },
    { scope: ref }
  );

  // eslint-disable-next-line react-hooks/refs -- forwarding the ref to a host element via createElement is safe
  return createElement(Tag, { ref, className, "data-reveal": true }, children);
}

"use client";

import { createElement, useEffect, useRef, useState, type ElementType } from "react";

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/\\<>*#%";

/**
 * Decrypt-on-mount text: scrambled glyphs resolve to the real string with a
 * left-to-right stagger. Renders the final text immediately under reduced motion.
 *
 * Zero-CLS: the real text is always kept in normal flow (only visually faded
 * while animating), so the element's height/wrapping never changes. The
 * scrambling glyphs are painted in an absolutely-positioned overlay that has no
 * layout impact — so the decrypt animation can't push content below it around.
 */
export default function DecryptText({
  text,
  as: Tag = "span",
  className = "",
  cursor = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  cursor?: boolean;
}) {
  const [display, setDisplay] = useState(text);
  const [animating, setAnimating] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(text);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let frame = 0;
    const total = Math.max(18, text.length * 1.6);

    const run = () => {
      const revealed = Math.floor((frame / total) * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " ") out += " ";
        else if (i < revealed) out += ch;
        else out += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setDisplay(out);
      frame++;
      if (frame <= total) {
        raf = requestAnimationFrame(run);
      } else {
        setDisplay(text);
        setAnimating(false);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          setAnimating(true);
          raf = requestAnimationFrame(run);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [text]);

  const cursorNode = cursor
    ? createElement("span", {
        key: "cur",
        "aria-hidden": "true",
        style: {
          display: "inline-block",
          width: "0.6em",
          height: "1em",
          marginLeft: "0.08em",
          background: "var(--color-lime)",
          transform: "translateY(0.12em)",
          animation: "term-blink 1s steps(1) infinite",
        },
      })
    : null;

  return createElement(
    Tag,
    { ref, className, style: { position: "relative" } },
    // Real text — always in flow (sets height/wrapping), faded out only while animating.
    createElement(
      "span",
      { key: "real", style: { opacity: animating ? 0 : 1 } },
      text,
      cursorNode
    ),
    // Scramble overlay — absolutely positioned, no layout impact, removed when done.
    animating
      ? createElement(
          "span",
          {
            key: "scramble",
            "aria-hidden": "true",
            style: { position: "absolute", left: 0, top: 0, right: 0 },
          },
          display,
          cursorNode
        )
      : null
  );
}

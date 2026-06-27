"use client";

import { useEffect, useRef } from "react";

/**
 * Calmed terminal cursor: a small lime target ring with a dark contrast halo
 * (so it stays visible on both dark and lime surfaces) and a tiny center dot.
 * Grows softly over interactive elements. Disabled on touch / reduced-motion.
 */
export default function Cursor() {
  const boxRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const root = rootRef.current;
    const box = boxRef.current;
    if (!root || !box) return;

    document.body.classList.add("has-cursor");
    root.classList.add("ready");

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const render = () => {
      cx += (tx - cx) * 0.35;
      cy += (ty - cy) * 0.35;
      box.style.left = cx + "px";
      box.style.top = cy + "px";
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    window.addEventListener("mousemove", onMove, { passive: true });

    const hot = () => root.classList.add("hot");
    const cold = () => root.classList.remove("hot");
    const targets = document.querySelectorAll<HTMLElement>("a, button, [data-hot], input, select, textarea");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", hot);
      el.addEventListener("mouseleave", cold);
    });

    const onLeave = () => (root.style.opacity = "0");
    const onEnter = () => (root.style.opacity = "1");
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", hot);
        el.removeEventListener("mouseleave", cold);
      });
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div className="cross" ref={rootRef} aria-hidden="true">
      <div className="box" ref={boxRef} />
    </div>
  );
}

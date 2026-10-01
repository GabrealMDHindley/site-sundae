"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// One place for all scroll choreography, driven by data attributes so pages stay server
// components: Lenis smooth scroll + GSAP. Re-binds on every route change; everything is
// skipped under prefers-reduced-motion and content stays visible without JS.
let lenis: Lenis | null = null;

export default function ScrollFx() {
  const path = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis?.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a || a.getAttribute("href") === "#") return;
      const el = document.querySelector(a.getAttribute("href")!);
      if (!el) return;
      e.preventDefault();
      lenis?.scrollTo(el as HTMLElement, { offset: -90, duration: 1.3 });
    };
    document.addEventListener("click", onClick);
    return () => { gsap.ticker.remove(raf); lenis?.destroy(); lenis = null; document.removeEventListener("click", onClick); };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!location.hash) lenis?.scrollTo(0, { immediate: true });
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const k = el.dataset.reveal;
        const from = k === "left" ? { x: -50 } : k === "right" ? { x: 50 } : k === "scale" ? { scale: 0.92 } : k === "fade" ? {} : { y: 46 };
        gsap.fromTo(el, { ...from, opacity: 0 }, { x: 0, y: 0, scale: 1, opacity: 1, duration: 1.15, ease: "expo.out", delay: Number(el.dataset.delay || 0), scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((wrap) => {
        gsap.fromTo(wrap.children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: Number(wrap.dataset.stagger || 0.08), scrollTrigger: { trigger: wrap, start: "top 86%", once: true } });
      });
      // headline lines that slide up out of a mask
      gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".mask-line > span"), { yPercent: 108 }, { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.09, scrollTrigger: { trigger: el, start: "top 86%", once: true } });
      });
      // words light up as you read (scrubbed)
      gsap.utils.toArray<HTMLElement>("[data-words]").forEach((el) => {
        gsap.fromTo(el.querySelectorAll("[data-w]"), { opacity: 0.14 }, { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 45%", scrub: 0.6 } });
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amt = Number(el.dataset.parallax || 10);
        gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: "none", scrollTrigger: { trigger: el.parentElement!, start: "top bottom", end: "bottom top", scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const n = Number(el.dataset.count), pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
        const o = { v: 0 };
        el.textContent = pre + "0" + suf;
        gsap.to(o, { v: n, duration: 2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true }, onUpdate: () => { el.textContent = pre + Math.round(o.v).toLocaleString("en-US") + suf; } });
      });
      gsap.utils.toArray<HTMLElement>("[data-grow]").forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      });
      // images that open like a curtain
      gsap.utils.toArray<HTMLElement>("[data-curtain]").forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(18% 12% 18% 12% round 2rem)" }, { clipPath: "inset(0% 0% 0% 0% round 2rem)", ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "top 35%", scrub: 0.5 } });
      });
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        // horizontal pinned track
        gsap.utils.toArray<HTMLElement>("[data-hscroll]").forEach((sec) => {
          const track = sec.querySelector<HTMLElement>("[data-track]");
          if (!track) return;
          const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 64);
          gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: sec, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true,
            onUpdate: (st) => sec.querySelectorAll<HTMLElement>("[data-hprog]").forEach((b) => (b.style.transform = `scaleX(${st.progress})`)) } });
        });
        // sticky feature list: swap the visual as each item passes the middle
        gsap.utils.toArray<HTMLElement>("[data-sticky-steps]").forEach((sec) => {
          const items = sec.querySelectorAll<HTMLElement>("[data-step]");
          const pics = sec.querySelectorAll<HTMLElement>("[data-step-pic]");
          items.forEach((it, i) => ScrollTrigger.create({ trigger: it, start: "top 60%", end: "bottom 60%", onToggle: (st) => {
            if (!st.isActive) return;
            items.forEach((x, j) => x.style.opacity = j === i ? "1" : "0.32");
            pics.forEach((p, j) => { p.style.opacity = j === i ? "1" : "0"; p.style.transform = j === i ? "none" : "translateY(24px) scale(.97)"; });
          } }));
        });
      });
    });
    // 3D tilt on hover (pointer devices only)
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const tilts = fine && !reduce ? Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]")) : [];
    const handlers = tilts.map((el) => {
      const max = Number(el.dataset.tilt || 8);
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg)`;
        el.style.setProperty("--mx", `${(x + 0.5) * 100}%`); el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
      };
      const leave = () => { el.style.transform = ""; };
      el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave);
      return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => { clearTimeout(t); ctx.revert(); handlers.forEach((h) => h()); };
  }, [path]);

  return null;
}

"use client";
/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Phase } from "./three/AuctionScene";

const AuctionScene = dynamic(() => import("./three/AuctionScene"), { ssr: false });

const LABELS: Record<Phase, { k: string; t: string }> = {
  0: { k: "Round one", t: "Investors compete for your home" },
  1: { k: "Round two", t: "The top three make a final, blind offer" },
  2: { k: "Your offer", t: "We bring you the highest & best" },
};

export default function HeroStage() {
  const box = useRef<HTMLDivElement>(null);
  const [gl, setGl] = useState<boolean | null>(null);
  const [active, setActive] = useState(true);
  const [phase, setPhase] = useState<Phase>(0);
  useEffect(() => {
    try { const c = document.createElement("canvas"); setGl(!!(c.getContext("webgl2") || c.getContext("webgl"))); } catch { setGl(false); }
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "100px" });
    if (box.current) io.observe(box.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className="relative aspect-square w-full max-w-[640px] justify-self-center lg:max-w-none">
      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_50%_55%,rgba(219,61,85,.16),rgba(219,61,85,0)_65%)]" />
      {gl === false && <img src="/media/ill/house-sold.png" alt="" className="absolute inset-[18%] h-[64%] w-[64%] object-contain opacity-90" />}
      {gl && <div className="absolute inset-0"><AuctionScene onPhase={setPhase} active={active} /></div>}
      <div className="pointer-events-none absolute left-0 top-[8%] md:left-[2%]">
        <div className="flex items-center gap-3 rounded-2xl border border-line bg-white/85 px-4 py-3 shadow-[0_20px_40px_-24px_rgba(27,20,22,.35)] backdrop-blur-md">
          <span className="pulse-dot" />
          <div key={phase} className="rise">
            <div className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-red">{LABELS[phase].k}</div>
            <div className="text-sm font-semibold">{LABELS[phase].t}</div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-[1%] right-0 hidden gap-2 sm:flex md:right-[2%]">
        <div className="rounded-2xl border border-line bg-white/85 px-4 py-3 shadow-[0_20px_40px_-24px_rgba(27,20,22,.35)] backdrop-blur-md">
          <div className="display text-2xl">22+</div><div className="text-xs text-muted">offers per listing, on average</div>
        </div>
        <div className="rounded-2xl bg-ink px-4 py-3 text-white shadow-[0_20px_40px_-24px_rgba(27,20,22,.6)]">
          <div className="display text-2xl">20,000+</div><div className="text-xs text-white/65">investors on the marketplace</div>
        </div>
      </div>
    </div>
  );
}

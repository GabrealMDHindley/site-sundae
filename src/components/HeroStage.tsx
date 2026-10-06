"use client";
/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Phase } from "./three/AuctionScene";

const AuctionScene = dynamic(() => import("./three/AuctionScene"), { ssr: false });

const LABELS: Record<Phase, { k: string; t: string }> = {
  0: { k: "Round one", t: "Investors compete for your home" },
  1: { k: "Round two", t: "Three finalists make a final, blind offer" },
  2: { k: "Your offer", t: "We bring your offers to you" },
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
    <div ref={box} className="relative aspect-square w-full max-w-[620px] justify-self-center lg:max-w-none">
      {/* deck shapes behind the stage: a soft mist circle and a 4×4 blue dot grid */}
      <div aria-hidden className="absolute inset-[9%] rounded-full bg-mist" />
      <div aria-hidden className="dots absolute right-[4%] top-[6%] hidden h-20 w-20 sm:block md:h-24 md:w-24" />
      {gl === false && <img src="/media/ill/house-sold.png" alt="" className="absolute inset-[18%] h-[64%] w-[64%] object-contain" />}
      {gl && <div className="absolute inset-0"><AuctionScene onPhase={setPhase} active={active} /></div>}
      <div className="pointer-events-none absolute left-0 top-[6%] md:left-[2%]">
        <div className="flex items-center gap-3.5 rounded-xl border border-gray bg-white px-4 py-3 shadow-[0_18px_36px_-24px_rgba(74,74,74,.55)]">
          <span className="pulse-dot" />
          <div key={phase} className="rise">
            <div className="text-base font-bold uppercase leading-tight tracking-[0.1em]">{LABELS[phase].k}</div>
            <div className="text-base leading-snug md:text-[1.0625rem]">{LABELS[phase].t}</div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-[1%] right-0 hidden items-stretch gap-2.5 sm:flex md:right-[2%]">
        <div className="rounded-xl border border-gray bg-white px-4 py-3 shadow-[0_18px_36px_-24px_rgba(74,74,74,.55)]">
          <div className="text-base leading-tight">An average of</div>
          <div className="display mt-1 text-[1.75rem] leading-tight">22+ offers</div>
          <div className="text-base leading-tight">per listing</div>
        </div>
        <div className="flex flex-col justify-center rounded-xl bg-blue px-4 py-3 text-white shadow-[0_18px_36px_-24px_rgba(28,81,160,.8)]">
          <div className="display text-[1.75rem] leading-tight">20,000+</div>
          <div className="mt-1 text-base leading-tight">investors on the marketplace</div>
        </div>
      </div>
    </div>
  );
}

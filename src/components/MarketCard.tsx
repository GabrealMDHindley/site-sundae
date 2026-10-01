/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUR, Pin } from "./icons";
import type { Market } from "@/content/site";

export default function MarketCard({ m, tall = false }: { m: Market; tall?: boolean }) {
  return (
    <Link href={`/locations/${m.slug}`} className={`group relative block overflow-hidden rounded-[1.4rem] bg-ink ${tall ? "aspect-[3/4]" : "aspect-[4/5] md:aspect-[4/4.6]"}`}>
      {m.img ? (
        <img src={m.img} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-[1.2s] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-110" loading="lazy" />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#db3d55,#a3002d_45%,#1b1416)]"><div className="dot-grid absolute inset-0 opacity-30 invert" /><Pin className="absolute left-1/2 top-[38%] h-16 w-16 -translate-x-1/2 text-white/80" /></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-white md:p-5">
        <div><div className="text-[0.7rem] uppercase tracking-[0.16em] text-white/70">{m.state}</div><div className="display text-xl md:text-2xl">{m.name}</div></div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-red"><ArrowUR /></span>
      </div>
    </Link>
  );
}

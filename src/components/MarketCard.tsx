/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUR, Pin } from "./icons";
import type { Market } from "@/content/site";

// Real market photo as a clean rectangle; the label sits in a solid white box (deck p.31), never on the pixels.
export default function MarketCard({ m, tall = false }: { m: Market; tall?: boolean }) {
  return (
    <Link href={`/locations/${m.slug}`} className={`group relative block overflow-hidden rounded-[1.1rem] bg-mist ${tall ? "aspect-[3/4]" : "aspect-[4/5] md:aspect-[4/4.6]"}`}>
      {m.img ? (
        <img src={m.img} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-105" loading="lazy" />
      ) : (
        <div className="absolute inset-0 bg-mist">
          <div aria-hidden className="shape-circle absolute -right-8 -top-8 h-36 w-36" />
          <div aria-hidden className="dots absolute left-5 top-5 h-16 w-16" />
          <Pin className="absolute left-1/2 top-[36%] h-14 w-14 -translate-x-1/2 text-blue" />
        </div>
      )}
      <div className="absolute inset-x-2 bottom-2 flex items-end justify-between gap-2 rounded-xl bg-white px-3 py-2.5 md:inset-x-3 md:bottom-3 md:p-4">
        <div className="min-w-0"><div className="text-base leading-tight">{m.state}</div><div className="display mt-0.5 text-[1.0625rem] leading-tight md:text-[1.3rem]">{m.name}</div></div>
        <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue text-white transition-transform group-hover:-translate-y-0.5 md:flex"><ArrowUR /></span>
      </div>
    </Link>
  );
}

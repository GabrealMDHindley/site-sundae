/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import MarketCard from "@/components/MarketCard";
import { CtaBand, PageHero } from "@/components/ui";
import { MARKETS } from "@/content/site";

export const metadata: Metadata = { title: "Locations", description: "Sundae helps homeowners sell as-is in 12 metro areas across California, Florida, Nevada, Oklahoma, South Carolina, Tennessee and Utah." };

export default function Page() {
  const states = [...new Set(MARKETS.map((m) => m.state))];
  return (
    <>
      <PageHero eyebrow="Sundae’s market locations" title="Local experts. / *National* reach." sub="Sundae is currently helping homeowners sell their houses in these metro areas — and planning to expand to new cities around the U.S. soon."
        aside={<img src="/media/membership-map.png" alt="Map of Sundae markets across the United States" className="w-full" />} />
      <section className="wrap grid gap-16">
        {states.map((s) => (
          <div key={s}>
            <div data-reveal className="flex items-baseline justify-between border-b border-line pb-4"><h2 className="display text-3xl md:text-4xl">{s}</h2><span className="text-sm text-muted">{MARKETS.filter((m) => m.state === s).length} market{MARKETS.filter((m) => m.state === s).length > 1 ? "s" : ""}</span></div>
            <div data-stagger="0.06" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MARKETS.filter((m) => m.state === s).map((m) => (
                <div key={m.slug} className="grid gap-3"><MarketCard m={m} /><p className="px-1 text-[0.95rem] leading-relaxed text-muted">{m.blurb}</p></div>
              ))}
            </div>
          </div>
        ))}
      </section>
      <CtaBand title="Don’t see your city? *Ask us.*" sub="Sundae is expanding. Call a Market Expert to check whether we can help with your property today." />
    </>
  );
}

/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, OfferCtas, PageHero, SectionHead, Tuck } from "@/components/ui";
import { Arrow, ArrowUR } from "@/components/icons";
import { DRPHIL, TESTIMONIALS } from "@/content/site";

export const metadata: Metadata = { title: "Dr. Phil and Sundae", description: "Dr. Phil and Sundae: resources to sell fast without stress." };

export default function Page() {
  const royce = TESTIMONIALS[0];
  return (
    <>
      <PageHero eyebrow="Dr. Phil and Sundae" title="Resources to sell fast / *without stress.*" sub="Take the stress out of selling your home and get a competitive price. Sell as-is. Pay zero fees to Sundae. Move on your timeline. No repairs, cleaning or showings."
        aside={<Tuck><img src="/media/drphil-josh.jpg" alt="Dr. Phil with Sundae co-founder and CEO Josh Stech" className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" /></Tuck>}>
        <OfferCtas />
      </PageHero>
      <section className="wrap grid items-center gap-12 lg:grid-cols-[auto_1fr]">
        <img data-reveal src="/media/drphil-headshot.png" alt="Dr. Phil" className="mx-auto h-80 w-auto" loading="lazy" />
        <div>
          <SectionHead eyebrow="Partners with a purpose" title="More than just / an *endorsement.*" sub="People need support during any pivotal life transition, including when it’s time to sell a home. Dr. Phil and Sundae are proud to work together to help people navigate the home-selling process through a transparent and worry-free experience." />
          <blockquote data-reveal className="display mt-9 border-l-[6px] border-red pl-6 text-[clamp(1.35rem,2.2vw,1.875rem)] leading-[1.4]">“{DRPHIL.quote1}”</blockquote>
          <p data-reveal className="mt-3 pl-7 text-lg font-bold">— Dr. Phil</p>
        </div>
      </section>
      <section className="wrap mt-24 grid gap-5 md:grid-cols-2">
        <figure data-reveal className="card-mist border-l-[6px] border-red p-8 md:p-12">
          <p className="eyebrow">How Sundae works</p>
          <blockquote className="display mt-5 text-[clamp(1.4rem,2.3vw,1.875rem)] leading-[1.4]">“{DRPHIL.quote2}”</blockquote>
          <figcaption className="mt-5 text-lg font-bold">— Dr. Phil</figcaption>
        </figure>
        <figure data-reveal data-delay="0.1" className="card p-8 md:p-12">
          <p className="eyebrow">Royce’s story</p>
          <p className="mt-4 text-lg leading-relaxed">Sundae customers Royce and Lee sat down to speak with Dr. Phil about their seamless experience selling as-is with Sundae.</p>
          <blockquote className="display mt-6 text-[1.375rem] leading-[1.45]">“{royce.quote}”</blockquote>
          <figcaption className="mt-6 flex items-center gap-3"><img src={royce.img} alt="" className="h-12 w-12 rounded-full object-cover" /><span className="leading-snug"><span className="block text-lg font-bold">{royce.name}</span><span className="text-base">{royce.place}</span></span></figcaption>
        </figure>
      </section>
      <section className="wrap mt-24">
        <div data-reveal className="relative grid items-center gap-8 overflow-hidden rounded-[1.5rem] bg-pink p-8 md:grid-cols-[1fr_auto] md:p-12">
          <div aria-hidden className="shape-rect pointer-events-none absolute right-6 top-6 h-10 w-10 md:right-8 md:top-8 md:h-12 md:w-12" />
          <div className="relative pr-12 md:pr-0"><p className="eyebrow">Free resource</p><h2 className="display mt-3 text-[clamp(1.8rem,3vw,2.6rem)]">Dr. Phil’s Scamfinder Checklist</h2><p className="mt-3 text-lg">Learn how to spot common real estate scams in any market.</p></div>
          <div className="relative flex flex-wrap gap-3"><a href={DRPHIL.checklist} target="_blank" rel="noopener noreferrer" className="btn btn-blue">Download <ArrowUR /></a><Link href="/better-way" className="btn btn-outline">Sell scam-free <Arrow /></Link></div>
        </div>
        <p className="mt-6 text-base leading-relaxed">{DRPHIL.disclosure}</p>
      </section>
      <CtaBand />
    </>
  );
}

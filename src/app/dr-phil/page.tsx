/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, OfferCtas, PageHero, SectionHead } from "@/components/ui";
import { Arrow, ArrowUR } from "@/components/icons";
import { DRPHIL, TESTIMONIALS } from "@/content/site";

export const metadata: Metadata = { title: "Dr. Phil and Sundae", description: "Dr. Phil and Sundae: resources to sell fast without stress." };

export default function Page() {
  const royce = TESTIMONIALS[0];
  return (
    <>
      <PageHero eyebrow="Dr. Phil and Sundae" title="Resources to sell fast / *without stress.*" sub="Take the stress out of selling your home and get the best price. Sell as-is. Pay zero fees to Sundae. Move on your timeline. No repairs, cleaning, or showings."
        aside={<img src="/media/drphil-josh.jpg" alt="Dr. Phil with Sundae Co-Founder & CEO Josh Stech" className="aspect-[4/3] w-full rounded-[2rem] object-cover" />}>
        <OfferCtas />
      </PageHero>
      <section className="wrap grid items-center gap-12 lg:grid-cols-[auto_1fr]">
        <img data-reveal src="/media/drphil-headshot.png" alt="Dr. Phil" className="mx-auto h-80 w-auto" loading="lazy" />
        <div>
          <SectionHead eyebrow="Partners with a purpose" title="More than just / an *endorsement.*" sub="People need support during any pivotal life transition, including when it’s time to sell a home. Dr. Phil and Sundae are proud to work together to help people navigate the home-selling process through a transparent and worry-free experience." />
          <blockquote data-reveal className="display mt-8 border-l-2 border-red pl-6 text-[clamp(1.4rem,2.4vw,2rem)] leading-snug">“{DRPHIL.quote1}”</blockquote>
          <p data-reveal className="mt-3 pl-6 text-muted">— Dr. Phil</p>
        </div>
      </section>
      <section className="wrap mt-24 grid gap-5 md:grid-cols-2">
        <figure data-reveal className="rounded-[2rem] bg-ink p-8 text-white md:p-12">
          <p className="eyebrow !text-red">How Sundae works</p>
          <blockquote className="display mt-5 text-[clamp(1.5rem,2.6vw,2.2rem)] leading-snug">“{DRPHIL.quote2}”</blockquote>
          <figcaption className="mt-5 text-white/60">— Dr. Phil</figcaption>
        </figure>
        <figure data-reveal data-delay="0.1" className="card p-8 md:p-12">
          <p className="eyebrow">Royce’s story</p>
          <p className="mt-4 text-muted">Sundae customers Royce and Lee sat down to speak with Dr. Phil about their seamless experience selling as-is with Sundae.</p>
          <blockquote className="display mt-6 text-2xl leading-snug">“{royce.quote}”</blockquote>
          <figcaption className="mt-5 flex items-center gap-3"><img src={royce.img} alt="" className="h-11 w-11 rounded-full object-cover" /><span><span className="block font-semibold">{royce.name}</span><span className="text-sm text-muted">{royce.place}</span></span></figcaption>
        </figure>
      </section>
      <section className="wrap mt-24">
        <div data-reveal className="grid items-center gap-8 rounded-[2rem] bg-red p-8 text-white md:grid-cols-[1fr_auto] md:p-12">
          <div><p className="text-sm uppercase tracking-[0.2em] text-white/70">Free resource</p><h2 className="display mt-3 text-[clamp(1.9rem,3.4vw,3rem)]">Dr. Phil’s Scamfinder Checklist</h2><p className="mt-3 text-white/80">Learn how to spot the most prevalent real estate scams in any market.</p></div>
          <div className="flex flex-wrap gap-3"><a href={DRPHIL.checklist} target="_blank" rel="noopener noreferrer" className="btn btn-white">Download <ArrowUR /></a><Link href="/better-way" className="btn btn-ghost-light">Sell scam-free <Arrow /></Link></div>
        </div>
        <p className="mt-6 text-xs text-faint">{DRPHIL.disclosure}</p>
      </section>
      <CtaBand />
    </>
  );
}

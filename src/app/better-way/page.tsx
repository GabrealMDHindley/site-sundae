/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";
import { Arrow, ArrowUR } from "@/components/icons";
import { CONTACT, DRPHIL, SCAM_GUIDES } from "@/content/site";

export const metadata: Metadata = { title: "Selling scam-free", description: "Your guide to protecting yourself and rooting out homebuyer scams." };

const PRESS = [
  { src: "NPR", t: "Council Wants to Stop Wholesalers From Preying on Vulnerable", href: "https://www.wesa.fm/politics-government/2021-06-18/allegheny-county-council-asks-state-to-act-on-real-estate-wholesalers" },
  { src: "Bloomberg", t: "Fast Cash House Flippers Flood Poor Neighborhoods", href: "https://www.bloomberg.com/news/articles/2021-05-25/u-s-states-take-aim-as-house-wholesalers-flood-poor-areas" },
  { src: "The Real Deal", t: "Wholesaler Home Flippers Prompt New Regulations", href: "https://therealdeal.com/2021/05/25/wholesaler-home-flippers-prompt-new-regulations/" },
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Selling scam-free" title="Sundae is / *on your side.*" sub="We believe there’s a better way, a win-win way, to do business without exploiting people. Our mission is to end the scam culture in our industry, one enlightened home-seller at a time." aside={<img src="/media/ill/house-shark.png" alt="" className="w-full" />} />
      <section className="wrap grid items-center gap-12 lg:grid-cols-2">
        <img data-reveal="scale" src="/media/ill/wholesaler-loss.png" alt="Illustration from Sundae on money home sellers lose to wholesalers" className="w-full rounded-[1.5rem] bg-mist p-6" loading="lazy" />
        <div>
          <SectionHead eyebrow="The fight for a fair price" title="Why predatory buyers / *cost you.*" sub="Many off-market buyers find homeowners who need to sell quickly, after a job loss, divorce or a death in the family, and offer the lowest possible price, because every dollar they don’t give the seller goes into their pocket. Sundae’s marketplace makes investors compete instead." />
          <Link data-reveal href="/how-it-works" className="btn btn-blue mt-8">How Sundae is different <Arrow /></Link>
        </div>
      </section>
      <section className="wrap mt-28">
        <SectionHead eyebrow="Spotting a scam before you’re in one" title="Guides to *sell smarter.*" />
        <div data-stagger="0.06" className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SCAM_GUIDES.map((g) => <a key={g.title} href={g.href} target="_blank" rel="noopener noreferrer" className="card hover-lift flex flex-col p-7"><h3 className="display text-[1.5rem]">{g.title}</h3><p className="mt-3 flex-1 text-lg leading-relaxed">{g.body}</p><span className="mt-6 inline-flex items-center gap-2 text-lg font-bold text-blue">Read on sundae.com <ArrowUR /></span></a>)}
        </div>
      </section>
      <section className="wrap mt-24">
        <div data-reveal className="relative grid items-center gap-8 overflow-hidden rounded-[1.5rem] bg-pink p-8 md:grid-cols-[1fr_auto] md:p-12">
          <div aria-hidden className="shape-rect pointer-events-none absolute right-6 top-6 h-10 w-10 md:right-8 md:top-8 md:h-12 md:w-12" />
          <div className="relative pr-12 md:pr-0"><p className="eyebrow">Free resource</p><h2 className="display mt-3 text-[clamp(1.8rem,3vw,2.6rem)]">Download Dr. Phil’s Scamfinder Checklist</h2><p className="mt-3 text-lg">Learn how to spot common real estate scams in any market.</p></div>
          <a href={DRPHIL.checklist} target="_blank" rel="noopener noreferrer" className="btn btn-blue relative">Get it now <ArrowUR /></a>
        </div>
      </section>
      <section className="wrap mt-24">
        <SectionHead eyebrow="Ripped from the front page" title="It’s not *just us.*" sub="Other outlets warning about the wholesaling industry:" />
        <div className="mt-8 divide-y divide-gray border-y border-gray">
          {PRESS.map((p) => <a key={p.t} href={p.href} target="_blank" rel="noopener noreferrer" data-reveal className="group flex items-center justify-between gap-6 py-6"><span><span className="eyebrow">{p.src}</span><span className="display mt-1 block text-[1.25rem] md:text-[1.5rem]">{p.t}</span></span><ArrowUR className="h-6 w-6 shrink-0 text-blue transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>)}
        </div>
      </section>
      <section className="wrap mt-24">
        <div className="grid items-center gap-8 overflow-hidden rounded-[1.5rem] bg-mist md:grid-cols-2">
          <img src="/media/marketplace-devices.png" alt="" className="w-full p-6" loading="lazy" />
          <div className="p-8 md:p-12"><h2 className="display h-bar text-[1.875rem] md:text-[2.25rem]">Become a homebuyer <span className="hl">with heart.</span></h2><p className="mt-4 text-lg leading-relaxed">Are you an investor looking for a house that needs love? Our exclusive marketplace matches you with listings in your area.</p><a href={CONTACT.marketplace} target="_blank" rel="noopener noreferrer" className="btn btn-blue mt-7">Sign up now <ArrowUR /></a></div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

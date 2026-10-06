/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, SectionHead, Tuck, Words } from "@/components/ui";
import { Arrow, ArrowUR } from "@/components/icons";
import { CONTACT, LEADERS, STORY, VALUES } from "@/content/site";

export const metadata: Metadata = { title: "Our story", description: "We started Sundae to help sellers get a fair price for their house, as-is." };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="The Sundae story" title="A fair price, / for a house that *needs some love.*" sub="Our mission is to help homeowners get a better outcome when it’s time to sell a house that needs some love." tone="mist" aside={<Tuck><img src="/media/people/sold-couple-living-room.jpg" alt="Sundae sellers at home" className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" /></Tuck>} />
      <section className="wrap mt-24 grid gap-24">
        {STORY.map((s, i) => (
          <div key={s.title} className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div data-reveal={i % 2 ? "right" : "left"} className="flex aspect-[5/4] items-center justify-center rounded-[1.5rem] bg-mist p-10"><img src={s.img} alt="" className="max-h-full w-auto object-contain" loading="lazy" /></div>
            <div>
              <span className="num">{i + 1}</span>
              <h2 data-reveal className="display h-bar mt-5 text-[clamp(1.75rem,3vw,2.6rem)]">{s.title}</h2>
              <p data-reveal className="mt-6 text-lg leading-relaxed">{s.body}</p>
            </div>
          </div>
        ))}
      </section>
      <section className="wrap py-28 md:py-36">
        <Words className="display max-w-5xl text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.28]" text="At Sundae, we think when investors compete, *homeowners* *win.*" />
      </section>
      <section className="wrap">
        <SectionHead eyebrow="Values and culture" title="How we *work.*" sub="Working at Sundae means being part of the team that’s bringing compassion and transparency to the business of helping homeowners sell in their time of need." />
        <div data-stagger="0.06" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => <div key={v.title} className={`rounded-[1.25rem] p-7 ${i === 0 ? "on-blue bg-blue text-white" : "card"}`}><h3 className="display text-[1.5rem] leading-snug">{v.title}</h3><p className="mt-3 text-lg leading-relaxed">{v.body}</p></div>)}
          <a href={CONTACT.careers} target="_blank" rel="noopener noreferrer" className="relative flex flex-col justify-between overflow-hidden rounded-[1.25rem] bg-pink p-7 transition-transform hover:-translate-y-1"><div aria-hidden className="shape-rect pointer-events-none absolute right-4 top-4 h-8 w-8 md:right-5 md:top-5 md:h-9 md:w-9" /><h3 className="display relative pr-8 text-[1.5rem] leading-snug">Want to join our team?</h3><span className="relative mt-6 inline-flex items-center gap-2 text-lg font-bold text-blue">We’re hiring <ArrowUR /></span></a>
        </div>
      </section>
      <section className="wrap mt-28">
        <div className="flex flex-wrap items-end justify-between gap-6"><SectionHead eyebrow="Leadership" title="The team behind / the *marketplace.*" /><Link href="/about/leadership" className="btn btn-outline">Meet the team <Arrow /></Link></div>
        <div data-stagger="0.05" className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {LEADERS.map((l) => <Link key={l.name} href={`/about/leadership#${l.name.toLowerCase().replace(/\s+/g, "-")}`} className="group"><div className="overflow-hidden rounded-[1rem] bg-mist"><img src={l.img} alt={l.name} className="aspect-[4/5] w-full object-cover object-top transition duration-700 group-hover:scale-105" loading="lazy" /></div><p className="mt-3 text-lg font-bold leading-snug">{l.name}</p><p className="text-base leading-snug">{l.role}</p></Link>)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

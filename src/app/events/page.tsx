/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHead } from "@/components/ui";
import { ArrowUR, Calendar, Pin } from "@/components/icons";
import { CONTACT, EVENT } from "@/content/site";

export const metadata: Metadata = { title: "Events — private dinners for real estate operators", description: "Private dinners with Sundae Co-Founder & CEO Josh Stech. Next: Thursday, Oct 8, 2026 · The Courtyard at Shade Hotel, Manhattan Beach." };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Sundae events" title="Dinner, dialogue, / and *what’s next.*" sub="Josh Stech travels to Sundae’s markets to host private dinners with local real estate operators — wholesalers, flippers and investors building stronger acquisition businesses." />
      <section className="wrap">
        <article data-reveal="scale" className="grid overflow-hidden rounded-[2.5rem] bg-ink text-white lg:grid-cols-[1.1fr_1fr]">
          <div className="relative min-h-[340px] overflow-hidden"><img data-parallax="6" src="/media/event/shade-courtyard.jpg" alt="The Courtyard at Shade Hotel, Manhattan Beach" className="absolute inset-0 h-full w-full scale-110 object-cover" /><span className="absolute left-5 top-5 rounded-full bg-red px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider">Next up</span></div>
          <div className="p-8 md:p-14">
            <p className="eyebrow !text-red">Los Angeles · Private dinner</p>
            <h2 className="display mt-4 text-[clamp(2rem,3.6vw,3.3rem)]">{EVENT.title}</h2>
            <div className="mt-6 grid gap-3 text-white/85">
              <p className="flex items-center gap-3"><Calendar className="h-5 w-5 text-red" />{EVENT.when}</p>
              <p className="flex items-start gap-3"><Pin className="mt-0.5 h-5 w-5 text-red" /><span>{EVENT.where}<br /><span className="text-white/60">{EVENT.address}</span></span></p>
            </div>
            <p className="mt-6 leading-relaxed text-white/70">{EVENT.body}</p>
            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-t border-white/10 pt-6">
              {EVENT.timing.map(([t, v]) => (
                <div key={t} className="contents"><dt className="font-semibold text-red">{t}</dt><dd className="text-white/85">{v}</dd></div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3"><a href={CONTACT.eventSite} target="_blank" rel="noopener noreferrer" className="btn btn-red">Request your seat <ArrowUR /></a><Link href="/membership" className="btn btn-ghost-light">About Membership</Link></div>
          </div>
        </article>
      </section>
      <section className="wrap mt-24 grid items-center gap-12 lg:grid-cols-2">
        <img data-reveal="scale" src="/media/event/sacramento-dinner.jpg" alt="Josh Stech presenting at Sundae’s Sacramento investors dinner" className="w-full rounded-[2rem] object-cover" />
        <div>
          <SectionHead eyebrow="Previously" title="Sacramento, / *September 2026.*" sub="Sundae’s Sacramento investors dinner at Echo & Rig brought local operators together with Josh to talk market trends, where the industry is heading, and how to build a stronger acquisition business in a harder market." />
          <p data-reveal className="mt-6 text-muted">Want Sundae to host a dinner in your market? Tell us on an intro call.</p>
          <a data-reveal href={CONTACT.introCall} target="_blank" rel="noopener noreferrer" className="btn btn-ink mt-6">Schedule an intro call <ArrowUR /></a>
        </div>
      </section>
    </>
  );
}

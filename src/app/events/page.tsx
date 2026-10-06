/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHead, nb } from "@/components/ui";
import { ArrowUR, Calendar, Pin } from "@/components/icons";
import { CONTACT, EVENT } from "@/content/site";

export const metadata: Metadata = { title: "Events — private dinners for real estate operators", description: "Private dinners with Sundae co-founder and CEO Josh Stech. Next: Thursday, Oct. 8, 2026 · The Courtyard at Shade Hotel, Manhattan Beach." };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Sundae events" title="Dinner, dialogue / and *what’s next.*" sub="Josh Stech travels to Sundae’s markets to host private dinners with local real estate operators: wholesalers, flippers and investors building stronger acquisition businesses." />
      <section className="wrap">
        <article data-reveal="scale" className="card grid overflow-hidden lg:grid-cols-[1.05fr_1fr]">
          <div className="relative min-h-[340px] overflow-hidden">
            <img data-parallax="6" src="/media/event/shade-courtyard.jpg" alt="The Courtyard at Shade Hotel, Manhattan Beach" className="absolute inset-0 h-full w-full scale-110 object-cover" />
            <span className="absolute left-5 top-6 -rotate-[4deg] bg-red px-4 py-1.5 text-[1.5rem] font-black leading-tight text-white shadow-[0_14px_30px_-16px_rgba(74,74,74,.6)]">Next up</span>
          </div>
          <div className="p-8 md:p-12">
            <p className="eyebrow">Los Angeles · Private dinner</p>
            <h2 className="display h-bar mt-4 text-[clamp(1.9rem,3.2vw,2.75rem)]">{EVENT.title.replace("Josh Stech", nb("Josh Stech"))}</h2>
            <div className="mt-7 grid gap-3 text-lg">
              <p className="flex items-center gap-3 font-bold"><Calendar className="h-5 w-5 shrink-0 text-blue" />{EVENT.when}</p>
              <p className="flex items-start gap-3"><Pin className="mt-1 h-5 w-5 shrink-0 text-blue" /><span>{EVENT.where}<br />{EVENT.address}</span></p>
            </div>
            <p className="mt-6 text-lg leading-relaxed">{EVENT.body}</p>
            <dl className="mt-7 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 rounded-xl bg-mist p-5 text-lg">
              {EVENT.timing.map(([t, v]) => (
                <div key={t} className="contents"><dt className="whitespace-nowrap font-bold tabular-nums">{t}</dt><dd>{v}</dd></div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3"><a href={CONTACT.eventSite} target="_blank" rel="noopener noreferrer" className="btn btn-blue">Request your seat <ArrowUR /></a><Link href="/membership" className="btn btn-outline">About Membership</Link></div>
          </div>
        </article>
      </section>
      <section className="wrap mt-24 grid items-center gap-12 lg:grid-cols-2">
        <img data-reveal="scale" src="/media/event/sacramento-dinner.jpg" alt="Josh Stech presenting at Sundae’s Sacramento investors dinner" className="w-full rounded-[1.5rem] object-cover" />
        <div>
          <SectionHead eyebrow="Previously" title="Sacramento, / *September 2026.*" sub="Sundae’s Sacramento investors dinner at Echo & Rig brought local operators together with Josh to talk market trends, where the industry is heading and how to build a stronger acquisition business in a harder market." />
          <p data-reveal className="mt-6 text-lg">Want Sundae to host a dinner in your market? Tell us on an intro call.</p>
          <a data-reveal href={CONTACT.introCall} target="_blank" rel="noopener noreferrer" className="btn btn-blue mt-6">Schedule an intro call <ArrowUR /></a>
        </div>
      </section>
    </>
  );
}

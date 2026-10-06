/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { Accent, SectionHead, Words, nb } from "@/components/ui";
import AskButton from "@/components/AskButton";
import { Arrow, ArrowUR, Calendar, Check, Plus } from "@/components/icons";
import { CONTACT, EVENT, MEMBERSHIP } from "@/content/site";

export const metadata: Metadata = { title: "Sundae Membership — for experienced real estate operators", description: "Stop building. Start scaling. Sundae Membership gives experienced operators a proven system for acquisition, conversion and maximizing profit." };

export default function Page() {
  return (
    <>
      {/* HERO — light ground (no dark heroes); blue is the accent */}
      <section className="relative overflow-hidden bg-mist pb-20 pt-32 md:pb-28 md:pt-44">
        <div aria-hidden className="shape-circle pointer-events-none absolute -left-24 bottom-[-6rem] hidden h-72 w-72 opacity-60 lg:block" />
        <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="eyebrow rise">Sundae Membership</p>
            <h1 className="display h-bar h-bar-lg mt-5 text-[clamp(2.5rem,5.4vw,4.75rem)]">
              <span className="mask-line"><span>Stop building.</span></span>
              <span className="mask-line"><span style={{ animationDelay: ".12s" }}><span className="hl">Start scaling.</span></span></span>
            </h1>
            <p className="rise rise-3 mt-7 text-[1.375rem] font-bold leading-snug md:text-[1.625rem]">{MEMBERSHIP.sub}</p>
            <p className="rise rise-4 mt-4 max-w-xl text-lg leading-relaxed md:text-[1.1875rem]">{MEMBERSHIP.intro}</p>
            <div className="rise rise-5 mt-9 flex flex-wrap gap-3">
              <a href={CONTACT.introCall} target="_blank" rel="noopener noreferrer" className="btn btn-blue">Schedule an intro call <ArrowUR /></a>
              <a href={CONTACT.eventSite} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><Calendar /> Oct. 8 dinner · RSVP</a>
            </div>
          </div>
          <div className="rise rise-3 relative mx-auto w-full max-w-[520px]">
            <div aria-hidden className="dots absolute -right-4 -top-8 hidden h-20 w-20 md:block" />
            <div data-tilt="7" className="tilt relative">
              <img src="/media/membership-close.png" alt="Sundae’s always-on lead coverage: AI-answered calls, automated follow-up and CRM dashboards" className="w-full rounded-[1.25rem] border border-gray bg-white p-3 shadow-[0_40px_80px_-40px_rgba(28,81,160,.45)]" />
              <figure className="tilt-inner absolute -bottom-8 -left-6 flex items-center gap-3 rounded-xl border border-gray bg-white p-3 pr-5 shadow-[0_24px_48px_-24px_rgba(74,74,74,.5)] md:-left-12">
                <img src="/media/team/josh-stech.jpg" alt="" className="h-14 w-14 rounded-lg object-cover object-top" />
                <figcaption className="leading-snug"><span className="block text-[1.0625rem] font-bold">Josh Stech</span><span className="text-base">Co-founder and CEO, leads Membership</span></figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* MARKET */}
      <section className="wrap py-24 md:py-36">
        <p data-reveal className="eyebrow">{MEMBERSHIP.market.title}</p>
        <Words className="display mt-7 max-w-5xl text-[clamp(1.9rem,3.8vw,3.4rem)] leading-[1.3]" text="Finding profitable deals is harder. Margins are tighter. Scale with systems already *built,* *tested* and *refined* in real markets." />
      </section>

      {/* ENGINE — sticky visual */}
      <section data-sticky-steps className="wrap">
        <SectionHead eyebrow="The Sundae Engine" title="Three systems. / *One* engine." />
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="grid gap-10 lg:gap-0">
            {MEMBERSHIP.engine.map((e, i) => (
              <div key={e.title} data-step className="transition-opacity duration-500 lg:flex lg:min-h-[70vh] lg:flex-col lg:justify-center">
                <span className="num">{i + 1}</span>
                <h3 className="display mt-5 text-[clamp(2rem,3.4vw,3rem)]">{e.title}</h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed">{e.body}</p>
                <img src={e.img} alt="" className="mt-8 w-full rounded-[1.25rem] border border-gray bg-white p-2 lg:hidden" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="relative hidden lg:block">
            <div className="sticky top-[18vh] h-[64vh]">
              <div aria-hidden className="absolute inset-[6%] rounded-full bg-mist" />
              {MEMBERSHIP.engine.map((e, i) => (
                <img key={e.title} data-step-pic src={e.img} alt={e.title} className="absolute inset-0 m-auto max-h-full w-full rounded-[1.5rem] border border-gray bg-white object-contain p-3 shadow-[0_40px_80px_-40px_rgba(28,81,160,.4)] transition-all duration-700" style={{ opacity: i === 0 ? 1 : 0 }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BETTER TOGETHER */}
      <section className="mt-28 bg-mist py-24 md:mt-36 md:py-32">
        <div className="wrap">
          <SectionHead center eyebrow="Better together" title="You know your market. / We bring the *systems* to scale it." />
          <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {[{ t: "You bring", l: MEMBERSHIP.youBring, c: "card" }, null, { t: "Sundae brings", l: MEMBERSHIP.sundaeBrings, c: "card" }, "=", { t: "Together", l: MEMBERSHIP.together, c: "on-blue bg-blue text-white rounded-[1.25rem]" }].map((x, i) =>
              x === null || typeof x === "string" ? (
                <div key={i} className="flex items-center justify-center text-blue"><span className="flex h-12 w-12 items-center justify-center rounded-full border border-gray bg-white">{x === "=" ? <span className="display text-2xl leading-none">=</span> : <Plus className="h-5 w-5" />}</span></div>
              ) : (
                <div key={i} data-reveal data-delay={i * 0.08} className={`${x.c} p-8`}>
                  <p className={`eyebrow ${x.t === "Together" ? "!text-white" : ""}`}>{x.t}</p>
                  <ul className="mt-5 grid gap-2.5">{x.l.map((v) => <li key={v} className="display text-[1.5rem]">{v}</li>)}</ul>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="wrap mt-28 md:mt-36">
        <SectionHead eyebrow="Why operators choose Sundae" title="Built over years. / *Ready* on day one." />
        <div data-stagger="0.07" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {MEMBERSHIP.why.map((w, i) => (
            <div key={w.title} className={`flex flex-col rounded-[1.25rem] p-7 ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"} ${i === 0 ? "on-blue bg-blue text-white sm:col-span-2" : "card"}`}>
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${i === 0 ? "bg-white text-blue" : "bg-mist text-blue"}`}><Check /></span>
              <h3 className="mt-6 text-xl font-bold leading-snug">{w.title}</h3>
              <p className="mt-2 text-lg leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>
        <div data-reveal className="mt-6 overflow-hidden rounded-[1.5rem] border border-gray bg-white p-4"><img src="/media/membership-map.png" alt="Sundae markets across the United States" className="mx-auto w-full max-w-4xl" loading="lazy" /></div>
      </section>

      {/* FIT */}
      <section className="wrap mt-28 md:mt-36">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Is Sundae Membership right for you?" title="Built for operators / who’ve *done the work.*" />
            <ul data-stagger="0.06" className="mt-8 grid gap-3">
              {MEMBERSHIP.fit.map((f) => <li key={f} className="flex items-center gap-4 rounded-xl border border-gray bg-white p-4"><span className="tick !h-8 !w-8"><Check className="h-4 w-4" /></span><span className="text-lg font-bold leading-normal">{f}</span></li>)}
            </ul>
          </div>
          <div data-reveal="scale" className="relative">
            <img src="/media/member-collage.png" alt="" className="w-full" loading="lazy" />
            <div className="card-mist mt-6 p-7">
              <p className="text-lg">Have a question about fit, territory or how Membership works?</p>
              <div className="mt-5 flex flex-wrap gap-3"><AskButton q="Who is a good fit for Sundae Membership?" label="Ask the assistant" className="btn btn-blue" /><a href={CONTACT.introCall} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Talk to Victoria White</a></div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="wrap mt-28 md:mt-36">
        <SectionHead center eyebrow="How Membership works" title="Three conversations / to a *growth plan.*" />
        <ol className="relative mt-14 grid gap-5 md:grid-cols-3">
          {MEMBERSHIP.steps.map((s, i) => (
            <li key={s.title} data-reveal data-delay={i * 0.1} className="card relative p-8">
              <span className="num num-lg">{i + 1}</span>
              <h3 className="display mt-6 text-[1.5rem]">{s.title}</h3>
              <p className="mt-3 text-lg leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* EVENT */}
      <section className="wrap mt-24">
        <a href={CONTACT.eventSite} target="_blank" rel="noopener noreferrer" data-reveal className="card group grid overflow-hidden md:grid-cols-[1fr_1.2fr]">
          <div className="relative min-h-[280px] overflow-hidden"><img src="/media/event/shade-courtyard.jpg" alt="The Courtyard at Shade Hotel, Manhattan Beach" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" /></div>
          <div className="p-8 md:p-12">
            <p className="eyebrow">Private dinner · Los Angeles operators</p>
            <h2 className="display h-bar mt-4 text-[clamp(1.75rem,3vw,2.6rem)]">{EVENT.title.replace("Josh Stech", nb("Josh Stech"))}</h2>
            <p className="mt-5 flex items-center gap-3 text-lg font-bold"><Calendar className="h-5 w-5 shrink-0 text-blue" />{EVENT.when}</p>
            <p className="mt-1 pl-8 text-lg">{EVENT.where}</p>
            <p className="mt-4 max-w-lg text-lg leading-relaxed">{EVENT.body}</p>
            <span className="btn btn-blue mt-8">Request your seat <ArrowUR /></span>
          </div>
        </a>
      </section>

      {/* CTA */}
      <section className="wrap mt-24">
        <div data-reveal="scale" className="on-blue relative overflow-hidden rounded-[1.75rem] bg-blue px-6 py-16 text-white md:px-16 md:py-20">
          <div aria-hidden className="shape-rect pointer-events-none absolute right-6 top-6 h-12 w-12 md:right-10 md:top-10 md:h-16 md:w-16" />
          <div aria-hidden className="dots-white pointer-events-none absolute right-28 top-10 hidden h-16 w-16 opacity-50 lg:block" />
          <div className="relative max-w-3xl">
            <h2 className="display text-[clamp(2.1rem,4vw,3.4rem)]"><Accent text="Ready to grow *with Sundae?*" /></h2>
            <p className="mt-5 text-lg leading-relaxed md:text-xl">Let’s connect. We’ll share more about Sundae Membership, learn about your business and growth goals, and explore how we could help you scale.</p>
            <div className="mt-9 flex flex-wrap gap-3"><a href={CONTACT.introCall} target="_blank" rel="noopener noreferrer" className="btn btn-white">Schedule an intro call <ArrowUR /></a><Link href="/events" className="btn btn-ghost">Upcoming events <Arrow /></Link></div>
          </div>
        </div>
        <p className="mt-4 text-base leading-relaxed">Membership terms, fees and territory availability are discussed on the intro call. Nothing on this page is an offer to sell a franchise or a representation of earnings.</p>
      </section>
    </>
  );
}

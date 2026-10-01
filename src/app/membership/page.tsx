/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { Accent, SectionHead, Words } from "@/components/ui";
import AskButton from "@/components/AskButton";
import { Arrow, ArrowUR, Calendar, Check, Plus } from "@/components/icons";
import { CONTACT, EVENT, MEMBERSHIP } from "@/content/site";

export const metadata: Metadata = { title: "Sundae Membership — for experienced real estate operators", description: "Stop building. Start scaling. Sundae Membership gives experienced operators a proven system for acquisition, conversion and maximizing profit." };

export default function Page() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-blue-deep pb-20 pt-32 text-white md:pb-28 md:pt-44">
        <img src="/media/neighborhood.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(84,140,225,.35),transparent_60%),linear-gradient(180deg,rgba(15,47,99,.2),#0f2f63)]" />
        <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="eyebrow rise !text-sky">Sundae Membership</p>
            <h1 className="display mt-5 text-[clamp(3rem,7vw,6.2rem)]">
              <span className="mask-line"><span>Stop building.</span></span>
              <span className="mask-line"><span style={{ animationDelay: ".12s" }} className="serif font-normal tracking-normal text-sky">Start scaling.</span></span>
            </h1>
            <p className="rise rise-3 mt-6 text-2xl font-medium text-white/90">{MEMBERSHIP.sub}</p>
            <p className="rise rise-4 mt-4 max-w-xl text-lg leading-relaxed text-white/70">{MEMBERSHIP.intro}</p>
            <div className="rise rise-5 mt-9 flex flex-wrap gap-3">
              <a href={CONTACT.introCall} target="_blank" rel="noopener noreferrer" className="btn btn-white">Schedule an intro call <ArrowUR /></a>
              <a href={CONTACT.eventSite} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light"><Calendar /> Oct 8 dinner · RSVP</a>
            </div>
          </div>
          <div className="rise rise-3 relative mx-auto w-full max-w-[520px]">
            <div data-tilt="7" className="tilt relative">
              <img src="/media/membership-close.png" alt="Sundae’s always-on lead coverage: AI-answered calls, automated follow-up and CRM dashboards" className="w-full rounded-[1.5rem] bg-white/95 p-3 shadow-[0_50px_100px_-40px_rgba(0,0,0,.7)]" />
              <figure className="tilt-inner absolute -bottom-8 -left-6 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 text-ink shadow-2xl md:-left-12">
                <img src="/media/team/josh-stech.jpg" alt="" className="h-14 w-14 rounded-xl object-cover object-top" />
                <figcaption><span className="block font-semibold">Josh Stech</span><span className="text-sm text-muted">Co-Founder & CEO, leads Membership</span></figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* MARKET */}
      <section className="wrap py-24 md:py-36">
        <p data-reveal className="eyebrow !text-blue">{MEMBERSHIP.market.title}</p>
        <Words className="display mt-6 max-w-5xl text-[clamp(2rem,4.6vw,4.2rem)] leading-[1.05]" text="Finding profitable deals is harder. Margins are tighter. Scale with systems already *built,* *tested,* and *refined* in real markets." />
      </section>

      {/* ENGINE — sticky visual */}
      <section data-sticky-steps className="wrap">
        <SectionHead eyebrow="The Sundae Engine" title="Three systems. / *One* engine." />
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="grid gap-10 lg:gap-0">
            {MEMBERSHIP.engine.map((e, i) => (
              <div key={e.title} data-step className="transition-opacity duration-500 lg:flex lg:min-h-[70vh] lg:flex-col lg:justify-center">
                <span className="font-mono text-sm text-blue">0{i + 1}</span>
                <h3 className="display mt-3 text-[clamp(2.2rem,4vw,3.6rem)]">{e.title}</h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{e.body}</p>
                <img src={e.img} alt="" className="mt-8 w-full rounded-[1.5rem] border border-line bg-white p-2 lg:hidden" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="relative hidden lg:block">
            <div className="sticky top-[18vh] h-[64vh]">
              <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_40%,rgba(84,140,225,.18),transparent_70%)]" />
              {MEMBERSHIP.engine.map((e, i) => (
                <img key={e.title} data-step-pic src={e.img} alt={e.title} className="absolute inset-0 m-auto max-h-full w-full rounded-[1.75rem] border border-line bg-white object-contain p-3 shadow-[0_40px_80px_-40px_rgba(15,47,99,.45)] transition-all duration-700" style={{ opacity: i === 0 ? 1 : 0 }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BETTER TOGETHER */}
      <section className="mt-28 bg-cream py-24 md:mt-36 md:py-32">
        <div className="wrap">
          <SectionHead center eyebrow="Better together" title="You know your market. / We bring the *systems* to scale it." />
          <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {[{ t: "You bring", l: MEMBERSHIP.youBring, c: "card" }, null, { t: "Sundae brings", l: MEMBERSHIP.sundaeBrings, c: "bg-blue text-white rounded-[1.5rem]" }, "=", { t: "Together", l: MEMBERSHIP.together, c: "bg-ink text-white rounded-[1.5rem]" }].map((x, i) =>
              x === null || typeof x === "string" ? (
                <div key={i} className="flex items-center justify-center text-blue"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">{x === "=" ? <span className="display text-2xl">=</span> : <Plus className="h-5 w-5" />}</span></div>
              ) : (
                <div key={i} data-reveal data-delay={i * 0.08} className={`${x.c} p-8`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-60">{x.t}</p>
                  <ul className="mt-5 grid gap-2.5">{x.l.map((v) => <li key={v} className="display text-2xl">{v}</li>)}</ul>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="wrap mt-28 md:mt-36">
        <SectionHead eyebrow="Why operators choose Sundae" title="Built over years. / *Ready* on day one." />
        <div data-stagger="0.07" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {MEMBERSHIP.why.map((w, i) => (
            <div key={w.title} className={`flex flex-col rounded-[1.5rem] p-7 ${i === 0 ? "bg-blue text-white sm:col-span-2 lg:col-span-1" : "card"}`}>
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${i === 0 ? "bg-white/15" : "bg-blue/10 text-blue"}`}><Check /></span>
              <h3 className="mt-6 text-lg font-semibold leading-snug">{w.title}</h3>
              <p className={`mt-2 text-[0.95rem] ${i === 0 ? "text-white/70" : "text-muted"}`}>{w.body}</p>
            </div>
          ))}
        </div>
        <div data-reveal className="mt-6 overflow-hidden rounded-[1.75rem] border border-line bg-white p-4"><img src="/media/membership-map.png" alt="Sundae markets across the United States" className="mx-auto w-full max-w-4xl" loading="lazy" /></div>
      </section>

      {/* FIT */}
      <section className="wrap mt-28 md:mt-36">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Is Sundae Membership right for you?" title="Built for operators / who’ve *done the work.*" />
            <ul data-stagger="0.06" className="mt-8 grid gap-3">
              {MEMBERSHIP.fit.map((f) => <li key={f} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue text-white"><Check className="h-4 w-4" /></span><span className="font-medium">{f}</span></li>)}
            </ul>
          </div>
          <div data-reveal="scale" className="relative">
            <img src="/media/member-collage.png" alt="" className="w-full" loading="lazy" />
            <div className="mt-6 rounded-[1.5rem] bg-blue-deep p-7 text-white">
              <p className="text-white/70">Have a question about fit, territory or how Membership works?</p>
              <div className="mt-4 flex flex-wrap gap-3"><AskButton q="Who is a good fit for Sundae Membership?" label="Ask the assistant" className="btn btn-white !text-ink" /><a href={CONTACT.introCall} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">Talk to Victoria White</a></div>
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
              <span className="display text-6xl text-blue/15">{i + 1}</span>
              <h3 className="display mt-2 text-2xl">{s.title}</h3>
              <p className="mt-3 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* EVENT */}
      <section className="wrap mt-24">
        <a href={CONTACT.eventSite} target="_blank" rel="noopener noreferrer" data-reveal className="group grid overflow-hidden rounded-[2rem] bg-ink text-white md:grid-cols-[1fr_1.2fr]">
          <div className="relative min-h-[260px] overflow-hidden"><img src="/media/event/shade-courtyard.jpg" alt="The Courtyard at Shade Hotel, Manhattan Beach" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" /></div>
          <div className="p-8 md:p-12">
            <p className="eyebrow !text-red">Private dinner · Los Angeles operators</p>
            <h2 className="display mt-4 text-[clamp(1.9rem,3.4vw,3rem)]">{EVENT.title}</h2>
            <p className="mt-3 font-semibold">{EVENT.when}</p>
            <p className="text-white/70">{EVENT.where}</p>
            <p className="mt-4 max-w-lg text-white/70">{EVENT.body}</p>
            <span className="btn btn-red mt-8">Request your seat <ArrowUR /></span>
          </div>
        </a>
      </section>

      {/* CTA */}
      <section className="wrap mt-24">
        <div data-reveal="scale" className="grain relative overflow-hidden rounded-[2.5rem] bg-blue px-6 py-16 text-white md:px-16 md:py-24">
          <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-sky/40 blur-3xl" />
          <div className="relative max-w-3xl">
            <h2 className="display text-[clamp(2.4rem,5vw,4.4rem)]"><Accent text="Ready to grow *with Sundae?*" /></h2>
            <p className="mt-5 text-lg text-white/80">Let’s connect. We’ll share more about Sundae Membership, learn about your business and growth goals, and explore how we could help you scale.</p>
            <div className="mt-9 flex flex-wrap gap-3"><a href={CONTACT.introCall} target="_blank" rel="noopener noreferrer" className="btn btn-white">Schedule an intro call <ArrowUR /></a><Link href="/events" className="btn btn-ghost-light">Upcoming events <Arrow /></Link></div>
          </div>
        </div>
        <p className="mt-4 text-xs text-faint">Membership terms, fees and territory availability are discussed on the intro call. Nothing on this page is an offer to sell a franchise or a representation of earnings.</p>
      </section>
    </>
  );
}

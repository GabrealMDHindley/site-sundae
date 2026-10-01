/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import HeroStage from "@/components/HeroStage";
import AskButton from "@/components/AskButton";
import MarketCard from "@/components/MarketCard";
import { CtaBand, FaqList, OfferCtas, QuoteCard, RatingBadge, SectionHead, Stars, Words } from "@/components/ui";
import { Arrow, ArrowUR, Calendar, Check, Cross } from "@/components/icons";
import { CONTACT, DIFFERENCE, DRPHIL, EVENT, MARKETS, PRESS, PROMISE, SELLER_FAQ, SITUATIONS, STATS, STEPS, TESTIMONIALS } from "@/content/site";

export default function Home() {
  const faq = [SELLER_FAQ[0].items[0], SELLER_FAQ[0].items[3], SELLER_FAQ[2].items[0], SELLER_FAQ[1].items[0], SELLER_FAQ[3].items[1]];
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pb-10 pt-28 md:pt-32 lg:min-h-[100svh] lg:pb-0">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,black,transparent)]" />
        <div className="pointer-events-none absolute -left-40 top-40 h-[480px] w-[480px] rounded-full bg-blush blur-[110px]" />
        <div className="wrap relative grid items-center gap-6 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          <div className="max-w-2xl">
            <div className="rise"><RatingBadge /></div>
            <h1 className="display mt-7 text-[clamp(2.9rem,5.5vw,5.6rem)]">
              <span className="mask-line"><span style={{ animationDelay: ".1s" }}>Sell your house</span></span>
              <span className="mask-line"><span style={{ animationDelay: ".2s" }}><span className="serif font-normal tracking-normal text-red">as-is,</span> and skip</span></span>
              <span className="mask-line"><span style={{ animationDelay: ".3s" }}>the hassle.</span></span>
            </h1>
            <p className="lede rise rise-3 mt-7 max-w-xl">No repairs, cleanings or showings. Pay zero fees to Sundae. Investors compete for your home, so you get the highest off-market price — and close in as little as 10 days.</p>
            <div className="rise rise-4 mt-9"><OfferCtas /></div>
            <ul className="rise rise-5 mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[0.92rem] text-muted">
              {["No repairs or showings", "Zero fees to Sundae", "Close in 10–60 days"].map((x) => <li key={x} className="flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-red/10 text-red"><Check className="h-3 w-3" /></span>{x}</li>)}
            </ul>
          </div>
          <HeroStage />
        </div>
      </section>

      {/* PRESS */}
      <section className="border-y border-line bg-white/60 py-7" aria-label="As featured on">
        <div className="wrap flex items-center gap-8">
          <p className="hidden shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-faint md:block">Featured on</p>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <div className="marquee items-center gap-16">
              {[...PRESS, ...PRESS, ...PRESS, ...PRESS].map((p, i) => <img key={i} src={p.src} alt={i < PRESS.length ? p.name : ""} className="h-7 w-auto shrink-0 opacity-55 grayscale transition hover:opacity-100 hover:grayscale-0" />)}
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="wrap py-24 md:py-36">
        <p data-reveal className="eyebrow">Why Sundae</p>
        <Words className="display mt-6 max-w-5xl text-[clamp(2rem,4.6vw,4.2rem)] leading-[1.05]" text="Most cash buyers want the lowest price. Sundae puts your house in front of hundreds of investors and lets them compete — because when investors compete, *homeowners* *win.*" />
      </section>

      {/* PROMISE */}
      <section className="wrap">
        <SectionHead eyebrow="The Sundae Promise" title="Peace of mind, / *start to finish.*" sub="A simple, transparent experience designed to help you move forward with confidence." />
        <div data-stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {PROMISE.map((p, i) => (
            <article key={p.title} data-tilt="6" className="tilt card group relative overflow-hidden p-8">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(219,61,85,.08), transparent 60%)" }} />
              <span className="font-mono text-xs text-faint">0{i + 1}</span>
              <img src={p.img} alt="" className="tilt-inner mx-auto mt-2 h-40 w-auto object-contain" loading="lazy" />
              <h3 className="display mt-6 text-[1.7rem]">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS — pinned horizontal on desktop */}
      <section data-hscroll className="relative mt-28 overflow-hidden bg-ink py-20 text-white md:mt-36 lg:flex lg:h-screen lg:items-center lg:py-0">
        <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-red/25 blur-[140px]" />
        <div data-track className="relative flex flex-col gap-6 px-5 md:px-8 lg:flex-row lg:items-stretch lg:gap-8 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))]">
          <div className="flex shrink-0 flex-col justify-between lg:w-[420px]">
            <div>
              <p className="eyebrow !text-white/60">How Sundae works</p>
              <h2 className="display mt-4 text-[clamp(2.4rem,4.6vw,4rem)]">Three steps. <span className="serif font-normal tracking-normal text-red">Zero</span> hassle.</h2>
              <p className="mt-5 max-w-sm text-white/65">From your first call to closing day, a local Market Expert and a dedicated Closing Manager handle the details.</p>
            </div>
            <div className="mt-8 hidden lg:block">
              <div className="h-px w-full bg-white/15"><div data-hprog className="h-px origin-left scale-x-0 bg-red" /></div>
              <Link href="/how-it-works" className="btn btn-ghost-light mt-8">See the full process <Arrow /></Link>
            </div>
          </div>
          {STEPS.map((s) => (
            <article key={s.n} className="relative flex shrink-0 flex-col overflow-hidden rounded-[2rem] bg-white/[0.06] p-8 ring-1 ring-white/10 backdrop-blur lg:h-[68vh] lg:w-[min(560px,42vw)] lg:p-10">
              <span className="display text-[6rem] leading-none text-white/10 lg:text-[9rem]">{s.n}</span>
              <div className="mt-auto">
                <img src={s.img} alt="" className="mb-6 h-28 w-auto rounded-2xl bg-white p-2 lg:h-36" loading="lazy" />
                <h3 className="display text-3xl lg:text-4xl">{s.title}</h3>
                <p className="mt-3 max-w-md text-lg text-white/70">{s.body}</p>
              </div>
            </article>
          ))}
          <article className="relative flex shrink-0 flex-col justify-center rounded-[2rem] bg-red p-8 lg:h-[68vh] lg:w-[420px] lg:p-10">
            <h3 className="display text-4xl">Ready when you are.</h3>
            <p className="mt-3 text-white/80">Request offers in minutes, or talk it through with a local expert.</p>
            <div className="mt-8 grid gap-3">
              <Link href="/get-offer" className="btn btn-white">Request offers now <Arrow /></Link>
              <a href={CONTACT.sellerTel} className="btn btn-ghost-light">Call {CONTACT.sellerPhone}</a>
            </div>
          </article>
          <div className="hidden w-8 shrink-0 lg:block" />
        </div>
      </section>

      {/* STATS */}
      <section className="wrap py-24 md:py-32">
        <div className="grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-paper p-8 md:p-10">
              <div className="display text-[clamp(2.8rem,5vw,4.4rem)] text-ink"><span data-count={s.value} data-prefix={s.prefix || ""} data-suffix={s.suffix || ""}>{(s.prefix || "") + s.value.toLocaleString("en-US") + (s.suffix || "")}</span></div>
              <p className="mt-2 max-w-[14rem] text-[0.95rem] text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SITUATIONS */}
      <section className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead eyebrow="When to turn to Sundae" title="Any house. / *Any* situation." sub="Sundae buys homes in all conditions and helps homeowners through a simple, transparent process. We’ve helped homeowners navigate situations like these — and more." />
            <div data-reveal className="mt-8"><AskButton q="Will Sundae buy my house if it needs a lot of work?" label="Will Sundae buy a house that needs a lot of work?" /></div>
          </div>
          <div data-stagger="0.06" className="grid gap-3 sm:grid-cols-2">
            {SITUATIONS.map((s) => (
              <div key={s.label} className="card hover-lift flex items-center gap-4 p-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cream"><img src={s.icon} alt="" className="h-8 w-8 object-contain" /></span>
                <span className="font-medium leading-snug">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENCE */}
      <section className="wrap mt-28 md:mt-36">
        <SectionHead center eyebrow="The Sundae difference" title="No fees. No lowballs. / *A better way* to sell." sub="Straightforward offers and a simple process, with our team guiding you from offer to closing." />
        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-[1.15fr_1fr_1fr]">
          <div data-reveal="scale" className="grain relative overflow-hidden rounded-[2rem] bg-ink p-8 text-white md:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red/40 blur-3xl" />
            <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-red">Selling with Sundae</p>
            <ul className="relative mt-6 grid gap-4">{DIFFERENCE.sundae.map((x) => <li key={x} className="flex gap-3 text-[1.02rem]"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red"><Check className="h-3.5 w-3.5" /></span>{x}</li>)}</ul>
            <Link href="/get-offer" className="btn btn-red relative mt-9">Get my cash offer <Arrow /></Link>
          </div>
          {[["Traditional sale", DIFFERENCE.traditional], ["Typical property investor", DIFFERENCE.investor]].map(([t, list], i) => (
            <div key={t as string} data-reveal data-delay={0.1 + i * 0.1} className="card p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-faint">{t as string}</p>
              <ul className="mt-6 grid gap-4">{(list as string[]).map((x) => <li key={x} className="flex gap-3 text-muted"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cream text-faint"><Cross className="h-3.5 w-3.5" /></span>{x}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* PROOF: image + featured quote */}
      <section className="wrap mt-28 md:mt-36">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <div data-curtain className="overflow-hidden rounded-[2rem]"><img data-parallax="6" src="/media/people/sold-sign-couple.jpg" alt="Sundae sellers holding a 'Said yes to Sundae' sign outside their home" className="h-[460px] w-full scale-110 object-cover md:h-[560px]" loading="lazy" /></div>
            <div data-reveal="left" className="absolute -bottom-6 left-4 right-4 rounded-2xl bg-white p-5 shadow-[0_30px_60px_-30px_rgba(27,20,22,.45)] md:left-auto md:right-[-1.5rem] md:w-80">
              <Stars /><p className="mt-2 text-sm leading-relaxed">“It was really cool to see a pool of buyers bid on my home.”</p><p className="mt-2 text-xs text-muted">Camille S. · San Diego, CA</p>
            </div>
          </div>
          <div className="lg:pl-8">
            <p data-reveal className="eyebrow">In their words</p>
            <blockquote data-reveal className="display mt-6 text-[clamp(1.8rem,3.4vw,3rem)] leading-[1.08]">
              “It was the smoothest transaction I’ve ever done, and I’ve done about 5 houses in my lifetime. <span className="serif font-normal tracking-normal text-red">I was somewhat baffled at how easy it was.</span>”
            </blockquote>
            <p data-reveal className="mt-6 text-muted">Oscar S. · Sacramento, CA</p>
            <div data-reveal className="mt-8 flex flex-wrap items-center gap-4"><RatingBadge /><Link href="/reviews" className="link-u font-semibold">Read all reviews</Link></div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL RAIL */}
      <section className="mt-24 md:mt-32" aria-label="Customer testimonials">
        <div className="wrap flex items-end justify-between gap-6">
          <SectionHead eyebrow="What our customers are saying" title="Real sellers. *Real* stories." />
          <Link href="/reviews" className="btn btn-line hidden md:inline-flex">All reviews <Arrow /></Link>
        </div>
        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] md:px-[max(2rem,calc((100vw-1280px)/2+2rem))]" data-lenis-prevent-wheel>
          {TESTIMONIALS.map((t) => <div key={t.name} className="w-[85vw] shrink-0 snap-start sm:w-[400px]"><QuoteCard t={t} /></div>)}
        </div>
      </section>

      {/* DR PHIL */}
      <section className="wrap mt-24 md:mt-32">
        <div className="grid overflow-hidden rounded-[2.5rem] bg-cream lg:grid-cols-2">
          <div className="relative min-h-[360px] overflow-hidden"><img data-parallax="8" src="/media/drphil-josh.jpg" alt="Sundae Co-Founder & CEO Josh Stech with Dr. Phil" className="absolute inset-0 h-full w-full scale-110 object-cover" loading="lazy" /></div>
          <div className="p-8 md:p-14">
            <img src="/media/press/drphil.svg" alt="Dr. Phil" className="h-8 w-auto opacity-80" />
            <h2 data-lines className="display mt-6 text-[clamp(2rem,3.6vw,3.2rem)]"><span className="mask-line"><span>As seen on <span className="serif font-normal tracking-normal text-red">Dr. Phil</span></span></span></h2>
            <blockquote data-reveal className="mt-6 text-lg leading-relaxed text-ink/80">“{DRPHIL.quote2}”</blockquote>
            <p data-reveal className="mt-3 text-sm text-muted">— Dr. Phil</p>
            <div data-reveal className="mt-8 flex flex-wrap gap-3"><Link href="/dr-phil" className="btn btn-ink">Dr. Phil’s resources <Arrow /></Link><Link href="/better-way" className="btn btn-line">Sell scam-free</Link></div>
            <p className="mt-8 text-xs text-faint">{DRPHIL.disclosure}</p>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="wrap mt-24 md:mt-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="Where we buy" title="Local experts in / *12 metro areas.*" sub="California, Florida, Nevada, Oklahoma, South Carolina, Tennessee and Utah — with more cities coming soon." />
          <Link href="/locations" className="btn btn-line">All locations <Arrow /></Link>
        </div>
        <div data-stagger="0.05" className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {MARKETS.slice(0, 8).map((m) => <MarketCard key={m.slug} m={m} />)}
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="wrap mt-24 md:mt-32">
        <div className="grid gap-5 lg:grid-cols-2">
          <article data-reveal className="card group relative flex flex-col overflow-hidden p-8 md:p-12">
            <p className="eyebrow">For investors</p>
            <h3 className="display mt-4 text-[clamp(2rem,3.4vw,3rem)]">Become a homebuyer <span className="serif font-normal tracking-normal text-red">with heart.</span></h3>
            <p className="mt-4 max-w-md text-muted">Our exclusive marketplace matches you with off-market, as-is homes in your area — sourced by Sundae’s own TV, radio, search and direct mail.</p>
            <img src="/media/marketplace-devices.png" alt="The Sundae Marketplace on laptop and phone" className="mt-8 w-full transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
            <div className="mt-6 flex flex-wrap gap-3"><Link href="/investors" className="btn btn-ink">Explore the marketplace <Arrow /></Link><a href={CONTACT.investorTel} className="btn btn-line">{CONTACT.investorPhone}</a></div>
          </article>
          <article data-reveal data-delay="0.1" className="relative flex flex-col overflow-hidden rounded-[1.5rem] bg-blue-deep p-8 text-white md:p-12">
            <img data-parallax="6" src="/media/neighborhood.jpg" alt="" className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-25 mix-blend-screen" />
            <div className="relative">
              <p className="eyebrow !text-sky">Sundae Membership · for operators</p>
              <h3 className="display mt-4 text-[clamp(2rem,3.4vw,3rem)]">Stop building. <span className="serif font-normal tracking-normal text-sky">Start scaling.</span></h3>
              <p className="mt-4 max-w-md text-white/75">Experienced wholesalers, flippers and operators: plug into Sundae’s marketing, technology, automation, capital and buyer reach — led by Co-founder & CEO Josh Stech.</p>
              <div className="mt-8 flex flex-wrap gap-2">{["$100M+ marketing investment", "National brand", "End-to-end technology", "Capital + buyer reach"].map((x) => <span key={x} className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm ring-1 ring-white/15">{x}</span>)}</div>
              <div className="mt-8 flex flex-wrap gap-3"><Link href="/membership" className="btn btn-white">Explore Membership <Arrow /></Link><a href={CONTACT.introCall} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">Book an intro call</a></div>
            </div>
            <a href={CONTACT.eventSite} target="_blank" rel="noopener noreferrer" className="relative mt-auto flex items-center gap-4 rounded-2xl bg-white/10 p-4 pt-4 ring-1 ring-white/15 transition-colors hover:bg-white/15 max-lg:mt-10 lg:mt-12">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red"><Calendar className="h-5 w-5" /></span>
              <span className="flex-1"><span className="block text-xs uppercase tracking-[0.16em] text-white/60">Private dinner · Oct 8 · Manhattan Beach</span><span className="block font-semibold">{EVENT.title} — RSVP</span></span>
              <ArrowUR className="h-5 w-5 shrink-0" />
            </a>
          </article>
        </div>
      </section>

      {/* ADVOCATES */}
      <section className="wrap mt-24 md:mt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <img data-reveal="scale" src="/media/ill/house-heart.png" alt="" className="mx-auto w-full max-w-md" loading="lazy" />
          <div>
            <SectionHead eyebrow="We’re your advocates" title="35+ years in real estate. / One *simple* idea." />
            <p data-reveal className="mt-6 text-lg leading-relaxed text-muted">For too long we’ve seen owners of dated and damaged homes get a bad deal, settling for less than what they deserve. We created Sundae to change that.</p>
            <p data-reveal className="mt-4 text-lg leading-relaxed text-muted">Weighing on- vs. off-market? We’ll help you decide. Our home assessment, scope of work for necessary repairs, and offer are free — so you have everything you need to make the best decision for yourself, at no cost.</p>
            <div data-reveal className="mt-8 flex flex-wrap gap-3"><Link href="/about" className="btn btn-ink">Our story <Arrow /></Link><Link href="/about/leadership" className="btn btn-line">Meet the team</Link></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wrap mt-24 md:mt-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <SectionHead eyebrow="FAQ" title="Questions, / *answered.*" sub="Can’t find it here? Ask our assistant — it’s trained on everything on this site — or call a local expert." />
            <div data-reveal className="mt-8 grid gap-3 sm:max-w-sm">
              <AskButton q="I inherited a house that needs work. How would selling with Sundae go?" label="Ask the Sundae assistant" className="btn btn-red !text-white" />
              <Link href="/faq" className="btn btn-line">All FAQs <Arrow /></Link>
            </div>
          </div>
          <div data-reveal><FaqList items={faq} /></div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import HeroStage from "@/components/HeroStage";
import AskButton from "@/components/AskButton";
import MarketCard from "@/components/MarketCard";
import { CtaBand, FaqList, OfferCtas, QuoteCard, RatingBadge, SectionHead, Stars, Words, nb } from "@/components/ui";
import { Arrow, ArrowUR, Calendar, Check, Cross } from "@/components/icons";
import { CONTACT, DIFFERENCE, DRPHIL, EVENT, MARKETS, PRESS, PROMISE, SELLER_FAQ, SITUATIONS, STATS, STATS_NOTE, STEPS, TESTIMONIALS } from "@/content/site";

export default function Home() {
  const faq = [SELLER_FAQ[0].items[0], SELLER_FAQ[0].items[3], SELLER_FAQ[2].items[0], SELLER_FAQ[1].items[0], SELLER_FAQ[3].items[1]];
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white pb-12 pt-28 md:pt-32 lg:min-h-[100svh] lg:pb-0">
        <div className="wrap relative grid items-center gap-8 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-[1.02fr_1fr] lg:gap-10">
          <div className="max-w-2xl">
            <div className="rise"><RatingBadge /></div>
            <h1 className="display h-bar h-bar-lg mt-8 text-[clamp(2.4rem,4.7vw,4.4rem)] leading-[1.16]">
              <span className="mask-line"><span style={{ animationDelay: ".1s" }}>Sell your house</span></span>
              <span className="mask-line"><span style={{ animationDelay: ".2s" }}><span className="hl">as-is,</span> and skip</span></span>
              <span className="mask-line"><span style={{ animationDelay: ".3s" }}>the hassle.</span></span>
            </h1>
            <p className="lede rise rise-3 mt-7 max-w-xl">No repairs, cleanings or showings. Pay zero fees to Sundae. Investors compete for your home, so you get competitive cash offers, and you can close in as little as 10 days.</p>
            <div className="rise rise-4 mt-9"><OfferCtas /></div>
            <ul className="rise rise-5 mt-9 flex flex-wrap gap-x-7 gap-y-3 text-[1.0625rem]">
              {["No repairs or showings", "Zero fees to Sundae", "Close in as little as 10 days"].map((x) => <li key={x} className="flex items-center gap-2.5"><span className="tick"><Check className="h-3.5 w-3.5" /></span>{x}</li>)}
            </ul>
          </div>
          <HeroStage />
        </div>
      </section>

      {/* PRESS */}
      <section className="border-y border-gray bg-white py-8" aria-label="As featured on">
        <div className="wrap flex items-center gap-10">
          <p className="eyebrow hidden shrink-0 md:block">Featured on</p>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <div className="marquee items-center gap-16">
              {[...PRESS, ...PRESS, ...PRESS, ...PRESS].map((p, i) => <img key={i} src={p.src} alt={i < PRESS.length ? p.name : ""} className="h-7 w-auto shrink-0 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />)}
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="wrap py-24 md:py-36">
        <p data-reveal className="eyebrow">Why Sundae</p>
        <Words className="display mt-7 max-w-5xl text-[clamp(1.9rem,3.8vw,3.4rem)] leading-[1.3]" text="Many cash buyers want to pay as little as possible. Sundae puts your house in front of hundreds of investors and lets them compete, because when investors compete, *homeowners* *win.*" />
      </section>

      {/* PROMISE */}
      <section className="wrap">
        <SectionHead eyebrow="The Sundae Promise" title="Peace of mind, / *start to finish.*" sub="A simple, transparent experience designed to help you move forward with confidence." />
        <div data-stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {PROMISE.map((p, i) => (
            <article key={p.title} data-tilt="6" className="tilt card group relative overflow-hidden p-8">
              <span className="eyebrow">0{i + 1}</span>
              <img src={p.img} alt="" className="tilt-inner mx-auto mt-2 h-40 w-auto object-contain" loading="lazy" />
              <h3 className="display mt-6 text-[1.625rem]">{p.title}</h3>
              <p className="mt-3 text-lg leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS — pinned horizontal on desktop */}
      <section data-hscroll className="relative mt-28 overflow-hidden bg-mist py-20 md:mt-36 lg:flex lg:h-screen lg:items-center lg:py-0">
        <div aria-hidden className="shape-circle pointer-events-none absolute -right-24 -top-24 hidden h-72 w-72 opacity-70 lg:block" />
        <div data-track className="relative flex flex-col gap-6 px-5 md:px-8 lg:flex-row lg:items-stretch lg:gap-7 lg:pl-[max(2rem,calc((100vw-1240px)/2+2rem))]">
          <div className="flex shrink-0 flex-col justify-between lg:w-[420px]">
            <div>
              <p className="eyebrow">How Sundae works</p>
              <h2 className="display h-bar mt-4 text-[clamp(2.2rem,3.8vw,3.4rem)]">Three steps. <span className="hl">Zero</span> hassle.</h2>
              <p className="mt-6 max-w-sm text-lg leading-relaxed">From your first call to closing day, a local Market Expert and a dedicated Closing Manager handle the details.</p>
            </div>
            <div className="mt-8 hidden lg:block">
              <div className="h-1 w-full rounded-full bg-gray"><div data-hprog className="h-1 origin-left scale-x-0 rounded-full bg-red" /></div>
              <Link href="/how-it-works" className="btn btn-outline mt-8">See the full process <Arrow /></Link>
            </div>
          </div>
          {STEPS.map((s) => (
            <article key={s.n} className="relative flex shrink-0 flex-col overflow-hidden rounded-[1.5rem] border border-gray bg-white p-8 lg:h-[68vh] lg:w-[min(540px,40vw)] lg:p-10">
              <span className="num num-lg">{Number(s.n)}</span>
              <div className="mt-auto pt-8">
                <img src={s.img} alt="" className="mb-6 h-28 w-auto lg:h-[clamp(8rem,calc(68vh_-_24rem),15rem)]" loading="lazy" />
                <h3 className="display text-[1.75rem] lg:text-[2.125rem]">{s.title}</h3>
                <p className="mt-3 max-w-md text-lg leading-relaxed">{s.body}</p>
              </div>
            </article>
          ))}
          <article className="on-blue relative flex shrink-0 flex-col justify-center overflow-hidden rounded-[1.5rem] bg-blue p-8 text-white lg:h-[68vh] lg:w-[420px] lg:p-10">
            <div aria-hidden className="shape-rect pointer-events-none absolute right-6 top-6 h-10 w-10 md:right-8 md:top-8 md:h-12 md:w-12" />
            <h3 className="display relative pr-12 text-[2.125rem]">Ready when you are.</h3>
            <p className="relative mt-3 text-lg leading-relaxed">Request offers in minutes, or talk it through with a local expert.</p>
            <div className="relative mt-8 grid gap-3">
              <Link href="/get-offer" className="btn btn-white">Request offers now <Arrow /></Link>
              <a href={CONTACT.sellerTel} className="btn btn-ghost">Call {CONTACT.sellerPhone}</a>
            </div>
          </article>
          <div className="hidden w-8 shrink-0 lg:block" />
        </div>
      </section>

      {/* STATS */}
      <section className="wrap py-24 md:py-32">
        <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-gray bg-gray sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white p-8 md:p-10">
              <div className="display text-[clamp(2.4rem,3.6vw,3.25rem)] leading-none"><span data-count={s.value} data-prefix={s.prefix || ""} data-suffix={s.suffix || ""}>{(s.prefix || "") + s.value.toLocaleString("en-US") + (s.suffix || "")}</span></div>
              <div aria-hidden className="mt-5 h-1.5 w-10 bg-red" />
              <p className="mt-4 max-w-[15rem] text-lg leading-normal">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-base">{STATS_NOTE}</p>
      </section>

      {/* SITUATIONS */}
      <section className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead eyebrow="When to turn to Sundae" title="Any house. / *Any* situation." sub="Sundae buys homes in all conditions and helps homeowners through a simple, transparent process. We’ve helped homeowners navigate situations like these and more." />
            <div data-reveal className="mt-8"><AskButton q="Will Sundae buy my house if it needs a lot of work?" label="Will Sundae buy a house that needs a lot of work?" /></div>
          </div>
          <div data-stagger="0.06" className="grid gap-3 sm:grid-cols-2">
            {SITUATIONS.map((s) => (
              <div key={s.label} className="card hover-lift flex items-center gap-4 p-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-mist"><img src={s.icon} alt="" className="h-8 w-8 object-contain" /></span>
                <span className="text-lg font-bold leading-normal">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENCE */}
      <section className="wrap mt-28 md:mt-36">
        <SectionHead center eyebrow="The Sundae difference" title="No fees. No lowballs. / *A better way* to sell." sub="Straightforward offers and a simple process, with our team guiding you from offer to closing." />
        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-[1.15fr_1fr_1fr]">
          <div data-reveal="scale" className="on-blue relative overflow-hidden rounded-[1.5rem] bg-blue p-8 text-white md:p-10">
            <div aria-hidden className="shape-rect pointer-events-none absolute right-6 top-6 h-10 w-10 md:right-8 md:top-8 md:h-12 md:w-12" />
            <p className="eyebrow relative pr-14 !text-white">Selling with Sundae</p>
            <ul className="relative mt-6 grid gap-4">{DIFFERENCE.sundae.map((x) => <li key={x} className="flex gap-3 text-lg leading-relaxed"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-blue"><Check className="h-3.5 w-3.5" /></span>{x}</li>)}</ul>
            <Link href="/get-offer" className="btn btn-white relative mt-9">Get my cash offer <Arrow /></Link>
          </div>
          {[["Traditional sale", DIFFERENCE.traditional], ["Typical property investor", DIFFERENCE.investor]].map(([t, list], i) => (
            <div key={t as string} data-reveal data-delay={0.1 + i * 0.1} className="card-mist p-8 md:p-10">
              <p className="eyebrow">{t as string}</p>
              <ul className="mt-6 grid gap-4">{(list as string[]).map((x) => <li key={x} className="flex gap-3 text-lg leading-relaxed"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate bg-white text-ink"><Cross className="h-3.5 w-3.5" /></span>{x}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* PROOF: image + featured quote */}
      <section className="wrap mt-28 md:mt-36">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div data-curtain className="overflow-hidden rounded-[1.5rem]"><img data-parallax="6" src="/media/people/sold-sign-couple.jpg" alt="Sundae sellers holding a 'Said yes to Sundae' sign outside their home" className="h-[460px] w-full scale-110 object-cover md:h-[560px]" loading="lazy" /></div>
            <div data-reveal="left" className="absolute -bottom-6 left-4 right-4 rounded-xl border border-gray bg-white p-5 shadow-[0_30px_60px_-30px_rgba(74,74,74,.5)] md:left-auto md:right-[-1.5rem] md:w-80">
              <Stars /><p className="mt-2 text-lg leading-relaxed">“It was really cool to see a pool of buyers bid on my home.”</p><p className="mt-2 text-base font-bold">Camille S. · San Diego, California</p>
            </div>
          </div>
          <div className="mt-6 lg:mt-0 lg:pl-8">
            <p data-reveal className="eyebrow">In their words</p>
            <blockquote data-reveal className="display mt-6 text-[clamp(1.6rem,2.7vw,2.4rem)] leading-[1.35]">
              “It was the smoothest transaction I’ve ever done, and I’ve done about 5 houses in my lifetime. <span className="hl">I was somewhat baffled at how easy it was.</span>”
            </blockquote>
            <p data-reveal className="mt-6 text-lg font-bold">Oscar S. · Sacramento, California</p>
            <div data-reveal className="mt-8 flex flex-wrap items-center gap-5"><RatingBadge /><Link href="/reviews" className="link">Read all reviews</Link></div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL RAIL */}
      <section className="mt-24 md:mt-32" aria-label="Customer testimonials">
        <div className="wrap flex items-end justify-between gap-6">
          <SectionHead eyebrow="What our customers are saying" title="Real sellers. *Real* stories." />
          <Link href="/reviews" className="btn btn-outline hidden md:inline-flex">All reviews <Arrow /></Link>
        </div>
        <div className="mt-10 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] md:scroll-px-[max(2rem,calc((100vw-1240px)/2+2rem))] md:px-[max(2rem,calc((100vw-1240px)/2+2rem))]" data-lenis-prevent-wheel>
          {TESTIMONIALS.map((t) => <div key={t.name} className="w-[85vw] shrink-0 snap-start sm:w-[410px]"><QuoteCard t={t} /></div>)}
        </div>
      </section>

      {/* DR PHIL */}
      <section className="wrap mt-24 md:mt-32">
        <div className="grid overflow-hidden rounded-[1.75rem] bg-mist lg:grid-cols-2">
          <div className="relative min-h-[360px] overflow-hidden"><img data-parallax="8" src="/media/drphil-josh.jpg" alt="Sundae co-founder and CEO Josh Stech with Dr. Phil" className="absolute inset-0 h-full w-full scale-110 object-cover" loading="lazy" /></div>
          <div className="p-8 md:p-14">
            <img src="/media/press/drphil.svg" alt="Dr. Phil" className="h-8 w-auto opacity-80" />
            <h2 data-lines className="display h-bar mt-7 text-[clamp(2rem,3.4vw,3rem)]"><span className="mask-line"><span>As seen on <span className="hl whitespace-nowrap">Dr. Phil</span></span></span></h2>
            <blockquote data-reveal className="mt-6 text-lg leading-relaxed md:text-[1.1875rem]">“{DRPHIL.quote2}”</blockquote>
            <p data-reveal className="mt-3 text-lg font-bold">— Dr. Phil</p>
            <div data-reveal className="mt-8 flex flex-wrap gap-3"><Link href="/dr-phil" className="btn btn-blue">Dr. Phil’s resources <Arrow /></Link><Link href="/better-way" className="btn btn-outline">Sell scam-free</Link></div>
            <p className="mt-8 text-base leading-relaxed">{DRPHIL.disclosure}</p>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="wrap mt-24 md:mt-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="Where we buy" title="Local experts in / *12 metro areas.*" sub="California, Florida, Nevada, Oklahoma, South Carolina, Tennessee and Utah, with more cities coming soon." />
          <Link href="/locations" className="btn btn-outline">All locations <Arrow /></Link>
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
            <h3 className="display h-bar mt-4 text-[clamp(1.9rem,3vw,2.6rem)]">Become a homebuyer <span className="hl">with heart.</span></h3>
            <p className="mt-5 max-w-md text-lg leading-relaxed">Our exclusive marketplace matches you with off-market, as-is homes in your area, sourced by Sundae’s own TV, radio, search and direct mail.</p>
            <img src="/media/marketplace-devices.png" alt="The Sundae Marketplace on laptop and phone" className="mt-8 w-full transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
            <div className="mt-6 flex flex-wrap gap-3"><Link href="/investors" className="btn btn-blue">Explore the marketplace <Arrow /></Link><a href={CONTACT.investorTel} className="btn btn-outline">{CONTACT.investorPhone}</a></div>
          </article>
          <article data-reveal data-delay="0.1" className="on-blue relative flex flex-col overflow-hidden rounded-[1.25rem] bg-blue p-8 text-white md:p-12">
            <div aria-hidden className="dots-white pointer-events-none absolute right-8 top-8 hidden h-16 w-16 opacity-50 md:block" />
            <div className="relative">
              <p className="eyebrow !text-white">Sundae Membership · for operators</p>
              <h3 className="display mt-4 text-[clamp(1.9rem,3vw,2.6rem)]">Stop building. <span className="hl">Start scaling.</span></h3>
              <p className="mt-5 max-w-md text-lg leading-relaxed">Experienced wholesalers, flippers and operators: plug into Sundae’s marketing, technology, automation, capital and buyer reach, led by Sundae co-founder and CEO Josh Stech.</p>
              <div className="mt-8 flex flex-wrap gap-2">{["More than $100 million in marketing investment", "National brand", "End-to-end technology", "Capital and buyer reach"].map((x) => <span key={x} className="rounded-2xl border border-white px-4 py-1.5 text-base leading-snug">{x}</span>)}</div>
              <div className="mt-8 flex flex-wrap gap-3"><Link href="/membership" className="btn btn-white">Explore Membership <Arrow /></Link><a href={CONTACT.introCall} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Book an intro call</a></div>
            </div>
            <a href={CONTACT.eventSite} target="_blank" rel="noopener noreferrer" className="relative mt-auto flex items-center gap-4 rounded-xl bg-white p-4 text-ink transition-transform hover:-translate-y-0.5 max-lg:mt-10 lg:mt-12">
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red text-white sm:flex"><Calendar className="h-5 w-5" /></span>
              <span className="flex-1"><span className="sep-list text-base font-bold uppercase leading-normal tracking-[0.1em]"><span>{["Private dinner", "Oct.\u00A08", "Manhattan Beach"].map((x) => <span key={x}>{x}</span>)}</span></span><span className="mt-0.5 block text-[1.0625rem] font-bold text-blue">{EVENT.title.replace("Josh Stech", nb("Josh Stech"))} —{"\u00A0"}RSVP</span></span>
              <ArrowUR className="h-5 w-5 shrink-0 text-blue" />
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
            <p data-reveal className="mt-7 text-lg leading-relaxed">For too long we’ve seen owners of dated and damaged homes get a bad deal, settling for less than what they deserve. We created Sundae to change that.</p>
            <p data-reveal className="mt-4 text-lg leading-relaxed">Weighing on- vs. off-market? We’ll help you decide. Our home assessment, scope of work for necessary repairs and offer are free, so you have everything you need to make the right decision for yourself, at no cost.</p>
            <div data-reveal className="mt-8 flex flex-wrap gap-3"><Link href="/about" className="btn btn-blue">Our story <Arrow /></Link><Link href="/about/leadership" className="btn btn-outline">Meet the team</Link></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wrap mt-24 md:mt-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <SectionHead eyebrow="FAQ" title="Questions, / *answered.*" sub="Can’t find it here? Ask our assistant, which is trained on everything on this site, or call a local expert." />
            <div data-reveal className="mt-8 grid gap-3 sm:max-w-sm">
              <AskButton q="I inherited a house that needs work. How would selling with Sundae go?" label="Ask the Sundae assistant" className="btn btn-blue" />
              <Link href="/faq" className="btn btn-outline">All FAQs <Arrow /></Link>
            </div>
          </div>
          <div data-reveal><FaqList items={faq} /></div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

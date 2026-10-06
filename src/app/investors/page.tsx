/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { FaqList, PageHero, SectionHead } from "@/components/ui";
import AskButton from "@/components/AskButton";
import { Arrow, ArrowUR, Check, Phone } from "@/components/icons";
import { CONTACT, INVESTOR_FAQ, MARKETS } from "@/content/site";

export const metadata: Metadata = { title: "For investors — the Sundae Marketplace", description: "Off-market, as-is homes sourced by Sundae. Transparent two-round offers, asking-price certainty and Sundae Funding for business-purpose loans." };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="For property investors" title="Off-market deals, / *without* the chase." sub="Sundae does the work of finding sellers and securing purchase contracts through TV, radio, search and direct mail, so you get access to off-market, as-is opportunities."
        aside={<img src="/media/marketplace-devices.png" alt="Sundae Marketplace listing on laptop and phone" className="w-full" />}>
        <div className="flex flex-wrap gap-3">
          <a href={CONTACT.marketplace} target="_blank" rel="noopener noreferrer" className="btn btn-blue">Join the marketplace <ArrowUR /></a>
          <a href={CONTACT.investorTel} className="btn btn-outline"><Phone /> {CONTACT.investorPhone}</a>
        </div>
      </PageHero>

      <section className="wrap">
        <div data-stagger className="grid gap-px overflow-hidden rounded-[1.5rem] border border-gray bg-gray md:grid-cols-3">
          {[["20,000+", "property investors across the U.S."], ["Single-family to fourplex", "single-family homes, condos, townhomes and small multifamily"], [`${MARKETS.length} metro areas`, "across California, Florida, Nevada, Oklahoma, South Carolina, Tennessee and Utah"]].map(([a, b]) => (
            <div key={a} className="bg-white p-8"><div className="display text-[2rem] leading-tight">{a}</div><div aria-hidden className="mt-4 h-1.5 w-10 bg-red" /><p className="mt-4 text-lg leading-relaxed">{b}</p></div>
          ))}
        </div>
      </section>

      <section className="wrap mt-28">
        <SectionHead eyebrow="How buying works" title="Two rounds. / *Clear* rules." sub="All offers are non-contingent, so complete your due diligence first. Each opportunity lists key terms like closing date, seller rent back, HOA dues, solar panels and whether in-person showings are available." />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {[
            { k: "Round one", t: "Bid as often as you like", b: "Place as many offers as you want before the deadline. You’ll always know whether you’re in the top three." },
            { k: "Round two", t: "One final offer, blind", b: "The top three offers are invited back. One final offer each; positions are blind. There are no counteroffers." },
            { k: "Certainty", t: "Asking price wins", b: "If you’re the top offer at or above asking, you win. Period. Offers below asking are welcome; they just aren’t guaranteed." },
          ].map((x, i) => (
            <article key={x.k} data-reveal data-delay={i * 0.1} className={`relative overflow-hidden rounded-[1.25rem] p-8 ${i === 1 ? "on-blue bg-blue text-white" : "card"}`}>
              <p className={`eyebrow ${i === 1 ? "!text-white" : ""}`}>{x.k}</p>
              <h3 className="display mt-3 text-[1.75rem] leading-snug">{x.t}</h3>
              <p className="mt-3 text-lg leading-relaxed">{x.b}</p>
              <div className="mt-8 flex items-end gap-1.5" aria-hidden>
                {Array.from({ length: 14 }, (_, j) => {
                  const h = [38, 62, 30, 75, 50, 88, 44, 58, 26, 70, 40, 96, 34, 52][j];
                  const top = i === 0 ? false : i === 1 ? [5, 11, 3].includes(j) : j === 11;
                  return <span key={j} className={`w-full rounded-full ${top ? "bg-red" : i === 1 ? "bg-white/30" : "bg-slate"}`} style={{ height: `${(i === 2 && j !== 11 ? h * 0.5 : h) * 0.9}px` }} />;
                })}
              </div>
            </article>
          ))}
        </div>
        <p data-reveal className="mt-6 text-base leading-relaxed">Lowering or rescinding offers isn’t allowed. It’s unfair to investors using AutoOffer, and failure to perform results in account deactivation. Offers can be increased any time before the round-one deadline.</p>
      </section>

      <section className="wrap mt-28">
        <div className="grid overflow-hidden rounded-[1.75rem] bg-mist lg:grid-cols-[1.1fr_1fr]">
          <div className="p-8 md:p-14">
            <p className="eyebrow">Sundae Funding</p>
            <h2 className="display h-bar mt-4 text-[clamp(1.9rem,3.2vw,2.75rem)]">Capital that moves at <span className="hl">deal speed.</span></h2>
            <p className="mt-6 text-lg leading-relaxed">Most marketplace properties close in under 30 days and don’t allow appraisers, which rules out conventional mortgages for most lenders. Sundae’s lending service offers investors low, competitive rates and a quick pre-approval, underwriting and funding process, also available for properties sourced outside the marketplace.</p>
            <ul className="mt-6 grid gap-3 text-lg">{["Business-purpose loans", "Quick pre-approval and underwriting", "Works on and off the Sundae Marketplace"].map((x) => <li key={x} className="flex items-center gap-3"><span className="tick"><Check className="h-3.5 w-3.5" /></span>{x}</li>)}</ul>
            <div className="mt-8 flex flex-wrap items-center gap-5"><a href={`mailto:${CONTACT.fundingEmail}`} className="btn btn-blue">{CONTACT.fundingEmail}</a><AskButton q="How does Sundae Funding work for investors?" label="Ask about funding" className="text-lg" /></div>
            <p className="mt-7 text-base leading-relaxed">Loans for business purposes only in California, Colorado, Georgia, Florida, Tennessee, Texas and Washington; subject to underwriting and due diligence. Not a commitment to lend. CA Financing Law license CFL #60DBO-122336.</p>
          </div>
          <div className="relative min-h-[320px] overflow-hidden"><img data-parallax="6" src="/media/people/as-is-house.jpg" alt="An as-is house sourced through Sundae" className="absolute inset-0 h-full w-full scale-110 object-cover" loading="lazy" /></div>
        </div>
      </section>

      <section className="wrap mt-28">
        <div className="grid gap-5 md:grid-cols-2">
          <div data-reveal className="card p-8 md:p-10">
            <h3 className="display h-bar text-[1.875rem]">Fees, up front.</h3>
            <p className="mt-4 text-lg leading-relaxed">All fees are disclosed in the portal when you place an offer. The winning buyer covers closing costs, including buyer and seller escrow fees and a third-party inspection report ordered by Sundae.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-mist p-5"><div className="display text-[1.875rem]">$1,000</div><div className="mt-1 text-base">Admin fee</div></div>
              <div className="rounded-xl bg-mist p-5"><div className="display text-[1.875rem]">24 hours</div><div className="mt-1 text-base">to fund your EMD</div></div>
            </div>
            <p className="mt-4 text-base">$250-per-day fee for late closings requested by the buyer.</p>
          </div>
          <Link href="/membership" data-reveal data-delay="0.1" className="on-blue group relative overflow-hidden rounded-[1.25rem] bg-blue p-8 text-white md:p-10">
            <div aria-hidden className="shape-rect pointer-events-none absolute right-6 top-6 h-10 w-10 md:right-8 md:top-8 md:h-12 md:w-12" />
            <div className="relative">
              <p className="eyebrow pr-14 !text-white">Running your own acquisition business?</p>
              <h3 className="display mt-4 text-[1.875rem] md:text-[2.25rem]">Sundae Membership: <span className="hl">stop building, start scaling.</span></h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed">For experienced operators who want Sundae’s marketing, technology, automation, capital and buyer reach behind their market.</p>
              <span className="btn btn-white mt-8">Explore Membership <Arrow /></span>
            </div>
          </Link>
        </div>
      </section>

      <section id="faq" className="wrap mt-28 scroll-mt-28">
        <SectionHead eyebrow="Investor FAQ" title="The *fine print,* plainly." />
        <div className="mt-10 grid gap-12">
          {INVESTOR_FAQ.map((g) => <div key={g.group} className="grid gap-6 lg:grid-cols-[260px_1fr]"><h3 data-reveal className="eyebrow pt-5">{g.group}</h3><div data-reveal><FaqList items={g.items} /></div></div>)}
        </div>
        <div data-reveal className="on-blue relative mt-14 flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-[1.5rem] bg-blue p-8 text-white md:p-12">
          <div aria-hidden className="shape-rect pointer-events-none absolute right-4 top-4 h-8 w-8 md:right-5 md:top-5 md:h-9 md:w-9" />
          <p className="display relative pr-10 text-[1.875rem]">Can’t find the answer?</p>
          <div className="relative flex flex-wrap gap-3"><a href={CONTACT.investorTel} className="btn btn-white"><Phone /> {CONTACT.investorPhone}</a><a href={CONTACT.marketplace} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Sign up <ArrowUR /></a></div>
        </div>
      </section>
    </>
  );
}

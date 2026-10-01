/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, OfferCtas, PageHero, QuoteCard, SectionHead } from "@/components/ui";
import { Arrow, Check } from "@/components/icons";
import { COMPARE_TABLE, MARKETPLACE_STEPS, SITUATIONS, STEPS, TESTIMONIALS } from "@/content/site";

export const metadata: Metadata = { title: "How it works", description: "Tell us about your property, get a competitive cash offer, and move at your pace — close in as little as 10 days or up to 60." };

const TIMELINE = [
  { k: "Day 1", t: "One visit", b: "A local Market Expert visits once to take photos, a 3D tour and order a home inspection." },
  { k: "+4 business days", t: "Investors bid", b: "Offers arrive four business days after the inspection and your completed seller disclosures." },
  { k: "3 business days", t: "You decide", b: "Offers are valid for three business days. Accept the one you like — or none at all." },
  { k: "10–60 days", t: "Close your way", b: "Pick your closing date. A dedicated Closing Manager handles escrow and title." },
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="How Sundae works" title="Three steps to a / *competitive* cash offer." sub="Speak with a local expert, get offers from investors who compete for your home, and close on your timeline — with no repairs, cleanings or showings." aside={<img src="/media/people/as-is-house.jpg" alt="A house being sold as-is, belongings still in the yard" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-[0_40px_80px_-40px_rgba(27,20,22,.5)]" />}>
        <OfferCtas />
      </PageHero>

      <section className="wrap">
        <div data-stagger className="grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <article key={s.n} className="card hover-lift relative overflow-hidden p-8">
              <span className="display absolute -right-2 -top-6 text-[8rem] leading-none text-cream">{s.n}</span>
              <img src={s.img} alt="" className="relative h-32 w-auto" loading="lazy" />
              <h2 className="display relative mt-6 text-3xl">{s.title}</h2>
              <p className="relative mt-3 leading-relaxed text-muted">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap mt-28">
        <SectionHead eyebrow="What happens, when" title="From first call to / *closing day.*" />
        <ol className="relative mt-14 grid gap-8 md:grid-cols-4 md:gap-5">
          <div data-grow className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-red md:block" />
          {TIMELINE.map((x, i) => (
            <li key={x.t} data-reveal data-delay={i * 0.12} className="relative">
              <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-red text-sm font-bold text-white ring-8 ring-paper">{i + 1}</span>
              <p className="mt-5 font-mono text-xs uppercase tracking-wider text-red">{x.k}</p>
              <h3 className="display mt-2 text-2xl">{x.t}</h3>
              <p className="mt-2 text-muted">{x.b}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap mt-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead eyebrow="Inside the marketplace" title="We do the work. / *You* pick the offer." sub="Sundae prepares a detailed Property Profile — photos, a 3D tour, a home inspection, a preliminary title report and a floor plan — so investors can make their highest and best offers without walking through your home." />
            <div data-reveal className="mt-8"><Link href="/get-offer" className="btn btn-red">Request offers now <Arrow /></Link></div>
          </div>
          <div className="grid gap-4">
            {MARKETPLACE_STEPS.map((s, i) => (
              <div key={s.title} data-reveal className="card flex gap-6 p-7">
                <span className="display text-4xl text-red">{String(i + 1).padStart(2, "0")}</span>
                <div><h3 className="text-xl font-semibold">{s.title}</h3><p className="mt-2 leading-relaxed text-muted">{s.body}</p></div>
              </div>
            ))}
            <div data-reveal className="rounded-[1.5rem] bg-cream p-7">
              <h3 className="text-lg font-semibold">What “as-is” really means</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {["Non-contingent cash offers", "No cleanings, repairs or updates", "Leave behind what you don’t want", "Your contact info is never shared with investors", "Sundae is the only one who steps inside", "Stay up to 30 days after closing"].map((x) => <li key={x} className="flex gap-2 text-[0.95rem]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-red" />{x}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap mt-28">
        <SectionHead center eyebrow="Compare your options" title="Sundae vs. the MLS vs. / *a single cash buyer.*" />
        <div data-reveal className="mt-12 overflow-x-auto rounded-[1.75rem] border border-line bg-white">
          <table className="w-full min-w-[760px] text-left text-[0.95rem]">
            <thead><tr><th className="p-5" />{COMPARE_TABLE.cols.map((c, i) => <th key={c} className={`p-5 text-sm font-semibold ${i === 0 ? "bg-ink text-white" : "text-muted"}`}>{c}</th>)}</tr></thead>
            <tbody>{COMPARE_TABLE.rows.map((r) => (
              <tr key={r[0]} className="border-t border-line">
                <th className="p-5 font-semibold">{r[0]}</th>
                {r.slice(1).map((c, i) => <td key={i} className={`p-5 ${i === 0 ? "bg-ink/[0.03] font-semibold text-ink" : "text-muted"}`}>{c}</td>)}
              </tr>
            ))}</tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-faint">Typical seller fees do not include payoff of loans, prorated/property taxes, HOA charges, or payoff of other secured liens. Sellers typically pay no commission fees; Sundae receives a commission from the buyer which is deducted from the gross offer. MLS and iBuyer information is illustrative and not representative of all transactions; not a promise of an actual offer.</p>
      </section>

      <section className="wrap mt-28">
        <SectionHead eyebrow="Who we help" title="Built for houses that / *need some love.*" />
        <div data-stagger="0.05" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SITUATIONS.map((s) => <div key={s.label} className="card flex flex-col gap-4 p-6"><img src={s.icon} alt="" className="h-10 w-10 object-contain" /><span className="font-medium leading-snug">{s.label}</span></div>)}
        </div>
      </section>

      <section className="wrap mt-28">
        <SectionHead eyebrow="Sellers say" title="“Baffled at how *easy* it was.”" />
        <div data-stagger className="mt-10 grid gap-5 md:grid-cols-3">{[TESTIMONIALS[5], TESTIMONIALS[0], TESTIMONIALS[8]].map((t) => <QuoteCard key={t.name} t={t} />)}</div>
      </section>
      <CtaBand />
    </>
  );
}

/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarketCard from "@/components/MarketCard";
import { CtaBand, FaqList, OfferCtas, QuoteCard, RatingBadge, SectionHead, nb } from "@/components/ui";
import { ArrowUR, Check, Pin } from "@/components/icons";
import { COMPARE_TABLE, LA_CITIES, MARKETS, SELLER_FAQ, STEPS, TESTIMONIALS } from "@/content/site";

export function generateStaticParams() { return MARKETS.map((m) => ({ slug: m.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = MARKETS.find((x) => x.slug === slug);
  return m ? { title: `Sell my house fast in ${m.name}`, description: `Sell your ${m.name} house as-is. ${m.blurb} Zero fees to Sundae, close in as little as 10 days or up to 60.` } : {};
}

const CITY_MATCH: Record<string, string[]> = { "inland-empire": ["Inland Empire", "San Bernardino"], "san-diego": ["San Diego"], sacramento: ["Sacramento"], oakland: ["Oakland"] };

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = MARKETS.find((x) => x.slug === slug);
  if (!m) notFound();
  const local = TESTIMONIALS.filter((t) => (CITY_MATCH[slug] || []).some((c) => t.place.includes(c)));
  const quotes = (local.length ? [...local, ...TESTIMONIALS.filter((t) => !local.includes(t))] : TESTIMONIALS).slice(0, 3);
  const others = MARKETS.filter((x) => x.slug !== slug).slice(0, 4);
  return (
    <>
      {/* HERO: light ground; the market photo is a clean rectangle with deck-style label boxes (p.31) */}
      <section className="relative overflow-hidden bg-white pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="wrap relative grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <Link href="/locations" className="rise inline-flex items-center gap-2 text-lg font-bold text-blue underline-offset-4 hover:underline">← All locations</Link>
            <p className="eyebrow rise rise-1 mt-7">{m.state}</p>
            <h1 className="display h-bar h-bar-lg mt-4 max-w-3xl text-[clamp(2.25rem,4.2vw,3.5rem)]"><span className="mask-line"><span>Sell your {nb(m.name)}</span></span><span className="mask-line"><span style={{ animationDelay: ".12s" }}>house <span className="hl">as-is.</span></span></span></h1>
            <p className="lede rise rise-3 mt-7 max-w-2xl">{m.blurb} Choose a closing date based on your timeline, with an average of 22 offers per listing.</p>
            <div className="rise rise-4 mt-9"><OfferCtas /></div>
            <div className="rise rise-5 mt-8"><RatingBadge /></div>
          </div>
          <div className="rise rise-3 relative">
            <div aria-hidden className="dots absolute -right-6 -top-6 z-0 hidden h-20 w-20 md:block" />
            <div className="relative z-10 aspect-[4/3.3] overflow-hidden rounded-[1.25rem] bg-mist">
              {m.img ? <img data-parallax="6" src={m.img} alt={`${m.name}, ${m.state}`} className="absolute inset-0 h-full w-full scale-110 object-cover" /> : (
                <div className="absolute inset-0">
                  <div aria-hidden className="shape-circle absolute -right-10 -top-10 h-56 w-56" />
                  <Pin className="absolute left-[30%] top-[30%] h-20 w-20 text-blue" />
                </div>
              )}
              <div className="absolute bottom-4 left-4 grid justify-items-start gap-2 md:bottom-6 md:left-6">
                {["Sell as-is", "Zero fees to Sundae", "Close in as little as 10 days"].map((x) => <span key={x} className="bg-white px-3 py-1.5 text-lg font-bold leading-tight md:text-xl">{x}</span>)}
              </div>
            </div>
            <span className="absolute left-0 top-6 z-20 -rotate-[4deg] bg-red px-4 py-2 font-sans text-[1.625rem] font-black leading-tight text-white shadow-[0_14px_30px_-16px_rgba(74,74,74,.6)] md:-left-6 md:text-[2rem]">{m.name}</span>
          </div>
        </div>
      </section>

      <section className="wrap mt-8 grid gap-12 md:mt-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHead eyebrow={`Why ${m.name} homeowners sell with Sundae`} title="Skip the repairs. / Keep the *upside.*" />
          <p data-reveal className="mt-7 text-lg leading-relaxed">On the MLS, turnkey properties tend to fetch higher prices, so a traditional agent might recommend renovating a dated or distressed house before you list it. That’s time-consuming and expensive, and it doesn’t guarantee you’ll net more money when it’s all said and done.</p>
          <p data-reveal className="mt-4 text-lg leading-relaxed">With Sundae, you sell as-is in a short amount of time without updates or costly repairs. No open houses, the chance of multiple offers and no real estate agent fees paid to Sundae by the seller.</p>
        </div>
        <div data-stagger className="grid content-start gap-4">
          {STEPS.map((s) => <div key={s.n} className="card flex gap-5 p-6"><span className="num">{Number(s.n)}</span><div><h3 className="text-xl font-bold leading-snug">{s.title}</h3><p className="mt-1.5 text-lg leading-relaxed">{s.body}</p></div></div>)}
        </div>
      </section>

      {slug === "los-angeles" && (
        <section className="wrap mt-20">
          <div data-reveal className="card-mist p-8 md:p-10">
            <h2 className="text-xl font-bold">We help Los Angeles-area homeowners sell as-is in cities including</h2>
            <div className="mt-5 flex flex-wrap gap-2">{LA_CITIES.map((c) => <span key={c} className="chip">{c}</span>)}<a href={m.liveUrl} target="_blank" rel="noopener noreferrer" className="chip !border-blue font-bold !text-blue">and many more <ArrowUR className="h-3.5 w-3.5" /></a></div>
          </div>
        </section>
      )}

      <section className="wrap mt-24">
        <SectionHead eyebrow="Compare" title={`Selling in ${m.name}: / *your options.*`} />
        <div data-reveal className="mt-10 overflow-x-auto rounded-[1.25rem] border border-gray bg-white">
          <table className="w-full min-w-[720px] text-left text-[1.0625rem]">
            <thead><tr><th className="p-5" />{COMPARE_TABLE.cols.map((c, i) => <th key={c} className={`p-5 font-bold ${i === 0 ? "bg-blue text-white" : ""}`}>{c}</th>)}</tr></thead>
            <tbody>{COMPARE_TABLE.rows.map((r) => <tr key={r[0]} className="border-t border-gray"><th className="p-5 font-bold">{r[0]}</th>{r.slice(1).map((c, i) => <td key={i} className={`p-5 leading-snug ${i === 0 ? "bg-mist font-bold" : ""}`}>{i === 0 && <Check className="mr-1.5 inline h-4 w-4 text-blue" />}{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="wrap mt-24">
        <SectionHead eyebrow="Sellers say" title={local.length ? `From ${nb(m.name)}-area *sellers.*` : "What sellers *are saying.*"} />
        <div data-stagger className="mt-10 grid gap-5 md:grid-cols-3">{quotes.map((t) => <QuoteCard key={t.name} t={t} />)}</div>
      </section>

      <section className="wrap mt-24 grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <SectionHead eyebrow="FAQ" title="Before you *sell.*" />
        <div data-reveal><FaqList items={[SELLER_FAQ[0].items[3], SELLER_FAQ[2].items[0], SELLER_FAQ[3].items[1], SELLER_FAQ[3].items[3]]} /></div>
      </section>

      <section className="wrap mt-24">
        <h2 data-reveal className="display h-bar text-[1.875rem]">Other Sundae markets</h2>
        <div data-stagger="0.05" className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">{others.map((o) => <MarketCard key={o.slug} m={o} />)}</div>
      </section>
      <CtaBand title={`Ready to sell your ${m.name} *house?*`} />
    </>
  );
}

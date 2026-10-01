/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarketCard from "@/components/MarketCard";
import { CtaBand, FaqList, OfferCtas, QuoteCard, RatingBadge, SectionHead } from "@/components/ui";
import { ArrowUR, Check } from "@/components/icons";
import { COMPARE_TABLE, LA_CITIES, MARKETS, SELLER_FAQ, STEPS, TESTIMONIALS } from "@/content/site";

export function generateStaticParams() { return MARKETS.map((m) => ({ slug: m.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = MARKETS.find((x) => x.slug === slug);
  return m ? { title: `Sell my house fast in ${m.name}`, description: `Sell your ${m.name} house as-is. ${m.blurb} Zero fees to Sundae, close in 10–60 days.` } : {};
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
      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-white md:pb-24 md:pt-44">
        {m.img ? <img data-parallax="8" src={m.img} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-45" /> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#db3d55,#1b1416_60%)]" />}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/20" />
        <div className="wrap relative">
          <Link href="/locations" className="rise inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">← All locations</Link>
          <p className="eyebrow rise rise-1 mt-6 !text-white/70">{m.state}</p>
          <h1 className="display mt-4 max-w-4xl text-[clamp(2.6rem,6.4vw,5.6rem)]"><span className="mask-line"><span>Sell your {m.name}</span></span><span className="mask-line"><span style={{ animationDelay: ".12s" }}>house <span className="serif font-normal tracking-normal text-red">as-is.</span></span></span></h1>
          <p className="rise rise-3 mt-6 max-w-2xl text-lg text-white/75">{m.blurb} Choose a closing date based on your timeline, with an average of 22 offers per listing.</p>
          <div className="rise rise-4 mt-8"><OfferCtas light /></div>
          <div className="rise rise-5 mt-8"><RatingBadge dark /></div>
        </div>
      </section>

      <section className="wrap mt-24 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHead eyebrow={`Why ${m.name} homeowners sell with Sundae`} title="Skip the repairs. / Keep the *upside.*" />
          <p data-reveal className="mt-6 text-lg leading-relaxed text-muted">On the MLS, turnkey properties tend to fetch top dollar, so a traditional agent might recommend renovating a dated or distressed house before you list it. That’s time consuming, expensive and doesn’t guarantee you’ll net more money when it’s all said and done.</p>
          <p data-reveal className="mt-4 text-lg leading-relaxed text-muted">With Sundae, you sell as-is in a short amount of time without updates or costly repairs. No open houses, the chance of multiple offers, and no real estate agent fees paid to Sundae by the seller.</p>
        </div>
        <div data-stagger className="grid gap-4">
          {STEPS.map((s) => <div key={s.n} className="card flex gap-5 p-6"><span className="display text-3xl text-red">{s.n}</span><div><h3 className="text-lg font-semibold">{s.title}</h3><p className="mt-1 text-muted">{s.body}</p></div></div>)}
        </div>
      </section>

      {slug === "los-angeles" && (
        <section className="wrap mt-20">
          <div data-reveal className="rounded-[1.75rem] bg-cream p-8 md:p-10">
            <h2 className="text-xl font-semibold">We help Los Angeles–area homeowners sell as-is in cities including</h2>
            <div className="mt-5 flex flex-wrap gap-2">{LA_CITIES.map((c) => <span key={c} className="chip">{c}</span>)}<a href={m.liveUrl} target="_blank" rel="noopener noreferrer" className="chip !border-ink font-semibold">and many more <ArrowUR className="h-3 w-3" /></a></div>
          </div>
        </section>
      )}

      <section className="wrap mt-24">
        <SectionHead eyebrow="Compare" title={`Selling in ${m.name}: / *your options.*`} />
        <div data-reveal className="mt-10 overflow-x-auto rounded-[1.75rem] border border-line bg-white">
          <table className="w-full min-w-[720px] text-left text-[0.95rem]">
            <thead><tr><th className="p-5" />{COMPARE_TABLE.cols.map((c, i) => <th key={c} className={`p-5 text-sm font-semibold ${i === 0 ? "bg-ink text-white" : "text-muted"}`}>{c}</th>)}</tr></thead>
            <tbody>{COMPARE_TABLE.rows.map((r) => <tr key={r[0]} className="border-t border-line"><th className="p-5 font-semibold">{r[0]}</th>{r.slice(1).map((c, i) => <td key={i} className={`p-5 ${i === 0 ? "bg-ink/[0.03] font-semibold" : "text-muted"}`}>{i === 0 && <Check className="mr-1.5 inline h-4 w-4 text-red" />}{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="wrap mt-24">
        <SectionHead eyebrow="Sellers say" title={local.length ? `From ${m.name}-area *sellers.*` : "What sellers *are saying.*"} />
        <div data-stagger className="mt-10 grid gap-5 md:grid-cols-3">{quotes.map((t) => <QuoteCard key={t.name} t={t} />)}</div>
      </section>

      <section className="wrap mt-24 grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <SectionHead eyebrow="FAQ" title="Before you *sell.*" />
        <div data-reveal><FaqList items={[SELLER_FAQ[0].items[3], SELLER_FAQ[2].items[0], SELLER_FAQ[3].items[1], SELLER_FAQ[3].items[3]]} /></div>
      </section>

      <section className="wrap mt-24">
        <h2 data-reveal className="display text-3xl">Other Sundae markets</h2>
        <div data-stagger="0.05" className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">{others.map((o) => <MarketCard key={o.slug} m={o} />)}</div>
      </section>
      <CtaBand title={`Ready to sell your ${m.name} *house?*`} />
    </>
  );
}

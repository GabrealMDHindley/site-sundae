/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Arrow, Phone, Star } from "./icons";
import { CONTACT, RATING, type QA, type Testimonial } from "@/content/site";
import AskButton from "./AskButton";

// Headline helper: wrap words in *asterisks* to give them the pink highlight under the text
// (never red text — Sundae red is reserved for the wordmark, shapes and accent bars).
export function Accent({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return <>{parts.map((p, i) => (p.startsWith("*") ? <span key={i} className={`hl ${className}`}>{p.slice(1, -1)}</span> : <span key={i}>{p}</span>))}</>;
}

// Keeps a proper name on one line ("Los Angeles", "Josh Stech") so a headline never splits it.
export const nb = (s: string) => s.replace(/ /g, "\u00A0");

// Splits a sentence into per-word spans for the scrubbed "read along" highlight.
export function Words({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p data-words className={className}>
      {text.split(" ").map((w, i) => {
        const acc = w.startsWith("*") && w.endsWith("*");
        return <span key={i} data-w className={acc ? "hl" : ""}>{acc ? w.slice(1, -1) : w}{" "}</span>;
      })}
    </p>
  );
}

export function Stars({ n = 5, className = "h-4 w-4" }: { n?: number; className?: string }) {
  return <span className="inline-flex gap-0.5 text-red" role="img" aria-label={`${n} out of 5 stars`}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} className={className} filled={i < n} />)}</span>;
}

export function RatingBadge({ onBlue = false }: { onBlue?: boolean }) {
  return (
    <a href={CONTACT.reviewsIo} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-5 ${onBlue ? "border-white bg-white" : "border-gray bg-white"}`}>
      <span className="flex h-10 items-center rounded-full bg-blue px-3 text-base font-bold text-white">{RATING.score}</span>
      <span className="flex flex-col leading-tight"><Stars className="h-4 w-4" /><span className="mt-0.5 text-base text-ink">{RATING.count} reviews on {RATING.source}</span></span>
    </a>
  );
}

export function PageHero({ eyebrow, title, sub, children, aside, tone = "white" }: { eyebrow: string; title: string; sub?: string; children?: React.ReactNode; aside?: React.ReactNode; tone?: "white" | "mist" }) {
  return (
    <section className={`relative overflow-hidden ${tone === "mist" ? "bg-mist" : "bg-white"} pb-16 pt-32 md:pb-24 md:pt-44`}>
      {/* free-floating dot grid only on text-only heroes; heroes with an aside anchor their own (see Tuck) */}
      {!aside && <div aria-hidden className="dots pointer-events-none absolute right-[max(1.25rem,calc((100vw-1240px)/2+2rem))] top-28 hidden h-20 w-20 md:block lg:top-32" />}
      {/* text-only heroes get a wide headline column; beside an aside the headline steps down to 3.5rem so lines stay whole */}
      <div className={`wrap relative grid items-center gap-12 lg:gap-16 ${aside ? "lg:grid-cols-[1.2fr_1fr]" : ""}`}>
        <div className={aside ? "max-w-3xl" : "max-w-4xl"}>
          <p className="eyebrow rise">{eyebrow}</p>
          <h1 className={`display h-bar h-bar-lg mt-5 ${aside ? "text-[clamp(2.25rem,4.2vw,3.5rem)]" : "text-[clamp(2.25rem,4.6vw,4rem)]"}`}>
            {title.split(" / ").map((l, i) => <span key={i} className="mask-line"><span style={{ animationDelay: `${0.08 + i * 0.1}s` }}><Accent text={l} /></span></span>)}
          </h1>
          {sub && <p className="lede rise rise-3 mt-7 max-w-2xl">{sub}</p>}
          {children && <div className="rise rise-4 mt-9">{children}</div>}
        </div>
        {aside && <div className="rise rise-3">{aside}</div>}
      </div>
    </section>
  );
}

// Deck dot grid tucked behind the top-right corner of a hero photo or card (as on the market pages).
export function Tuck({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div aria-hidden className="dots pointer-events-none absolute -right-5 -top-5 z-0 hidden h-20 w-20 md:block" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function SectionHead({ eyebrow, title, sub, center = false, light = false, className = "" }: { eyebrow?: string; title: string; sub?: string; center?: boolean; light?: boolean; className?: string }) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-4xl ${light ? "on-blue" : ""} ${className}`}>
      {eyebrow && <p data-reveal className={`eyebrow ${light ? "!text-white" : ""}`}>{eyebrow}</p>}
      <h2 data-lines className={`display mt-4 text-[clamp(2rem,3.6vw,3.1rem)] ${center ? "h-bar-center" : "h-bar"} ${light ? "text-white" : ""}`}>
        {title.split(" / ").map((l, i) => <span key={i} className="mask-line"><span><Accent text={l} /></span></span>)}
      </h2>
      {sub && <p data-reveal className={`mt-6 max-w-3xl text-lg leading-relaxed md:text-[1.1875rem] ${center ? "mx-auto" : ""} ${light ? "text-white" : "text-ink"}`}>{sub}</p>}
    </div>
  );
}

export function OfferCtas({ light = false }: { light?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link href="/get-offer" className={`btn ${light ? "btn-white" : "btn-blue"}`}>Get my cash offer <Arrow /></Link>
      <a href={CONTACT.sellerTel} className={`btn ${light ? "btn-ghost" : "btn-outline"}`}><Phone /> {CONTACT.sellerPhone}</a>
    </div>
  );
}

// The page's one deliberate feature band: Sundae blue with white type and a red deck shape.
export function CtaBand({ title = "Ready to see what *investors* will offer?", sub = "Sell as-is. Pay zero fees to Sundae. Move on your time. No repairs, cleanings or showings." }: { title?: string; sub?: string }) {
  return (
    <section className="wrap mt-24 md:mt-32">
      <div data-reveal="scale" className="on-blue relative overflow-hidden rounded-[1.75rem] bg-blue px-6 py-16 text-white md:px-16 md:py-20">
        <div aria-hidden className="shape-rect pointer-events-none absolute right-6 top-6 h-12 w-12 md:right-10 md:top-10 md:h-16 md:w-16" />
        <div aria-hidden className="dots-white pointer-events-none absolute right-28 top-10 hidden h-16 w-16 opacity-50 lg:block" />
        <div className="relative grid items-end gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="display pr-14 text-[clamp(2.1rem,4vw,3.4rem)] lg:pr-0"><Accent text={title} /></h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed md:text-xl">{sub}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end lg:pb-1">
            <Link href="/get-offer" className="btn btn-white">Get my cash offer <Arrow /></Link>
            <a href={CONTACT.sellerTel} className="btn btn-ghost"><Phone /> {CONTACT.sellerPhone}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqList({ items, ask = true }: { items: QA[]; ask?: boolean }) {
  return (
    <div className="divide-y divide-gray border-y border-gray">
      {items.map((it) => (
        <details key={it.q} className="faq group py-1">
          <summary className="flex items-center justify-between gap-6 py-5 text-left text-lg font-bold leading-snug md:text-[1.1875rem]">
            {it.q}
            <span className="plus flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue text-blue transition-colors group-hover:bg-mist"><svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>
          </summary>
          <div className="pb-7 pr-4 text-lg leading-relaxed md:pr-14">
            <p>{it.a}</p>
            {ask && <AskButton q={it.q} className="mt-3" label="Ask a follow-up" />}
          </div>
        </details>
      ))}
    </div>
  );
}

export function QuoteCard({ t, className = "" }: { t: Testimonial; className?: string }) {
  return (
    <figure className={`card hover-lift flex h-full flex-col p-7 md:p-8 ${className}`}>
      <Stars />
      <blockquote className="mt-5 flex-1">
        <p className="display text-[1.375rem] leading-snug">“{t.title.replace(/[“”]/g, "")}”</p>
        <p className="mt-4 text-lg leading-relaxed">{t.quote}</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-gray pt-5">
        {t.img ? <img src={t.img} alt="" className="h-12 w-12 rounded-full object-cover" loading="lazy" /> : <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pink text-base font-bold text-ink">{t.name.split(" ").filter((x) => /^[A-Z]/.test(x)).map((x) => x[0]).join("").slice(0, 2)}</span>}
        <span className="leading-snug"><span className="block font-bold">{t.name}</span><span className="text-base">{t.place}</span></span>
      </figcaption>
    </figure>
  );
}

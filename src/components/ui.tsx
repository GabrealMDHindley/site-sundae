/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Arrow, Phone, Star } from "./icons";
import { CONTACT, RATING, type QA, type Testimonial } from "@/content/site";
import AskButton from "./AskButton";

// Headline helper: wrap words in *asterisks* to set them in the italic serif accent.
export function Accent({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return <>{parts.map((p, i) => (p.startsWith("*") ? <span key={i} className={`serif font-normal tracking-normal ${className}`}>{p.slice(1, -1)}</span> : <span key={i}>{p}</span>))}</>;
}

// Splits a sentence into per-word spans for the scrubbed "read along" highlight.
export function Words({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p data-words className={className}>
      {text.split(" ").map((w, i) => {
        const acc = w.startsWith("*") && w.endsWith("*");
        return <span key={i} data-w className={acc ? "serif text-red" : ""}>{acc ? w.slice(1, -1) : w}{" "}</span>;
      })}
    </p>
  );
}

export function Stars({ n = 5, className = "h-4 w-4" }: { n?: number; className?: string }) {
  return <span className="inline-flex gap-0.5 text-red" aria-label={`${n} out of 5 stars`}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} className={className} filled={i < n} />)}</span>;
}

export function RatingBadge({ dark = false }: { dark?: boolean }) {
  return (
    <a href={CONTACT.reviewsIo} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 text-sm ${dark ? "bg-white/10 text-white" : "border border-line bg-white"}`}>
      <span className="flex h-8 items-center rounded-full bg-red px-2.5 text-[0.8rem] font-bold text-white">{RATING.score}</span>
      <span className="flex flex-col leading-tight"><Stars className="h-3.5 w-3.5" /><span className={`text-[0.72rem] ${dark ? "text-white/70" : "text-muted"}`}>{RATING.count} reviews on {RATING.source}</span></span>
    </a>
  );
}

export function PageHero({ eyebrow, title, sub, children, aside, tone = "paper" }: { eyebrow: string; title: string; sub?: string; children?: React.ReactNode; aside?: React.ReactNode; tone?: "paper" | "blush" | "cream" }) {
  const bg = tone === "blush" ? "bg-blush/60" : tone === "cream" ? "bg-cream" : "bg-paper";
  return (
    <section className={`relative overflow-hidden ${bg} pb-16 pt-32 md:pb-24 md:pt-44`}>
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-red/10 blur-[100px]" />
      <div className={`wrap relative grid items-center gap-12 ${aside ? "lg:grid-cols-[1.15fr_1fr]" : ""}`}>
        <div>
          <p className="eyebrow rise">{eyebrow}</p>
          <h1 className="display mt-5 text-[clamp(2.6rem,6.4vw,5.6rem)]">
            {title.split(" / ").map((l, i) => <span key={i} className="mask-line"><span style={{ animationDelay: `${0.08 + i * 0.1}s` }}><Accent text={l} /></span></span>)}
          </h1>
          {sub && <p className="lede rise rise-3 mt-6 max-w-2xl">{sub}</p>}
          {children && <div className="rise rise-4 mt-8">{children}</div>}
        </div>
        {aside && <div className="rise rise-3">{aside}</div>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, sub, center = false, light = false, className = "" }: { eyebrow?: string; title: string; sub?: string; center?: boolean; light?: boolean; className?: string }) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && <p data-reveal className={`eyebrow ${center ? "justify-center" : ""} ${light ? "!text-white/70" : ""}`}>{eyebrow}</p>}
      <h2 data-lines className={`display mt-4 text-[clamp(2.1rem,4.6vw,3.9rem)] ${light ? "text-white" : ""}`}>
        {title.split(" / ").map((l, i) => <span key={i} className="mask-line"><span><Accent text={l} /></span></span>)}
      </h2>
      {sub && <p data-reveal className={`mt-5 text-[1.08rem] leading-relaxed ${light ? "text-white/70" : "text-muted"}`}>{sub}</p>}
    </div>
  );
}

export function OfferCtas({ light = false }: { light?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link href="/get-offer" className="btn btn-red">Get my cash offer <Arrow /></Link>
      <a href={CONTACT.sellerTel} className={`btn ${light ? "btn-ghost-light" : "btn-line"}`}><Phone /> {CONTACT.sellerPhone}</a>
    </div>
  );
}

export function CtaBand({ title = "Ready to see what *investors* will offer?", sub = "Sell as-is. Pay zero fees to Sundae. Move on your time. No repairs, cleanings, or showings." }: { title?: string; sub?: string }) {
  return (
    <section className="wrap mt-24 md:mt-32">
      <div data-reveal="scale" className="grain relative overflow-hidden rounded-[2.5rem] bg-red px-6 py-16 text-white md:px-16 md:py-24">
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-red-deep/60 blur-3xl" />
        <div className="relative grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="display text-[clamp(2.3rem,5vw,4.4rem)]"><Accent text={title} /></h2>
            <p className="mt-5 max-w-xl text-lg text-white/80">{sub}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/get-offer" className="btn btn-white">Get my cash offer <Arrow /></Link>
            <a href={CONTACT.sellerTel} className="btn btn-ghost-light"><Phone /> {CONTACT.sellerPhone}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqList({ items, ask = true }: { items: QA[]; ask?: boolean }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it) => (
        <details key={it.q} className="faq group py-1">
          <summary className="flex items-center justify-between gap-6 py-5 text-left text-[1.08rem] font-semibold md:text-[1.15rem]">
            {it.q}
            <span className="plus flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors group-hover:border-ink"><svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg></span>
          </summary>
          <div className="pb-6 pr-12 text-[1.02rem] leading-relaxed text-muted">
            <p>{it.a}</p>
            {ask && <AskButton q={it.q} className="mt-3 text-sm" label="Ask a follow-up" />}
          </div>
        </details>
      ))}
    </div>
  );
}

export function QuoteCard({ t, className = "" }: { t: Testimonial; className?: string }) {
  return (
    <figure className={`card hover-lift flex h-full flex-col p-7 ${className}`}>
      <Stars />
      <blockquote className="mt-5 flex-1">
        <p className="display text-[1.35rem] leading-tight">“{t.title.replace(/[“”]/g, "")}”</p>
        <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">{t.quote}</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        {t.img ? <img src={t.img} alt="" className="h-11 w-11 rounded-full object-cover" loading="lazy" /> : <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blush text-sm font-bold text-red-deep">{t.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}</span>}
        <span><span className="block font-semibold">{t.name}</span><span className="text-sm text-muted">{t.place}</span></span>
      </figcaption>
    </figure>
  );
}

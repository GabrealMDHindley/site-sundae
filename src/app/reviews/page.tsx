import type { Metadata } from "next";
import { CtaBand, PageHero, QuoteCard, SectionHead, Stars } from "@/components/ui";
import { ArrowUR } from "@/components/icons";
import { CONTACT, RATING, REVIEWS, STORIES, TESTIMONIALS } from "@/content/site";

export const metadata: Metadata = { title: "Reviews", description: `Sundae averages ${RATING.score}/5 across ${RATING.count} reviews. Read what sellers say — verbatim.` };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Sundae customer reviews" title="Why homeowners / *turn to Sundae.*" sub="Recent reviews and stories from sellers — shown verbatim, including the critical ones."
        aside={
          <div className="card p-8 md:p-10">
            <div className="flex items-end gap-4"><span className="display text-7xl">{RATING.score}</span><span className="pb-3 text-muted">/ 5</span></div>
            <Stars className="mt-2 h-6 w-6" />
            <p className="mt-3 text-muted">Average across {RATING.count} reviews on {RATING.source} — and 4.6+ stars across Yelp, BBB, Google and Reviews.io.</p>
            <div className="mt-6 flex flex-wrap gap-3"><a href={CONTACT.reviewsIo} target="_blank" rel="noopener noreferrer" className="btn btn-ink">Reviews.io <ArrowUR /></a><a href={CONTACT.bbb} target="_blank" rel="noopener noreferrer" className="btn btn-line">BBB profile <ArrowUR /></a></div>
          </div>
        } />
      <section className="wrap">
        <SectionHead eyebrow="Featured on sundae.com" title="In their *own words.*" />
        <div data-stagger="0.06" className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{TESTIMONIALS.map((t) => <QuoteCard key={t.name} t={t} />)}</div>
      </section>
      <section className="wrap mt-28">
        <SectionHead eyebrow="From Reviews.io" title="Recent *reviews.*" sub="A selection of the most recent reviews on Reviews.io, unedited except for length." />
        <div className="mt-10 columns-1 gap-5 md:columns-2 lg:columns-3">
          {REVIEWS.map((r) => (
            <figure key={r.name + r.date} data-reveal className="card mb-5 break-inside-avoid p-7">
              <div className="flex items-center justify-between"><Stars n={r.stars} /><span className="font-mono text-xs text-faint">{r.date}</span></div>
              <blockquote className="mt-4 leading-relaxed text-ink/85">{r.text}</blockquote>
              <figcaption className="mt-4 text-sm font-semibold">{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="wrap mt-28">
        <SectionHead eyebrow="Customer stories" title="Stories *worth* telling." />
        <div data-stagger="0.06" className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {STORIES.map((s) => <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer" className="card hover-lift group flex flex-col p-7"><h3 className="display text-2xl">{s.title}</h3><p className="mt-3 flex-1 text-muted">{s.body}</p><span className="mt-6 inline-flex items-center gap-2 font-semibold text-red-deep">Read the story <ArrowUR /></span></a>)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

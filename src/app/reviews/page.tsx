import type { Metadata } from "next";
import { CtaBand, PageHero, QuoteCard, SectionHead, Stars, Tuck } from "@/components/ui";
import { ArrowUR } from "@/components/icons";
import { CONTACT, RATING, REVIEWS, STORIES, TESTIMONIALS } from "@/content/site";

export const metadata: Metadata = { title: "Reviews", description: `Sundae averages ${RATING.score}/5 across ${RATING.count} reviews. Read what sellers say, verbatim.` };

// AP dates: "May 11, 2023", "Sept. 13, 2023" (the ISO value in site.ts is unchanged)
const AP_MONTHS = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
const apDate = (iso: string) => { const [y, m, d] = iso.split("-").map(Number); return `${AP_MONTHS[m - 1]} ${d}, ${y}`; };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Sundae customer reviews" title="Why homeowners / *turn to Sundae.*" sub="Reviews and stories from sellers, shown verbatim, including the critical ones."
        aside={
          <Tuck><div className="card p-8 md:p-10">
            <div className="flex items-end gap-3"><span className="display text-[4.5rem] leading-none">{RATING.score}</span><span className="pb-2 text-xl">out of 5</span></div>
            <div aria-hidden className="mt-5 h-1.5 w-12 bg-red" />
            <Stars className="mt-5 h-7 w-7" />
            <p className="mt-4 text-lg leading-relaxed">Average across {RATING.count} reviews on {RATING.source}, and 4.6+ stars across Yelp, BBB, Google and Reviews.io.</p>
            <div className="mt-7 flex flex-wrap gap-3"><a href={CONTACT.reviewsIo} target="_blank" rel="noopener noreferrer" className="btn btn-blue">Reviews.io <ArrowUR /></a><a href={CONTACT.bbb} target="_blank" rel="noopener noreferrer" className="btn btn-outline">BBB profile <ArrowUR /></a></div>
          </div></Tuck>
        } />
      <section className="wrap">
        <SectionHead eyebrow="Featured on sundae.com" title="In their *own words.*" />
        <div data-stagger="0.06" className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{TESTIMONIALS.map((t) => <QuoteCard key={t.name} t={t} />)}</div>
      </section>
      <section className="wrap mt-28">
        <SectionHead eyebrow="From Reviews.io" title="What sellers *wrote.*" sub="A selection of reviews from Reviews.io, unedited except for length." />
        <div className="mt-10 columns-1 gap-5 md:columns-2 lg:columns-3">
          {REVIEWS.map((r) => (
            <figure key={r.name + r.date} data-reveal className="card mb-5 break-inside-avoid p-7">
              <div className="flex items-center justify-between gap-3"><Stars n={r.stars} /><time dateTime={r.date} className="text-base">{apDate(r.date)}</time></div>
              <blockquote className="mt-4 text-lg leading-relaxed">{r.text}</blockquote>
              <figcaption className="mt-4 text-base font-bold">{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="wrap mt-28">
        <SectionHead eyebrow="Customer stories" title="Stories *worth* telling." />
        <div data-stagger="0.06" className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {STORIES.map((s) => <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer" className="card hover-lift group flex flex-col p-7"><h3 className="display text-[1.5rem]">{s.title}</h3><p className="mt-3 flex-1 text-lg leading-relaxed">{s.body}</p><span className="mt-6 inline-flex items-center gap-2 text-lg font-bold text-blue">Read the story <ArrowUR /></span></a>)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

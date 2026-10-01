/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { ArrowUR, Mail } from "@/components/icons";
import { CONTACT, PARTNERS } from "@/content/site";

export const metadata: Metadata = { title: "Trusted partners", description: "Sundae partners with like-minded organizations to make selling and moving as easy as possible." };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Sundae trusted partners" title="Help with the *whole* move, / not just the sale." sub="From relocating to divorce to inheritance, each circumstance has its own challenges. Sundae partners with like-minded organizations to make your entire selling and moving process as easy and seamless as possible." />
      <section className="wrap grid gap-5 md:grid-cols-3">
        {PARTNERS.map((p, i) => (
          <article key={p.name} data-reveal data-delay={i * 0.08} className="card hover-lift flex flex-col p-8">
            <div className="flex h-28 items-center justify-center rounded-2xl bg-cream p-5"><img src={p.img} alt={p.name} className="max-h-full w-auto object-contain" loading="lazy" /></div>
            <h2 className="display mt-6 text-2xl">{p.name}</h2>
            <p className="mt-3 flex-1 leading-relaxed text-muted">{p.body}</p>
            <p className="mt-5 text-sm"><span className="font-semibold">Areas serviced:</span> <span className="text-muted">{p.area}</span></p>
            <a href={p.href} target="_blank" rel="noopener noreferrer" className="btn btn-line mt-6">Learn more <ArrowUR /></a>
          </article>
        ))}
      </section>
      <section className="wrap mt-20">
        <div data-reveal className="flex flex-wrap items-center justify-between gap-6 rounded-[2rem] bg-ink p-8 text-white md:p-12">
          <div><h2 className="display text-3xl md:text-4xl">Want to become a Sundae Partner?</h2><p className="mt-2 text-white/70">We’re always looking for new partnerships to support our clients with every step of their move.</p></div>
          <a href={`mailto:${CONTACT.email}?subject=Partnership%20inquiry`} className="btn btn-red"><Mail /> Get in touch</a>
        </div>
      </section>
    </>
  );
}

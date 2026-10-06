/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { LEADERS } from "@/content/site";

export const metadata: Metadata = { title: "Leadership team", description: "Meet the Sundae leadership team: Josh Stech, Andrew Swain, Victoria White, Chad Crammer, Sarah Sanders and Sam Johnson." };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Leadership" title="Meet the Sundae / *leadership* team." sub="Operators, marketplace builders and real estate veterans, with experience from LendingHome, Airbnb, Redfin, Intuit and more." />
      <section className="wrap grid gap-6">
        {LEADERS.map((l, i) => (
          <article key={l.name} id={l.name.toLowerCase().replace(/\s+/g, "-")} data-reveal className="card grid scroll-mt-28 gap-8 overflow-hidden p-6 md:grid-cols-[280px_1fr] md:p-8">
            <img src={l.img} alt={l.name} className="aspect-[4/5] w-full rounded-[1rem] object-cover object-top md:w-[280px]" loading={i < 2 ? "eager" : "lazy"} />
            <div>
              <p className="eyebrow">{l.role}</p>
              <h2 className="display h-bar mt-3 text-[2.25rem]">{l.name}</h2>
              <p className="mt-6 text-lg leading-relaxed">{l.bio[0]}</p>
              {l.bio.length > 1 && (
                <details className="faq group mt-5">
                  <summary className="inline-flex items-center gap-2 text-lg font-bold text-blue">Read full bio <span className="plus text-xl leading-none">+</span></summary>
                  <div className="mt-4 grid gap-4 text-lg leading-relaxed">{l.bio.slice(1).map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
                </details>
              )}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

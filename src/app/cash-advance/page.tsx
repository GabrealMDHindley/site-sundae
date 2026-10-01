import type { Metadata } from "next";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";
import AskButton from "@/components/AskButton";
import { CASH_ADVANCE_MAX, CASH_ADVANCE_STEPS } from "@/content/site";

export const metadata: Metadata = { title: "Sundae Cash Advance", description: `Qualifying sellers may receive part of their sale proceeds — up to ${CASH_ADVANCE_MAX} — before closing.` };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Sundae Cash Advance" title="Get part of your proceeds / *before* closing day." sub={`Qualifying sellers may receive a cash advance on the sale proceeds of their home of up to ${CASH_ADVANCE_MAX}. Let your Closing Manager know as soon as possible — they’ll confirm whether you qualify and expedite the process.`}
        aside={<div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center rounded-full bg-red text-white shadow-[0_50px_100px_-40px_rgba(219,61,85,.8)]"><div className="text-center"><p className="text-sm uppercase tracking-[0.2em] text-white/70">Up to</p><p className="display text-[clamp(4rem,9vw,7rem)]">{CASH_ADVANCE_MAX.replace(",000", "K")}</p><p className="text-white/80">before closing</p></div></div>}>
        <AskButton q="Do I qualify for the Sundae cash advance?" label="Ask if you might qualify" />
      </PageHero>
      <section className="wrap">
        <SectionHead eyebrow="How it works" title="Five steps, / handled *for you.*" />
        <ol className="mt-12 grid gap-4">
          {CASH_ADVANCE_STEPS.map((s, i) => (
            <li key={i} data-reveal className="card grid gap-4 p-7 md:grid-cols-[120px_1fr] md:items-center">
              <span className="display text-5xl text-red">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-lg leading-relaxed">{s}</p>
            </li>
          ))}
        </ol>
        <div data-reveal className="mt-8 rounded-[1.5rem] bg-cream p-7 text-[0.98rem] leading-relaxed text-muted">
          <strong className="text-ink">Please note:</strong> any funds you receive through the Cash Advance are part of, and not in addition to, your sale proceeds. Cash Advance is not currently available for tenant-occupied properties. Your Closing Manager confirms the exact amount you qualify for.
        </div>
      </section>
      <CtaBand />
    </>
  );
}

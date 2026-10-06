import type { Metadata } from "next";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";
import AskButton from "@/components/AskButton";
import { CASH_ADVANCE_MAX, CASH_ADVANCE_STEPS } from "@/content/site";

export const metadata: Metadata = { title: "Sundae Cash Advance", description: `Qualifying sellers may receive part of their sale proceeds, up to ${CASH_ADVANCE_MAX}, before closing.` };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Sundae Cash Advance" title="Get part of your proceeds *before* closing day." sub={`Qualifying sellers may receive a cash advance on the sale proceeds of their home of up to ${CASH_ADVANCE_MAX}. Let your Closing Manager know as soon as possible. They’ll confirm whether you qualify and expedite the process.`}
        aside={
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div aria-hidden className="shape-rect absolute right-0 top-0 h-[42%] w-[42%]" />
            <div aria-hidden className="dots absolute bottom-[2%] left-[2%] h-[22%] w-[22%]" />
            <div className="shape-circle absolute inset-[8%] flex items-center justify-center text-ink">
              <div className="text-center">
                <p className="eyebrow">Up to</p>
                <p className="display mt-1 text-[clamp(3rem,6vw,4.75rem)] leading-none">{CASH_ADVANCE_MAX}</p>
                <p className="mt-3 text-xl">before closing</p>
              </div>
            </div>
          </div>
        }>
        <AskButton q="Do I qualify for the Sundae cash advance?" label="Ask if you might qualify" className="text-lg" />
      </PageHero>
      <section className="wrap">
        <SectionHead eyebrow="How it works" title="Five steps, / handled *for you.*" />
        <ol className="mt-12 grid gap-4">
          {CASH_ADVANCE_STEPS.map((s, i) => (
            <li key={i} data-reveal className="card flex items-start gap-6 p-7 md:items-center">
              <span className="num num-lg">{i + 1}</span>
              <p className="text-lg leading-relaxed">{s}</p>
            </li>
          ))}
        </ol>
        <div data-reveal className="card-mist mt-8 p-7 text-lg leading-relaxed">
          <strong>Please note:</strong> any funds you receive through the Cash Advance are part of, and not in addition to, your sale proceeds. Cash Advance is not currently available for tenant-occupied properties. Your Closing Manager confirms the exact amount you qualify for.
        </div>
      </section>
      <CtaBand />
    </>
  );
}

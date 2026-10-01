/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import OfferForm from "@/components/OfferForm";
import { RatingBadge } from "@/components/ui";
import { Check, Phone } from "@/components/icons";
import { CONTACT, PROMISE, TESTIMONIALS } from "@/content/site";

export const metadata: Metadata = { title: "Get my cash offer", description: "Request a no-obligation cash offer. Sell as-is, pay zero fees to Sundae, close in 10–60 days." };

export default function Page() {
  const t = TESTIMONIALS[0];
  return (
    <section className="relative overflow-hidden pb-10 pt-28 md:pt-36">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_60%)]" />
      <div className="wrap relative grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div className="lg:pt-6">
          <p className="eyebrow rise">No-obligation cash offer</p>
          <h1 className="display rise rise-1 mt-5 text-[clamp(2.6rem,5.6vw,4.8rem)]">Let’s see what investors <span className="serif font-normal tracking-normal text-red">will offer.</span></h1>
          <p className="lede rise rise-2 mt-6">Answer a few quick questions. A local Market Expert will confirm Sundae is a good fit, visit once, and bring you competitive offers — usually within four business days of the inspection.</p>
          <ul className="rise rise-3 mt-8 grid gap-3">{PROMISE.map((p) => <li key={p.title} className="flex gap-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red/10 text-red"><Check className="h-3.5 w-3.5" /></span><span><strong>{p.title}.</strong> <span className="text-muted">{p.body}</span></span></li>)}</ul>
          <div className="rise rise-4 mt-8 flex flex-wrap items-center gap-4"><RatingBadge /><a href={CONTACT.sellerTel} className="inline-flex items-center gap-2 font-semibold"><Phone className="h-4 w-4 text-red" /> Prefer to talk? {CONTACT.sellerPhone}</a></div>
          <figure className="rise rise-5 mt-10 hidden items-start gap-4 rounded-[1.5rem] bg-cream p-6 lg:flex">
            <img src={t.img} alt="" className="h-14 w-14 rounded-full object-cover" />
            <div><blockquote className="text-[0.98rem] leading-relaxed">“{t.quote}”</blockquote><figcaption className="mt-2 text-sm text-muted">{t.name} · {t.place}</figcaption></div>
          </figure>
        </div>
        <div className="rise rise-2 card self-start p-6 shadow-[0_40px_90px_-50px_rgba(27,20,22,.45)] md:p-10"><OfferForm /></div>
      </div>
    </section>
  );
}
